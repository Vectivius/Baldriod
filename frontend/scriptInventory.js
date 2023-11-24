function ChangeChoosenWeapon(id) {
    let choosen = document.querySelector(`[id=InventoryWeapon${id}]`).innerHTML;
    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));

    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));
    switch (choosen) {
        case "Dagger":
            SetPlayerAttackDefense(attack+1-minusAttack, defense-minusDefense)
            SetText("InventoryChoosenWeapon", "Dagger")
            break;
        case "Axe":
            SetPlayerAttackDefense(attack+2-minusAttack, defense-minusDefense)
            SetText("InventoryChoosenWeapon", "Axe")
            break;
        case "Sword":
            SetPlayerAttackDefense(attack+2-minusAttack, defense+1-minusDefense)
            SetText("InventoryChoosenWeapon", "Sword")
            break;
        case "Spear":
            SetPlayerAttackDefense(attack+4-minusAttack, defense-minusDefense)
            SetText("InventoryChoosenWeapon", "Spear")
            break;
        case "Halberd":
            SetPlayerAttackDefense(attack+3-minusAttack, defense-minusDefense)
            SetText("InventoryChoosenWeapon", "Halberd")
            break;
        default:
            break;
    }
}


function RemoveFromInventoryWeaponList(id) {
    let a = GetText(`InventoryWeapon${id}`);
    let b = GetText(`InventoryChoosenWeapon`);

    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));
    let minusAttack = Number(GetText("PlayerMinusAttack"));
    let minusDefense = Number(GetText("PlayerMinusDefense"));
    switch (id) {
        case 1:
            SetText("InventoryWeapon1","")
            ReloadInventoryWeaponList()
            if (a==b) {
                SetText(`InventoryChoosenWeapon`,"");
                SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense)
                //SetPlayerAttributes(attack,defense,hp,magic);
            }
            break;
        case 2:
            SetText("InventoryWeapon2","")
            ReloadInventoryWeaponList()
            if (a==b) {
                SetText(`InventoryChoosenWeapon`,"");
                SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense);
            }
            break;
        case 3:
            SetText("InventoryWeapon3","")
            ReloadInventoryWeaponList()
            if (a==b) {
                SetText(`InventoryChoosenWeapon`,"");
                SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense);
            }
            break;
        case 4:
            SetText("InventoryWeapon4","")
            ReloadInventoryWeaponList()
            if (a==b) {
                SetText(`InventoryChoosenWeapon`,"");
                SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense);
            }
            break;
        case 5:
            SetText("InventoryWeapon5","")
            ReloadInventoryWeaponList()
            if (a==b) {
                SetText(`InventoryChoosenWeapon`,"");
                SetPlayerAttackDefense(attack-minusAttack,defense-minusDefense);
            }
            break;
    
        default:
            break;
    }
}
 




function ReloadInventoryWeaponList() {
    let list = [];
    //Get items
    for (let i = 0; i < 5; i++) {
        list[i]=document.querySelector(`[id=InventoryWeapon${i+1}]`).innerHTML;
    }
    //Remove blanks
    let list2 = list.filter((str) => str !== '');
    /*for (let i = 0; i < 5; i++) {
        alert(list2[i])
    }*/
    //Set blank to end (instead of undefined)
    list2.push("")
    list2.push("")
    list2.push("")
    list2.push("")
    list2.push("")

    //Set new list
    for (let i = 0; i < 5; i++) {
            document.querySelector(`[id=InventoryWeapon${i+1}]`).innerHTML=String(list2[i]);
    }
}

const addItem = document.querySelector("[id*=BuyWeapon]")
addItem.addEventListener("click", AddWeapon)



function AddWeapon(event=null, weapon, cost=0, type) {
    let d = null;
    if (event!=null) {
        d = event.target.id;
        d2=d[9]
        type = ((document.querySelector(`[id=Shop${type}${d2}Name]`).innerHTML).replace("Shop", "").replace(`${d2}`, ""))
    weapon = document.querySelector(`[id=ShopWeapon${d2}Name]`).innerHTML
    cost = document.querySelector(`[id=ShopWeapon${d2}Cost]`).innerHTML
    }  
    
    coins = GetText("InventoryCoins")
    //alert(weapon+": "+cost)
    
    if (coins>=cost) {
        let list = [];
        //Get items
        for (let i = 0; i < 5; i++) {
            list[i]=document.querySelector(`[id=InventoryWeapon${i+1}]`).innerHTML;
    
        }
        let list2 = list.filter((str) => str !== '');
        for (let i = 0; i < 5; i++) {
             //Remove blanks
             //alert(list2.length)
             //alert(list2[i])
        }
    
        //Check if there is inventory space
        if (list2.length<5) {
            list2.push(weapon)
            list2.push("")
            list2.push("")
            list2.push("")
            list2.push("")
            list2.push("")

            SetText("InventoryCoins", `${coins-cost}`)

        //Set new list
        for (let i = 0; i < 5; i++) {
            document.querySelector(`[id=InventoryWeapon${i+1}]`).innerHTML=String(list2[i]);
    }
    } else if (event = null) {
        alert("You don't have enough space for this item!")
    } else alert("You don't have enough space for this item!")
    } else alert("You don't have enough money to buy this item!")
        
}




function ChangeChoosenArmor() {
    let choosen = document.getElementById("InventoryArmorList").value;
    let attack = Number(GetText("PlayerStartAttack"));
    let defense = Number(GetText("PlayerStartDefense"));
    let hp = Number(GetText("PlayerStartHP"));
    let magic = Number(GetText("PlayerStartMagic"));
    switch (choosen) {
        case "Dagger":
            SetPlayerAttributes(attack+1, defense, hp, magic, 2)
            break;
        case "Sword":
            SetPlayerAttributes(attack+2, defense+1, hp, magic, 2)
            break;
        case "Spear":
            SetPlayerAttributes(attack+4, defense, hp, magic, 2)
            break;
        default:
            break;
    }
}





function ChangeChoosenSpell(id) {
    let choosen = document.querySelector(`[id=InventorySpell${id}]`).innerHTML;
    switch (choosen) {
        case "Fireball":
            SetText("InventoryChoosenSpell", "Fireball")
            break;
        case "Lightning strike":
            SetText("InventoryChoosenSpell", "Lightning strike")
            break;
     
        default:
            break;
    }
}












function AddItem(item) {
    // document.getElementById(`InventoryItem1Amount`).innerHTML=Number(4);
    // // //document.getElementById(`1`).innerHTML=Number(4);
    // document.querySelector(`[id=InventoryItem2Amount]`).innerHTML=Number(4);
    // document.querySelector(`[id=InventoryItem3Amount]`).innerHTML=Number(4);
    // document.querySelector(`[id=InventoryItem4Amount]`).innerHTML=Number(4);
    // document.querySelector(`[id=InventoryItem5Amount]`).innerHTML=Number(4);

    let list = [];
    let listAmount = [0,0,0,0,0];
    //Get items
    for (let i = 0; i < 5; i++) {
        list[i]=document.querySelector(`[id=InventoryItem${i+1}]`).innerHTML;
        
        listAmount[i]=Number(document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML);
        
    }
    //alert(list+"           "+listAmount)

    //Remove blank elements
    let list2 = list.filter((str) => str !== '');


    // if (list2.includes(`${item}`)) {
    //     let a = GetText(`InventoryItem${i+1}Amount`);
    // }
        
    //Check if there are already items of the same kind
  if (list2.includes(`${item}`)) {
        let a = list2.indexOf(`${item}`);
        //alert(a)
        if (listAmount[a]<5)  listAmount[a] +=1;
  } else {
        list2.push(`${item}`)
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
        
        document.querySelector(`[id=InventoryItem${i+1}Amount]`).innerHTML=Number(listAmount[i]);
        //alert(listAmount[i])

        }
}
}


function RemoveFromPlayerItemList(id) {
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
    //alert(listAmount)
}




