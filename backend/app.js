const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Config  = require('./config');
const app = express();
const port = 8001;

//app.use(express.static(__dirname + './address.js'));
//app.use("./address.js");

//Betölti a CORS támogatást 
app.use(cors({origin: '*'}));

//lehetővé teszi a POST kérések elküldött adatainak (body) elérését
app.use(express.json());


// ez a végpont mutatja, hogy fut a node js szerver
app.get('/',(req,res) => {
    res.send("<h1>Szerver fut</h1>")
})


// Ellenfelek
app.get('/enemy',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (enemy)');
    })
    con.query('select * from enemy', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Helyszín
app.get('/location',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (location)');
    })
    con.query('select * from location', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Ellenfél helye
app.get('/enemyLocation',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (enemyLocation)');
    })
    con.query('select * from enemyLocation', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Fegyverek
app.get('/weapon',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (weapon)');
    })
    con.query('select * from weapon', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Páncélok
app.get('/armor',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (armor)');
    })
    con.query('select * from armor', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Varázslatok
app.get('/spell',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (spell)');
    })
    con.query('select * from spell', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Tárgyak 
app.get('/item',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (item)');
    })
    con.query('select * from item', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})

/* Ellenfél tesztadat
{
    "enemyName": "+++++",
    "enemyAttack": 6,
    "enemyDefense": 7,
    "enemyHp": 12,
    "enemyMinDamage": 2,
    "enemyMaxDamage": 3,
    "enemyArmor": 0,
    "enemyMagic": 0
}
*/


// Új ellenfél
app.post('/enemy', (req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into enemy (enemyName,enemyAttack,enemyDefense, enemyHp, enemyDamage, enemyArmor, enemyMagic) values (?,?,?,?,?,?,?)';
    con.query(SQL,[req.body.enemyName, req.body.enemyAttack, req.body.enemyDefense, req.body.enemyHp, req.body.enemyDamage, req.body.enemyArmor, req.body.enemyMagic], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})


//Ellenfél törlése Id alapján
app.delete('/enemy/:id', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('delete from enemy where id = ?',[req.params['id']], (err,result) =>{
        res.send(result);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba a törléskor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres törlés"})
        }
    })    
})


//Ellenfél módosítása Id alapján
app.put('/enemy/:id/:tipus/:ertek', (req,res) => {
    console.log(req.params['id'])
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    switch (req.params['tipus']) {
        case "EnemyName":
            con.query('UPDATE enemy SET enemyName = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        case "EnemyAttack":
            con.query('UPDATE enemy SET enemyAttack = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        case "EnemyDefense":
            con.query('UPDATE enemy SET enemyDefense = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        case "EnemyHp":
            con.query('UPDATE enemy SET enemyHp = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        case "EnemyDamage":
            con.query('UPDATE enemy SET enemyDamage = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        default:
            break;
    }
   /* switch (req.params['tipus']) {
        case "Enemy":
            con.query('UPDATE enemy SET EnemyName = ?, EnemyAttack = ?, EnemyDefense = ?, EnemyHp = ?, EnemyMinDamage = ?, EnemyMaxDamage = ? WHERE id =  ?',[req.params['ertek'], req.params['ertek'], req.params['ertek'], req.params['ertek'], req.params['ertek'], req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;

        default:
            break;
    }*/
})


// publikáljuk a szervert
app.listen(port, () => {
console.log(`Alkalmazás publikálva ${port}-on`);

})


