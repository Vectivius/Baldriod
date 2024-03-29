

function RemoveItem1(id, type) {
    if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}Sell`).classList.contains("tdClickable") && fighting == false) {
        if (GetText("ButtonTown") == "Leave town") {
            let item = GetGeneralItem(GetText(`Inventory${capitalizeFirstLetter(type)}${id}`), type)
            itemName = item.name
            if (sellItem == false) {
                Message(`Do you want to delete this ${type}?`,2, ["", `RemoveItem2`, `CloseItemList`])
            } else if (sellItem == true) {
                let sellValue = 0
                if (type == "item") {
                    Message(`Do you want to sell this ${type} for ${item.cost} coins?`,2, ["", `RemoveItem2`, ``])
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
            Message("Enter the town to sell an item!", 1, ["CloseItemList", "", ""])
            if (type != "item") {
                GetElement(`Inventory${capitalizeFirstLetter(type)}List`).id = `Inventory${capitalizeFirstLetter(type)}ListOpen`
                GetElement(`Button${capitalizeFirstLetter(type)}List`).id = `Button${capitalizeFirstLetter(type)}ListOpen`    
            }
        }

    }
}
function RemoveItem2() {
    if (sellItem == true) {
        let item = GetGeneralItem(itemName, itemType)
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
            if (amount > 1) {
                SetText(`InventoryItem${generalId}Amount`, `Amount: ${Number(amount)-1}`);
                //ReloadItemList()
            } else {
                SetText(`InventoryItem${generalId}`,"")
                SetText(`InventoryItem${generalId}Amount`,"");
                SetText(`InventoryItem${generalId}Use`,"");
                SetText(`InventoryItem${generalId}Sell`,"");    
                ReloadItemList()
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




//Fegyver törlése
function RemoveWeapon1(id) {
    if (GetElement(`InventoryWeapon${id}Sell`).classList.contains("tdClickable")) {
        let weapon = GetWeapon(GetText(`InventoryWeapon${id}`))
        itemName = weapon.name
        if (sellItem == false) {
            Message("Do you want to delete this weapon?",2, ["", "RemoveWeapon2", "CloseWeaponList"])
        } else if (sellItem == true) {
            let sellValue = GetSellValue(weapon.name, "weapon", GetText(`InventoryWeapon${id}CurrentDurability`))
            Message(`Do you want to sell this weapon for ${sellValue} coins?`,2, ["", "RemoveWeapon2", "CloseWeaponList"])
        }
        generalId = id
    
        //Tábla nyitvatartása üzenőablak közben
        GetElement("InventoryWeaponList").id = "InventoryWeaponListOpen"
        GetElement("ButtonWeaponList").id = "ButtonWeaponListOpen"    
    }
}



function RemoveWeapon2() {
    if (sellItem == true) {
        let weapon = GetWeapon(itemName)
        SetCoins(weapon.cost)
        //SetText("InventoryCoins", `${Number(GetText('InventoryCoins')) + weapon.cost}`)
    }
    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));
    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));

    GetElement(`InventoryWeapon${generalId}`).classList.remove("tdSelected")
    SetText("InventorySelectedWeaponDurability", "")
    SetText(`InventoryWeapon${generalId}`,"")
    SetText(`InventoryWeapon${generalId}Attack`,"");
    SetText(`InventoryWeapon${generalId}Defense`,"");
    SetText(`InventoryWeapon${generalId}Damage`,"");
    SetText(`InventoryWeapon${generalId}Durability`,"");
    SetText(`InventoryWeapon${generalId}CurrentDurability`,"");
    SetText(`InventoryWeapon${generalId}Sell`,"");
    SetText("InventorySelectedWeaponSlot", "")

    ReloadWeaponList()
    SetText(`InventorySelectedWeapon`,"none");
    SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense)
}

function CloseItemList() {
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

//Tábla becsukása
function CloseWeaponList() {
    GetElement("InventoryWeaponListOpen").id = "InventoryWeaponList"
    GetElement("ButtonWeaponListOpen").id = "ButtonWeaponList"
}



//Tábla betöltése
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
        GetElement(`InventoryWeapon${i+1}Sell`).classList.add("tdClickable")
        SetText(`InventoryWeapon${i+1}Sell`, "Sell")
        GetElement(`InventoryWeapon${i+1}`).classList.add("tdClickable")
}


for (let i = 0; i < 5; i++) {
    if (GetText(`InventoryWeapon${i+1}`)=="") {
        GetElement(`InventoryWeapon${i+1}`).classList.remove("tdClickable");
        SetText(`InventoryWeapon${i+1}Sell`, "")
        GetElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdClickable");

        SetText(`InventoryWeapon${i+1}Attack`, "")
        SetText(`InventoryWeapon${i+1}Defense`, "")
        SetText(`InventoryWeapon${i+1}Damage`, "")
        SetText(`InventoryWeapon${i+1}Durability`, "")
        SetText(`InventoryWeapon${i+1}Durability`, "")
        SetText(`InventoryWeapon${i+1}CurrentDurability`, "")
    }
    }
}





























//Páncél törlése
function RemoveArmor1(id) {
    if (GetElement(`InventoryArmor${id}Sell`).classList.contains("tdClickable")) {
        let armor = GetArmor(GetText(`InventoryArmor${id}`))
        itemName = armor.name
        if (sellItem == false) {
            Message("Do you want to delete this armor?",2, ["", "RemoveArmor2", "CloseArmorList"])
        } else if (sellItem == true) {
            let sellValue = GetSellValue(armor.name, "armor", GetText(`InventoryArmor${id}CurrentDurability`))
            Message(`Do you want to sell this armor for ${sellValue} coins?`,2, ["", "RemoveArmor2", "CloseArmorList"])
        }
        generalId = id
    
        //Tábla nyitvatartása üzenőablak közben
        GetElement("InventoryArmorList").id = "InventoryArmorListOpen"
        GetElement("ButtonArmorList").id = "ButtonArmorListOpen"    
    }
}

function RemoveArmor2() {
    if (sellItem == true) {
        let armor = GetArmor(itemName)
        SetCoins(armor.cost)
        //SetText("InventoryCoins", `${Number(GetText('InventoryCoins')) + armor.cost}`)
    }
    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));
    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));

    SetText("InventorySelectedArmorDurability", "")
    GetElement(`InventoryArmor${generalId}`).classList.remove("tdSelected")
    SetText(`InventoryArmor${generalId}`,"")
    SetText(`InventoryArmor${generalId}Defense`,"");
    SetText(`InventoryArmor${generalId}DamageReduction`,"");
    SetText(`InventoryArmor${generalId}Durability`,"");
    SetText(`InventoryArmor${generalId}CurrentDurability`,"");
    SetText(`InventoryArmor${generalId}Sell`,"");
    SetText("InventorySelectedArmorSlot", "")
    

    ReloadArmorList()
    SetText(`InventorySelectedArmor`,"none");
    SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense)
}


//Tábla becsukása
function CloseArmorList() {
    GetElement("InventoryArmorListOpen").id = "InventoryArmorList"
    GetElement("ButtonArmorListOpen").id = "ButtonArmorList"
}



//Tábla betöltése
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
        GetElement(`InventoryArmor${i+1}Sell`).classList.add("tdClickable")
        SetText(`InventoryArmor${i+1}Sell`, "Sell")
        GetElement(`InventoryArmor${i+1}`).classList.add("tdClickable")
}

    for (let i = 0; i < 3; i++) {
        if (GetText(`InventoryArmor${i+1}`)=="") {
            GetElement(`InventoryArmor${i+1}`).classList.remove("tdClickable");
            SetText(`InventoryArmor${i+1}Sell`, "")
            GetElement(`InventoryArmor${i+1}Sell`).classList.remove("tdClickable");

            SetText(`InventoryArmor${i+1}Defense`, "")
            SetText(`InventoryArmor${i+1}DamageReduction`, "")
            SetText(`InventoryArmor${i+1}Durability`, "")
            SetText(`InventoryArmor${i+1}Durability`, "")
            SetText(`InventoryArmor${i+1}CurrentDurability`, "")
        }
    }
}




















//Pajzs törlése
function RemoveShield1(id) {
    if (GetElement(`InventoryShield${id}Sell`).classList.contains("tdClickable")) {
        let shield = GetShield(GetText(`InventoryShield${id}`))
        itemName = shield.name
        if (sellItem == false) {
            Message("Do you want to delete this shield?",2, ["", "RemoveShield2", "CloseShieldList"])
        } else if (sellItem == true) {
            let sellValue = GetSellValue(shield.name, "shield", GetText(`InventoryShield${id}CurrentDurability`))
            Message(`Do you want to sell this shield for ${sellValue} coins?`,2, ["", "RemoveShield2", "CloseShieldList"])
        }
        generalId = id
    
        //Tábla nyitvatartása üzenőablak közben
        GetElement("InventoryShieldList").id = "InventoryShieldListOpen"
        GetElement("ButtonShieldList").id = "ButtonShieldListOpen"    
    }
}

function RemoveShield2() {
    if (sellItem == true) {
        let shield = GetShield(itemName)
        SetCoins(shield.cost)
        //SetText("InventoryCoins", `${Number(GetText('InventoryCoins')) + shield.cost}`)
    }
    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));
    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));

    SetText("InventorySelectedShieldDurability", "")
    GetElement(`InventoryShield${generalId}`).classList.remove("tdSelected")
    SetText(`InventoryShield${generalId}`,"")
    SetText(`InventoryShield${generalId}Defense`,"");
    SetText(`InventoryShield${generalId}Durability`,"");
    SetText(`InventoryShield${generalId}CurrentDurability`,"");
    SetText(`InventoryShield${generalId}TwoHandedPenalty`,"");
    SetText(`InventoryShield${generalId}Sell`,"");
    SetText("InventorySelectedShieldSlot", "")

    ReloadShieldList()
    SetText(`InventorySelectedShield`,"none");
    SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense)
}


//Tábla becsukása
function CloseShieldList() {
    GetElement("InventoryShieldListOpen").id = "InventoryShieldList"
    GetElement("ButtonShieldListOpen").id = "ButtonShieldList"
}



//Tábla betöltése
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
        GetElement(`InventoryShield${i+1}Sell`).classList.add("tdClickable")
        SetText(`InventoryShield${i+1}Sell`, "Sell")
        GetElement(`InventoryShield${i+1}`).classList.add("tdClickable")
}


for (let i = 0; i < shieldListLength; i++) {
    if (GetText(`InventoryShield${i+1}`)=="") {
        GetElement(`InventoryShield${i+1}`).classList.remove("tdClickable");
        SetText(`InventoryShield${i+1}Sell`, "")
        GetElement(`InventoryShield${i+1}Sell`).classList.remove("tdClickable");

        SetText(`InventoryShield${i+1}Defense`, "")
        SetText(`InventoryShield${i+1}Durability`, "")
        SetText(`InventoryShield${i+1}CurrentDurability`, "")
        SetText(`InventoryShield${i+1}TwoHandedPenalty`, "")
    }
    }
}









function EnableInventory(type = 1) {
    if (type == 0) {
        //Disable
        for (let i = 0; i < weaponListLength; i++) {
            GetElement(`InventoryWeapon${i+1}`).classList.remove("tdClickable")
            GetElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdClickable")
        }
        for (let i = 0; i < armorListLength; i++) {
            GetElement(`InventoryArmor${i+1}`).classList.remove("tdClickable")
            GetElement(`InventoryArmor${i+1}Sell`).classList.remove("tdClickable")
        }
        for (let i = 0; i < shieldListLength; i++) {
            GetElement(`InventoryShield${i+1}`).classList.remove("tdClickable")
            GetElement(`InventoryShield${i+1}Sell`).classList.remove("tdClickable")
        }
        for (let i = 0; i < itemListLength; i++) {
            GetElement(`InventoryItem${i+1}Use`).classList.remove("tdClickable")
            GetElement(`InventoryItem${i+1}Sell`).classList.remove("tdClickable")
        }
        //Enable
    } else if (type == 1) {
        for (let i = 0; i < weaponListLength; i++) {
            if (GetText(`InventoryWeapon${i+1}`) != "") {
                GetElement(`InventoryWeapon${i+1}`).classList.add("tdClickable")
            }
            if (GetText(`InventoryWeapon${i+1}Sell`) != "") {
                GetElement(`InventoryWeapon${i+1}Sell`).classList.add("tdClickable")
            }
        }
        for (let i = 0; i < armorListLength; i++) {
            if (GetText(`InventoryArmor${i+1}`) != "") {
                GetElement(`InventoryArmor${i+1}`).classList.add("tdClickable")
            }
            if (GetText(`InventoryArmor${i+1}Sell`) != "") {
                GetElement(`InventoryArmor${i+1}Sell`).classList.add("tdClickable")
            }        }
        for (let i = 0; i < shieldListLength; i++) {
            if (GetText(`InventoryShield${i+1}`) != "") {
                GetElement(`InventoryShield${i+1}`).classList.add("tdClickable")
            }
            if (GetText(`InventoryShield${i+1}Sell`) != "") {
                GetElement(`InventoryShield${i+1}Sell`).classList.add("tdClickable")
            }        }
        for (let i = 0; i < itemListLength; i++) {
            if (GetText(`InventoryItem${i+1}Use`) != "") {
                GetElement(`InventoryItem${i+1}Use`).classList.add("tdClickable")
            }
            if (GetText(`InventoryItem${i+1}Sell`) != "") {
                GetElement(`InventoryItem${i+1}Sell`).classList.add("tdClickable")
            }        }
    
            //Enable expect sell
    } else if (type == 2) {
        for (let i = 0; i < weaponListLength; i++) {
            if (GetText(`InventoryWeapon${i+1}`) != "") {
                GetElement(`InventoryWeapon${i+1}`).classList.add("tdClickable")
            }

        }
        for (let i = 0; i < armorListLength; i++) {
            if (GetText(`InventoryArmor${i+1}`) != "") {
                GetElement(`InventoryArmor${i+1}`).classList.add("tdClickable")
            }
        }
        for (let i = 0; i < shieldListLength; i++) {
            if (GetText(`InventoryShield${i+1}`) != "") {
                GetElement(`InventoryShield${i+1}`).classList.add("tdClickable")
            }
        }
        for (let i = 0; i < itemListLength; i++) {
            if (GetText(`InventoryItem${i+1}Use`) != "") {
                GetElement(`InventoryItem${i+1}Use`).classList.add("tdClickable")
            }
       }
    }
}











function ChangeSelectedItem(id, type) {
    if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdClickable") && !GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelected")) {

        //Set name and slot id
        let itemName = GetText(`Inventory${capitalizeFirstLetter(type)}${id}`)
        SetText(`InventorySelected${capitalizeFirstLetter(type)}`, itemName)
        SetText(`InventorySelected${capitalizeFirstLetter(type)}Slot`, id)
        let item = GetGeneralItem(itemName, type)
        SetText(`InventorySelected${capitalizeFirstLetter(type)}Durability`, " (" + item.durability + "/" + GetText(`Inventory${capitalizeFirstLetter(type)}${id}CurrentDurability`) + ")")

        // GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.add("hover")
        // GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.remove("tdClickable")

        //Call set attributes function
        SetPlayerAttackDefense()

        //Item remain selected
        switch (type) {
            case "weapon":
                for (let i = 0; i < weaponListLength; i++) {
                    if (GetText(`InventoryWeapon${i+1}`) != "") {
                        GetElement(`InventoryWeapon${i+1}`).classList.remove("tdSelected")
                        GetElement(`InventoryWeapon${i+1}`).classList.add("tdClickable")    
                    }
                }
                GetElement(`InventoryWeapon${id}`).classList.add("tdSelected")
                //GetElement(`InventoryWeapon${id}`).classList.remove("tdClickable")
                break;

            case "armor":
                for (let i = 0; i < armorListLength; i++) {
                    GetElement(`InventoryArmor${i+1}`).classList.remove("tdSelected")
                    GetElement(`InventoryArmor${i+1}`).classList.add("tdClickable")
                }
                GetElement(`InventoryArmor${id}`).classList.add("tdSelected")
                //GetElement(`InventoryArmor${id}`).classList.remove("tdClickable")
                break;

            case "shield":
                for (let i = 0; i < shieldListLength; i++) {
                    GetElement(`InventoryShield${i+1}`).classList.remove("tdSelected")
                    GetElement(`InventoryShield${i+1}`).classList.add("tdClickable")
                }
                GetElement(`InventoryShield${id}`).classList.add("tdSelected")
                //GetElement(`InventoryShield${id}`).classList.remove("tdClickable")
                break;
        
            default:
                break;
        }

        //Disable while fighting after one action
        if (fighting == true) {
            EnableInventory(0)
            EnemyAction()
        }

    } else if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdSelected")) {

        //Deselect item
        //GetElement("PlayerActionItem").classList.contains("tdClickable")
        if (GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.contains("tdClickable")) {
            GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.remove("tdSelected")
            GetElement(`Inventory${capitalizeFirstLetter(type)}${id}`).classList.add("tdClickable")
    
            SetText(`InventorySelected${capitalizeFirstLetter(type)}`, "none")
            SetText(`InventorySelected${capitalizeFirstLetter(type)}Slot`, "")
            SetText(`InventorySelected${capitalizeFirstLetter(type)}Durability`, "")
            SetPlayerAttackDefense()
        }

        if (fighting == true) {
            EnableInventory(0)
            EnemyAction()
        }
    }
}
    
//     let itemName = null
//     switch (type) {
//         case "weapon":
//             itemName = GetText(`InventoryWeapon${id}`)
//             SetText("InventorySelectedWeapon", itemName)
//             SetText("InventorySelectedWeaponSlot", id)        
//             SetPlayerAttackDefense()

//             //Selected remain hover
//             for (let i = 0; i < weaponListLength; i++) {
//                 GetElement(`InventoryWeapon${i+1}`).classList.remove("hover")
//             }
//             GetElement(`InventoryWeapon${id}`).classList.add("hover")

//             break;
//         case "armor":
//             itemName = GetText(`InventoryArmor${id}`)
//             SetText("InventorySelectedArmor", itemName)
//             SetText("InventorySelectedArmorSlot", id)        
//             SetPlayerAttackDefense()

//             //Selected remain hover
//             for (let i = 0; i < armorListLength; i++) {
//                 GetElement(`InventoryArmor${i+1}`).classList.remove("hover")
//             }
//             GetElement(`InventoryArmor${id}`).classList.add("hover")
//             break;
//         case "shield":
//             itemName = GetText(`InventoryShield${id}`)
//             SetText("InventorySelectedShield", itemName)
//             SetText("InventorySelectedShieldSlot", id)        
//             SetPlayerAttackDefense()

//             //Selected remain hover
//             for (let i = 0; i < shieldListLength; i++) {
//                 GetElement(`InventoryShield${i+1}`).classList.remove("hover")
//             }
//             GetElement(`InventoryShield${id}`).classList.add("hover")
//             break

    
//         default:
//             break;
//     }
// }



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

    ReloadItemList("Fireball scroll")

    GetPlayer()
}

function dura1() {
    let player = GetPlayer()
    SetText(`InventorySelectedWeaponDurability`,"(" + player.weapon.durability + "/" + 1 + ")");
    SetText(`InventoryWeapon1CurrentDurability`, 1)
}





















// function ChangeSelectedArmor() {
//     let choosen = document.getElementById("InventoryArmorList").value;
//     let attack = Number(GetText("PlayerStartAttack"));
//     let defense = Number(GetText("PlayerStartDefense"));
//     let hp = Number(GetText("PlayerStartHp"));
//     let magic = Number(GetText("PlayerStartMagic"));
//     switch (choosen) {
//         case "Dagger":
//             SetPlayerAttributes(attack+1, defense, hp, magic, 2)
//             break;
//         case "Sword":
//             SetPlayerAttributes(attack+2, defense+1, hp, magic, 2)
//             break;
//         case "Spear":
//             SetPlayerAttributes(attack+4, defense, hp, magic, 2)
//             break;
//         default:
//             break;
//     }
// }




// const AreaWeaponList = document.getElementById("AreaWeaponList")
// AreaWeaponList.addEventListener("mouseleave", WeaponsHiddenSwitch(true))
// AreaWeaponList.addEventListener("mouseover", WeaponsHiddenSwitch(false))

// function WeaponsHiddenSwitch(hidden) {
//     if (hidden == true) {
//         Hidden("InventoryWeaponList", true)
//         document.getElementById("ButtonWeaponList").classList.remove("hover")    
//     } else {
//         Hidden("InventoryWeaponList", false)
//         Hidden("InventoryArmorList", true)
//         Hidden("InventoryShieldList", true)
//         document.getElementById("ButtonWeaponList").classList.add("hover")    
//     }
// }






function Percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 }



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

function FoundItem() {
    let item = FoundItemGenerator()
    alert(item[0] + ": " + item[1])
    switch (item[1]) {
        case "weapon":
            ReloadWeaponList(item[0])
            break;
    
        default:
            break;
    }
}


function FoundItemGenerator() {
    let random = 1 //RandomNumber(1,3)
    let item = ""
    let max = 0 

    switch (random) {

        case 1: //Fegyver
        random = RandomNumber(0,weaponList.length-1)
        Log(random)
        Log(weaponList[random].name)
        return [weaponList[random].name, "weapon"]

        case 2: //Páncél, pajzs
        random = RandomNumber(1,2)
        if (random == 1) {
            random = RandomNumber(0,armorList.length-1)
            Log(armorList[random].name)
            return GetArmor(armorList[random].name)    
        } else {
            random = RandomNumber(0,shieldList.length-1)
            Log(shieldList[random].name)
            return GetShield(shieldList[random].name)    
        }

        case 3: //Egyéb
        random = RandomNumber(0,itemList.length-1)
        Log(itemList[random].name)
        return GetOtherItem(itemList[random].name)

        default:
            break;
    }
    

    // for (let i = 0; i < weaponList.length; i++) {
        
    // }

    // if (weaponList[i].cost * 10 < max ) {
    //     random = RandomNumber(1,30)
    // }
    // else if (weaponList[i].cost * 7 < max ) {
    //     return Math.round(item.cost / 7)
    // }
    // else if (weaponList[i].cost * 4 < max ) {
    //     return Math.round(item.cost / 4)
    // }
    // else if (weaponList[i].cost * 3 < max ) {
    //     return Math.round(item.cost / 3)
    // }
    // else if (weaponList[i].cost * 2 < max ) {
    //     return Math.round(item.cost / 2)
    // }
    // else if (weaponList[i].cost * 1.7 < max ) {
    //     return Math.round(item.cost / 1.7)
    // }
    // else if (weaponList[i].cost * 1.5 < max ) {
    //     return Math.round(item.cost / 1.5)
    // }
    // else if (weaponList[i].cost * 1.3 < max ) {
    //     return Math.round(item.cost / 1.3)
    // }
    // else if (weaponList[i].cost * 1.1 < max) {
    //     return Math.round(item.cost / 1.1)
    // }
    //  else return item.cost

}

//Legnagyobb értékű tárgy megkeresése
function GetMaxCost(type) {
    let max = 0
    switch (type) {
        case 1: //Fegyver
            for (let i = 0; i < weaponList.length; i++) {
                if (weaponList[i].cost > max) max = weaponList[i].cost
            }
            return max
    
        default:
            break;
    }


}




//-/- Weapon list -\-\\
//Close
const AreaWeaponList = document.getElementById("AreaWeaponList")
AreaWeaponList.addEventListener("mouseleave", function() {

    //Id exists check
    if (document.getElementById("InventoryWeaponList") != null) {
        Hidden("InventoryWeaponList", true)
    }
    if (document.getElementById("ButtonWeaponList") != null) {
    document.getElementById("ButtonWeaponList").classList.remove("hover")
    }
})

//Open
AreaWeaponList.addEventListener("mouseover", function () {
    Hidden("InventoryWeaponList", false)
    Hidden("InventoryArmorList", true)
    Hidden("InventoryShieldList", true)
    document.getElementById("ButtonWeaponList").classList.add("hover")
})

//-/- Armor list -\-\\
//Close
const AreaArmorList = document.getElementById("AreaArmorList")
AreaArmorList.addEventListener("mouseleave", function() {
    //Id exists check
    if (document.getElementById("InventoryArmorList") != null) {
        Hidden("InventoryArmorList", true)
    }
    if (document.getElementById("ButtonArmorList") != null) {
    document.getElementById("ButtonArmorList").classList.remove("hover")
    }
})

//Open
AreaArmorList.addEventListener("mouseover", function () {
        Hidden("InventoryArmorList", false)
        Hidden("InventoryWeaponList", true)
        Hidden("InventoryShieldList", true)
        document.getElementById("ButtonArmorList").classList.add("hover")
})

//-/- Shield list -\-\\
//Close
const AreaShieldList = document.getElementById("AreaShieldList")
AreaShieldList.addEventListener("mouseleave", function() {
    //Id exists check
    if (document.getElementById("InventoryShieldList") != null) {
        Hidden("InventoryShieldList", true)
    }
    if (document.getElementById("ButtonShieldList") != null) {
    document.getElementById("ButtonShieldList").classList.remove("hover")
    }
})

//Open
AreaShieldList.addEventListener("mouseover", function () {
        Hidden("InventoryShieldList", false)
        Hidden("InventoryArmorList", true)
        Hidden("InventoryWeaponList", true)
        document.getElementById("ButtonShieldList").classList.add("hover")
})



//-/- Spell list -\-\\
const AreaSpellList = document.getElementById("AreaSpellList")
AreaSpellList.addEventListener("mouseleave", function() {
    Hidden("InventorySpellList", true)
    document.getElementById("ButtonSpellList").classList.remove("hover")
})
AreaSpellList.addEventListener("mouseover", function () {
    Hidden("InventorySpellList", false)
    document.getElementById("ButtonSpellList").classList.add("hover")
})


function ChangeChoosenSpell(id) {
    SetText("InventoryChoosenSpell", document.querySelector(`[id=InventorySpell${id}]`).innerHTML)
}




















//Tábla betöltése
function ReloadItemListtt(itemName = "") {
    let list = [];
    let listAmount = [];

    //Tárgyak lekérése
    for (let i = 0; i < itemListLength; i++) {
        list[i]=GetText(`InventoryItem${i+1}`)
        listAmount[i]=GetText(`InventoryItem${i+1}Amount`)

        // if (listAttack[i].includes(":")) {
        //     listAmount[i] = listAmount[i].split(":")[1]
        // }
    }
    //Üres helyek kiszedése
    let list2 = list.filter((str) => str !== '');
    let listAmount2 = listAmount.filter((str) => str !== '');


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
        GetElement(`InventoryWeapon${i+1}Sell`).classList.add("tdClickable")
        SetText(`InventoryWeapon${i+1}Sell`, "Sell")
        GetElement(`InventoryWeapon${i+1}`).classList.add("tdClickable")
}


for (let i = 0; i < 5; i++) {
    if (GetText(`InventoryWeapon${i+1}`)=="") {
        GetElement(`InventoryWeapon${i+1}`).classList.remove("tdClickable");
        SetText(`InventoryWeapon${i+1}Sell`, "")
        GetElement(`InventoryWeapon${i+1}Sell`).classList.remove("tdClickable");

        SetText(`InventoryWeapon${i+1}Attack`, "")
        SetText(`InventoryWeapon${i+1}Defense`, "")
        SetText(`InventoryWeapon${i+1}Damage`, "")
        SetText(`InventoryWeapon${i+1}Durability`, "")
        SetText(`InventoryWeapon${i+1}Durability`, "")
        SetText(`InventoryWeapon${i+1}CurrentDurability`, "")
    }
    }
}















































function ReloadItemList(itemName = null) {
    let item = null
    if (itemName != null) {
        item = GetOtherItem(`${itemName}`)
    }
    
    let list = [];
    let listAmount = [];
    //Get items
    for (let i = 0; i < itemListLength; i++) {
        list[i]=GetText(`InventoryItem${i+1}`)
        listAmount[i]=GetText(`InventoryItem${i+1}Amount`)

        if (listAmount[i].includes(":")) {
            listAmount[i]=Number(GetText(`InventoryItem${i+1}Amount`).split(":")[1])
        }
    }
    //alert(list+"           "+listAmount)

    //Remove blank elements
    let list2 = list.filter((str) => str !== '')
    let listAmount2 = listAmount.filter((str) => str !== '')

    


    // if (list2.includes(`${item}`)) {
    //     let a = GetText(`InventoryItem${i+1}Amount`);
    // }


        
    //Check if there are already items of the same kind
    if (item != null) {
        if (list2.includes(`${item.name}`)) {
            let a = list2.indexOf(`${item.name}`);
            //alert(a)s
            
            if (listAmount2[a]<item.stackSize) {
                listAmount2[a] += 1
            } 
      } else {
            list2.push(`${item.name}`)
            listAmount2.push(1)
            // let a = list2.indexOf(`${item}`);
            // listAmount[a] +=1;
       }
    }
    

            //Üres helyek a listák végére (undefined helyett)
            for (let i = 0; i < itemListLength; i++) {
                list2.push("")
                listAmount2.push("")
                //listAmount.push("")      
            }
            

   //alert(list+"           "+listAmount)
   //alert(listAmount[i])
    //Reload inventory
    for (let i = 0; i < itemListLength; i++) {
        
       //if (list2.includes(`${list2[i]}`)) {
        SetText(`InventoryItem${i+1}`, String(list2[i]))
        //alert(list2[i])
        //alert(list2+"         "+listAmount)
        //nothing
        // if (listAmount[i]==0) {
        //     listAmount[i]+=1
        // }
        //listAmount[i]+=1

        SetText(`InventoryItem${i+1}Amount`, "Amount: " + Number(listAmount2[i]))
        SetText(`InventoryItem${i+1}Use`, "Use")
        GetElement(`InventoryItem${i+1}Use`).classList.add("tdClickable")
        SetText(`InventoryItem${i+1}Sell`, "Sell")
        GetElement(`InventoryItem${i+1}Sell`).classList.add("tdClickable")

        //SetText(`InventoryItem${i+1}Amount`, Number(listAmount[i]))
        //alert(listAmount[i])
        //}
}
for (let i = 0; i < itemListLength; i++) {
    if (GetText(`InventoryItem${i+1}`) == "") {
        SetText(`InventoryItem${i+1}Amount`, "")
        SetText(`InventoryItem${i+1}Use`, "")
        GetElement(`InventoryItem${i+1}Use`).classList.remove("tdClickable")
        SetText(`InventoryItem${i+1}Sell`, "")
        GetElement(`InventoryItem${i+1}Sell`).classList.remove("tdClickable")
    }
}
}


function RemoveOtherItem(id) {
    let listAmount = [];
    //Get items
    for (let i = 0; i < 5; i++) {
        listAmount[i]=Number(document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML);
    }
    let a = GetText(`InventoryItem${id}`);
    let b = 0
    switch (id) {
        case 1:
            b=Number(GetText("InventoryItem1Amount"))
            if (b>1) {
            SetText("InventoryItem1Amount",`${listAmount[0]-1}`)
        }
            else {
                SetText("InventoryItem1","")
                SetText("InventoryItem1Amount","")
                ReloadPlayerItemList()
            }
            break;
        case 2:
            b=Number(GetText("InventoryItem2Amount"))
            if (b>1) {
            SetText("InventoryItem2Amount",`${listAmount[1]-1}`)  
        }
            else {
                SetText("InventoryItem2","")
                SetText("InventoryItem2Amount","")
                ReloadPlayerItemList()
            }
            break;
        case 3:
            b=Number(GetText("InventoryItem3Amount"))
            if (b>1) {
            SetText("InventoryItem3Amount",`${listAmount[2]-1}`)
            
        }
            else {
                SetText("InventoryItem3","")
                SetText("InventoryItem3Amount","")
                ReloadPlayerItemList()
            }
            break;
        case 4:
            b=Number(GetText("InventoryItem4Amount"))
            if (b>1) {
            SetText("InventoryItem4Amount",`${listAmount[3]-1}`)
        }
            else {
                SetText("InventoryItem4","")
                SetText("InventoryItem4Amount","")
                ReloadPlayerItemList()
            }
            break;
        case 5:
            b=Number(GetText("InventoryItem5Amount"))
            if (b>1) {
            SetText("InventoryItem5Amount",`${listAmount[4]-1}`)
        }
            else {
                SetText("InventoryItem5","")
                SetText("InventoryItem5Amount","")
                ReloadPlayerItemList()
            }
            break;
    
        default:
            break;
    }
}


function ReloadPlayerItemList() {
    let list = [];
    let listAmount = [];
    //Get items
    for (let i = 0; i < 5; i++) {
        list[i]=document.querySelector(`[id=InventoryItem${i+1}]`).innerHTML;
        listAmount[i]=Number(document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML);
        //alert(listAmount[i])
    }

    //Remove blanks
    let list2 = list.filter((str) => str !== '');
    let listAmount2 = listAmount.filter((str) => str !== 0);
    /*for (let i = 0; i < 5; i++) {
        alert(list2[i])
    }*/
    //Set blank to end (instead of undefined)
    //alert(listAmount)
    list2.push("")
    list2.push("")
    list2.push("")
    list2.push("")
    list2.push("")
    listAmount2.push(0)
    listAmount2.push(0)
    listAmount2.push(0)
    listAmount2.push(0)
    listAmount2.push(0)




    //Set new list
    for (let i = 0; i < 5; i++) {
            document.querySelector(`[id=InventoryItem${i+1}]`).innerHTML=String(list2[i]);
            document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML=Number(listAmount2[i]);
    }

    //Remove text
    for (let i = 0; i < 5; i++) {
        if (document.querySelector(`[id=InventoryItem${i+1}]`).innerHTML=="") {
            document.querySelector(`[id=InventoryItem${i+1}TextUse]`).classList.remove("tdClickable");
            document.querySelector(`[id=InventoryItem${i+1}TextDelete]`).classList.remove("tdClickable");
    
    
            document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML="";
            document.querySelector(`[id=InventoryItem${i+1}TextAmount]`).innerHTML="";
            document.querySelector(`[id=InventoryItem${i+1}TextUse]`).innerHTML="";
            document.querySelector(`[id=InventoryItem${i+1}TextDelete]`).innerHTML="";
    
        }
    }

    //alert(listAmount)
}































function AddSpelll(spell) {
    spell = GetSpell(`${spell}`)
    console.log(spell)

    let list = [];
    let listAmount = [0,0,0,0,0];
    //Get items
    for (let i = 0; i < 5; i++) {
        list[i]=document.querySelector(`[id=InventorySpell${i+1}]`).innerHTML;
        
        listAmount[i]=Number(document.querySelector(`[id=InventorySpell{i+1}Amount]`).innerHTML);
        
    }
    //alert(list+"           "+listAmount)

    //Remove blank elements
    let list2 = list.filter((str) => str !== '');


    // if (list2.includes(`${item}`)) {
    //     let a = GetText(`InventoryItem${i+1}Amount`);
    // }
        
    //Check if there are already items of the same kind
  if (list2.includes(`${spell.name}`)) {
        let a = list2.indexOf(`${spell.name}`);
        //alert(a)
        if (listAmount[a]<5)  listAmount[a] +=1;
  } else {
        list2.push(`${spell.name}`)
        // let a = list2.indexOf(`${item}`);
        // listAmount[a] +=1;
   }

   //alert(list+"           "+listAmount)
   //alert(listAmount[i])
    //Reload inventory
    for (let i = 0; i < 5; i++) {
       if (list2.includes(`${list2[i]}`)) {
        document.querySelector(`[id=InventoryItem${i+1}]`).innerHTML=String(list2[i]);
        //alert(list2[i])
        //alert(list2+"         "+listAmount)
        //nothing
        if (listAmount[i]==0) {
            listAmount[i]+=1
        }
        document.querySelector(`[id=InventoryItem${i+1}TextUse]`).classList.add("tdClickable");
        document.querySelector(`[id=InventoryItem${i+1}TextDelete]`).classList.add("tdClickable");

        document.querySelector(`[id=InventoryItem${i+1}TextAmount]`).innerHTML="Amount: ";
        document.querySelector(`[id=InventoryItem${i+1}TextUse]`).innerHTML="Use";
        document.querySelector(`[id=InventoryItem${i+1}TextDelete]`).innerHTML="Delete";

        document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML=Number(listAmount[i]);
        //alert(listAmount[i])

        }
}
}






function UseItem(id) {
    if (GetElement(`InventoryItem${id}Use`).classList.contains("tdClickable")) {
        sellItem = false
        let item = GetOtherItem(GetText(`InventoryItem${id}`))
    
        //Learn spell
        if (item.spellId != null && fighting == false) {
            let spell = GetSpellById(item.spellId)
            let difficulty = GetText("SettingsLabelDifficulty")
            let player = GetPlayer()
    
            // SetText("MessageButtonYes", "Yes")
            // GetElement("MessageButtonYes").style.width = "49%"
            // GetElement("MessageButtonNo").style.width = "49%"
            // SetText("MessageButtonNo", "No")
            // Hidden("MessageButtonNo", false)
    
                switch (difficulty) {
                    case "medium":
                        if (player.magic >= spell.cost) {
                            // SetText("NextFunction", "LearnSpell")
                            itemName = spell.name
                            spellCost = (spell.cost * 2)-2
                            generalId = id
                            Message(`Do you want to learn this spell for ${(spell.cost * 2)-2} Magic?`,2, ["", "LearnSpell", ""])
                        } else {
                            // SetText("MessageButtonYes", "Continue")
                            // SetText("NextFunction", "")
                            // Hidden("MessageButtonNo", true)
                            Message(`You don't have enough magic to learn this spell!`,1, ["", "", ""])
                        }
                        break;
                    default:
                        break;
                }
    
    
        //Use spell
        } else if (item.spellId != null && fighting == true)  {
            generalId = id
            itemType = "item"
            itemName = item.name
            RemoveItem2()    
            PlayerActionSpell(item.name)
    
            //Food
        } else if (item.name == "Food") {
            let id = FindItemInInventory("Food")+1
            
            let hpCurrent = Number(GetText("PlayerCurrentHp"))
            let hpStart = Number(GetText("PlayerStartHp"))
            if (hpCurrent == hpStart) {
                Message("You don't need to eat",1, ["","",""])
            } else {
                itemType = "item"
                itemName = item.name
                generalId = id
                RemoveItem2()
                //RemoveFromPlayerItemList(id)
                let hpGained = Number(RandomNumber(1,6))
                if (hpGained + hpCurrent > hpStart) {
                    hpGained = hpStart - hpCurrent
                }
                SetText("PlayerCurrentHp", hpGained + hpCurrent)
                Message(`You gained ${hpGained} Hp`,1, ["","",""])
            }
        }
        if (fighting == true) {
            EnableInventory(0)
        }
    
    }
}
function fodd() {
    AddItem(null, "Food")
    AddItem(null, "Food")
    AddItem(null, "Food")
    AddItem(null, "Food")
}


//Varázslat megtanulása
function AddSpell(spellName) {
    let spell = GetSpell(spellName)
    for (let i = 1; i < 4; i++) {
        let a = document.querySelector(`[id=InventorySpell${i}]`).innerHTML
        if (a == "") {
            document.querySelector(`[id=InventorySpell${i}]`).innerHTML = spellName
            document.querySelector(`[id=InventorySpell${i}Type]`).innerHTML = `Type: ${spell.type}`
            document.querySelector(`[id=InventorySpell${i}Attack]`).innerHTML = `Attack: ${spell.attack}`
            document.querySelector(`[id=InventorySpell${i}Defense]`).innerHTML = `Defense: ${spell.defense}`
            document.querySelector(`[id=InventorySpell${i}Hp]`).innerHTML = `Hp: ${spell.hp}`
            document.querySelector(`[id=InventorySpell${i}Cost]`).innerHTML = `Cost: ${spell.cost}`
            document.querySelector(`[id=InventorySpell${i}]`).className = "tdClickable"
            break
        }
    }
}

function LearnSpell(spellName) {
    itemType = "item"
    itemName = spellName
    RemoveItem2()
    //RemoveFromPlayerItemList(itemId)
    AddSpell(spellName)

    let magic = GetText("PlayerCurrentMagic")
    SetText("PlayerCurrentMagic", magic-spellCost)
}







function FindItemInInventory(itemName) {
    let itemId = 0

    //Get items
    for (let i = 0; i < 5; i++) {
        if (document.querySelector(`[id=InventoryItem${i+1}]`).innerHTML == itemName) {
            itemId = i
            return itemId
        }
    }
}



















//Vásárlás érzékelése
let addItem = document.querySelector("[id*=BuyWeapon]")

document.body.addEventListener("click", (event) => {

    //Fegyver
    if (event.target.id.includes('BuyWeapon') ) {
        let weapon = GetWeapon(event.target.innerHTML)
        itemName = weapon.name
        itemType = "weapon"
        let coins = Number(GetText("InventoryCoins"))

        //Van e elég pénz a vásárlásra
        if (coins < weapon.cost) {
            Message("You don't have enough money to buy this item!",1, ["", "", ""])
        } else {
            //Van e elég hely a vásárlásra
            let count = 0
            for (let i = 0; i < 5; i++) {         
                if (GetText(`InventoryWeapon${i+1}`) != "") {
                    count++
                }
            }
            if (count < weaponListLength) {
                Message(`Do you want to buy this item for ${weapon.cost} coins?`,2, ["", "BuyFromShop", ""])
                shopId = event.target.id    
            } else {
                // SetText("NextFunction", "")
                Message("You don't have enough space for this item!",1, ["", "", ""])
            }
        }
    }

    //Páncél
    if (event.target.id.includes('BuyArmor') ) {
        let armor = null
        // let itemType = ""
        if (event.target.innerHTML.includes("shield")) {
            armor = GetShield(event.target.innerHTML)
            itemType = "shield"
        } else {
            armor = GetArmor(event.target.innerHTML)
            itemType = "armor"
        }

        itemName = armor.name
        
        let coins = Number(GetText("InventoryCoins"))
    
        //Van e elég pénz a vásárlásra
        if (coins < armor.cost) {
            Message("You don't have enough money to buy this item!",1, ["", "", ""])
        } else {
            //Van e elég hely a vásárlásra
            let count = 0
            for (let i = 0; i < 3; i++) {         
                if (GetText(`InventoryArmor${i+1}`) != "") {
                    count++
                }
            }
            if (count < armorListLength) {
                Message(`Do you want to buy this item for ${armor.cost} coins?`,2, ["", "BuyFromShop", ""])
                shopId = event.target.id    
            } else {
                // SetText("NextFunction", "")
                Message("You don't have enough space for this item!",1, ["", "", ""])
            }
        }
    }

        //Item
       else if (event.target.id.includes('BuyItem') ) {
            let item = GetOtherItem(event.target.innerHTML)
            itemName = item.name
            itemType = "item"
            let coins = Number(GetText("InventoryCoins"))
    
            //Van e elég pénz a vásárlásra
            if (coins < item.cost) {
                Message("You don't have enough money to buy this item!",1, ["", "", ""])
            } else {
                //Van e elég hely a vásárlásra
                let count = 0
                let slotId = null
                let stackCount = 0
                for (let i = 0; i < itemListLength; i++) {         
                    if (GetText(`InventoryItem${i+1}`) != "") {
                        count++
                    }
                    if (GetText(`InventoryItem${i+1}`) == item.name) {
                        slotId = i+1
                    }
                }

                //Add to existing item
                if (slotId != null) {
                    let amount = GetText(`InventoryItem${slotId}Amount`).split(" ")[1]
                    if (amount == item.stackSize) {
                        Message("You don't have enough space for this item!",1, ["", "", ""])
                    } else {
                        Message(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", ""])
                        shopId = event.target.id    
                    }

                    //Add new item
                } else {
                    if (count < itemListLength) {
                        Message(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", ""])
                        shopId = event.target.id    
                    } else {
                        // SetText("NextFunction", "")
                        Message("You don't have enough space for this item!",1, ["", "", ""])
                    }
                }
            }
        }
})


function BuyFromShop(itemName, itemType) {
    
    let item = null
    let coins = 0

    //-/- Add item -\-\\ 
    switch (itemType) {
        case "weapon":
            ReloadWeaponList(itemName)
            break;
        case "armor":
            ReloadArmorList(itemName)
            break;
        case "shield":
            ReloadShieldList(itemName)
            break;
        case "item":
            ReloadItemList(itemName)
            break;
    
        default:
            break;
    }

    //-/- Update shop -\-\\
    coins = GetText("InventoryCoins")
    item = GetGeneralItem(itemName, itemType)
    SetText("InventoryCoins", `${coins-item.cost}`)

    let newAmount = GetText(shopId + "Amount")
    newAmount=newAmount.replace("(", "")
    newAmount=newAmount.replace(")", "")
    newAmount=Number(newAmount)-1
   
    //-1
    if (newAmount > 0) {
        SetText(shopId+"Amount", "(" + newAmount + ")")

    //0
    } else {
        SetText(shopId, "")
        SetText(shopId+"Amount", "")

        GetElement(shopId).title = ""
        GetElement(shopId).className = ""
        GetElement(shopId).id = ""    

        GetElement(shopId+"Amount").className = ""
        GetElement(shopId+"Amount").id = ""    
    }
}


$( function() {
    $( document ).tooltip();
  } );


function LoadShop() {
    // SetText("MessageButtonYes", "Yes")
    // SetText("MessageButtonNo", "No")
    // Hidden("MessageButtonNo", false)
    // GetElement("MessageButtonYes").style.width = "49%"
    // GetElement("MessageButtonNo").style.width = "49%"



    getData(`${route}weapon`).then((weapon) => {
        getData(`${route}armor`).then((armor) => {
            getData(`${route}item`).then((item) => {
                const Table = document.getElementById("tbodyShop");


    for(let i = 0; i<6; i++)  {           
        const row = Table.insertRow();

    let td = row.insertCell()

     //-/- Weapon -\-\\
     if (weapon[i] != undefined) {
        td.innerHTML =`<td>${weapon[i].weaponName}</td>`;
        td.title = "Cost: " + weapon[i].weaponCost + ", attack: " + weapon[i].weaponAttack + ", defense: " + weapon[i].weaponDefense + ", damage: " + weapon[i].weaponDamage + ", durability: " + weapon[i].weaponDurability 

        td.className = "tdClickable BuyWeapon";
        //tdd.setAttribute('onclick', `BuyWeapon( (GetText('BuyWeapon1')) )`);
         td.id = `BuyWeapon${i+1}`
        // tdd.onclick = BuyWeapon()

        //Amount
        td = row.insertCell()
        td.innerHTML =`<td>(${RandomNumber(1,3)})</td>`
        td.id = `BuyWeapon${i+1}Amount`

    } else {
        tdd = row.insertCell()  //Insert empty cell
    }

    //-/- Defenses -\-\\
    if (armor[i] != undefined) {
        td = row.insertCell()
        td.appendChild(document.createTextNode(`${armor[i].armorName}`));
        td.title = "Cost: " + armor[i].armorCost + ", defense: " + armor[i].armorDefense + ", damageReduction: " + armor[i].armorDamageReduction + ", durability: " + armor[i].armorDurability + ", two handed penalty: " + armor[i].twoHandedPenalty

        td.className = "tdClickable";
        td.id = `BuyArmor${i+1}`

        //Amount
        td = row.insertCell()
        td.innerHTML =`<td>(${RandomNumber(1,3)})</td>`
        td.id = `BuyArmor${i+1}Amount`


    } else {
        td = row.insertCell()  //Insert empty cell
        td = row.insertCell()  //Insert empty cell
    }

    //-/- Item -\-\\
    if (item[i] != undefined) {
        td = row.insertCell()
        td.appendChild(document.createTextNode(`${item[i].itemName}`));
        td.title = "Cost: " + item[i].itemCost + ", stack size: " + item[i].stackSize

        td.className = "tdClickable";
        td.id = `BuyItem${i+1}`

        //Amount
        td = row.insertCell()
        td.innerHTML =`<td>(${RandomNumber(1,3)+item[i].stackSize})</td>`
        td.id = `BuyItem${i+1}Amount`


    } else {
        td = row.insertCell()  //Insert empty cell
        td = row.insertCell()  //Insert empty cell
    }

    
    }; 
            })
        })
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}







/*
Comments
*/
//-/- wwwwwwwww -\-\\