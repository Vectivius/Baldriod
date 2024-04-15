
//-/- Vásárlás -\-\\
document.body.addEventListener("click", (event) => {

    // Fegyver, páncél, pajzs
    if (event.target.id.includes('BuyWeapon') || event.target.id.includes('BuyArmor')) {
        unselectId = event.target.id
        let item = null 
        let listLength = 0
        

        if (event.target.id.includes('BuyWeapon') ) {
            item = getWeapon(event.target.innerHTML)
            itemType = "weapon"
            listLength = weaponListLength
        } 
        if (event.target.id.includes('BuyArmor') && event.target.innerHTML.includes("armor")) {
            item = getArmor(event.target.innerHTML)
            itemType = "armor"
            listLength = armorListLength
        } 
        if (event.target.id.includes('BuyArmor') && event.target.innerHTML.includes("shield")) {
            item = getShield(event.target.innerHTML)
            itemType = "shield"
            listLength = shieldListLength
        } 

        itemName = item.name
        
        let coins = Number(getText("InventoryCoins"))

        //Van e elég pénz a vásárlásra
        if (coins < item.cost) {
            addClass(event.target.id, "tdSelected", 1)
            sendMessage("You don't have enough money to buy this item!",1, ["deselectItems", "", ""])
        } else {
            //Van e elég hely a vásárlásra
            let count = 0
            for (let i = 0; i < listLength; i++) {      
                if (getText(`Inventory${capitalizeFirstLetter(itemType)}${i+1}`) != "") {
                    count++
                }
            }
            if (count < listLength) {
                addClass(event.target.id, "tdSelected", 1)
                sendMessage(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", "deselectItems"])
                shopId = event.target.id
            } else {
                addClass(event.target.id, "tdSelected", 1)
                sendMessage("You don't have enough space for this item!",1, ["deselectItems", "", ""])
            }
        }
    }


        //Egyéb tárgy
       else if (event.target.id.includes('BuyItem') || event.target.id.includes('BuyScroll')) {
            unselectId = event.target.id
            let item = null
            let coins = Number(getText("InventoryCoins"))

            if (event.target.id.includes('BuyItem') ) {
                item = getItem(event.target.innerHTML)
                itemType = "item"
            } 
            if (event.target.id.includes('BuyScroll') ) {
                item = getScroll(event.target.innerHTML)
                itemType = "scroll"
            } 

            itemName = item.name
            

    

            //Van e elég pénz a vásárlásra
            if (coins < item.cost) {
                addClass(event.target.id, "tdSelected", 1)
                sendMessage("You don't have enough money to buy this item!",1, ["deselectItems", "", ""])
            } else {
                //Van e elég hely a vásárlásra
                let count = 0
                let slotId = null
                for (let i = 0; i < itemListLength; i++) {         
                    if (getText(`InventoryItem${i+1}`) != "") {
                        count++
                    }
                    if (getText(`InventoryItem${i+1}`) == item.name) {
                        slotId = i+1
                    }
                }

                //Van már ilyen tárgy
                if (slotId != null) {
                    let amount = getText(`InventoryItem${slotId}Amount`).split(" ")[1]
                    if (amount == item.stackSize) {
                        addClass(event.target.id, "tdSelected", 1)
                        sendMessage("You don't have enough space for this item!",1, ["deselectItems", "", ""])
                    } else {
                        addClass(event.target.id, "tdSelected", 1)
                        unselectId = event.target.id
                        sendMessage(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", "deselectItems"])
                        shopId = event.target.id    
                    }

                    //Új tárgy
                } else {
                    if (count < itemListLength) {
                        addClass(event.target.id, "tdSelected", 1)
                        sendMessage(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", "deselectItems"])
                        shopId = event.target.id    
                    } else {
                        sendMessage("You don't have enough space for this item!",1, ["deselectItems", "", ""])
                    }
                }
            }
        }
})



//-/- Vásárlás -\-\\
function buyFromShop(itemName, itemType) {

    deselectItems()
    deselectItems()
    
    let item = null
    let coins = 0

    switch (itemType) {
        case "weapon":
            reloadWeaponList(itemName)
            break;
        case "armor":
            reloadArmorList(itemName)
            break;
        case "shield":
            reloadShieldList(itemName)
            break;
        case "scroll":
            reloadItemList(itemName, "scroll", true)
            break;
        case "item":
            item = getItem(itemName)
            if (item.usable == true) {
                reloadItemList(itemName, "item", true)
            } else {
                reloadItemList(itemName, "item", false)
            }
            break;
    
        default:
            break;
    }

    coins = getText("InventoryCoins")
    item = getGeneralItem(itemName, itemType)
    setText("InventoryCoins", `${coins-item.cost}`)

    //Több azonos tárgy esetén
    if (itemType == "item") {
        
    
        let newAmount = getText(shopId + "Amount")
        newAmount=newAmount.replace("(", "")
        newAmount=newAmount.replace(")", "")
        newAmount=Number(newAmount)-1
       
        //-1
        if (newAmount > 0) {
            setText(shopId+"Amount", "(" + newAmount + ")")
    
        //0
        } else {
            setText(shopId, "")
            setText(shopId+"Amount", "")
    
            getElement(shopId).title = ""
            getElement(shopId).className = ""
            getElement(shopId).id = ""    
    
            getElement(shopId+"Amount").className = ""
            getElement(shopId+"Amount").id = ""    
        }
    } else {
        setText(shopId, "")
        getElement(shopId).title = ""
        getElement(shopId).className = ""
        getElement(shopId).id = ""    
    }

}





function unselectElement() {
    addClass(unselectId, "tdSelected", 0)
    addClass(unselectId, "buttonSelected", 0)
}


$( function() {
    $( document ).tooltip();
  } );

















  


function loadTable(table) {
    switch (table) {
        case "Shop": if (shopLoaded == false) {
            setText("tbodyShop", "")
            setText("tbodyShop2", "")
            loadShop()
            shopLoaded = true
        }
            break;
    
        default:
            break;
    }
}



//-/- Bolt betöltése -\-\\
function loadShop() {
    getData(`${route}weapon`).then((weapon) => {
        getData(`${route}armor`).then((armor) => {
            getData(`${route}scroll`).then((scroll) => {
                const Table = getElement("tbodyShop")
                const Table2 = getElement("tbodyShop2")


    for(let i = 0; i<6; i++)  {           
        const row = Table.insertRow();

    let td = row.insertCell()

     //-/- Weapon -\-\\
     if (weapon[i] != undefined) {
        td.innerHTML =`<td>${weapon[i].weaponName}</td>`;
        td.title = "Cost: " + weapon[i].weaponCost + ", attack: " + weapon[i].weaponAttack + ", defense: " + weapon[i].weaponDefense + ", damage: " + weapon[i].weaponDamage + ", durability: " + weapon[i].weaponDurability 

        td.className = "tdSelectable BuyWeapon";
        //tdd.setAttribute('onclick', `BuyWeapon( (getText('BuyWeapon1')) )`);
         td.id = `BuyWeapon${i+1}`
        // tdd.onclick = BuyWeapon()

    } else {
        //tdd = row.insertCell()  //Insert empty cell
    }

    //-/- Defenses -\-\\
    if (armor[i] != undefined) {
        td = row.insertCell()
        td.appendChild(document.createTextNode(`${armor[i].armorName}`));
        td.title = "Cost: " + armor[i].armorCost + ", defense: " + armor[i].armorDefense + ", damageReduction: " + armor[i].armorDamageReduction + ", durability: " + armor[i].armorDurability + ", two handed penalty: " + armor[i].twoHandedPenalty

        td.className = "tdSelectable";
        td.id = `BuyArmor${i+1}`

    } else {
        td = row.insertCell()  //Insert empty cell
       // td = row.insertCell()  //Insert empty cell
    }

    //-/- Scroll -\-\\
    if (scroll[i] != undefined) {
        td = row.insertCell()
        td.appendChild(document.createTextNode(`${scroll[i].scrollName}`));
        td.title = "Cost: " + scroll[i].scrollCost

        td.className = "tdSelectable";
        td.id = `BuyScroll${i+1}`


    } else {
        td = row.insertCell()  //Insert empty cell
        //td = row.insertCell()  //Insert empty cell
    }
    }

    for (let i = 0; i < itemList.length; i++) {
        const row = Table2.insertRow();

        let td = row.insertCell()
    
         if (itemList[i] != undefined) {
            td.innerHTML =`<td>${itemList[i].name}</td>`;
            td.title = "Cost: " + itemList[i].cost 
    
            td.className = "tdSelectable BuyItem";
            //tdd.setAttribute('onclick', `BuyWeapon( (getText('BuyWeapon1')) )`);
             td.id = `BuyItem${i+1}`
            // tdd.onclick = BuyWeapon()
    
            //Amount
            td = row.insertCell()
            if (itemList[i].shopAmount.includes('-')) {
                let min = Number(itemList[i].shopAmount.split('-')[0])
                let max = Number(itemList[i].shopAmount.split('-')[1])
                td.innerHTML =`<td>(${randomNumber(min,max)})</td>`
            } else {
                td.innerHTML =`<td>(1)</td>`
            }
            td.id = `BuyItem${i+1}Amount`
    
        } else {
            tdd = row.insertCell()  //Insert empty cell
        }
    }




            })
        })
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}








//-/- Be vagy ki a városból -\-\\
function openTown() {
    text = getText("ButtonTown")

    //Enter
    if (text == "Enter town") {
        hidden('ButtonReloadShop', false)
        hidden('DivShop', false)
        hidden('DivFight', true)
        loadTable('Shop')
        setText("ButtonTown", "Leave town")
        //Leave
    } else {
        setText("ButtonTown", "Enter town")
        hidden('ButtonReloadShop', true)
        hidden('DivShop', true)
        hidden('DivFight', false)
    }
}

//-/- Bolt újra töltés -\-\\
function reloadShop1() {
    addClass("ButtonReloadShop", "buttonSelected", 1)
    let cost = 0
    let difficulty = getText("SettingsLabelDifficulty")
    switch (difficulty) {
        case "easy":
            cost = 15
            break;

        case "medium":
            cost = 20
            break;

        case "hard":
            cost = 30
            break;
    
        default:
            break;
    }
    let coins = getText("InventoryCoins")
    if (cost > coins) {
        unselectId = "ButtonReloadShop"
        sendMessage(`You need ${cost} coins to reload the shop!`, 1, ["deselectItems", "", ""])
    } else {
        unselectId = "ButtonReloadShop"
        sendMessage(`Do you want to reload the shop for ${cost} coins?`, 2, ["", "ReloadShop2", "deselectItems"])
    }
}

function reloadShop2() {
    addClass("ButtonReloadShop", "buttonSelected", 0)
    let cost = 0
    let difficulty = getText("SettingsLabelDifficulty")
    switch (difficulty) {
        case "easy":
            cost = 20
            break;

        case "medium":
            cost = 30
            break;

        case "hard":
            cost = 40
            break;
    
        default:
            break;
    }
    setCoins(-cost)
    shopLoaded = false
    loadTable('Shop')
}