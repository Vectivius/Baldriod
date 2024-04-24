const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Config  = require('./config');
const app = express();


require("dotenv").config()
const jwt = require("jsonwebtoken")



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


// Felhasználók
app.get('/user', authenticateTokenAdmin, (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (enemy)');
    })
    con.query('select * from user', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Felhasználók
app.get('/user', authenticateTokenAdmin, (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás (enemy)');
    })
    con.query('select * from user', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
})
// Ellenfelek
app.get('/enemy', (req,res) => {
app.get('/enemy', (req,res) => {
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
app.get('/weapon', (req,res) => {
app.get('/weapon', (req,res) => {
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
// app.get('/save/:id', authenticateTokenAdmin,(req,res) => {
//     var con = mysql.createConnection(new Config());
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log('sikeres csatlakozás');
//     })
//     con.query('select * from saves where id = ?',[req.params['id']], (err,result) =>{
//         res.send(result);
//     })    
// })



//Mentés átnevezés
app.post('/saves/rename/:userId/:saveId', authenticateToken, (req,res) => {
    var con = mysql.createConnection(new Config());

    console.log(req.params['userId'])

    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    con.query('update saves set saveName = ? where id = ?',[req.body.newName, req.params.saveId], (err,result) =>{
        if (err) {
            res.send(err)
        } else {
            res.send({succes: "sikeres"})
        }
    })    
})

// Új mentés
app.post('/saves/new/:userId', authenticateToken,(req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into saves (id, saveName,userId,playerName,PlayerAttack,PlayerDefense,PlayerHp,PlayerMagic,Weapons,Armors,Shields,WeaponsDurability,ArmorsDurability,ShieldsDurability,SelectedItems) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    id = null
    if (req.body.id != undefined) {
        id = req.body.id
    }
    con.query(SQL,[id, req.body.saveName, req.params.userId, req.body.playerName, req.body.PlayerAttack, req.body.PlayerDefense, req.body.PlayerHp, req.body.PlayerMagic, req.body.Weapons, req.body.Armors, req.body.Shields, req.body.WeaponsDurability, req.body.ArmorsDurability, req.body.ShieldsDurability, req.body.SelectedItems], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})


//Egy mentés id vagy név alapján
app.get('/saves/getById/:userId/:saveId', authenticateToken, (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    let sql = "select * from saves where userId = ? and id = ?"

    con.query(sql,[req.params['userId'], req.params['saveId']], (err,result) =>{
        if (err) {
            res.send({error: "hiba"})
        } else {
            res.send(result);
        }
    })    
})
app.get('/saves/getByName/:userId/:saveName', authenticateToken, (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    let sql = "select * from saves where userId = ? and saveName = ?"

    con.query(sql,[req.params['userId'], req.params['saveName']], (err,result) =>{
        if (err) {
            res.send({error: "hiba"})
        } else {
            res.send(result);
        }
    })    
})



//Egy felhasználó mentései
app.get('/saves/getall/:userId', authenticateToken, (req,res) => {

    var con = mysql.createConnection(new Config());

    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    con.query('select * from saves where userId = ?',[req.params['userId']], (err,result) =>{
        res.send(result);

    })
    })
})


//Mentés törlése
app.delete('/saves/delete/:userId/:saveId', authenticateToken,(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

   // con.query('delete from = ? where id = ?',[req.params['type'], req.params['id']], (err,result) =>{
    let table = req.params['type']
    con.query(`delete from saves where id = ?`,[req.params.saveId], (err,result) =>{
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
//Mentés törlése
app.delete('/saves/delete/:userId/:saveId', authenticateToken,(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

   // con.query('delete from = ? where id = ?',[req.params['type'], req.params['id']], (err,result) =>{
    let table = req.params['type']
    con.query(`delete from saves where id = ?`,[req.params.saveId], (err,result) =>{
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


















// Új adatok

app.post('/enemy', authenticateTokenAdmin,(req,res) => {
app.post('/enemy', authenticateTokenAdmin,(req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    con.query("select id from enemy order by id desc limit 1", (err1, result1) => {

        const SQL = 'insert into enemy (id, enemyName,enemyAttack,enemyDefense, enemyHp, enemyDamage, enemyArmor, enemyMagic, enemyLevel) values (?,?,?,?,?,?,?,?,?)';
        con.query(SQL,[result1[0].id+1,req.body.enemyName, req.body.enemyAttack, req.body.enemyDefense, req.body.enemyHp, req.body.enemyDamage, req.body.enemyArmor, req.body.enemyMagic, req.body.enemyLevel], (err,result) =>{
            console.log(err);
            if (err) {
                res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
            }
            else {
                res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
            }
        })

    })



})

app.post('/weapon',authenticateTokenAdmin, (req,res) => {
app.post('/weapon',authenticateTokenAdmin, (req,res) => {
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

app.post('/armor', authenticateTokenAdmin,(req,res) => {
app.post('/armor', authenticateTokenAdmin,(req,res) => {
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




/*
app.post('/saves', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into saves (enemyName,enemyAttack,enemyDefense, enemyHp, enemyDamage, enemyArmor, enemyMagic, enemyLevel) values (?,?,?,?,?,?,?, ?)';
    con.query(SQL,[req.body.armorName, req.body.armorDefense, req.body.armorDamageReduction, req.body.armorDurability, req.body.enemyDamage, req.body.enemyArmor, req.body.enemyMagic, req.body.enemyLevel], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {
            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés"})
        }
    })
})*/




































//Törlés Id alapján
app.delete('/delete/:type/:id', authenticateTokenAdmin,(req,res) => {
    console.log('1')
app.delete('/delete/:type/:id', authenticateTokenAdmin,(req,res) => {
    console.log('1')
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
app.put('/enemy/:id/:tipus/:ertek', authenticateTokenAdmin,(req,res) => {
app.put('/enemy/:id/:tipus/:ertek', authenticateTokenAdmin,(req,res) => {
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
app.post("/user/login", (req, res) => {
app.post("/user/login", (req, res) => {
    var con = mysql.createConnection(new Config())
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    con.query('select id, userName, userEmail, userLevel from user where userEmail = ?',  [req.body.email], (err,result) =>{
    con.query('select id, userName, userEmail, userLevel from user where userEmail = ?',  [req.body.email], (err,result) =>{
        if (err) throw err;
        console.log(req.body.email)

        con.query('select userPassword from user where userEmail = ?',  [req.body.email], (err2,result2) =>{
            if (result[0] != undefined) {
                if (result2[0].userPassword == req.body.password) {
                    console.log("Sikeres bejelentkezés")

                    const user = {email: req.body.email, level:result[0].userLevel, id:result[0].id}
                    const accesToken = generateAccessToken(user)
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                    refreshTokens.push(refreshToken)
                    //res.json({accesToken: accesToken, refreshToken: refreshToken})
                    res.send({result: result, accesToken: accesToken})
                }
            } else res.send({error: "incorrect"})
        })
    })
})

/*
app.post("/user/login", (req, res) => {
    const user = {email: req.body.email}
    const accesToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accesToken: accesToken, refreshToken: refreshToken})
})*/

let refreshTokens = []

//token generálás
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


app.post("/token", (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken })
    })
})
/*
non
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vbkBuIiwibGV2ZWwiOiIxIiwiaWF0IjoxNzEzMDkxMTUwLCJleHAiOjE3MTMwOTI5NTB9.-rdSyirPH-_19ctlp1Xq46wbpN19GFJtCl7B_sxuvc0

greg
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyZWdAZyIsImxldmVsIjoiMiIsImlhdCI6MTcxMzA5MTIyNSwiZXhwIjoxNzEzMDkzMDI1fQ.Ib2pT4LtyfH72pyRPpxT__wewTkrxMR0WuLpK-rICqg
*/











function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) {
        return res.sendStatus(401)
    }



    //van token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({error: "lejárt"}) //lejárt token

        console.log(req.params.userId)
        console.log(user.id)

        if (user.id == req.params.userId) {
            req.user = user
            next()
        } else {
            return res.sendStatus(403)
        }
    })
}

function authenticateTokenAdmin(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    //van token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403) //lejárt token

        console.log(req.params.userId)
        console.log(user.id)

        if (user.level >= 2) {
            req.user = user
            next()
        } else if (user.id == req.params.userId) {
            req.user = user
            next()
        } else {
            return res.sendStatus(403)
        }
    })
}








//Regisztráció
app.post('/reg', (req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const SQL = 'insert into user (userName,userEmail,userPassword) values (?,?,?)';
    con.query(SQL,[req.body.name, req.body.email, req.body.password], (err,result) =>{
        console.log(err);
        if (err) {
            res.status(404).send({status: 404 , error: "Hiba az adat rögzítésekor"});
        }
        else {

            con.query('select id, userName, userEmail, userLevel from user where userEmail = ?',  [req.body.email], (err,result) =>{
                if (err) throw err;
                console.log(req.body.email)
        
                con.query('select userPassword from user where userEmail = ?',  [req.body.email], (err2,result2) =>{
                    if (result[0] != undefined) {
                        if (result2[0].userPassword == req.body.password) {
                            console.log("Sikeres bejelentkezés")
        
                            const user = {email: req.body.email, level:result[0].userLevel, id:result[0].id}
                            const accesToken = generateAccessToken(user)
                            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                            refreshTokens.push(refreshToken)
                            //res.json({accesToken: accesToken, refreshToken: refreshToken})
                            res.send({result: result, accesToken: accesToken})
                        }
                    } else res.send({error: "incorrect"})
                })
            })
            /*
            const user = {email: req.body.email, level:result[0].userLevel, id:result[0].id}
            const accesToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            //res.json({accesToken: accesToken, refreshToken: refreshToken})

            res.status(200).send({status: 200 ,success: "Sikeres adatrögzítés",accesToken: accesToken})*/
        }
    })
})


//Szerkesztés
app.put("/user/edit/:userId", authenticateToken,(req, res) => {
    var con = mysql.createConnection(new Config())

    con.connect((err) => {
        if (err) throw err
    })

    con.query("update user set userEmail = ? where id = ?", [req.body.email, req.params["userId"]], (err1, result2) => {
        if (err1) {
            res.status(404).send({status: 404, error: "hiba"})
        } else {
            con.query("update user set userName = ? where id = ?", [req.body.name, req.params["userId"]], (err2, result2) => {
                if (err2) {
                    res.status(404).send({status: 404, error: "hiba"})
                } else {
                    
                    con.query("update user set userPassword = ? where id = ?", [req.body.password, req.params["userId"]], (err3, result3) => {
                        if (err3) {
                            res.status(404).send({status: 404, error: "hiba"})
                        } else {
                            res.status(200).send({status: 200 ,success: "Sikeres módosítás"})
                        }
                    })

                }
            })
        }
    
    })
})


//Jelszó
app.get("/user/password/:userId", authenticateToken,(req, res) => {
    var con = mysql.createConnection(new Config())
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })

    con.query('select userPassword from user where id = ?',  [req.params['userId']], (err,result) =>{
        if (err) throw err;
        res.send(result);    

    })
})