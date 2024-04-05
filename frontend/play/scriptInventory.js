
//-/- Tárgy törlése -\-\\
function RemoveItem1(id, type) {
    if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}Sell`).classList.contains("tdSelectable") && fighting == false) {

        unselectId = `Inventory${capitalizeFirstLetter(type)}${id}Sell`
        AddClass(unselectId, "tdSelected", 1)

        if (GetText("ButtonTown") == "Leave town") {
            let item = GetGeneralItem(GetText(`Inventory${capitalizeFirstLetter(type)}${id}`), type)

            if (GetText(`Inventory${capitalizeFirstLetter(type)}${id}`).includes("scroll")) {
                item = GetScroll(GetText(`Inventory${capitalizeFirstLetter(type)}${id}`))
            }
            
            itemName = item.name
            if (sellItem == false) {
                Message(`Do you want to delete this ${type}?`,2, ["", `RemoveItem2`, `CloseItemList`])
            } else if (sellItem == true) {
                let sellValue = 0
                if (type == "item") {
                    Message(`Do you want to sell this ${type} for ${item.cost} coins?`,2, ["", `RemoveItem2`, `UnselectElement`])
                } else {
                    sellValue = GetSellValue(item.name, type, GetText(`Inventory${capitalizeFirstLetter(type)}${id}CurrentDurability`))
                    Message(`Do you want to sell this ${type} for ${sellValue} coins?`,2, ["", `RemoveItem2`, `CloseItemList`])    
                }
            }
            itemType = type
            generalId = id
            //Tábla nyitvatartása üzenőablak közben
            if (type != "item") {
                GetElement(`Inventory${capitalizeFirstLetter(type)}List`).id = `Inventory${capitalizeFirstLetter(type)}ListOpen`
                GetElement(`Button${capitalizeFirstLetter(type)}List`).id = `Button${capitalizeFirstLetter(type)}ListOpen`    
            }
        } else {
            
            if (type == "item") {
                Message("Enter the town to sell an item!", 1, ["UnselectElement", "", ""])
                unselectId = `InventoryItem${id}Sell`
                AddClass(unselectId, "tdSelected", 1)
            }
            if (type != "item") {
                Message("Enter the town to sell an item!", 1, ["CloseItemList", "", ""])
                GetElement(`Inventory${capitalizeFirstLetter(type)}List`).id = `Inventory${capitalizeFirstLetter(type)}ListOpen`
                GetElement(`Button${capitalizeFirstLetter(type)}List`).id = `Button${capitalizeFirstLetter(type)}ListOpen`    
            }
        }

    }
}
function RemoveItem2() {
    if (sellItem == true) {
        let item = GetGeneralItem(itemName, itemType)
        if (itemName.includes("scroll")) {
            item = GetScroll(itemName)
        }
        SetCoins(item.cost)
    }
    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));
    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));

    if (itemType != "item") {
        SetText(`InventorySelected${capitalizeFirstLetter(itemType)}Slot`, "")
        SetText(`InventorySelected${capitalizeFirstLetter(itemType)}Durability`, "")    
    }

    switch (itemType) {
        case "weapon":
            SetText(`InventoryWeapon${generalId}`,"")
            SetText(`InventoryWeapon${generalId}Attack`,"");
            SetText(`InventoryWeapon${generalId}Defense`,"");
            SetText(`InventoryWeapon${generalId}Damage`,"");
            SetText(`InventoryWeapon${generalId}Durability`,"");
            SetText(`InventoryWeapon${generalId}CurrentDurability`,"");
            SetText(`InventoryWeapon${generalId}Sell`,"");
            ReloadWeaponList()
            break;

        case "armor":
            SetText(`InventoryArmor${generalId}`,"")
            SetText(`InventoryArmor${generalId}Defense`,"");
            SetText(`InventoryArmor${generalId}DamageReduction`,"");
            SetText(`InventoryArmor${generalId}Durability`,"");
            SetText(`InventoryArmor${generalId}CurrentDurability`,"");
            SetText(`InventoryArmor${generalId}Sell`,"");
            ReloadArmorList()
            break;

        case "shield":
            SetText(`InventoryShield${generalId}`,"")
            SetText(`InventoryShield${generalId}Defense`,"");
            SetText(`InventoryShield${generalId}Durability`,"");
            SetText(`InventoryShield${generalId}CurrentDurability`,"");
            SetText(`InventoryShield${generalId}TwoHandedPenalty`,"");
            SetText(`InventoryShield${generalId}Sell`,"");
            ReloadShieldList()
            break;

        case "item":
            let amount = GetText(`InventoryItem${generalId}Amount`).split(":")[1]
            if (amount > 1) { //Egy törlése több tárgyból
                SetText(`InventoryItem${generalId}Amount`, `Amount: ${Number(amount)-1}`);
                //ReloadItemList()
            } else { //Utolsó törlése
                AddClass(`InventoryItem${generalId}`,"itemUsable", false)
                SetText(`InventoryItem${generalId}`,"")
                SetText(`InventoryItem${generalId}Amount`,"");
                SetText(`InventoryItem${generalId}Use`,"");
                SetText(`InventoryItem${generalId}Sell`,"");    
                ReloadItemList()
                Backpack()
            }
            
            break;
    
        default:
            break;
    }



    if (itemType != "item") {
        SetText(`InventorySelected${capitalizeFirstLetter(itemType)}`,"none");
        SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense)    
    }
}




//-/- Tábla becsukása üzenet után -\-\\
function CloseItemList() {
    UnselectElement()
    if (GetElement("InventoryWeaponListOpen") != null) {
        GetElement("ButtonWeaponListOpen").id = "ButtonWeaponList"
        GetElement("InventoryWeaponListOpen").id = "InventoryWeaponList"
    }
    if (GetElement("InventoryArmorListOpen") != null) {
        GetElement("ButtonArmorListOpen").id = "ButtonArmorList"
        GetElement("InventoryArmorListOpen").id = "InventoryArmorList"
    }
    if (GetElement("InventoryShieldListOpen") != null) {
        GetElement("ButtonShieldListOpen").id = "ButtonShieldList"
        GetElement("InventoryShieldListOpen").id = "InventoryShieldList"
    }
}




















//-/- Fegyverek tábla betöltése -\-\\
function ReloadWeaponList(weaponName = "") {
    let list = [];
    let listAttack = [];
    let listDefense = [];
    let listDamage = [];
    let listDurability = [];
    let listCurrentDurability = [];
    //Tárgyak lekérése
    for (let i = 0; i < weaponListLength; i++) {
        list[i]=GetText(`InventoryWeapon${i+1}`)
        listAttack[i]=GetText(`InventoryWeapon${i+1}Attack`)
        listDefense[i]=GetText(`InventoryWeapon${i+1}Defense`)
        listDamage[i]=GetText(`InventoryWeapon${i+1}Damage`)
        listDurability[i]=GetText(`InventoryWeapon${i+1}Durability`)
        listCurrentDurability[i]=GetText(`InventoryWeapon${i+1}CurrentDurability`)

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
        let weapon = GetWeapon(weaponName)
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
        SetText(`InventoryWeapon${i+1}`, String(list2[i]))
        SetText(`InventoryWeapon${i+1}Attack`, "Attack: " + String(listAttack2[i]))
        SetText(`InventoryWeapon${i+1}Defense`, "Defense: " + String(listDefense2[i])) 
        SetText(`InventoryWeapon${i+1}Damage`, "Damage: " + String(listDamage2[i]))
        SetText(`InventoryWeapon${i+1}Durability`, "Durability: " + String(listDurability2[i]) + "/")
        SetText(`InventoryWeapon${i+1}CurrentDurability`, String(listCurrentDurability2[i]))

        GetElement(`InventoryWeapon${i+1}`).classList.remove("tdSelected")
        GetElement(`InventoryWeapon${i+1}Sell`).classList.add("tdSelectable")
        SetText(`InventoryWeapon${i+1}Sell`, "Sell")
        GetElement(`InventoryWeapon${i+1}`).classList.add("tdSelectable")
}


for (let i = 0; i < 5; i++) {
    if (GetText(`InventoryWeapon${i+1}`)=="") {
        GetElement(`InventoryWeapon${i+1}`).classList.remove("tdSelectable");
        SetText(`InventoryWeapon${i+1}Sell`, "")
        GetElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdSelectable");

        SetText(`InventoryWeapon${i+1}Attack`, "")
        SetText(`InventoryWeapon${i+1}Defense`, "")
        SetText(`InventoryWeapon${i+1}Damage`, "")
        SetText(`InventoryWeapon${i+1}Durability`, "")
        SetText(`InventoryWeapon${i+1}Durability`, "")
        SetText(`InventoryWeapon${i+1}CurrentDurability`, "")
    }
    }
}


































//-/- Páncél tábla betöltése -\-\\
function ReloadArmorList(armorName = "") {
    let list = [];
    let listDefense = [];
    let listDamageReduction = [];
    let listDurability = [];
    let listCurrentDurability = [];
    //Tárgyak lekérése
    for (let i = 0; i < armorListLength; i++) {
        list[i]=GetText(`InventoryArmor${i+1}`)
        listDefense[i]=GetText(`InventoryArmor${i+1}Defense`)
        listDamageReduction[i]=GetText(`InventoryArmor${i+1}DamageReduction`)
        listDurability[i]=GetText(`InventoryArmor${i+1}Durability`)
        listCurrentDurability[i]=GetText(`InventoryArmor${i+1}CurrentDurability`)

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
        let armor = GetArmor(armorName)
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
        SetText(`InventoryArmor${i+1}`, String(list2[i]))
        SetText(`InventoryArmor${i+1}Defense`, "Defense: " + String(listDefense2[i])) 
        SetText(`InventoryArmor${i+1}DamageReduction`, "Damage reduction: " + String(listDamageReduction2[i]))
        SetText(`InventoryArmor${i+1}Durability`, "Durability: " + String(listDurability2[i]) + "/")
        SetText(`InventoryArmor${i+1}CurrentDurability`, String(listCurrentDurability2[i]))

        GetElement(`InventoryArmor${i+1}`).classList.remove("tdSelected")
        GetElement(`InventoryArmor${i+1}Sell`).classList.add("tdSelectable")
        SetText(`InventoryArmor${i+1}Sell`, "Sell")
        GetElement(`InventoryArmor${i+1}`).classList.add("tdSelectable")
}

    for (let i = 0; i < 3; i++) {
        if (GetText(`InventoryArmor${i+1}`)=="") {
            GetElement(`InventoryArmor${i+1}`).classList.remove("tdSelectable");
            SetText(`InventoryArmor${i+1}Sell`, "")
            GetElement(`InventoryArmor${i+1}Sell`).classList.remove("tdSelectable");

            SetText(`InventoryArmor${i+1}Defense`, "")
            SetText(`InventoryArmor${i+1}DamageReduction`, "")
            SetText(`InventoryArmor${i+1}Durability`, "")
            SetText(`InventoryArmor${i+1}Durability`, "")
            SetText(`InventoryArmor${i+1}CurrentDurability`, "")
        }
    }
}




















//-/- Pajzs tábla betöltése -\-\\
function ReloadShieldList(shieldName = "") {
    let list = [];
    let listDefense = [];
    let listDurability = [];
    let listCurrentDurability = [];
    let listTwoHandedPenalty = [];
    //Tárgyak lekérése
    for (let i = 0; i < shieldListLength; i++) {
        list[i]=GetText(`InventoryShield${i+1}`)
        listDefense[i]=GetText(`InventoryShield${i+1}Defense`)
        listDurability[i]=GetText(`InventoryShield${i+1}Durability`)
        listCurrentDurability[i]=GetText(`InventoryShield${i+1}CurrentDurability`)
        listTwoHandedPenalty[i]=GetText(`InventoryShield${i+1}TwoHandedPenalty`)

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
        let shield = GetShield(shieldName)
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
        SetText(`InventoryShield${i+1}`, String(list2[i]))
        SetText(`InventoryShield${i+1}Defense`, "Defense: " + String(listDefense2[i])) 
        SetText(`InventoryShield${i+1}Durability`, "Durability: " + String(listDurability2[i]) + "/")
        SetText(`InventoryShield${i+1}CurrentDurability`, String(listCurrentDurability2[i]))
        SetText(`InventoryShield${i+1}TwoHandedPenalty`, "Two handed penalty: " + String(listTwoHandedPenalty2[i]))

        GetElement(`InventoryShield${i+1}`).classList.remove("tdSelected")
        GetElement(`InventoryShield${i+1}Sell`).classList.add("tdSelectable")
        SetText(`InventoryShield${i+1}Sell`, "Sell")
        GetElement(`InventoryShield${i+1}`).classList.add("tdSelectable")
}


for (let i = 0; i < shieldListLength; i++) {
    if (GetText(`InventoryShield${i+1}`)=="") {
        GetElement(`InventoryShield${i+1}`).classList.remove("tdSelectable");
        SetText(`InventoryShield${i+1}Sell`, "")
        GetElement(`InventoryShield${i+1}Sell`).classList.remove("tdSelectable");

        SetText(`InventoryShield${i+1}Defense`, "")
        SetText(`InventoryShield${i+1}Durability`, "")
        SetText(`InventoryShield${i+1}CurrentDurability`, "")
        SetText(`InventoryShield${i+1}TwoHandedPenalty`, "")
    }
    }
}























//-/- Eszköztár használható vagy nem -\-\\
function EnableInventory(type) {
    if (type == 0) {
        //Disable
        for (let i = 0; i < weaponListLength; i++) {
            GetElement(`InventoryWeapon${i+1}`).classList.remove("tdSelectable")
            GetElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < armorListLength; i++) {
            GetElement(`InventoryArmor${i+1}`).classList.remove("tdSelectable")
            GetElement(`InventoryArmor${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < shieldListLength; i++) {
            GetElement(`InventoryShield${i+1}`).classList.remove("tdSelectable")
            GetElement(`InventoryShield${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < itemListLength; i++) {
            GetElement(`InventoryItem${i+1}Use`).classList.remove("tdSelectable")
            GetElement(`InventoryItem${i+1}Sell`).classList.remove("tdSelectable")
        }
        for (let i = 0; i < spellList.length; i++) {
            GetElement(`InventorySpell${i+1}`).classList.remove("tdSelectable")
        }
        //Enable
    } else if (type == 1) {
        for (let i = 0; i < weaponListLength; i++) {
            if (GetText(`InventoryWeapon${i+1}`) != "") {
                GetElement(`InventoryWeapon${i+1}`).classList.add("tdSelectable")
            }
            if (GetText(`InventoryWeapon${i+1}Sell`) != "") {
                GetElement(`InventoryWeapon${i+1}Sell`).classList.add("tdSelectable")
            }
        }
        for (let i = 0; i < armorListLength; i++) {
            if (GetText(`InventoryArmor${i+1}`) != "") {
                GetElement(`InventoryArmor${i+1}`).classList.add("tdSelectable")
            }
            if (GetText(`InventoryArmor${i+1}Sell`) != "") {
                GetElement(`InventoryArmor${i+1}Sell`).classList.add("tdSelectable")
            }        }
        for (let i = 0; i < shieldListLength; i++) {
            if (GetText(`InventoryShield${i+1}`) != "") {
                GetElement(`InventoryShield${i+1}`).classList.add("tdSelectable")
            }
            if (GetText(`InventoryShield${i+1}Sell`) != "") {
                GetElement(`InventoryShield${i+1}Sell`).classList.add("tdSelectable")
            }        }
        for (let i = 0; i < itemListLength; i++) {
            if (GetText(`InventoryItem${i+1}Use`) != "") {
                GetElement(`InventoryItem${i+1}Use`).classList.add("tdSelectable")
            }
            if (GetText(`InventoryItem${i+1}Sell`) != "") {
                GetElement(`InventoryItem${i+1}Sell`).classList.add("tdSelectable")
            }        }
    
    //Enable expect sell
    } else if (type == 2) {
        for (let i = 0; i < weaponListLength; i++) {
            if (GetText(`InventoryWeapon${i+1}`) != "") {
                AddClass(`InventoryWeapon${i+1}`, "tdSelectable", 1)
            }
            if (GetText(`InventoryWeapon${i+1}Sell`) != "") {
                AddClass(`InventoryWeapon${i+1}Sell`, "tdSelectable", 0)
            }
        }
        for (let i = 0; i < armorListLength; i++) {
            if (GetText(`InventoryArmor${i+1}`) != "") {
                AddClass(`InventoryArmor${i+1}`, "tdSelectable", 1)
            }
            if (GetText(`InventoryArmor${i+1}Sell`) != "") {
                AddClass(`InventoryArmor${i+1}Sell`, "tdSelectable", 0)
            }
        }
        for (let i = 0; i < shieldListLength; i++) {
            if (GetText(`InventoryShield${i+1}`) != "") {
                AddClass(`InventoryShield${i+1}`, "tdSelectable", 1)
            }
            if (GetText(`InventoryShield${i+1}Sell`) != "") {
                AddClass(`InventoryShield${i+1}Sell`, "tdSelectable", 0)
            }
        }
        for (let i = 0; i < itemListLength; i++) {

            if (GetText(`InventoryItem${i+1}Sell`) != "") {
                AddClass(`InventoryItem${i+1}Sell`, "tdSelectable", 0)
            }
       }
    }
}

























//-/- Tárgy kiválasztása -\-\\
function ChangeSelectedItem(id, type) {
    if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelectable") && !GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelected")) {

        //Set name and slot id
        let itemName = GetText(`Inventory${capitalizeFirstLetter(type)}${id}`)
        SetText(`InventorySelected${capitalizeFirstLetter(type)}`, itemName)
        SetText(`InventorySelected${capitalizeFirstLetter(type)}Slot`, id)
        let item = GetGeneralItem(itemName, type)
        SetText(`InventorySelected${capitalizeFirstLetter(type)}Durability`, " (" + item.durability + "/" + GetText(`Inventory${capitalizeFirstLetter(type)}${id}CurrentDurability`) + ")")


        //Call set attributes function
        SetPlayerAttackDefense()

        //Item remain selected
        switch (type) {
            case "weapon":
                for (let i = 0; i < weaponListLength; i++) {
                    if (GetText(`InventoryWeapon${i+1}`) != "") {
                        GetElement(`InventoryWeapon${i+1}`).classList.remove("tdSelected")
                        GetElement(`InventoryWeapon${i+1}`).classList.add("tdSelectable")    
                    }
                }
                GetElement(`InventoryWeapon${id}`).classList.add("tdSelected")
                break;

            case "armor":
                for (let i = 0; i < armorListLength; i++) {
                    GetElement(`InventoryArmor${i+1}`).classList.remove("tdSelected")
                    GetElement(`InventoryArmor${i+1}`).classList.add("tdSelectable")
                }
                GetElement(`InventoryArmor${id}`).classList.add("tdSelected")
                break;

            case "shield":
                for (let i = 0; i < shieldListLength; i++) {
                    GetElement(`InventoryShield${i+1}`).classList.remove("tdSelected")
                    GetElement(`InventoryShield${i+1}`).classList.add("tdSelectable")
                }
                GetElement(`InventoryShield${id}`).classList.add("tdSelected")
                break;
        
            default:
                break;
        }

        //Disable while fighting after one action
        if (fighting == true) {
            EnemyAction()
        }

    } else if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelected") && playerDead == false) {

        //Kiválasztás vissza
        if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelectable")) {
            GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.remove("tdSelected")
            GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.add("tdSelectable")
    
            SetText(`InventorySelected${capitalizeFirstLetter(type)}`, "none")
            SetText(`InventorySelected${capitalizeFirstLetter(type)}Slot`, "")
            SetText(`InventorySelected${capitalizeFirstLetter(type)}Durability`, "")
            SetPlayerAttackDefense()
        }

        if (fighting == true) {
            EnemyAction()
        }
    }
}
    



//-/- Támadás és védelem módosítása -\-\\
function SetPlayerAttackDefense() {
    let startAttack = Number(GetText("PlayerStartAttack"));
    let startDefense = Number(GetText("PlayerStartDefense"));

    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));
    let weapon = null
    let armor = null
    let shield = null
    let twoHandedPenalty = 0

    if (GetText(`InventorySelectedWeapon`) != "none") {
        weapon = GetWeapon(GetText(`InventorySelectedWeapon`))
    } else {
        weapon = {attack: 0, defense: 0}
    }

    if (GetText(`InventorySelectedArmor`) != "none") {
        armor = GetArmor(GetText(`InventorySelectedArmor`))
    } else {
        armor = {defense: 0}
    }

    if (GetText(`InventorySelectedShield`) != "none") {
        shield = GetShield(GetText(`InventorySelectedShield`))
        if (weapon.twoHanded == 1) {
            twoHandedPenalty = shield.twoHandedPenalty
        }
    } else {
        shield = {defense: 0}
    }
    let attack = startAttack+weapon.attack+attackModifier-twoHandedPenalty
    let defense = startDefense+weapon.defense+armor.defense+shield.defense+defenseModifier

    SetText("PlayerCurrentAttack", attack);
    SetText("PlayerCurrentDefense", defense);
}



//-/- Varázslat kiválasztása -\-\\
function ChangeChoosenSpell(id) {
    if (HasClass(`InventorySpell${id}`, "tdSelectable")) {
        SetText("InventoryChoosenSpell", GetText(`InventorySpell${id}`))

        for (let i = 0; i < spellList.length; i++) {
            //AddClass(`InventorySpell${i+1}`, "tdSelected", 0)
    
            if (GetText(`InventorySpell${i+1}`) != "") {
                AddClass(`InventorySpell${i+1}`, "tdSelected", 0)
            }
        }
        
        AddClass(`InventorySpell${id}`, "tdSelected", 1)
    }
}

























//-/- Eladási érték kiszámítása -\-\\
function GetSellValue(itemName, itemType, currentDurability) {
    let item = null
    switch (itemType) {
        case "weapon":
            item = GetWeapon(itemName)
            break;
        case "armor":
            item = GetArmor(itemName)
            break;
        case "shield":
            item = GetShield(itemName)
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
        Hidden("InventoryWeaponList", true)
    }
    if (document.getElementById("ButtonWeaponList") != null) {
    document.getElementById("ButtonWeaponList").classList.remove("hover")
    }
})

AreaWeaponList.addEventListener("mouseover", function () {
    Hidden("InventoryWeaponList", false)
    Hidden("InventoryArmorList", true)
    Hidden("InventoryShieldList", true)
    document.getElementById("ButtonWeaponList").classList.add("hover")
})

/* Páncélok */
const AreaArmorList = document.getElementById("AreaArmorList")
AreaArmorList.addEventListener("mouseleave", function() {
    if (document.getElementById("InventoryArmorList") != null) {
        Hidden("InventoryArmorList", true)
    }
    if (document.getElementById("ButtonArmorList") != null) {
    document.getElementById("ButtonArmorList").classList.remove("hover")
    }
})

AreaArmorList.addEventListener("mouseover", function () {
        Hidden("InventoryArmorList", false)
        Hidden("InventoryWeaponList", true)
        Hidden("InventoryShieldList", true)
        document.getElementById("ButtonArmorList").classList.add("hover")
})

/* Pajzsok */
const AreaShieldList = document.getElementById("AreaShieldList")
AreaShieldList.addEventListener("mouseleave", function() {
    if (document.getElementById("InventoryShieldList") != null) {
        Hidden("InventoryShieldList", true)
    }
    if (document.getElementById("ButtonShieldList") != null) {
    document.getElementById("ButtonShieldList").classList.remove("hover")
    }
})

AreaShieldList.addEventListener("mouseover", function () {
        Hidden("InventoryShieldList", false)
        Hidden("InventoryArmorList", true)
        Hidden("InventoryWeaponList", true)
        document.getElementById("ButtonShieldList").classList.add("hover")
})



/* Varázslatok */
const AreaSpellList = document.getElementById("AreaSpellList")
AreaSpellList.addEventListener("mouseleave", function() {
    Hidden("InventorySpellList", true)
    document.getElementById("ButtonSpellList").classList.remove("hover")
})
AreaSpellList.addEventListener("mouseover", function () {
    Hidden("InventorySpellList", false)
    document.getElementById("ButtonSpellList").classList.add("hover")
})






























//-/- Egyéb tárgyak tábla betöltése -\-\\
function ReloadItemList(itemName = null, type = null, usable = false) {
    let item = null
    if (itemName != null) {
        if (type == "scroll") {
            item = GetScroll(`${itemName}`)
        }
        if (type == "item") {
            item = GetItem(`${itemName}`)
        }
    }
    
    let list = [];
    let listAmount = [];
    let listUsable = [];
    //Get items
    for (let i = 0; i < itemListLength; i++) {
        list[i]=GetText(`InventoryItem${i+1}`)
        listAmount[i]=GetText(`InventoryItem${i+1}Amount`)

        if (HasClass(`InventoryItem${i+1}`, "itemUsable")) { //van itemUsable osztály
            listUsable[i] = true
        } else if (GetText(`InventoryItem${i+1}`) != "") { //nincs osztály
            listUsable[i] = false
        } else { //nincs tárgy
            listUsable[i] = ""
        }

        if (listAmount[i].includes(":")) {
            listAmount[i]=Number(GetText(`InventoryItem${i+1}Amount`).split(":")[1])
        }
    }
    //alert(list+"           "+listAmount)


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
        
        SetText(`InventoryItem${i+1}`, String(list2[i]))
        SetText(`InventoryItem${i+1}Amount`, "Amount: " + Number(listAmount2[i]))

        if (listUsable2[i] == true) {
            SetText(`InventoryItem${i+1}Use`, "Use")
            AddClass(`InventoryItem${i+1}Use`, "tdSelectable", 1)
            AddClass(`InventoryItem${i+1}`, "itemUsable", 1)
        } else {
            SetText(`InventoryItem${i+1}Use`, "")
            AddClass(`InventoryItem${i+1}Use`, "tdSelectable", 0)
            AddClass(`InventoryItem${i+1}`, "itemUsable", 0)
        }

        SetText(`InventoryItem${i+1}Sell`, "Sell")
        GetElement(`InventoryItem${i+1}Sell`).classList.add("tdSelectable")
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
    if (GetText(`InventoryItem${i+1}`) == "") {
        SetText(`InventoryItem${i+1}Amount`, "")
        SetText(`InventoryItem${i+1}Use`, "")
        GetElement(`InventoryItem${i+1}Use`).classList.remove("tdSelectable")
        AddClass(`InventoryItem${i+1}`, "itemUsable", 0)
        SetText(`InventoryItem${i+1}Sell`, "")
        GetElement(`InventoryItem${i+1}Sell`).classList.remove("tdSelectable")
    }

}


//Hátizsák
if (item != null) {
    if (item.name.includes("backpack")) {
        Backpack()
    }
}
}






//-/- Eszköztár méret növelése hátizsákkal -\-\\
function Backpack() {
    let smallId = FindItemInInventory("Small backpack")
    let largeId = FindItemInInventory("Large backpack")

    //Csak kisebb
    if (smallId != undefined && largeId == undefined) {
        Hidden("InventoryWeapon4Row", false)
        Hidden("InventoryWeapon5Row", true)
        Hidden("InventoryArmor2Row", false)
        Hidden("InventoryArmor3Row", true)
        Hidden("InventoryShield2Row", false)
        Hidden("InventoryShield3Row", true)
        Hidden("InventoryItem4Row", false)
        weaponListLength = 4
        armorListLength = 2
        shieldListLength = 2
        itemListLength = 4
    }
    //Csak nagyobb
    if (largeId != undefined) {
        Hidden("InventoryWeapon4Row", false)
        Hidden("InventoryWeapon5Row", false)
        Hidden("InventoryArmor2Row", false)
        Hidden("InventoryArmor3Row", false)
        Hidden("InventoryShield2Row", false)
        Hidden("InventoryShield3Row", false)
        Hidden("InventoryItem4Row", false)
        Hidden("InventoryItem5Row", false)
        weaponListLength = 5
        armorListLength = 3
        shieldListLength = 3
        itemListLength = 5
    }
    //Egyik sem
    if (smallId == undefined && largeId == undefined) {
        
        Hidden("InventoryWeapon4Row", true)
        Hidden("InventoryWeapon5Row", true)
        Hidden("InventoryArmor2Row", true)
        Hidden("InventoryArmor3Row", true)
        Hidden("InventoryShield2Row", true)
        Hidden("InventoryShield3Row", true)
        Hidden("InventoryItem4Row", true)
        Hidden("InventoryItem5Row", true)
        weaponListLength = 3
        armorListLength = 1
        shieldListLength =1
        itemListLength = 3
    }
}












//-/- Tárgy használata -\-\\
function UseItem(id) {
    if (GetElement(`InventoryItem${id}Use`).classList.contains("tdSelectable")) {
        unselectId = `InventoryItem${id}Use`
        sellItem = false
        let item = null
        if (GetText(`InventoryItem${id}`).includes("scroll")) {
            item = GetScroll(GetText(`InventoryItem${id}`))
        } else {
            item = GetItem(GetText(`InventoryItem${id}`))
        }
    
        //Varázslat megtanulása
        if (item.spellId != null && fighting == false) {
            let spell = GetSpellById(item.spellId)
            let difficulty = GetText("SettingsLabelDifficulty")
            let player = GetPlayer()
        
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
                    AddClass(`InventoryItem${id}Use`, "tdSelected", 1)
                    Message(`Do you want to learn this spell for ${spellCost} Magic?`,2, ["", "LearnSpell", "UnselectElement"])
                } else {
                    AddClass(`InventoryItem${id}Use`, "tdSelected", 1)
                    Message(`You need ${spellCost} magic to learn this spell!`,1, ["UnselectElement", "", ""])
                }
    
    
        //Varázslás tekerccsel
        } else if (item.spellId != null && fighting == true)  {
            generalId = id
            itemType = "item"
            itemName = item.name
            RemoveItem2()    
            PlayerActionSpell(item.name)
    
        //Étel
        } else if (item.name == "Food") {
            let id = FindItemInInventory("Food")+1
            
            let hpCurrent = Number(GetText("PlayerCurrentHp"))
            let hpStart = Number(GetText("PlayerStartHp"))
            if (hpCurrent == hpStart) {
                AddClass(`InventoryItem${id}Use`, "tdSelected", 1)
                Message("You don't need to eat",1, ["UnselectElement","",""])
            } else {
                itemType = "item"
                itemName = item.name
                generalId = id
                RemoveItem2()
                //RemoveFromPlayerItemList(id)
                let hpGained = Number(RandomNumber(2,5))
                if (hpGained + hpCurrent > hpStart) {
                    hpGained = hpStart - hpCurrent
                }
                SetText("PlayerCurrentHp", hpGained + hpCurrent)
                AddClass(`InventoryItem${id}Use`, "tdSelected", 1)

                if (fighting == true) {
                    Message(`You gained ${hpGained} health`,1, ["EnemyAction","",""])
                } else {
                    Message(`You gained ${hpGained} health`,1, ["UnselectElement","",""])
                }
            }



        } else if (item.name == "Grenade" && fighting == true) {
            Log(item)
            let minDamage = Number(item.damage.split("-")[0])
            let maxDamage = Number(item.damage.split("-")[1])
            let enemy = GetCurrentEnemy()
            let currentDamage = RandomNumber(minDamage, maxDamage)
            Message(`${enemy.name} loses ${currentDamage} Hp`, 1, ["PlayerActionDamage2", "", "" ])
            SetText("EnemyHp", `${GetText('EnemyHp')}-${currentDamage}`)
            AddClass("EnemyHp", "tdSelected", 1)
        }
        if (fighting == true) {
            EnableInventory(2)
        }
    
    }
}


//-/- Varázslat megtanulása -\-\\
function LearnSpell(spellName) {
    itemType = "item"
    itemName = spellName
    UnselectElement(unselectId)
    RemoveItem2()
    //RemoveFromPlayerItemList(itemId)
    AddSpell(spellName)

    let magic = GetText("PlayerCurrentMagic")
    SetText("PlayerCurrentMagic", magic-spellCost)
}

function AddSpell(spellName) {
    let spell = GetSpell(spellName)
    for (let i = 1; i < 4; i++) {
        let a = document.querySelector(`[id=InventorySpell${i}]`).innerHTML
        if (a == "") {
            SetText(`InventorySpell${i}`, spellName)
            SetText(`InventorySpell${i}Type`, `Type: ${spell.type}`)
            SetText(`InventorySpell${i}Attack`, `Attack: ${spell.attack}`)
            SetText(`InventorySpell${i}Defense`, `Defense: ${spell.defense}`)
            SetText(`InventorySpell${i}Hp`, `Hp: ${spell.hp}`)
            SetText(`InventorySpell${i}Cost`, `Cost: ${spell.cost}`)
            AddClass(`InventorySpell${i}`, "tdSelectable", 1)
            break
        }
    }
}


















//-/- Tárgy megtalálása az eszköztárban -\-\\
function FindItemInInventory(itemName) {
    let itemId = 0

    //Get items
    for (let i = 0; i < itemListLength; i++) {
        if (GetText(`InventoryItem${i+1}`) == itemName) {
            itemId = i
            return itemId
        }
    }
}














































// Tesztelés

function test() {
    HiddenSwitch("divTest")
}



function AddInv() {
    ReloadWeaponList("Dagger")
    ReloadWeaponList("Axe")
    ReloadWeaponList("Sword")
    ReloadWeaponList("Spear")
    ReloadWeaponList("Halberd")

    ReloadArmorList("Leather armor")
    ReloadArmorList("Chain armor")
    ReloadArmorList("Plate armor")

    ReloadShieldList("Small shield")
    ReloadShieldList("Medium shield")
    ReloadShieldList("Large shield")

    AddSpell("Fireball")
    AddSpell("Healing")
    AddSpell("Protection")

    ReloadItemList("Fireball scroll", "scroll")

    GetPlayer()
}

function dura1() {
    let player = GetPlayer()
    SetText(`InventorySelectedShieldDurability`,"(" + player.shield.durability + "/" + 2 + ")");
    SetText(`InventoryShield1CurrentDurability`, 2)
}

function showCollapsible() {
    Hidden("InventoryWeaponList", false)
    // Hidden("InventoryArmorList", false)
    // Hidden("InventoryShieldList", false)
    // Hidden("InventorySpellList", false)
}



