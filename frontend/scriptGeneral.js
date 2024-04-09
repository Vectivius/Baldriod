
let route = "http://localhost:8001/"


//Véletlen szám generátor
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
  }


//Enable or disable a button by id
function Enabled(id) {
    document.getElementById(id).disabled=false;
}
function Disabled(id) {
    document.getElementById(id).disabled=true;
}

//Elem elrejtése vagy láthatóvá tevése
function Hidden(id, a) {
    if (a==true) {
        document.getElementById(id).hidden=true;
    } else document.getElementById(id).hidden=false;
}

function HiddenSwitch(id) {
    let a = document.getElementById(id);
    if (a.hidden==true) {
       a.hidden=false;
    } else a.hidden=true;
    switch (id) {
            case "InventoryWeaponList":
                Hidden("InventoryArmorList", true)
                Hidden("InventoryShieldList", true)
                break;
            case "InventoryArmorList":
                Hidden("InventoryWeaponList", true)
                Hidden("InventoryShieldList", true)
                break;
            case "InventoryShieldList":
                Hidden("InventoryWeaponList", true)
                Hidden("InventoryArmorList", true)
                break;
        default:
            break;
    }
}

function ClassSwitch(id, className) {
    let element = GetElement(id)
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

//Osztály hozzáadás
function AddClass(id, className, type=1) {
    let element = GetElement(id)
    if (type == 1) {
        element.classList.add(className)
    } else if (type == 0) {
        element.classList.remove(className)
    }
}

function HasClass(elementId, elementClass) {
    let element = GetElement(elementId)
    if (element.classList.contains(elementClass)) {
        return true
    } else {
        return false
    }
}




//Szöveg átírás
function SetText(id,text) {
    document.getElementById(id).innerHTML=text;
}

//Szöveg lekérés
function GetText(id) {
    return document.getElementById(id).innerHTML;
}

//Elem lekérés
function GetElement(id) {
    return document.getElementById(id);
}

//Érték lekérés
function GetValue(id) {
    return document.getElementById(id).value;
}
//Érték átírás
function SetValue(id, text) {
    document.getElementById(id).value=text;
}


function SetColor(id, color) {
    if (color == "var(--red1)") {
        AddClass(id, "tdSelected", 1)
    } else {
        AddClass(id, "tdSelected", 0)
    }
    // document.getElementById(id).style.backgroundColor=color;
}

function Log(a) {
    console.log(a)
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}









function SetPlayerAttributes(attack=0,defense=0,hp=0,magic=0, name, type=3) {
    switch (type) {
        case 3:
            SetText("PlayerStartAttack", attack);
            SetText("PlayerCurrentAttack", attack);
            SetText("PlayerStartDefense", defense);
            SetText("PlayerCurrentDefense", defense);
            SetText("PlayerStartHp", hp);
            SetText("PlayerCurrentHp", hp);
            SetText("PlayerStartMagic", magic);
            SetText("PlayerCurrentMagic", magic);
            SetText("PlayerName", name);
            break;
        case 1: 
            SetText("PlayerStartAttack", attack);
            SetText("PlayerStartDefense", defense);
            SetText("PlayerStartHp", hp);
            SetText("PlayerStartMagic", magic);    
            break;
        case 2: 
            SetText("PlayerCurrentAttack", attack);
            SetText("PlayerCurrentDefense", defense);
            SetText("PlayerCurrentHp", hp);
            SetText("PlayerCurrentMagic", magic);        
        default:
            break;
    }
}












async function getData(url="") {
    const response = await fetch(url, {
         method: "GET", // POST, PUT, DELETE ...       
        headers: {
         "Content-Type" : "application/json",
        },    
    })
    return response.json();   
}; 

async function postData(url="", data = {}) {
const response = await fetch(url, {
     method: "POST", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
    }, 
    body: JSON.stringify(data),   
})
return response.json();
}; 

async function deleteData(url="", data = {}) {
const response = await fetch(url, {
     method: "DELETE", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 

async function putData(url="", data = {}) {
const response = await fetch(url, {
     method: "PUT", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 








//Mentett játék betöltése
function LoadGame(id) {
    
    getData(`${route}save/${id}`).then((save) => {

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
function Message(messageText, messageType, nextFunction = ["", "", ""]) {

    if (messageType == 1) {
        Hidden("DivMessage2", true)
        Hidden("DivMessage1", false)
        SetText("Message1", `${messageText}`)
    } else if (messageType == 2) {
        Hidden("DivMessage2", false)
        Hidden("DivMessage1", true)
        SetText("Message2", `${messageText}`)
    }
    GetElement("DivMessageBg").id = "DivMessageBgVisible"  //style.background.color = "rgba(0, 0, 0, 0.227)"

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
function Continue(type) {
    
    let next = ""

    if (type == "Yes") {
        next = nextFunctionYes

    } else if (type == "No") {
        next = nextFunctionNo

    } else if (type == "Continue") {
        next = nextFunctionContinue

        AddClass("MessageButtonContinue", "hover", 0)
        AddClass("MessageButtonYes", "hover", 0)
        AddClass("MessageButtonNo", "hover", 0)

    }
    
    switch (next) {
        case "PlayerActionDamage":
            PlayerActionDamage()
            break;
        case "PlayerActionDamage2":
            PlayerActionDamage2()
            break;
        case "EnemyAction":
            EnemyAction()
            break;
        case "EnemyActionDamage":
            EnemyActionDamage()
            break;
        case "EnemyActionDamage2":
            EnemyActionDamage2()
            break;

        case "LearnSpell":
            LearnSpell(itemName)
            break;
        case "BuyFromShop":
            BuyFromShop(itemName, itemType)
            break;
        case "UnselectElement":
            UnselectElement()
            break;
        case "UnselectSpellButton":
            UnselectSpellButton()
            break;
        case "ReloadShop2":
            ReloadShop2()
            break;

        case "EnemyActionSpell2":
            EnemyActionSpell2()
            break;
        case "PlayerActionSpell2":
            PlayerActionSpell2()
            break;

        case "RemoveItem2":
            RemoveItem2()
            CloseItemList()
            break;
        case "CloseItemList":
            CloseItemList()
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
            EndRound()
            break;


        case "Delete2":
            Delete2()
            break;

        default:
            break;
    }
}






function logout() {
    localStorage.clear()
    location.href="../home/pageHome.html"
}








/*Visible transition test*/
function hidden2(id) {
    let a = GetElement(id)
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