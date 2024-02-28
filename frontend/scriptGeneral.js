


//Random number generator
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

//Hide or unhide an element by id
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




//Change element innerHTML
function SetText(id,text) {
    document.getElementById(id).innerHTML=text;
}

//Get element innerHTML
function GetText(id) {
    return document.getElementById(id).innerHTML;
}

function GetElement(id) {
    return document.getElementById(id);
}

//Get element value
function GetValue(id) {
    return document.getElementById(id).value;
}
//Get element value
function SetValue(id, text) {
    document.getElementById(id).value=text;
}


function SetColor(id, color) {
    document.getElementById(id).style.backgroundColor=color;
}

function Log(a) {
    console.log(a)
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
return response;   
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