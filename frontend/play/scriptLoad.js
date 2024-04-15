let difficulty = ""

//Bejelentkezés ellenőrzés
if (localStorage.getItem("userEmail") != undefined) {

    setTimeout(() => {

        hidden("ButtonLoad", false)
        hidden("DivSaveToServer", false)

        hidden("ButtonAccount", false)
        hidden("DivUserAccount", false)
        setValue("UserEmail", localStorage.getItem("userEmail"))
        setValue("UserName", localStorage.getItem("userName"))

        /*
        hidden("ButtonReg", true)
        hidden("ButtonLogin", true)
        hidden("ButtonAdmin", true)
        hidden("ButtonAccount", false)
        hidden("ButtonLoadGame", false)
        hidden("TextareaSaveName", false)

        setValue("UserEmail", localStorage.getItem("userEmail"))*/
        loadSaves()
        
        //Admin
        if (localStorage.getItem("userLevel") == 2) {
            
            //hidden("ButtonAdmin", false)
            
        }
    }, 100)
} 


function loadSaves() {
    getData(`${route}saves/getall/${localStorage.getItem("userId")}`, localStorage.getItem("token")).then((data) => {
                const Header = document.getElementById("TrData")
                const Table = document.getElementById("TbodyData");

                let th = Header.insertCell(); th.outerHTML =`<th> Name </th>`
                 th = Header.insertCell(); th.outerHTML =`<th>  </th>`
                 th = Header.insertCell(); th.outerHTML =`<th>  </th>`
                 th = Header.insertCell(); th.outerHTML =`<th>  </th>`

    for(let i = 0; i<10; i++)  {           
        row = Table.insertRow();
        console.log(data[i])

        if (data[i] != undefined) {
            td = row.insertCell()
            td.innerHTML =`<td>${data[i].saveName}</td>`

            td = row.insertCell()
            td.innerHTML =`<td>Load</td>`
            td.className = "tdSelectable"
            td.id = `LoadSave-${data[i].id}`
            
            td = row.insertCell()
            td.innerHTML =`<td>Rename</td>`;
            td.className = "tdSelectable tdRename";
            td.id = `EditSave-${data[i].id}`
        
            td = row.insertCell()
            td.innerHTML =`<td>Delete</td>`;
            td.className = "tdSelectable";
            td.id = `DeleteSave-${data[i].id}`
        }
    }; 
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}

document.body.addEventListener("click", (event) => {
    if (event.target.id.includes('LoadSave') ) {
        loadGame(event.target.id.split("-")[1])
    }
})




//-/- Adatok az új játék oldalról -\-\\
//Betöltés
if (localStorage.getItem("playerAttack") != undefined) {

    setText("PlayerName", localStorage.getItem("playerName"))

    setText("PlayerStartAttack", localStorage.getItem("playerAttack").split("-")[0])
    setText("PlayerCurrentAttack", localStorage.getItem("playerAttack").split("-")[1])

    setText("PlayerStartDefense", localStorage.getItem("playerDefense").split("-")[1])
    setText("PlayerCurrentDefense", localStorage.getItem("playerDefense").split("-")[1])

    setText("PlayerStartHp", localStorage.getItem("playerHp").split("-")[1])
    setText("PlayerCurrentHp", localStorage.getItem("playerHp").split("-")[1])

    setText("PlayerStartMagic", localStorage.getItem("playerMagic").split("-")[1])
    setText("PlayerCurrentMagic", localStorage.getItem("playerMagic").split("-")[1])

    //Fegyverek betöltése
    if (localStorage.getItem("weapons") != undefined && localStorage.getItem("weapons") != "null") {
        setTimeout(() => {
            let weapons = localStorage.getItem("weapons").split("-")
            for (let i = 0; i < weapons.length; i++) {
                reloadWeaponList(weapons[i])
            }
        }, 100)
    }

    //Páncélok betöltése
    if (localStorage.getItem("armors") != undefined && localStorage.getItem("armors") != "null") {
        setTimeout(() => {
            let armors = localStorage.getItem("armors").split("-")
            for (let i = 0; i < armors.length; i++) {
                reloadArmorList(armors[i])
            }
        }, 100)
    }


    //Pajzsok betöltése
    if (localStorage.getItem("shields") != undefined && localStorage.getItem("shields") != "null") {
        setTimeout(() => {
            let shields = localStorage.getItem("shields").split("-")
            for (let i = 0; i < shields.length; i++) {
                reloadShieldList(shields[i])
            }
        }, 100)
    }

    if (localStorage.getItem("weaponsDurability") != undefined && localStorage.getItem("weaponsDurability") != "null") {
        setTimeout(() => {
            let weaponsDurability = localStorage.getItem("weaponsDurability").split("-")
            for (let i = 0; i < weaponsDurability.length; i++) {
                setText(`InventoryWeapon${i+1}CurrentDurability`, weaponsDurability[i])
            }
        }, 100)
    }
    if (localStorage.getItem("armorsDurability") != undefined && localStorage.getItem("armorsDurability") != "null") {
        setTimeout(() => {
            let armorsDurability = localStorage.getItem("armorsDurability").split("-")
            for (let i = 0; i < armorsDurability.length; i++) {
                setText(`InventoryArmor${i+1}CurrentDurability`, armorsDurability[i])
            }
        }, 100)
    }
    if (localStorage.getItem("shieldsDurability") != undefined && localStorage.getItem("shieldsDurability") != "null") {
        setTimeout(() => {
            let shieldsDurability = localStorage.getItem("shieldsDurability").split("-")
            for (let i = 0; i < shieldsDurability.length; i++) {
                setText(`InventoryShield${i+1}CurrentDurability`, shieldsDurability[i])
            }
        }, 100)
    }

    let items = localStorage.getItem("selectedItems").split("-")
    if (items[0] != 0) {
        setTimeout(() => {
            changeSelectedItem(items[0], "weapon")
        }, 100)
    } 
    if (items[1] != 0) {
        setTimeout(() => {
            changeSelectedItem(items[1], "armor")
        }, 100)
    } 
    if (items[2] != 0) {
        setTimeout(() => {
            changeSelectedItem(items[2], "shield")
        }, 100)
    } 
    





    //Új játék
} else {
    difficulty = localStorage.getItem('difficulty')

    setPlayerAttributes(localStorage.getItem('startAttack'),localStorage.getItem('startDefense'),localStorage.getItem('startHp'),localStorage.getItem('startMagic'),localStorage.getItem('playerName'));
    
    setText("SettingsLabelDifficulty", difficulty)
    
    addClass("SettingsOptionYes", "tdSelected", 1)
    
    switch (difficulty) {
    case "easy":
        setText("InventoryCoins", "8")
        addClass("SettingsOptionEasy", "tdSelected", 1)
    
        //Food
        setText("InventoryItem1", "Food")
        addClass("InventoryItem1", "itemUsable")
        setText("InventoryItem1Amount", "Amount: 4")
        setText("InventoryItem1Use", "Use")
        setText("InventoryItem1Sell", "Sell")
        addClass("InventoryItem1Use", "tdSelectable", 1)
        addClass("InventoryItem1Sell", "tdSelectable", 1)
        break;
    
    
    case "medium":
        setText("InventoryCoins", "6")
        addClass("SettingsOptionMedium", "tdSelected", 1)
    
        //Food
        setText("InventoryItem1", "Food")
        addClass("InventoryItem1", "itemUsable")
        setText("InventoryItem1Amount", "Amount: 2")
        setText("InventoryItem1Use", "Use")
        setText("InventoryItem1Sell", "Sell")
        addClass("InventoryItem1Use", "tdSelectable", 1)
        addClass("InventoryItem1Sell", "tdSelectable", 1)
        break;
    
    
    case "hard":
        setText("InventoryCoins", "3")
        addClass("SettingsOptionHard", "tdSelected", 1)
        break;
    
    default:
        break;
    }
    
}