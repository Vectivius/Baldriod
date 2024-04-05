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
// Tekercsek 
app.get('/scroll',(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (item)');
    })
    con.query('select * from scroll', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})


//Egy mentés
app.get('/save/:name', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('select * from saves where saveName = ?',[req.params['name']], (err,result) =>{
        // if (err) {

        //     res.status(404).send({status: 404 , error: "Hiba"});
        // }
        // else {
        //     res.status(200).send({status: 200 ,success: "Sikeres"})
        // }
        res.send(result);

    })    
})
























// Új adatok

app.post('/enemy', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into enemy (enemyName,enemyAttack,enemyDefense, enemyHp, enemyDamage, enemyArmor, enemyMagic, enemyLevel) values (?,?,?,?,?,?,?, ?)';
    con.query(SQL,[req.body.enemyName, req.body.enemyAttack, req.body.enemyDefense, req.body.enemyHp, req.body.enemyDamage, req.body.enemyArmor, req.body.enemyMagic, req.body.enemyLevel], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})

app.post('/weapon', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into weapon (weaponName,weaponAttack,weaponDefense, weaponDamage, weaponDurability, weaponCost, twoHanded) values (?,?,?,?,?,?,?)';
    con.query(SQL,[req.body.weaponName, req.body.weaponAttack, req.body.weaponDefense, req.body.weaponDamage, req.body.weaponDurability, req.body.weaponCost, req.body.twoHanded], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})

app.post('/armor', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into armor (enemyName,enemyAttack,enemyDefense, enemyHp, enemyDamage, enemyArmor, enemyMagic, enemyLevel) values (?,?,?,?,?,?,?, ?)';
    con.query(SQL,[req.body.armorName, req.body.armorDefense, req.body.armorDamageReduction, req.body.armorDurability, req.body.enemyDamage, req.body.enemyArmor, req.body.enemyMagic, req.body.enemyLevel], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})


// Új mentés
app.post('/save', (req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into saves (saveName,playerName,PlayerAttack,PlayerDefense,PlayerHp,PlayerMagic,Weapons,Armors,Shields,WeaponsDurability,ArmorsDurability,) values (?,?)';
    con.query(SQL,[req.body.saveName, req.body.playerName], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})






















//Törlés Id alapján
app.delete('/delete/:type/:id', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

   // con.query('delete from = ? where id = ?',[req.params['type'], req.params['id']], (err,result) =>{
    let table = req.params['type']
    con.query(`delete from ${table} where id = ?`,[req.params['id']], (err,result) =>{
        console.log(result)
        //res.send(result);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba a törléskor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres törlés"})
        }
    })    
})

// app.delete('/weapon/:id', (req,res) => {
//     var con = mysql.createConnection(new Config());
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log('sikeres csatlakozás');
//     })
//     con.query('delete from weapon where id = ?',[req.params['id'], req.params['id']], (err,result) =>{
//         //res.send(result);
//         if (err) {
//             res.status(404).send({status: 404 , error: "Hiba a törléskor"});
//         }
//         else {
//             res.status(200).send({status: 200 ,success: "Sikeres törlés"})
//         }
//     })    
// })




















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
        case "EnemyArmor":
            con.query('UPDATE enemy SET enemyArmor = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        case "EnemyMagic":
            con.query('UPDATE enemy SET enemyMagic = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
                if (err) throw err;
                res.send(result);
            })
            break;
        case "EnemyLevel":
            con.query('UPDATE enemy SET enemyLevel = ? WHERE id =  ?',[req.params['ertek'], req.params['id']], (err,result) =>{
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




























//Bejelentkezés
app.post("/login", (req, res) => {
    

    var con = mysql.createConnection(new Config())
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })


    con.query('select * from admin where adminEmail = ?',  [req.body.email], (err,result) =>{
        if (err) throw err;
        console.log(req.body.email)

        if (result[0] != undefined) {
            if (result[0].adminEmail == req.body.email && result[0].adminPassword == req.body.password) {
                console.log("Sikeres bejelentkezés")
                res.send(result);    
            }
        } else res.send({error: "incorrect"})

    })

})




