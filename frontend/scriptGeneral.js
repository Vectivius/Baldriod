
let route = "http://localhost:8001/"


//Véletlen szám generátor
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
  }


//Enable or disable a button by id
function enabled(id) {
    document.getElementById(id).disabled=false;
}
function disabled(id) {
    document.getElementById(id).disabled=true;
}

//Elem elrejtése vagy láthatóvá tevése
function hidden(id, a) {
    if (a==true) {
        document.getElementById(id).hidden=true;
    } else document.getElementById(id).hidden=false;
}

function hiddenSwitch(id) {
    let a = document.getElementById(id);
    if (a.hidden==true) {
       a.hidden=false;
    } else a.hidden=true;
    switch (id) {
            case "InventoryWeaponList":
                hidden("InventoryArmorList", true)
                hidden("InventoryShieldList", true)
                break;
            case "InventoryArmorList":
                hidden("InventoryWeaponList", true)
                hidden("InventoryShieldList", true)
                break;
            case "InventoryShieldList":
                hidden("InventoryWeaponList", true)
                hidden("InventoryArmorList", true)
                break;
        default:
            break;
    }
}

function classSwitch(id, className) {
    let element = getElement(id)
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

//Osztály hozzáadás
function addClass(id, className, type=1) {
    let element = getElement(id)
    if (type == 1) {
        element.classList.add(className)
    } else if (type == 0) {
        element.classList.remove(className)
    }
}

function hasClass(elementId, elementClass) {
    let element = getElement(elementId)
    if (element.classList.contains(elementClass)) {
        return true
    } else {
        return false
    }
}




//Szöveg átírás
function setText(id,text) {
    document.getElementById(id).innerHTML=text;
}

//Szöveg lekérés
function getText(id) {
    return document.getElementById(id).innerHTML;
}

//Elem lekérés
function getElement(id) {
    return document.getElementById(id);
}

//Érték lekérés
function getValue(id) {
    return document.getElementById(id).value;
}
//Érték átírás
function setValue(id, text) {
    document.getElementById(id).value=text;
}


function setColor(id, color) {
    if (color == "var(--red1)") {
        addClass(id, "tdSelected", 1)
    } else {
        addClass(id, "tdSelected", 0)
    }
    // document.getElementById(id).style.backgroundColor=color;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}









function setPlayerAttributes(attack=0,defense=0,hp=0,magic=0, name, type=3) {
    switch (type) {
        case 3:
            setText("PlayerStartAttack", attack);
            setText("PlayerCurrentAttack", attack);
            setText("PlayerStartDefense", defense);
            setText("PlayerCurrentDefense", defense);
            setText("PlayerStartHp", hp);
            setText("PlayerCurrentHp", hp);
            setText("PlayerStartMagic", magic);
            setText("PlayerCurrentMagic", magic);
            setText("PlayerName", name);
            break;
        case 1: 
            setText("PlayerStartAttack", attack);
            setText("PlayerStartDefense", defense);
            setText("PlayerStartHp", hp);
            setText("PlayerStartMagic", magic);    
            break;
        case 2: 
            setText("PlayerCurrentAttack", attack);
            setText("PlayerCurrentDefense", defense);
            setText("PlayerCurrentHp", hp);
            setText("PlayerCurrentMagic", magic);        
        default:
            break;
    }
}












async function getData(url="", token) {
    const response = await fetch(url, {
         method: "GET", // POST, PUT, DELETE ...       
        headers: {
         "Content-Type" : "application/json",
         "Authorization": `Bearer ${token}`,
        },    
    })
    return response.json();
}; 

async function postData(url="", data = {}, token) {
const response = await fetch(url, {
     method: "POST", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
     "Authorization": `Bearer ${token}`,
    }, 
    body: JSON.stringify(data),   
})
return response.json();
}; 

async function deleteData(url="", data = {}, token) {
const response = await fetch(url, {
     method: "DELETE", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
     "Authorization": `Bearer ${token}`,
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 

async function putData(url="", data = {}, token) {
const response = await fetch(url, {
     method: "PUT", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
     "Authorization": `Bearer ${token}`,
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 








//Mentett játék betöltése
function loadGame(saveId) {
    
    getData(`${route}saves/getById/${localStorage.getItem("userId")}/${saveId}`, localStorage.getItem("token")).then((save) => {

        localStorage.setItem("playerName", save[0].playerName)

        localStorage.setItem("playerAttack", save[0].PlayerAttack)
        localStorage.setItem("playerDefense", save[0].PlayerDefense)
        localStorage.setItem("playerHp", save[0].PlayerHp)
        localStorage.setItem("playerMagic", save[0].PlayerMagic)

        localStorage.setItem("weapons", save[0].Weapons)
        localStorage.setItem("armors", save[0].Armors)
        localStorage.setItem("shields", save[0].Shields)

        localStorage.setItem("weaponsDurability", save[0].WeaponsDurability)
        localStorage.setItem("armorsDurability", save[0].ArmorsDurability)
        localStorage.setItem("armorsDurability", save[0].ArmorsDurability)

        localStorage.setItem("selectedItems", save[0].SelectedItems)

        localStorage.setItem("coins", save[0].Coins)
        


        /*localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)
        localStorage.setItem("playerName", save[0].playerName)*/
        location.href = "../play/pagePlay.html"

    })
    .catch((error) => {
        console.error("Hiba történt:", error);
        });
}










//Üzenőablak
function sendMessage(messageText, messageType, nextFunction = ["", "", ""]) {
    if (messageType == 1) {
        hidden("DivMessage2", true)
        hidden("DivMessage1", false)
        setText("Message1", `${messageText}`)
    } else if (messageType == 2) {
        hidden("DivMessage2", false)
        hidden("DivMessage1", true)
        setText("Message2", `${messageText}`)
    }
    getElement("DivMessageBg").id = "DivMessageBgVisible"  //style.background.color = "rgba(0, 0, 0, 0.227)"

    //Következő függvény megadása
    nextFunctionContinue = nextFunction[0]
    nextFunctionYes = nextFunction[1]
    nextFunctionNo = nextFunction[2]
}

//Következő függvény
let nextFunctionContinue = ""
let nextFunctionYes = ""
let nextFunctionNo = ""

//Új függvény hívása üzenet után
function callNewFunction(type) {
    
    
    let next = ""

    if (type == "Yes") {
        next = nextFunctionYes

    } else if (type == "No") {
        next = nextFunctionNo

    } else if (type == "Continue") {
        next = nextFunctionContinue

        addClass("MessageButtonContinue", "hover", 0)
        addClass("MessageButtonYes", "hover", 0)
        addClass("MessageButtonNo", "hover", 0)

    }
    switch (next) {
        case "PlayerActionDamage":
            playerActionDamage()
            break;
        case "PlayerActionDamage2":
            playerActionDamage2()
            break;
        case "EnemyAction":
            enemyAction()
            break;
        case "EnemyActionDamage":
            enemyActionDamage()
            break;
        case "EnemyActionDamage2":
            enemyActionDamage2()
            break;

        case "LearnSpell":
            learnSpell(itemName)
            break;
        case "BuyFromShop":
            buyFromShop(itemName, itemType)
            break;
        // case "UnselectElement":
        //     UnselectElement()
        //     break;
        case "UnselectSpellButton":
            unselectSpellButton()
            break;
        case "ReloadShop2":
            reloadShop2()
            break;

        case "EnemyActionSpell2":
            enemyActionSpell2()
            break;
        case "PlayerActionSpell2":
            playerActionSpell2()
            break;

        case "RemoveItem2":
            removeItem2()
            closeItemList()
            break;
        case "CloseItemList":
            closeItemList()
            break;
        case "saveGame3":
            saveGame3(false, true)
            break;
        case "deselectItems":
            deselectItems()
            break;
        case "deleteSave":
            deleteSave()
            break;


        // case "RemoveWeapon2":
        //     RemoveWeapon2()
        //     CloseWeaponList()
        //     break;
        // case "RemoveArmor2":
        //     RemoveArmor2()
        //     CloseArmorList()
        //     break;
        // case "RemoveShield2":
        //     RemoveShield2()
        //     CloseShieldList()
        //     break;

        // case "CloseWeaponList":
        //     CloseWeaponList()
        //     break;
        // case "CloseArmorList":
        //     CloseArmorList()
        //     break;
        // case "CloseShieldList":
        //     CloseShieldList()
        //     break;
    
        case "EndRound":
            endRound()
            break;


        case "deleteSql":
            deleteSql()
            break;

        default:
            break;
    }
}




function deselectItems() {
    let list = document.getElementsByClassName("tdSelected")
    let list2 = document.getElementsByClassName("buttonSelected")

    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("tdSelected") 
    }
    for (let i = 0; i < list2.length; i++) {
        list2[i].classList.remove("buttonSelected") 
    }
}



function logout() {
    //localStorage.clear()
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    localStorage.removeItem("userLevel")
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    location.href="../home/pageHome.html"
}








/*Visible transition test*/
function hidden2(id) {
    let a = getElement(id)
    if (a.classList.contains("hidden")) {
        a.classList.remove("hidden")
        a.classList.add("visible")
    } else {
        a.classList.remove("visible")
        a.classList.add("hidden")
    }
}


/*
https://stackoverflow.com/questions/19706147/how-to-hide-elements-with-smooth-transition-by-class-with-javascript
*/