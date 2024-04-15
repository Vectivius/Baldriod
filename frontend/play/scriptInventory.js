
//-/- Tárgy törlése -\-\\
function removeItem1(id, type) {
    if (getElement(`Inventory${capitalizeFirstLetter(type)}${id}Sell`).classList.contains("tdSelectable") && fighting == false) {

        unselectId = `Inventory${capitalizeFirstLetter(type)}${id}Sell`
        addClass(unselectId, "tdSelected", 1)

        if (getText("ButtonTown") == "Leave town") {
            let item = getGeneralItem(getText(`Inventory${capitalizeFirstLetter(type)}${id}`), type)

            if (getText(`Inventory${capitalizeFirstLetter(type)}${id}`).includes("scroll")) {
                item = getScroll(getText(`Inventory${capitalizeFirstLetter(type)}${id}`))
            }
            
            itemName = item.name
            if (sellItem == false) {
                sendMessage(`Do you want to delete this ${type}?`,2, ["", `RemoveItem2`, `CloseItemList`])
            } else if (sellItem == true) {
                let sellValue = 0
                if (type == "item") {
                    sendMessage(`Do you want to sell this ${type} for ${item.cost} coins?`,2, ["", `RemoveItem2`, `deselectItems`])
                } else {
                    sellValue = getSellValue(item.name, type, getText(`Inventory${capitalizeFirstLetter(type)}${id}CurrentDurability`))
                    sendMessage(`Do you want to sell this ${type} for ${sellValue} coins?`,2, ["", `RemoveItem2`, `CloseItemList`])    
                }
            }
            itemType = type
            generalId = id
            //Tábla nyitvatartása üzenőablak közben
            if (type != "item") {
                getElement(`Inventory${capitalizeFirstLetter(type)}List`).id = `Inventory${capitalizeFirstLetter(type)}ListOpen`
                getElement(`Button${capitalizeFirstLetter(type)}List`).id = `Button${capitalizeFirstLetter(type)}ListOpen`    
            }
        } else {
            
            if (type == "item") {
                sendMessage("Enter the town to sell an item!", 1, ["deselectItems", "", ""])
                unselectId = `InventoryItem${id}Sell`
                addClass(unselectId, "tdSelected", 1)
            }
            if (type != "item") {
                sendMessage("Enter the town to sell an item!", 1, ["CloseItemList", "", ""])
                getElement(`Inventory${capitalizeFirstLetter(type)}List`).id = `Inventory${capitalizeFirstLetter(type)}ListOpen`
                getElement(`Button${capitalizeFirstLetter(type)}List`).id = `Button${capitalizeFirstLetter(type)}ListOpen`    
            }
        }

    }
}
function removeItem2() {
    if (sellItem == true) {
        let item = getGeneralItem(itemName, itemType)
        if (itemName.includes("scroll")) {
            item = getScroll(itemName)
        }
        setCoins(item.cost)
    }
    let attack = Number(getText("PlayerStartAttack"));
    let defense = Number(getText("PlayerStartDefense"));
    let minusAttack = Number(getText("PlayerMinusAttack"));
    let minusDefense = Number(getText("PlayerMinusDefense"));

    if (itemType != "item") {
        setText(`InventorySelected${capitalizeFirstLetter(itemType)}Slot`, "")
        setText(`InventorySelected${capitalizeFirstLetter(itemType)}Durability`, "")    
    }

    switch (itemType) {
        case "weapon":
            setText(`InventoryWeapon${generalId}`,"")
            setText(`InventoryWeapon${generalId}Attack`,"");
            setText(`InventoryWeapon${generalId}Defense`,"");
            setText(`InventoryWeapon${generalId}Damage`,"");
            setText(`InventoryWeapon${generalId}Durability`,"");
            setText(`InventoryWeapon${generalId}CurrentDurability`,"");
            setText(`InventoryWeapon${generalId}Sell`,"");
            reloadWeaponList()
            break;

        case "armor":
            setText(`InventoryArmor${generalId}`,"")
            setText(`InventoryArmor${generalId}Defense`,"");
            setText(`InventoryArmor${generalId}DamageReduction`,"");
            setText(`InventoryArmor${generalId}Durability`,"");
            setText(`InventoryArmor${generalId}CurrentDurability`,"");
            setText(`InventoryArmor${generalId}Sell`,"");
            reloadArmorList()
            break;

        case "shield":
            setText(`InventoryShield${generalId}`,"")
            setText(`InventoryShield${generalId}Defense`,"");
            setText(`InventoryShield${generalId}Durability`,"");
            setText(`InventoryShield${generalId}CurrentDurability`,"");
            setText(`InventoryShield${generalId}TwoHandedPenalty`,"");
            setText(`InventoryShield${generalId}Sell`,"");
            reloadShieldList()
            break;

        case "item":
            let amount = getText(`InventoryItem${generalId}Amount`).split(":")[1]
            if (amount > 1) { //Egy törlése több tárgyból
                setText(`InventoryItem${generalId}Amount`, `Amount: ${Number(amount)-1}`);
                //ReloadItemList()
            } else { //Utolsó törlése
                addClass(`InventoryItem${generalId}`,"itemUsable", false)
                setText(`InventoryItem${generalId}`,"")
                setText(`InventoryItem${generalId}Amount`,"");
                setText(`InventoryItem${generalId}Use`,"");
                setText(`InventoryItem${generalId}Sell`,"");    
                reloadItemList()
                backpack()
            }
            
            break;
    
        default:
            break;
    }



    if (itemType != "item") {
        setText(`InventorySelected${capitalizeFirstLetter(itemType)}`,"none");
        setPlayerAttackDefense(attack-minusAttack,defense-minusDefense)    
    }
}




//-/- Tábla becsukása üzenet után -\-\\
function closeItemList() {
    deselectItems()
    //UnselectElement()
    if (getElement("InventoryWeaponListOpen") != null) {
        getElement("ButtonWeaponListOpen").id = "ButtonWeaponList"
        getElement("InventoryWeaponListOpen").id = "InventoryWeaponList"
    }
    if (getElement("InventoryArmorListOpen") != null) {
        getElement("ButtonArmorListOpen").id = "ButtonArmorList"
        getElement("InventoryArmorListOpen").id = "InventoryArmorList"
    }
    if (getElement("InventoryShieldListOpen") != null) {
        getElement("ButtonShieldListOpen").id = "ButtonShieldList"
        getElement("InventoryShieldListOpen").id = "InventoryShieldList"
    }
}




















//-/- Fegyverek tábla betöltése -\-\\
function reloadWeaponList(weaponName = "") {
    let list = [];
    let listAttack = [];
    let listDefense = [];
    let listDamage = [];
    let listDurability = [];
    let listCurrentDurability = [];
    //Tárgyak lekérése
    for (let i = 0; i < weaponListLength; i++) {
        list[i]=getText(`InventoryWeapon${i+1}`)
        listAttack[i]=getText(`InventoryWeapon${i+1}Attack`)
        listDefense[i]=getText(`InventoryWeapon${i+1}Defense`)
        listDamage[i]=getText(`InventoryWeapon${i+1}Damage`)
        listDurability[i]=getText(`InventoryWeapon${i+1}Durability`)
        listCurrentDurability[i]=getText(`InventoryWeapon${i+1}CurrentDurability`)

        if (listAttack[i].includes(":")) {
            listAttack[i] = listAttack[i].split(":")[1]
            listDefense[i] = listDefense[i].split(":")[1]
            listDamage[i] = listDamage[i].split(":")[1]
            listDurability[i] = listDurability[i].split(":")[1]
            listDurability[i] = listDurability[i].replace("/", "")
        }
    }
    //Üres helyek kiszedése
    let list2 = list.filter((str) => str !== '');
    let listAttack2 = listAttack.filter((str) => str !== '');
    let listDefense2 = listDefense.filter((str) => str !== '');
    let listDamage2 = listDamage.filter((str) => str !== '');
    let listDurability2 = listDurability.filter((str) => str !== '');
    let listCurrentDurability2 = listCurrentDurability.filter((str) => str !== '');

    //Új fegyver hozzáadása
    if (weaponName != "") {
        let weapon = getWeapon(weaponName)
        list2.push(weapon.name)
        listAttack2.push(weapon.attack)
        listDefense2.push(weapon.defense)
        listDamage2.push(weapon.damage)
        listDurability2.push(weapon.durability)
        listCurrentDurability2.push(weapon.durability)
    }

    //Üres helyek a listák végére (undefined helyett)
    for (let i = 0; i < weaponListLength; i++) {
        list2.push("")      
        listAttack2.push("")      
        listDefense2.push("")      
        listDamage2.push("")      
        listDurability2.push("")      
        listCurrentDurability2.push("")      
    }

    //Új lista betöltése
    for (let i = 0; i < weaponListLength; i++) {
        setText(`InventoryWeapon${i+1}`, String(list2[i]))
        setText(`InventoryWeapon${i+1}Attack`, "Attack: " + String(listAttack2[i]))
        setText(`InventoryWeapon${i+1}Defense`, "Defense: " + String(listDefense2[i])) 
        setText(`InventoryWeapon${i+1}Damage`, "Damage: " + String(listDamage2[i]))
        setText(`InventoryWeapon${i+1}Durability`, "Durability: " + String(listDurability2[i]) + "/")
        setText(`InventoryWeapon${i+1}CurrentDurability`, String(listCurrentDurability2[i]))

        getElement(`InventoryWeapon${i+1}`).classList.remove("tdSelected")
        getElement(`InventoryWeapon${i+1}Sell`).classList.add("tdSelectable")
        setText(`InventoryWeapon${i+1}Sell`, "Sell")
        getElement(`InventoryWeapon${i+1}`).classList.add("tdSelectable")
}


for (let i = 0; i < 5; i++) {
    if (getText(`InventoryWeapon${i+1}`)=="") {
        getElement(`InventoryWeapon${i+1}`).classList.remove("tdSelectable");
        setText(`InventoryWeapon${i+1}Sell`, "")
        getElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdSelectable");

        setText(`InventoryWeapon${i+1}Attack`, "")
        setText(`InventoryWeapon${i+1}Defense`, "")
        setText(`InventoryWeapon${i+1}Damage`, "")
        setText(`InventoryWeapon${i+1}Durability`, "")
        setText(`InventoryWeapon${i+1}Durability`, "")
        setText(`InventoryWeapon${i+1}CurrentDurability`, "")
    }
    }
}


































//-/- Páncél tábla betöltése -\-\\
function reloadArmorList(armorName = "") {
    let list = [];
    let listDefense = [];
    let listDamageReduction = [];
    let listDurability = [];
    let listCurrentDurability = [];
    //Tárgyak lekérése
    for (let i = 0; i < armorListLength; i++) {
        list[i]=getText(`InventoryArmor${i+1}`)
        listDefense[i]=getText(`InventoryArmor${i+1}Defense`)
        listDamageReduction[i]=getText(`InventoryArmor${i+1}DamageReduction`)
        listDurability[i]=getText(`InventoryArmor${i+1}Durability`)
        listCurrentDurability[i]=getText(`InventoryArmor${i+1}CurrentDurability`)

        if (listDefense[i].includes(":")) {
            listDefense[i] = listDefense[i].split(":")[1]
            listDamageReduction[i] = listDamageReduction[i].split(":")[1]
            listDurability[i] = listDurability[i].split(":")[1]
            listDurability[i] = listDurability[i].replace("/", "")
        }
    }
    //Üres helyek kiszedése
    let list2 = list.filter((str) => str !== '');
    let listDefense2 = listDefense.filter((str) => str !== '');
    let listDamageReduction2 = listDamageReduction.filter((str) => str !== '');
    let listDurability2 = listDurability.filter((str) => str !== '');
    let listCurrentDurability2 = listCurrentDurability.filter((str) => str !== '');

    //Új fegyver hozzáadása
    if (armorName != "") {
        let armor = getArmor(armorName)
        list2.push(armor.name)
        listDefense2.push(armor.defense)
        listDamageReduction2.push(armor.damageReduction)
        listDurability2.push(armor.durability)
        listCurrentDurability2.push(armor.durability)
    }

    //Üres helyek a listák végére (undefined helyett)
    for (let i = 0; i < armorListLength; i++) {
        list2.push("")      
        listDefense2.push("")      
        listDamageReduction2.push("")      
        listDurability2.push("")      
        listCurrentDurability2.push("")      
    }

    //Új lista betöltése
    for (let i = 0; i < armorListLength; i++) {
        setText(`InventoryArmor${i+1}`, String(list2[i]))
        setText(`InventoryArmor${i+1}Defense`, "Defense: " + String(listDefense2[i])) 
        setText(`InventoryArmor${i+1}DamageReduction`, "Damage reduction: " + String(listDamageReduction2[i]))
        setText(`InventoryArmor${i+1}Durability`, "Durability: " + String(listDurability2[i]) + "/")
        setText(`InventoryArmor${i+1}CurrentDurability`, String(listCurrentDurability2[i]))

        getElement(`InventoryArmor${i+1}`).classList.remove("tdSelected")
        getElement(`InventoryArmor${i+1}Sell`).classList.add("tdSelectable")
        setText(`InventoryArmor${i+1}Sell`, "Sell")
        getElement(`InventoryArmor${i+1}`).classList.add("tdSelectable")
}

    for (let i = 0; i < 3; i++) {
        if (getText(`InventoryArmor${i+1}`)=="") {
            getElement(`InventoryArmor${i+1}`).classList.remove("tdSelectable");
            setText(`InventoryArmor${i+1}Sell`, "")
            getElement(`InventoryArmor${i+1}Sell`).classList.remove("tdSelectable");

            setText(`InventoryArmor${i+1}Defense`, "")
            setText(`InventoryArmor${i+1}DamageReduction`, "")
            setText(`InventoryArmor${i+1}Durability`, "")
            setText(`InventoryArmor${i+1}Durability`, "")
            setText(`InventoryArmor${i+1}CurrentDurability`, "")
        }
    }
}




















//-/- Pajzs tábla betöltése -\-\\
function reloadShieldList(shieldName = "") {
    let list = [];
    let listDefense = [];
    let listDurability = [];
    let listCurrentDurability = [];
    let listTwoHandedPenalty = [];
    //Tárgyak lekérése
    for (let i = 0; i < shieldListLength; i++) {
        list[i]=getText(`InventoryShield${i+1}`)
        listDefense[i]=getText(`InventoryShield${i+1}Defense`)
        listDurability[i]=getText(`InventoryShield${i+1}Durability`)
        listCurrentDurability[i]=getText(`InventoryShield${i+1}CurrentDurability`)
        listTwoHandedPenalty[i]=getText(`InventoryShield${i+1}TwoHandedPenalty`)

        if (listDefense[i].includes(":")) {
            listDefense[i] = listDefense[i].split(":")[1]
            listDurability[i] = listDurability[i].split(":")[1]
            listDurability[i] = listDurability[i].replace("/", "")
            listTwoHandedPenalty[i] = listTwoHandedPenalty[i].split(":")[1]
        }
    }
    //Üres helyek kiszedése
    let list2 = list.filter((str) => str !== '');
    let listDefense2 = listDefense.filter((str) => str !== '');
    let listDurability2 = listDurability.filter((str) => str !== '');
    let listCurrentDurability2 = listCurrentDurability.filter((str) => str !== '');
    let listTwoHandedPenalty2 = listTwoHandedPenalty.filter((str) => str !== '');

    //Új pajzs hozzáadása
    if (shieldName != "") {
        let shield = getShield(shieldName)
        list2.push(shield.name)
        listDefense2.push(shield.defense)
        listDurability2.push(shield.durability)
        listCurrentDurability2.push(shield.durability)
        listTwoHandedPenalty2.push(shield.twoHandedPenalty)
    }

    //Üres helyek a listák végére (undefined helyett)
    for (let i = 0; i < 3; i++) {
        list2.push("")      
        listDefense2.push("")      
        listDurability2.push("")      
        listCurrentDurability2.push("")      
        listTwoHandedPenalty2.push("")      
    }

    //Új lista betöltése
    for (let i = 0; i < shieldListLength; i++) {
        setText(`InventoryShield${i+1}`, String(list2[i]))
        setText(`InventoryShield${i+1}Defense`, "Defense: " + String(listDefense2[i])) 
        setText(`InventoryShield${i+1}Durability`, "Durability: " + String(listDurability2[i]) + "/")
        setText(`InventoryShield${i+1}CurrentDurability`, String(listCurrentDurability2[i]))
        setText(`InventoryShield${i+1}TwoHandedPenalty`, "Two handed penalty: " + String(listTwoHandedPenalty2[i]))

        getElement(`InventoryShield${i+1}`).classList.remove("tdSelected")
        getElement(`InventoryShield${i+1}Sell`).classList.add("tdSelectable")
        setText(`InventoryShield${i+1}Sell`, "Sell")
        getElement(`InventoryShield${i+1}`).classList.add("tdSelectable")
}


for (let i = 0; i < shieldListLength; i++) {
    if (getText(`InventoryShield${i+1}`)=="") {
        getElement(`InventoryShield${i+1}`).classList.remove("tdSelectable");
        setText(`InventoryShield${i+1}Sell`, "")
        getElement(`InventoryShield${i+1}Sell`).classList.remove("tdSelectable");

        setText(`InventoryShield${i+1}Defense`, "")
        setText(`InventoryShield${i+1}Durability`, "")
        setText(`InventoryShield${i+1}CurrentDurability`, "")
        setText(`InventoryShield${i+1}TwoHandedPenalty`, "")
    }
    }
}























//-/- Eszköztár használható vagy nem -\-\\
function enableInventory(type) {
    if (type == 0) {
        //Disable
        for (let i = 0; i < weaponListLength; i++) {
            getElement(`InventoryWeapon${i+1}`).classList.remove("tdSelectable")
            getElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < armorListLength; i++) {
            getElement(`InventoryArmor${i+1}`).classList.remove("tdSelectable")
            getElement(`InventoryArmor${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < shieldListLength; i++) {
            getElement(`InventoryShield${i+1}`).classList.remove("tdSelectable")
            getElement(`InventoryShield${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < itemListLength; i++) {
            getElement(`InventoryItem${i+1}Use`).classList.remove("tdSelectable")
            getElement(`InventoryItem${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < spellList.length; i++) {
            getElement(`InventorySpell${i+1}`).classList.remove("tdSelectable")
        }
        //Enable
    } else if (type == 1) {
        for (let i = 0; i < weaponListLength; i++) {
            if (getText(`InventoryWeapon${i+1}`) != "") {
                getElement(`InventoryWeapon${i+1}`).classList.add("tdSelectable")
            }
            if (getText(`InventoryWeapon${i+1}Sell`) != "") {
                getElement(`InventoryWeapon${i+1}Sell`).classList.add("tdSelectable")
            }
        }
        for (let i = 0; i < armorListLength; i++) {
            if (getText(`InventoryArmor${i+1}`) != "") {
                getElement(`InventoryArmor${i+1}`).classList.add("tdSelectable")
            }
            if (getText(`InventoryArmor${i+1}Sell`) != "") {
                getElement(`InventoryArmor${i+1}Sell`).classList.add("tdSelectable")
            }        }
        for (let i = 0; i < shieldListLength; i++) {
            if (getText(`InventoryShield${i+1}`) != "") {
                getElement(`InventoryShield${i+1}`).classList.add("tdSelectable")
            }
            if (getText(`InventoryShield${i+1}Sell`) != "") {
                getElement(`InventoryShield${i+1}Sell`).classList.add("tdSelectable")
            }        }
        for (let i = 0; i < itemListLength; i++) {
            if (getText(`InventoryItem${i+1}Use`) != "") {
                getElement(`InventoryItem${i+1}Use`).classList.add("tdSelectable")
            }
            if (getText(`InventoryItem${i+1}Sell`) != "") {
                getElement(`InventoryItem${i+1}Sell`).classList.add("tdSelectable")
            }        }
    
    //Enable expect sell
    } else if (type == 2) {
        for (let i = 0; i < weaponListLength; i++) {
            if (getText(`InventoryWeapon${i+1}`) != "") {
                addClass(`InventoryWeapon${i+1}`, "tdSelectable", 1)
            }
            if (getText(`InventoryWeapon${i+1}Sell`) != "") {
                addClass(`InventoryWeapon${i+1}Sell`, "tdSelectable", 0)
            }
        }
        for (let i = 0; i < armorListLength; i++) {
            if (getText(`InventoryArmor${i+1}`) != "") {
                addClass(`InventoryArmor${i+1}`, "tdSelectable", 1)
            }
            if (getText(`InventoryArmor${i+1}Sell`) != "") {
                addClass(`InventoryArmor${i+1}Sell`, "tdSelectable", 0)
            }
        }
        for (let i = 0; i < shieldListLength; i++) {
            if (getText(`InventoryShield${i+1}`) != "") {
                addClass(`InventoryShield${i+1}`, "tdSelectable", 1)
            }
            if (getText(`InventoryShield${i+1}Sell`) != "") {
                addClass(`InventoryShield${i+1}Sell`, "tdSelectable", 0)
            }
        }
        for (let i = 0; i < itemListLength; i++) {

            if (getText(`InventoryItem${i+1}Sell`) != "") {
                addClass(`InventoryItem${i+1}Sell`, "tdSelectable", 0)
            }
       }
    }
}

























//-/- Tárgy kiválasztása -\-\\
function changeSelectedItem(id, type) {
    if (getElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelectable") && !getElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelected")) {

        //Set name and slot id
        let itemName = getText(`Inventory${capitalizeFirstLetter(type)}${id}`)
        setText(`InventorySelected${capitalizeFirstLetter(type)}`, itemName)
        setText(`InventorySelected${capitalizeFirstLetter(type)}Slot`, id)
        let item = getGeneralItem(itemName, type)
        setText(`InventorySelected${capitalizeFirstLetter(type)}Durability`, " (" + item.durability + "/" + getText(`Inventory${capitalizeFirstLetter(type)}${id}CurrentDurability`) + ")")


        //Call set attributes function
        setPlayerAttackDefense()

        //Item remain selected
        switch (type) {
            case "weapon":
                for (let i = 0; i < weaponListLength; i++) {
                    if (getText(`InventoryWeapon${i+1}`) != "") {
                        getElement(`InventoryWeapon${i+1}`).classList.remove("tdSelected")
                        getElement(`InventoryWeapon${i+1}`).classList.add("tdSelectable")    
                    }
                }
                getElement(`InventoryWeapon${id}`).classList.add("tdSelected")
                break;

            case "armor":
                for (let i = 0; i < armorListLength; i++) {
                    getElement(`InventoryArmor${i+1}`).classList.remove("tdSelected")
                    getElement(`InventoryArmor${i+1}`).classList.add("tdSelectable")
                }
                getElement(`InventoryArmor${id}`).classList.add("tdSelected")
                break;

            case "shield":
                for (let i = 0; i < shieldListLength; i++) {
                    getElement(`InventoryShield${i+1}`).classList.remove("tdSelected")
                    getElement(`InventoryShield${i+1}`).classList.add("tdSelectable")
                }
                getElement(`InventoryShield${id}`).classList.add("tdSelected")
                break;
        
            default:
                break;
        }

        //Disable while fighting after one action
        if (fighting == true) {
            enemyAction()
        }

    } else if (getElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelected") && playerDead == false) {

        //Kiválasztás vissza
        if (getElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelectable")) {
            getElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.remove("tdSelected")
            getElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.add("tdSelectable")
    
            setText(`InventorySelected${capitalizeFirstLetter(type)}`, "none")
            setText(`InventorySelected${capitalizeFirstLetter(type)}Slot`, "")
            setText(`InventorySelected${capitalizeFirstLetter(type)}Durability`, "")
            setPlayerAttackDefense()
        }

        if (fighting == true) {
            enemyAction()
        }
    }
}
    



//-/- Támadás és védelem módosítása -\-\\
function setPlayerAttackDefense() {
    let startAttack = Number(getText("PlayerStartAttack"));
    let startDefense = Number(getText("PlayerStartDefense"));

    let minusAttack = Number(getText("PlayerMinusAttack"));
    let minusDefense = Number(getText("PlayerMinusDefense"));
    let weapon = null
    let armor = null
    let shield = null
    let twoHandedPenalty = 0

    if (getText(`InventorySelectedWeapon`) != "none") {
        weapon = getWeapon(getText(`InventorySelectedWeapon`))
    } else {
        weapon = {attack: 0, defense: 0}
    }

    if (getText(`InventorySelectedArmor`) != "none") {
        armor = getArmor(getText(`InventorySelectedArmor`))
    } else {
        armor = {defense: 0}
    }

    if (getText(`InventorySelectedShield`) != "none") {
        shield = getShield(getText(`InventorySelectedShield`))
        if (weapon.twoHanded == 1) {
            twoHandedPenalty = shield.twoHandedPenalty
        }
    } else {
        shield = {defense: 0}
    }
    let attack = startAttack+weapon.attack+attackModifier-twoHandedPenalty
    let defense = startDefense+weapon.defense+armor.defense+shield.defense+defenseModifier

    setText("PlayerCurrentAttack", attack);
    setText("PlayerCurrentDefense", defense);
}



//-/- Varázslat kiválasztása -\-\\
function changeChoosenSpell(id) {
    if (hasClass(`InventorySpell${id}`, "tdSelectable")) {
        setText("InventoryChoosenSpell", getText(`InventorySpell${id}`))

        for (let i = 0; i < spellList.length; i++) {
            //addClass(`InventorySpell${i+1}`, "tdSelected", 0)
    
            if (getText(`InventorySpell${i+1}`) != "") {
                addClass(`InventorySpell${i+1}`, "tdSelected", 0)
            }
        }
        
        addClass(`InventorySpell${id}`, "tdSelected", 1)
    }
}

























//-/- Eladási érték kiszámítása -\-\\
function getSellValue(itemName, itemType, currentDurability) {
    let item = null
    switch (itemType) {
        case "weapon":
            item = getWeapon(itemName)
            break;
        case "armor":
            item = getArmor(itemName)
            break;
        case "shield":
            item = getShield(itemName)
            break;
        case "item":
            item = GetOtherItem(itemName)
            break;
        default:
            break;
    }

            if (currentDurability * 10 < item.durability ) {
                return Math.round(item.cost / 10)
            }
            else if (currentDurability * 7 < item.durability ) {
                return Math.round(item.cost / 7)
            }
            else if (currentDurability * 4 < item.durability ) {
                return Math.round(item.cost / 4)
            }
            else if (currentDurability * 3 < item.durability ) {
                return Math.round(item.cost / 3)
            }
            else if (currentDurability * 2 < item.durability ) {
                return Math.round(item.cost / 2)
            }
            else if (currentDurability * 1.7 < item.durability ) {
                return Math.round(item.cost / 1.7)
            }
            else if (currentDurability * 1.5 < item.durability ) {
                return Math.round(item.cost / 1.5)
            }
            else if (currentDurability * 1.3 < item.durability ) {
                return Math.round(item.cost / 1.3)
            }
            else if (currentDurability * 1.1 < item.durability) {
                return Math.round(item.cost / 1.1)
            }
             else return item.cost
}

















//-/- Lenyíló listák nyitása vagy csukása -\-\\

/* Fegyverek */
const AreaWeaponList = document.getElementById("AreaWeaponList")
AreaWeaponList.addEventListener("mouseleave", function() {

    if (document.getElementById("InventoryWeaponList") != null) {
        hidden("InventoryWeaponList", true)
    }
    if (document.getElementById("ButtonWeaponList") != null) {
    document.getElementById("ButtonWeaponList").classList.remove("hover")
    }
})

AreaWeaponList.addEventListener("mouseover", function () {
    hidden("InventoryWeaponList", false)
    hidden("InventoryArmorList", true)
    hidden("InventoryShieldList", true)
    document.getElementById("ButtonWeaponList").classList.add("hover")
})

/* Páncélok */
const AreaArmorList = document.getElementById("AreaArmorList")
AreaArmorList.addEventListener("mouseleave", function() {
    if (document.getElementById("InventoryArmorList") != null) {
        hidden("InventoryArmorList", true)
    }
    if (document.getElementById("ButtonArmorList") != null) {
    document.getElementById("ButtonArmorList").classList.remove("hover")
    }
})

AreaArmorList.addEventListener("mouseover", function () {
        hidden("InventoryArmorList", false)
        hidden("InventoryWeaponList", true)
        hidden("InventoryShieldList", true)
        document.getElementById("ButtonArmorList").classList.add("hover")
})

/* Pajzsok */
const AreaShieldList = document.getElementById("AreaShieldList")
AreaShieldList.addEventListener("mouseleave", function() {
    if (document.getElementById("InventoryShieldList") != null) {
        hidden("InventoryShieldList", true)
    }
    if (document.getElementById("ButtonShieldList") != null) {
    document.getElementById("ButtonShieldList").classList.remove("hover")
    }
})

AreaShieldList.addEventListener("mouseover", function () {
        hidden("InventoryShieldList", false)
        hidden("InventoryArmorList", true)
        hidden("InventoryWeaponList", true)
        document.getElementById("ButtonShieldList").classList.add("hover")
})



/* Varázslatok */
const AreaSpellList = document.getElementById("AreaSpellList")
AreaSpellList.addEventListener("mouseleave", function() {
    hidden("InventorySpellList", true)
    document.getElementById("ButtonSpellList").classList.remove("hover")
})
AreaSpellList.addEventListener("mouseover", function () {
    hidden("InventorySpellList", false)
    document.getElementById("ButtonSpellList").classList.add("hover")
})






























//-/- Egyéb tárgyak tábla betöltése -\-\\
function reloadItemList(itemName = null, type = null, usable = false) {
    let item = null
    if (itemName != null) {
        if (type == "scroll") {
            item = getScroll(`${itemName}`)
        }
        if (type == "item") {
            item = getItem(`${itemName}`)
        }
    }
    
    let list = [];
    let listAmount = [];
    let listUsable = [];
    //Get items
    for (let i = 0; i < itemListLength; i++) {
        list[i]=getText(`InventoryItem${i+1}`)
        listAmount[i]=getText(`InventoryItem${i+1}Amount`)

        if (hasClass(`InventoryItem${i+1}`, "itemUsable")) { //van itemUsable osztály
            listUsable[i] = true
        } else if (getText(`InventoryItem${i+1}`) != "") { //nincs osztály
            listUsable[i] = false
        } else { //nincs tárgy
            listUsable[i] = ""
        }

        if (listAmount[i].includes(":")) {
            listAmount[i]=Number(getText(`InventoryItem${i+1}Amount`).split(":")[1])
        }
    }


    //Üresek törlése
    let list2 = list.filter((str) => str !== '')
    let listAmount2 = listAmount.filter((str) => str !== '')
    let listUsable2 = listUsable.filter((str) => str !== '')

    


        
    //Van e már azonos tárgy
    if (item != null) {
        if (list2.includes(`${item.name}`)) {
            let a = list2.indexOf(`${item.name}`);
            
            if (listAmount2[a]<item.stackSize) {
                listAmount2[a] += 1
            } 
      } else { //Új tárgy hozzáadása
            list2.push(`${item.name}`)
            listAmount2.push(1)

            //Egyéb tárgy
            if (Object.hasOwn(item, "usable")) {
                if (item.usable == true) {
                    listUsable2.push(true)
                } else {
                    listUsable2.push(false)
                }    
            } else listUsable2.push(true) //Tekercs

       }
    }

    

            //Üres helyek a listák végére (undefined helyett)
            for (let i = 0; i < itemListLength; i++) {
                list2.push("")
                listAmount2.push("")
            }
            

     

    //Új elemek beírása
    for (let i = 0; i < itemListLength; i++) {
        
        setText(`InventoryItem${i+1}`, String(list2[i]))
        setText(`InventoryItem${i+1}Amount`, "Amount: " + Number(listAmount2[i]))

        if (listUsable2[i] == true) {
            setText(`InventoryItem${i+1}Use`, "Use")
            addClass(`InventoryItem${i+1}Use`, "tdSelectable", 1)
            addClass(`InventoryItem${i+1}`, "itemUsable", 1)
        } else {
            setText(`InventoryItem${i+1}Use`, "")
            addClass(`InventoryItem${i+1}Use`, "tdSelectable", 0)
            addClass(`InventoryItem${i+1}`, "itemUsable", 0)
        }

        setText(`InventoryItem${i+1}Sell`, "Sell")
        getElement(`InventoryItem${i+1}Sell`).classList.add("tdSelectable")
}

//Nem üres lista elemek hossza
let list2Length = 0
for (let i = 0; i < list2.length; i++) {
    if (list2[i] != "") {
        list2Length++
    }
}

//Üres helyek törlése
for (let i = 0; i < itemListLength; i++) {
    if (getText(`InventoryItem${i+1}`) == "") {
        setText(`InventoryItem${i+1}Amount`, "")
        setText(`InventoryItem${i+1}Use`, "")
        getElement(`InventoryItem${i+1}Use`).classList.remove("tdSelectable")
        addClass(`InventoryItem${i+1}`, "itemUsable", 0)
        setText(`InventoryItem${i+1}Sell`, "")
        getElement(`InventoryItem${i+1}Sell`).classList.remove("tdSelectable")
    }

}


//Hátizsák
if (item != null) {
    if (item.name.includes("backpack")) {
        backpack()
    }
}
}






//-/- Eszköztár méret növelése hátizsákkal -\-\\
function backpack() {
    let smallId = findItemInInventory("Small backpack")
    let largeId = findItemInInventory("Large backpack")

    //Csak kisebb
    if (smallId != undefined && largeId == undefined) {
        hidden("InventoryWeapon4Row", false)
        hidden("InventoryWeapon5Row", true)
        hidden("InventoryArmor2Row", false)
        hidden("InventoryArmor3Row", true)
        hidden("InventoryShield2Row", false)
        hidden("InventoryShield3Row", true)
        hidden("InventoryItem4Row", false)
        weaponListLength = 4
        armorListLength = 2
        shieldListLength = 2
        itemListLength = 4
    }
    //Csak nagyobb
    if (largeId != undefined) {
        hidden("InventoryWeapon4Row", false)
        hidden("InventoryWeapon5Row", false)
        hidden("InventoryArmor2Row", false)
        hidden("InventoryArmor3Row", false)
        hidden("InventoryShield2Row", false)
        hidden("InventoryShield3Row", false)
        hidden("InventoryItem4Row", false)
        hidden("InventoryItem5Row", false)
        weaponListLength = 5
        armorListLength = 3
        shieldListLength = 3
        itemListLength = 5
    }
    //Egyik sem
    if (smallId == undefined && largeId == undefined) {
        
        hidden("InventoryWeapon4Row", true)
        hidden("InventoryWeapon5Row", true)
        hidden("InventoryArmor2Row", true)
        hidden("InventoryArmor3Row", true)
        hidden("InventoryShield2Row", true)
        hidden("InventoryShield3Row", true)
        hidden("InventoryItem4Row", true)
        hidden("InventoryItem5Row", true)
        weaponListLength = 3
        armorListLength = 1
        shieldListLength =1
        itemListLength = 3
    }
}












//-/- Tárgy használata -\-\\
function useItem(id) {
    if (getElement(`InventoryItem${id}Use`).classList.contains("tdSelectable")) {
        unselectId = `InventoryItem${id}Use`
        sellItem = false
        let item = null
        if (getText(`InventoryItem${id}`).includes("scroll")) {
            item = getScroll(getText(`InventoryItem${id}`))
        } else {
            item = getItem(getText(`InventoryItem${id}`))
        }
    
        //Varázslat megtanulása
        if (item.spellId != null && fighting == false) {
            let spell = getSpellById(item.spellId)
            let difficulty = getText("SettingsLabelDifficulty")
            let player = getPlayer()
        
                switch (difficulty) {
                    case "easy":
                        spellCost = spell.cost
                        break;
                    case "medium":
                        spellCost = (spell.cost * 2)-2
                        break;
                    case "hard":
                        spellCost = (spell.cost * 3)-2
                        break;
                    default:
                        break;
                }

                if (player.magic >= spellCost) {
                    itemName = spell.name
                    
                    //Delete item id
                    generalId = id
                    addClass(`InventoryItem${id}Use`, "tdSelected", 1)
                    sendMessage(`Do you want to learn this spell for ${spellCost} Magic?`,2, ["", "LearnSpell", "deselectItems"])
                } else {
                    addClass(`InventoryItem${id}Use`, "tdSelected", 1)
                    sendMessage(`You need ${spellCost} magic to learn this spell!`,1, ["deselectItems", "", ""])
                }
    
    
        //Varázslás tekerccsel
        } else if (item.spellId != null && fighting == true)  {
            generalId = id
            itemType = "item"
            itemName = item.name
            removeItem2()    
            playerActionSpell(item.name)
    
        //Étel
        } else if (item.name == "Food") {
            let id = findItemInInventory("Food")+1
            
            let hpCurrent = Number(getText("PlayerCurrentHp"))
            let hpStart = Number(getText("PlayerStartHp"))
            if (hpCurrent == hpStart) {
                addClass(`InventoryItem${id}Use`, "tdSelected", 1)
                sendMessage("You don't need to eat",1, ["deselectItems","",""])
            } else {
                itemType = "item"
                itemName = item.name
                generalId = id
                removeItem2()
                //RemoveFromPlayerItemList(id)
                let hpGained = Number(randomNumber(2,5))
                if (hpGained + hpCurrent > hpStart) {
                    hpGained = hpStart - hpCurrent
                }
                setText("PlayerCurrentHp", hpGained + hpCurrent)
                addClass(`InventoryItem${id}Use`, "tdSelected", 1)

                if (fighting == true) {
                    sendMessage(`You gained ${hpGained} health`,1, ["deselectItems","",""])
                } else {
                    sendMessage(`You gained ${hpGained} health`,1, ["deselectItems","",""])
                }
            }



        } else if (item.name == "Grenade" && fighting == true) {
            let minDamage = Number(item.damage.split("-")[0])
            let maxDamage = Number(item.damage.split("-")[1])
            let enemy = getCurrentEnemy()
            let currentDamage = randomNumber(minDamage, maxDamage)
            sendMessage(`${enemy.name} loses ${currentDamage} Hp`, 1, ["PlayerActionDamage2", "", "" ])
            setText("EnemyHp", `${getText('EnemyHp')}-${currentDamage}`)
            addClass("EnemyHp", "tdSelected", 1)
        }
        if (fighting == true) {
            enableInventory(2)
        }
    
    }
}


//-/- Varázslat megtanulása -\-\\
function learnSpell(spellName) {
    itemType = "item"
    itemName = spellName
    deselectItems()
    removeItem2()
    //RemoveFromPlayerItemList(itemId)
    addSpell(spellName)

    let magic = getText("PlayerCurrentMagic")
    setText("PlayerCurrentMagic", magic-spellCost)
}

function addSpell(spellName) {
    let spell = getSpell(spellName)
    for (let i = 1; i < 4; i++) {
        let a = document.querySelector(`[id=InventorySpell${i}]`).innerHTML
        if (a == "") {
            setText(`InventorySpell${i}`, spellName)
            setText(`InventorySpell${i}Type`, `Type: ${spell.type}`)
            setText(`InventorySpell${i}Attack`, `Attack: ${spell.attack}`)
            setText(`InventorySpell${i}Defense`, `Defense: ${spell.defense}`)
            setText(`InventorySpell${i}Hp`, `Hp: ${spell.hp}`)
            setText(`InventorySpell${i}Cost`, `Cost: ${spell.cost}`)
            addClass(`InventorySpell${i}`, "tdSelectable", 1)
            break
        }
    }
}


















//-/- Tárgy megtalálása az eszköztárban -\-\\
function findItemInInventory(itemName) {
    let itemId = 0

    //Get items
    for (let i = 0; i < itemListLength; i++) {
        if (getText(`InventoryItem${i+1}`) == itemName) {
            itemId = i
            return itemId
        }
    }
}














































// Tesztelés

function test() {
    hiddenSwitch("divTest")
}



function addInv() {
    reloadWeaponList("Dagger")
    reloadWeaponList("Axe")
    reloadWeaponList("Sword")
    reloadWeaponList("Spear")
    reloadWeaponList("Halberd")

    reloadArmorList("Leather armor")
    reloadArmorList("Chain armor")
    reloadArmorList("Plate armor")

    reloadShieldList("Small shield")
    reloadShieldList("Medium shield")
    reloadShieldList("Large shield")

    addSpell("Fireball")
    addSpell("Healing")
    addSpell("Protection")

    reloadItemList("Fireball scroll", "scroll")

    getPlayer()
}

function dura1() {
    let player = getPlayer()
    setText(`InventorySelectedWeaponDurability`,"(" + player.weapon.durability + "/" + 1 + ")");
    setText(`InventoryWeapon1CurrentDurability`, 1)


    //setText(`InventorySelectedShieldDurability`,"(" + player.shield.durability + "/" + 1 + ")");
    //setText(`InventoryShield1CurrentDurability`, 1)
}

function showCollapsible() {
    hidden("InventoryWeaponList", false)
    // hidden("InventoryArmorList", false)
    // hidden("InventoryShieldList", false)
    // hidden("InventorySpellList", false)
}


