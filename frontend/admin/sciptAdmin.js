
//Bejelentkezés ellenőrzés
if (!localStorage.getItem("userEmail") || localStorage.getItem("userLevel") < 2) {
    location.href="../home/pageHome.html"
} else {
    setTimeout(() => {
        document.getElementById("AdminEmail").value = localStorage.getItem("userEmail")
        document.getElementById("AdminName").value = localStorage.getItem("userName")    
    }, 100)
}


let generalId = 0
let table = ""
let loaded = false



//Adatok betöltése
function loadTable(table) {

    setText("TrData", "")
    setText("TbodyData", "")
    setText("TableEditType", "")
    hidden("DivEdit", true)
    hidden("ButtonNewData", false)

    switch (table) {
        case "enemy":
            loadEnemy()
            break;
        case "weapon":
            loadWeapon()
            break;
        case "armor":
            loadArmor()
            break;
        case "spell":
            loadSpell()
            break;
        case "scroll":
            loadScroll()
            break;
        case "user":
            loadUsers()
            break;
    
        default:
            break;
    }
}

















//Ellenségek
function loadEnemy() {
    getData(`${route}enemy`).then((enemy) => {
        console.log(enemy)
                const Header = document.getElementById("TrData")
                const Table = document.getElementById("TbodyData");

                let th = Header.insertCell(); th.outerHTML =`<th> Id </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Name </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Attack </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Defense </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Hp </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Damage </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Armor </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Magic </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Level </th>`
                th = Header.insertCell(); th.outerHTML =`<th>  </th>`
                th = Header.insertCell(); th.outerHTML =`<th>  </th>`

                let TableEditType = getElement("TableEditType")
                let row = TableEditType.insertRow()
                let td = row.insertCell()
                td.innerHTML =`<td>Name</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Attack</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Defense</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Hp</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Damage</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Armor</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Magic</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Level</td>`;
                td.className = "tdSelectable type"

    for(let i = 0; i<enemy.length; i++)  {           
        row = Table.insertRow();
        console.log(enemy[i])

        if (enemy[i] != undefined) {
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].id}</td>`;
        
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyName}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyAttack}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyDefense}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyHp}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyDamage}</td>`;
                    
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyArmor}</td>`;
                        
            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyMagic}</td>`;

            td = row.insertCell()
            td.innerHTML =`<td>${enemy[i].enemyLevel}</td>`;

            td = row.insertCell()
            td.innerHTML =`<td>Edit</td>`;
            td.className = "tdSelectable tdEdit";
            td.id = `EditEnemy-${enemy[i].id}`
        
            td = row.insertCell()
            td.innerHTML =`<td>Delete</td>`;
            td.className = "tdSelectable";
            td.id = `DeleteEnemy-${enemy[i].id}`
        }
    }; 
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}


//Fegyverek
function loadWeapon() {
    getData(`${route}weapon`).then((weapon) => {
                const Header = document.getElementById("TrData")
                const Table = document.getElementById("TbodyData");

                let th = Header.insertCell(); th.outerHTML =`<th> Id </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Name </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Attack </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Defense </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Damage </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Durability </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Cost </th>`;
                th = Header.insertCell(); th.outerHTML =`<th> Two handed </th>`;
                th = Header.insertCell(); th.outerHTML =`<th>  </th>`;
                th = Header.insertCell(); th.outerHTML =`<th>  </th>`;

                let TableEditType = getElement("TableEditType")
                let row = TableEditType.insertRow()
                let td = row.insertCell()
                td.innerHTML =`<td>Name</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Attack</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Defense</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Damage</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Durability</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Cost</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Two handed</td>`;
                td.className = "tdSelectable type"



    for(let i = 0; i<10; i++)  {           
        row = Table.insertRow();
        console.log(weapon[i])

        if (weapon[i] != undefined) {
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].id}</td>`;
        
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].weaponName}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].weaponAttack}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].weaponDefense}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].weaponDamage}</td>`;
            
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].weaponDurability}</td>`;
                    
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].weaponCost}</td>`;
                        
            td = row.insertCell()
            td.innerHTML =`<td>${weapon[i].twoHanded}</td>`;

            td = row.insertCell()
            td.innerHTML =`<td>Edit</td>`;
            td.className = "tdSelectable";
            td.id = `EditWeapon-${weapon[i].id}`
        
            td = row.insertCell()
            td.innerHTML =`<td>Delete</td>`;
            td.className = "tdSelectable";
            td.id = `DeleteWeapon-${weapon[i].id}`
        } 
    }; 
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}


function loadUsers() {
    getData(`${route}user`, localStorage.getItem("token")).then((user) => {
                const Header = document.getElementById("TrData")
                const Table = document.getElementById("TbodyData")

                let th = Header.insertCell(); th.outerHTML =`<th> Id </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Name </th>`
                th = Header.insertCell(); th.outerHTML =`<th> Email </th>`
                th = Header.insertCell(); th.outerHTML =`<th> </th>`
                // th = Header.insertCell(); th.outerHTML =`<th> Password </th>`


                let TableEditType = getElement("TableEditType")
                let row = TableEditType.insertRow()
                let td = row.insertCell()
                td.innerHTML =`<td>Name</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Email</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Password</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Damage</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Durability</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Cost</td>`;
                td.className = "tdSelectable type"

                td = row.insertCell()
                td.innerHTML =`<td>Two handed</td>`;
                td.className = "tdSelectable type"



    for(let i = 0; i<10; i++)  {
        row = Table.insertRow();
        console.log(user[i])

        if (user[i] != undefined) {
            td = row.insertCell()
            td.innerHTML =`<td>${user[i].id}</td>`
        
            td = row.insertCell()
            td.innerHTML =`<td>${user[i].userName}</td>`
        
            td = row.insertCell()
            td.innerHTML =`<td>${user[i].userEmail}</td>`
            

            // td = row.insertCell()
            // td.innerHTML =`<td>Edit</td>`;
            // td.className = "tdSelectable";
            // td.id = `EditWeapon-${user[i].id}`
        
            td = row.insertCell()
            td.innerHTML =`<td>Delete</td>`;
            td.className = "tdSelectable";
            td.id = `DeleteUser-${user[i].id}`
        } 
    }; 
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}








// function RemoveClasses(type, id) {
//     if (type == "edit") {
//         let elements = document.getElementsByClassName("tdEdit")
//         for (let i = 0; i < elements.length; i++) {
//             addClass(`EditEnemy-${i+1}`, "tdSelected", 0)
//         }
//     }
// }















document.body.addEventListener("click", (event) => {

//Adatok módosítása
    //Ellenség
    if (event.target.id.includes('EditEnemy') ) {
        generalId = event.target.id.split("-")[1]

        //Close
        if (getElement(`EditEnemy-${generalId}`).classList.contains("tdSelected")) {
            addClass(`EditEnemy-${generalId}`, "tdSelected", 0)
            hidden('DivEdit', true)

        //Open
        } else {
            deselectItems()
            //RemoveClasses("edit", generalId)
            addClass(`EditEnemy-${generalId}`, "tdSelected")
            table = "Enemy"
            hidden('DivEdit', false)
            hidden('ButtonNewData', true)
            hidden('DivNewData', true)
        }
    }
    //Fegyver
    if (event.target.id.includes('EditWeapon') ) {
        generalId = event.target.id.split("-")[1]

        //Close
        if (getElement(`EditWeapon-${generalId}`).classList.contains("tdSelected")) {
            addClass(`EditWeapon-${generalId}`, "tdSelected", 0)
            hidden('DivEdit', true)

        //Open
        } else {
            deselectItems()
            //RemoveClasses("edit", generalId)
            addClass(`EditWeapon-${generalId}`, "tdSelected")
            table = "Weapon"
            hidden('DivEdit', false)
            hidden('ButtonNewData', true)
            hidden('DivNewData', true)
        }
    }


//Adatok törlése
    //Ellenség
    if (event.target.id.includes('DeleteEnemy') ) {
        generalId = event.target.id.split("-")[1]
        table = "enemy"
        addClass(event.target.id, "tdSelected", 1)
        sendMessage("Are you sure you want to delete this?", 2, ["", "deleteSql", "deselectItems"])
    }
    //Fegyver
    if (event.target.id.includes('DeleteWeapon') ) {
        generalId = event.target.id.split("-")[1]
        table = "weapon"
        addClass(event.target.id, "tdSelected", 1)
        sendMessage("Are you sure you want to delete this?", 2, ["", "deleteSql", "deselectItems"])
    }




    //Select type at edit
    if (event.target.className == 'tdSelectable type') {
        setText("TextEditType", event.target.innerHTML)
    }
})


//Törlés
function deleteSql() {
    deselectItems()
    let data = {}
    deleteData(`${route}delete/${table}/${generalId}`, data, localStorage.getItem("token")).then(() => {
        console.log(`Succesful delete`)
        loadTable(`${table}`)
    }).catch(() => {
        console.log("Error")
    })
}
















//Módosítás
function editSql() {
    let newValue = getValue("NewValue")
    let type = table + getText("TextEditType")
    if (getText("TextEditType") == "Two handed") {
        type = "Two handed"
    }
    hiddenSwitch('DivEdit')
    hiddenSwitch('ButtonNewData')

    let data = {}
    switch (table) {
        case "Enemy":
            console.log(newValue + ", " + type)
            putData(`${route}enemy/${generalId}/${type}/${String(newValue)}`,data, localStorage.getItem("token")).then(() => {
                console.log("Succesful edit")
                setText("TrData", "")
                setText("TbodyData", "")
                setText("TableEditType", "")
                loadTable("enemy")
                })
                break;
        case "Weapon":
            console.log(newValue + ", " + type)
            putData(`${route}weapon/${generalId}/${type}/${String(newValue)},`,data, localStorage.getItem("token")).then(() => {
                console.log("Succesful edit")
                setText("TrData", "")
                setText("TbodyData", "")
                setText("TableEditType", "")
                loadTable("weapon")
                })
            break;
        default:
            break;
    }
}




// function Edit() {
//     let newValue = getValue("NewValue")
//     //let type = "Enemy" + getValue("EditType")
//     let type = "Enemy" + getText("TextEditType")
//     hiddenSwitch('DivEdit')
//     hiddenSwitch('ButtonNewData')
//     hiddenSwitch('DivNewData')
//     hiddenSwitch('DivNewDataEnemy')
    

//     switch (table) {
//         case "enemy":
//             console.log(newValue + ", " + type)
//             putData(`http://localhost:8000/enemy/${generalId}/${type}/${String(newValue)}`).then(() => {
//                 console.log("Sikeres módosítás")
//                 setText("TrData", "")
//                 setText("TbodyData", "")
//                 setText("TableEditType", "")
//                 loaded = false
//                 LoadTable("Enemies")
//                 })
//             break;
//         default:
//             break;
//     }
// }

// let data = {
//     enemyName: "fgg",
//     enemyAttack: "fgg",
//     enemyDefense: "fgg",
//     enemyHp: "fgg",
//     enemyDamage: "fgg",
//     enemyArmor: "fgg",
//     enemyMagic: "fgg",
// }

// setValue("NewDataEnemyName", "9"),
// setValue("NewDataEnemyAttack", "9"),
// setValue("NewDataEnemyDefense", "9"),
// setValue("NewDataEnemyHp","9"),
// setValue("NewDataEnemyDamage", "9"),
// setValue("NewDataEnemyArmor", "9"),
// setValue("NewDataEnemyMagic", "9"),












function openNewDataOptions() {
    classSwitch('ButtonNewData', 'buttonSelected')
    hiddenSwitch('DivNewData')
    hiddenSwitch('DivAdmin')
}




//Új adat látható
function openNewDataDivs(type) {
    if (getElement(`ButtonNewData${type}`).classList.contains("buttonSelected")) {
        addClass('ButtonNewDataEnemy', "buttonSelected", 0)
        addClass('ButtonNewDataWeapon', "buttonSelected", 0)
        hidden(`DivNewDataEnemy`, true)
        hidden(`DivNewDataWeapon`, true)
        

    } else {
        addClass('ButtonNewDataEnemy', "buttonSelected", 0)
        addClass('ButtonNewDataWeapon', "buttonSelected", 0)
        hidden(`DivNewDataEnemy`, true)
        hidden(`DivNewDataWeapon`, true)

        addClass(`ButtonNewData${type}`, "buttonSelected", 1)
        hidden(`DivNewData${type}`, false)    

        
    }
}






//Új adat feltöltés
function newDataSql(type) {

    let data = null 
    switch (type) {
        case "enemy":
            data = {
                enemyName: getValue("NewDataEnemyName"),
                enemyAttack: getValue("NewDataEnemyAttack"),
                enemyDefense: getValue("NewDataEnemyDefense"),
                enemyHp: getValue("NewDataEnemyHp"),
                enemyDamage: getValue("NewDataEnemyDamage"),
                enemyArmor: getValue("NewDataEnemyArmor"),
                enemyMagic: getValue("NewDataEnemyMagic"),
                enemyLevel: getValue("NewDataEnemyLevel"),
            }
            break;

        case "weapon":
            data = {
                weaponName: getValue("NewDataWeaponName"),
                weaponAttack: getValue("NewDataWeaponAttack"),
                weaponDefense: getValue("NewDataWeaponDefense"),
                weaponDamage: getValue("NewDataWeaponDamage"),
                weaponDurability: getValue("NewDataWeaponDurability"),
                weaponCost: getValue("NewDataWeaponName"),
                twoHanded: getValue("NewDataWeaponTwoHanded")
            }
            break;
    
        default:
            break;
    }

    console.log(data)


        postData(`${route}${type}`,data, localStorage.getItem("token"))
        .then((response) => {
            console.log(data)
            console.log("Succesful save")
            loadTable(`${type}`)
                return response.json();
                
            }).then((data) => {
                if (data.status == 404) {
                    err = document.getElementById("error");
                    err.innerHTML = data.error;
                }
                console.log(data.error);
            }).catch((error) => {
                console.log(error);
              }).finally(() => {
              });
}





//Open type list
const AreaEditType = document.getElementById("AreaEditType")
AreaEditType.addEventListener("mouseleave", function() {
    hidden("SpanEditType", true)
    document.getElementById("ButtonEditType").classList.remove("hover")
})
AreaEditType.addEventListener("mouseover", function () {
    hidden("SpanEditType", false)
    document.getElementById("ButtonEditType").classList.add("hover")
})







function showAccount(hide = false) {
    if (hide == true) {
        hidden("DivUserAccount", true)
        hidden("DivAdmin", false)
    } else {
        hidden("DivAdmin", true)
        hidden("DivUserAccount", false)
    }
}


function showAccountEdit(hide = false) {
    if (hide == true) {
        hidden("DivEditAccount", true)
        hidden("DivUserAccount", false)
        setValue("EditPassword", "")
        localStorage.removeItem("userPassword")
        location.href="pageAdmin.html"
    } else {
        hidden("DivUserAccount", true)
        hidden("DivEditAccount", false)
        setValue("EditEmail", localStorage.getItem("userEmail"))
        setValue("EditName", localStorage.getItem("userName"))
        loadPassword()
    }
}

function loadPassword() {
    getData(`${route}user/password/${localStorage.getItem("userId")}`, localStorage.getItem("token")).then((response) => {
        console.log(response)
        setValue("EditPassword", response[0].userPassword)
        localStorage.setItem("userPassword", response[0].userPassword)
    })
}


function saveEditedAccount() {
    let data = {
        email: getValue("EditEmail"),
        name: getValue("EditName"),
        password: getValue("EditPassword")
    }
    putData(`${route}user/edit/${localStorage.getItem("userId")}`, data, localStorage.getItem("token")).then(() => {
        setValue("AdminEmail", data.email)
        setValue("AdminName", data.name)
        localStorage.setItem("userEmail", data.email)
        localStorage.setItem("userName", data.name)
        localStorage.setItem("userPassword", data.password)

        if (localStorage.getItem("userEmail") == data.email && localStorage.getItem("userName") == data.name && localStorage.getItem("userPassword") == data.password) {
            sendMessage("Succesful save!", 1, ["", "", ""])
        }
    })
}
