
//-/- Vásárlás -\-\\
document.body.addEventListener("click", (event) => {

    // Fegyver, páncél, pajzs
    if (event.target.id.includes('BuyWeapon') || event.target.id.includes('BuyArmor')) {
        unselectId = event.target.id
        let item = null 
        let listLength = 0
        

        if (event.target.id.includes('BuyWeapon') ) {
            item = GetWeapon(event.target.innerHTML)
            itemType = "weapon"
            listLength = weaponListLength
        } 
        if (event.target.id.includes('BuyArmor') && event.target.innerHTML.includes("armor")) {
            item = GetArmor(event.target.innerHTML)
            itemType = "armor"
            listLength = armorListLength
        } 
        if (event.target.id.includes('BuyArmor') && event.target.innerHTML.includes("shield")) {
            item = GetShield(event.target.innerHTML)
            itemType = "shield"
            listLength = shieldListLength
        } 

        itemName = item.name
        
        let coins = Number(GetText("InventoryCoins"))

        //Van e elég pénz a vásárlásra
        if (coins < item.cost) {
            AddClass(event.target.id, "tdSelected", 1)
            Message("You don't have enough money to buy this item!",1, ["UnselectElement", "", ""])
        } else {
            //Van e elég hely a vásárlásra
            let count = 0
            for (let i = 0; i < listLength; i++) {      
                if (GetText(`Inventory${capitalizeFirstLetter(itemType)}${i+1}`) != "") {
                    count++
                }
            }
            if (count < listLength) {
                AddClass(event.target.id, "tdSelected", 1)
                Message(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", "UnselectElement"])
                shopId = event.target.id
            } else {
                AddClass(event.target.id, "tdSelected", 1)
                Message("You don't have enough space for this item!",1, ["UnselectElement", "", ""])
            }
        }
    }


        //Egyéb tárgy
       else if (event.target.id.includes('BuyItem') || event.target.id.includes('BuyScroll')) {
            unselectId = event.target.id
            let item = null
            let coins = Number(GetText("InventoryCoins"))

            if (event.target.id.includes('BuyItem') ) {
                item = GetItem(event.target.innerHTML)
                itemType = "item"
            } 
            if (event.target.id.includes('BuyScroll') ) {
                item = GetScroll(event.target.innerHTML)
                itemType = "scroll"
            } 

            itemName = item.name
            

    

            //Van e elég pénz a vásárlásra
            if (coins < item.cost) {
                AddClass(event.target.id, "tdSelected", 1)
                Message("You don't have enough money to buy this item!",1, ["UnselectElement", "", ""])
            } else {
                //Van e elég hely a vásárlásra
                let count = 0
                let slotId = null
                for (let i = 0; i < itemListLength; i++) {         
                    if (GetText(`InventoryItem${i+1}`) != "") {
                        count++
                    }
                    if (GetText(`InventoryItem${i+1}`) == item.name) {
                        slotId = i+1
                    }
                }

                //Van már ilyen tárgy
                if (slotId != null) {
                    let amount = GetText(`InventoryItem${slotId}Amount`).split(" ")[1]
                    if (amount == item.stackSize) {
                        AddClass(event.target.id, "tdSelected", 1)
                        Message("You don't have enough space for this item!",1, ["UnselectElement", "", ""])
                    } else {
                        AddClass(event.target.id, "tdSelected", 1)
                        unselectId = event.target.id
                        Message(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", "UnselectElement"])
                        shopId = event.target.id    
                    }

                    //Új tárgy
                } else {
                    if (count < itemListLength) {
                        AddClass(event.target.id, "tdSelected", 1)
                        Message(`Do you want to buy this item for ${item.cost} coins?`,2, ["", "BuyFromShop", "UnselectElement"])
                        shopId = event.target.id    
                    } else {
                        Message("You don't have enough space for this item!",1, ["UnselectElement", "", ""])
                    }
                }
            }
        }
})



//-/- Vásárlás -\-\\
function BuyFromShop(itemName, itemType) {
    UnselectElement()
    
    let item = null
    let coins = 0

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
        case "scroll":
            ReloadItemList(itemName, "scroll", true)
            break;
        case "item":
            item = GetItem(itemName)
            if (item.usable == true) {
                ReloadItemList(itemName, "item", true)
            } else {
                ReloadItemList(itemName, "item", false)
            }
            break;
    
        default:
            break;
    }

    coins = GetText("InventoryCoins")
    item = GetGeneralItem(itemName, itemType)
    SetText("InventoryCoins", `${coins-item.cost}`)

    //Több azonos tárgy esetén
    if (itemType == "item") {
        
    
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
    } else {
        SetText(shopId, "")
        GetElement(shopId).title = ""
        GetElement(shopId).className = ""
        GetElement(shopId).id = ""    
    }

}





function UnselectElement() {
    AddClass(unselectId, "tdSelected", 0)
    AddClass(unselectId, "buttonSelected", 0)
}


$( function() {
    $( document ).tooltip();
  } );

















  


function LoadTable(table) {
    switch (table) {
        case "Shop": if (shopLoaded == false) {
            SetText("tbodyShop", "")
            SetText("tbodyShop2", "")
            LoadShop()
            shopLoaded = true
        }
            break;
    
        default:
            break;
    }
}



//-/- Bolt betöltése -\-\\
function LoadShop() {
    getData(`${route}weapon`).then((weapon) => {
        getData(`${route}armor`).then((armor) => {
            getData(`${route}scroll`).then((scroll) => {
                const Table = GetElement("tbodyShop")
                const Table2 = GetElement("tbodyShop2")


    for(let i = 0; i<6; i++)  {           
        const row = Table.insertRow();

    let td = row.insertCell()

     //-/- Weapon -\-\\
     if (weapon[i] != undefined) {
        td.innerHTML =`<td>${weapon[i].weaponName}</td>`;
        td.title = "Cost: " + weapon[i].weaponCost + ", attack: " + weapon[i].weaponAttack + ", defense: " + weapon[i].weaponDefense + ", damage: " + weapon[i].weaponDamage + ", durability: " + weapon[i].weaponDurability 

        td.className = "tdSelectable BuyWeapon";
        //tdd.setAttribute('onclick', `BuyWeapon( (GetText('BuyWeapon1')) )`);
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
            //tdd.setAttribute('onclick', `BuyWeapon( (GetText('BuyWeapon1')) )`);
             td.id = `BuyItem${i+1}`
            // tdd.onclick = BuyWeapon()
    
            //Amount
            td = row.insertCell()
            if (itemList[i].shopAmount.includes('-')) {
                let min = Number(itemList[i].shopAmount.split('-')[0])
                let max = Number(itemList[i].shopAmount.split('-')[1])
                td.innerHTML =`<td>(${RandomNumber(min,max)})</td>`
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
function OpenTown() {
    text = GetText("ButtonTown")

    //Enter
    if (text == "Enter town") {
        Hidden('ButtonReloadShop', false)
        Hidden('DivShop', false)
        Hidden('DivFight', true)
        LoadTable('Shop')
        SetText("ButtonTown", "Leave town")
        //Leave
    } else {
        SetText("ButtonTown", "Enter town")
        Hidden('ButtonReloadShop', true)
        Hidden('DivShop', true)
        Hidden('DivFight', false)
    }
}

//-/- Bolt újra töltés -\-\\
function ReloadShop1() {
    AddClass("ButtonReloadShop", "buttonSelected", 1)
    let cost = 0
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
    let coins = GetText("InventoryCoins")
    if (cost > coins) {
        unselectId = "ButtonReloadShop"
        Message(`You need ${cost} coins to reload the shop!`, 1, ["UnselectElement", "", ""])
    } else {
        unselectId = "ButtonReloadShop"
        Message(`Do you want to reload the shop for ${cost} coins?`, 2, ["", "ReloadShop2", "UnselectElement"])
    }
}

function ReloadShop2() {
    AddClass("ButtonReloadShop", "buttonSelected", 0)
    let cost = 0
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
    SetCoins(-cost)
    shopLoaded = false
    LoadTable('Shop')
}
