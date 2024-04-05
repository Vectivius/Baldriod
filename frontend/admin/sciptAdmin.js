
//Bejelentkezés ellenőrzés
if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
    location.href="pageLogin.html"
} else {
    document.getElementById("AdminEmail").innerHTML = localStorage.getItem("email")
}

//Kijelentkezés
function Logout() {
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    location.href="pageLogin.html"
}


let generalId = 0
let table = ""
let loaded = false



//Adatok betöltése
function LoadTable(table) {

    SetText("TrData", "")
    SetText("TbodyData", "")
    SetText("TableEditType", "")
    Hidden("DivEdit", true)
    Hidden("ButtonNewData", false)

    switch (table) {
        case "enemy":
            LoadEnemy()
            break;
        case "weapon":
            LoadWeapon()
            break;
        case "armor":
            LoadArmor()
            break;
        case "spell":
            LoadSpell()
            break;
        case "scroll":
            LoadScroll()
            break;
    
        default:
            break;
    }
}

















//Ellenségek
function LoadEnemy() {
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

                let TableEditType = GetElement("TableEditType")
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

    for(let i = 0; i<10; i++)  {           
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
function LoadWeapon() {
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

                let TableEditType = GetElement("TableEditType")
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











function RemoveClasses(type, id) {
    if (type == "edit") {
        let elements = document.getElementsByClassName("tdEdit")
        for (let i = 0; i < elements.length; i++) {
            AddClass(`EditEnemy-${i+1}`, "tdSelected", 0)
        }
    }
}















document.body.addEventListener("click", (event) => {

//Adatok módosítása
    //Ellenség
    if (event.target.id.includes('EditEnemy') ) {
        generalId = event.target.id.split("-")[1]

        //Close
        if (GetElement(`EditEnemy-${generalId}`).classList.contains("tdSelected")) {
            AddClass(`EditEnemy-${generalId}`, "tdSelected", 0)
            Hidden('DivEdit', true)

        //Open
        } else {
            RemoveClasses("edit", generalId)
            AddClass(`EditEnemy-${generalId}`, "tdSelected")
            table = "Enemy"
            Hidden('DivEdit', false)
            Hidden('ButtonNewData', true)
            Hidden('DivNewData', true)
        }
    }
    //Fegyver
    if (event.target.id.includes('EditWeapon') ) {
        generalId = event.target.id.split("-")[1]

        //Close
        if (GetElement(`EditWeapon-${generalId}`).classList.contains("tdSelected")) {
            AddClass(`EditWeapon-${generalId}`, "tdSelected", 0)
            Hidden('DivEdit', true)

        //Open
        } else {
            RemoveClasses("edit", generalId)
            AddClass(`EditWeapon-${generalId}`, "tdSelected")
            table = "Weapon"
            Hidden('DivEdit', false)
            Hidden('ButtonNewData', true)
            Hidden('DivNewData', true)
        }
    }


//Adatok törlése
    //Ellenség
    if (event.target.id.includes('DeleteEnemy') ) {
        generalId = event.target.id.split("-")[1]
        table = "enemy"
        Delete()
    }
    //Fegyver
    if (event.target.id.includes('DeleteWeapon') ) {
        generalId = event.target.id.split("-")[1]
        table = "weapon"
        Delete()
    }




    //Select type at edit
    if (event.target.className == 'tdSelectable type') {
        SetText("TextEditType", event.target.innerHTML)
    }
})


//Törlés
function Delete() {
    Message("Are you sure you want to delete this?", 2, ["", "Delete2", ""])
}

function Delete2() {
    deleteData(`${route}delete/${table}/${generalId}`).then(() => {
        Log(`Succesful delete`)
        LoadTable(`${table}`)
    }).catch(() => {
        Log("Error")
    })
}
















//Módosítás
function Edit() {
    let newValue = GetValue("NewValue")
    let type = table + GetText("TextEditType")
    if (GetText("TextEditType") == "Two handed") {
        type = "Two handed"
    }
    HiddenSwitch('DivEdit')
    HiddenSwitch('ButtonNewData')

    switch (table) {
        case "Enemy":
            console.log(newValue + ", " + type)
            putData(`${route}enemy/${generalId}/${type}/${String(newValue)}`).then(() => {
                console.log("Succesful edit")
                SetText("TrData", "")
                SetText("TbodyData", "")
                SetText("TableEditType", "")
                LoadTable("enemy")
                })
                break;
        case "Weapon":
            console.log(newValue + ", " + type)
            putData(`${route}weapon/${generalId}/${type}/${String(newValue)}`).then(() => {
                console.log("Succesful edit")
                SetText("TrData", "")
                SetText("TbodyData", "")
                SetText("TableEditType", "")
                LoadTable("weapon")
                })
            break;
        default:
            break;
    }
}




// function Edit() {
//     let newValue = GetValue("NewValue")
//     //let type = "Enemy" + GetValue("EditType")
//     let type = "Enemy" + GetText("TextEditType")
//     HiddenSwitch('DivEdit')
//     HiddenSwitch('ButtonNewData')
//     HiddenSwitch('DivNewData')
//     HiddenSwitch('DivNewDataEnemy')
    

//     switch (table) {
//         case "enemy":
//             console.log(newValue + ", " + type)
//             putData(`http://localhost:8000/enemy/${generalId}/${type}/${String(newValue)}`).then(() => {
//                 console.log("Sikeres módosítás")
//                 SetText("TrData", "")
//                 SetText("TbodyData", "")
//                 SetText("TableEditType", "")
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

// SetValue("NewDataEnemyName", "9"),
// SetValue("NewDataEnemyAttack", "9"),
// SetValue("NewDataEnemyDefense", "9"),
// SetValue("NewDataEnemyHp","9"),
// SetValue("NewDataEnemyDamage", "9"),
// SetValue("NewDataEnemyArmor", "9"),
// SetValue("NewDataEnemyMagic", "9"),












function OpenNewDataOptions() {
    ClassSwitch('ButtonNewData', 'buttonSelected')
    HiddenSwitch('DivNewData')
    HiddenSwitch('DivAdmin')
}




//Új adat látható
function OpenNewDataDivs(type) {
    if (GetElement(`ButtonNewData${type}`).classList.contains("buttonSelected")) {
        AddClass('ButtonNewDataEnemy', "buttonSelected", 0)
        AddClass('ButtonNewDataWeapon', "buttonSelected", 0)
        Hidden(`DivNewDataEnemy`, true)
        Hidden(`DivNewDataWeapon`, true)
        

    } else {
        AddClass('ButtonNewDataEnemy', "buttonSelected", 0)
        AddClass('ButtonNewDataWeapon', "buttonSelected", 0)
        Hidden(`DivNewDataEnemy`, true)
        Hidden(`DivNewDataWeapon`, true)

        AddClass(`ButtonNewData${type}`, "buttonSelected", 1)
        Hidden(`DivNewData${type}`, false)    

        
    }
}






//Új adat feltöltés
function NewData(type) {

    let data = null 
    switch (type) {
        case "enemy":
            data = {
                enemyName: GetValue("NewDataEnemyName"),
                enemyAttack: GetValue("NewDataEnemyAttack"),
                enemyDefense: GetValue("NewDataEnemyDefense"),
                enemyHp: GetValue("NewDataEnemyHp"),
                enemyDamage: GetValue("NewDataEnemyDamage"),
                enemyArmor: GetValue("NewDataEnemyArmor"),
                enemyMagic: GetValue("NewDataEnemyMagic"),
                enemyLevel: GetValue("NewDataEnemyLevel"),
            }
            break;

        case "weapon":
            data = {
                weaponName: GetValue("NewDataWeaponName"),
                weaponAttack: GetValue("NewDataWeaponAttack"),
                weaponDefense: GetValue("NewDataWeaponDefense"),
                weaponDamage: GetValue("NewDataWeaponDamage"),
                weaponDurability: GetValue("NewDataWeaponDurability"),
                weaponCost: GetValue("NewDataWeaponName"),
                twoHanded: GetValue("NewDataWeaponTwoHanded")
            }
            break;
    
        default:
            break;
    }

    console.log(data)


        postData(`${route}${type}`,data)
        .then((response) => {
            console.log(data)
            console.log("Succesful save")
            LoadTable(`${type}`)
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
    Hidden("SpanEditType", true)
    document.getElementById("ButtonEditType").classList.remove("hover")
})
AreaEditType.addEventListener("mouseover", function () {
    Hidden("SpanEditType", false)
    document.getElementById("ButtonEditType").classList.add("hover")
})















