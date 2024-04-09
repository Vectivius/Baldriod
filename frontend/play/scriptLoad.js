//Bejelentkezés ellenőrzés
if (localStorage.getItem("email") != undefined) {

    setTimeout(() => {

        Hidden("ButtonAccount", false)


        /*
        Hidden("ButtonReg", true)
        Hidden("ButtonLogin", true)
        Hidden("ButtonAdmin", true)
        Hidden("ButtonAccount", false)
        Hidden("ButtonLoadGame", false)
        Hidden("TextareaSaveName", false)

        SetValue("UserEmail", localStorage.getItem("email"))*/
        
        
        //Admin
        if (localStorage.getItem("userLevel") == 2) {
            //Hidden("ButtonAdmin", false)
        }
    }, 100)
} 





//-/- Adatok az új játék oldalról -\-\\
//Betöltés
if (localStorage.getItem("playerAttack") != undefined) {

    SetText("PlayerName", localStorage.getItem("playerName"))

    SetText("PlayerStartAttack", localStorage.getItem("playerAttack").split("-")[0])
    SetText("PlayerCurrentAttack", localStorage.getItem("playerAttack").split("-")[1])

    SetText("PlayerStartDefense", localStorage.getItem("playerDefense").split("-")[1])
    SetText("PlayerCurrentDefense", localStorage.getItem("playerDefense").split("-")[1])

    SetText("PlayerStartHp", localStorage.getItem("playerHp").split("-")[1])
    SetText("PlayerCurrentHp", localStorage.getItem("playerHp").split("-")[1])

    SetText("PlayerStartMagic", localStorage.getItem("playerMagic").split("-")[1])
    SetText("PlayerCurrentMagic", localStorage.getItem("playerMagic").split("-")[1])

    //Fegyverek betöltése
    if (localStorage.getItem("weapons") != undefined && localStorage.getItem("weapons") != "null") {
        setTimeout(() => {
            let weapons = localStorage.getItem("weapons").split("-")
            for (let i = 0; i < weapons.length; i++) {
                ReloadWeaponList(weapons[i])
            }
        }, 100)
    }

    //Páncélok betöltése
    if (localStorage.getItem("armors") != undefined && localStorage.getItem("armors") != "null") {
        setTimeout(() => {
            let armors = localStorage.getItem("armors").split("-")
            for (let i = 0; i < armors.length; i++) {
                ReloadArmorList(armors[i])
            }
        }, 100)
    }


    //Pajzsok betöltése
    if (localStorage.getItem("shields") != undefined && localStorage.getItem("shields") != "null") {
        setTimeout(() => {
            let shields = localStorage.getItem("shields").split("-")
            for (let i = 0; i < shields.length; i++) {
                ReloadShieldList(shields[i])
            }
        }, 100)
    }

    if (localStorage.getItem("weaponsDurability") != undefined && localStorage.getItem("weaponsDurability") != "null") {
        setTimeout(() => {
            let weaponsDurability = localStorage.getItem("weaponsDurability").split("-")
            for (let i = 0; i < weaponsDurability.length; i++) {
                SetText(`InventoryWeapon${i+1}CurrentDurability`, weaponsDurability[i])
            }
        }, 100)
    }
    if (localStorage.getItem("armorsDurability") != undefined && localStorage.getItem("armorsDurability") != "null") {
        setTimeout(() => {
            let armorsDurability = localStorage.getItem("armorsDurability").split("-")
            for (let i = 0; i < armorsDurability.length; i++) {
                SetText(`InventoryArmor${i+1}CurrentDurability`, armorsDurability[i])
            }
        }, 100)
    }
    if (localStorage.getItem("shieldsDurability") != undefined && localStorage.getItem("shieldsDurability") != "null") {
        setTimeout(() => {
            let shieldsDurability = localStorage.getItem("shieldsDurability").split("-")
            for (let i = 0; i < shieldsDurability.length; i++) {
                SetText(`InventoryShield${i+1}CurrentDurability`, shieldsDurability[i])
            }
        }, 100)
    }

    let items = localStorage.getItem("selectedItems").split("-")
    if (items[0] != 0) {
        setTimeout(() => {
            ChangeSelectedItem(items[0], "weapon")
        }, 100)
    } 
    if (items[1] != 0) {
        setTimeout(() => {
            ChangeSelectedItem(items[1], "armor")
        }, 100)
    } 
    if (items[2] != 0) {
        setTimeout(() => {
            ChangeSelectedItem(items[2], "shield")
        }, 100)
    } 
    





    //Új játék
} else {
    let difficulty = localStorage.getItem('difficulty')

    SetPlayerAttributes(localStorage.getItem('startAttack'),localStorage.getItem('startDefense'),localStorage.getItem('startHp'),localStorage.getItem('startMagic'),localStorage.getItem('playerName'));
    
    SetText("SettingsLabelDifficulty", difficulty)
    
    AddClass("SettingsOptionYes", "tdSelected", 1)
    
    switch (difficulty) {
    case "easy":
        SetText("InventoryCoins", "8")
        AddClass("SettingsOptionEasy", "tdSelected", 1)
    
        //Food
        SetText("InventoryItem1", "Food")
        AddClass("InventoryItem1", "itemUsable")
        SetText("InventoryItem1Amount", "Amount: 4")
        SetText("InventoryItem1Use", "Use")
        SetText("InventoryItem1Sell", "Sell")
        AddClass("InventoryItem1Use", "tdSelectable", 1)
        AddClass("InventoryItem1Sell", "tdSelectable", 1)
        break;
    
    
    case "medium":
        SetText("InventoryCoins", "6")
        AddClass("SettingsOptionMedium", "tdSelected", 1)
    
        //Food
        SetText("InventoryItem1", "Food")
        AddClass("InventoryItem1", "itemUsable")
        SetText("InventoryItem1Amount", "Amount: 2")
        SetText("InventoryItem1Use", "Use")
        SetText("InventoryItem1Sell", "Sell")
        AddClass("InventoryItem1Use", "tdSelectable", 1)
        AddClass("InventoryItem1Sell", "tdSelectable", 1)
        break;
    
    
    case "hard":
        SetText("InventoryCoins", "3")
        AddClass("SettingsOptionHard", "tdSelected", 1)
        break;
    
    default:
        break;
    }
    
}
