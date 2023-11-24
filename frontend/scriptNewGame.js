

var maxAttributes = 46;


//#region Check settings
//Check the choosen difficulty at new game
function NewGameDifficulty() {
   // let a = GetText("NewEasy");
    let a = document.getElementById("NewGameDifficulty").value;
    switch (a) {
        case "Easy":
            SetText("NewGameAttributesSet", `Set values (total: ${52})`);
            maxAttributes=52;
            SetNewGameAttributes();
            break;

        case "Medium":
            SetText("NewGameAttributesSet", `Set values (total: ${46})`);
            maxAttributes=46;
            SetNewGameAttributes();
            break;

        case "Hard":
            SetText("NewGameAttributesSet", `Set values (total: ${40})`);
            maxAttributes=40;
            SetNewGameAttributes();
            break;
    
        default:
            break;
    }
}



//Check selected attribute mode
function NewGameAttributes() {
    let a = document.getElementById("NewGameAttributes").value;
    if (a=="Random") {
        Enabled("NewGameAttributesGenerateButtons");
        Disabled("SetAmount");
        const list = document.querySelectorAll(".setAttribute") 
        for (let i = 0; i < list.length; i++) {
            list[i].disabled=true;
        }
       
        

    }
    else {
        Disabled("NewGameAttributesGenerateButtons");
        Enabled("SetAmount");
        const list = document.querySelectorAll(".setAttribute") 
        for (let i = 0; i < list.length; i++) {
            list[i].disabled=false;
        }
        //sets attributes to 0
        SetNewGameAttributes()
    }
}
//#endregion

//Min total: 35     Hard: 40   Medium: 46     Easy: 52       Max total: 57 

//#region Set attributes
//Starting attributes set random
function Generate() {
    let Attack=RandomNumber(6,9);
    let Defense=RandomNumber(11,15);
    let HP=RandomNumber(12,18);
    let Magic=RandomNumber(6,15);
    let Name=document.getElementById("NewGamePlayerName").value;
    SetNewGameAttributes(Attack,Defense,HP,Magic)
}



//Starting attributes set manual

//Total starting attributes
function StartAttributesSum() {
    let a = Number(GetText("NewGamePlayerAttack"))+Number(GetText("NewGamePlayerDefense"))+Number(GetText("NewGamePlayerHP"))+Number(GetText("NewGamePlayerMagic"));
    return a;
}

//Increase or decrease attributes
function SetAttribute(increase, type) {
    let sum=StartAttributesSum();
    let id="";
    let amount = Number(document.getElementById("SetAmount").value);
    switch (type) {
        case 1:
            id = "NewGamePlayerAttack";
            break;
        case 2:
            id = "NewGamePlayerDefense";
            break;
        case 3:
            id = "NewGamePlayerHP";
            break;
        case 4:
            id = "NewGamePlayerMagic";
            break;
    
        default:
            break;
    }
    //alert(sum)
    //Increase
    if (increase == true) {
        if (sum<maxAttributes) {
            //+
            let a=Number(GetText(id));
            let b = sum+amount-1;
            if (b<maxAttributes) {
                SetText(id, `${a+amount}`);
                //Show how many available still
                if (amount>0) {
                    SetText("NewGameAttributesSet", `Set values (total: ${maxAttributes}/${sum+amount})`);
                }
            }


            //localStorage.clear()

        }
      //Decrease
    } else if (GetText(id) >0 ) {
        //alert (GetText(id))
        let a=Number(GetText(id));
        //let b = sum+amount-1;

        if (a-amount>=0) {
            SetText(id, `${a-amount}`);
            //Show how many available still
            SetText("NewGameAttributesSet", `Set values (total: ${maxAttributes}/${sum-amount})`);
        }
            
        }
    }
//#endregion





function SetNewGameAttributes(a=0,b=0,c=0,d=0) {
    SetText("NewGamePlayerAttack", a);
    SetText("NewGamePlayerDefense", b);
    SetText("NewGamePlayerHP", c);
    SetText("NewGamePlayerMagic", d);    
}

function SetPlayerAttributes(attack=0,defense=0,hp=0,magic=0, type=3) {
    switch (type) {
        case 3:
            SetText("PlayerStartAttack", attack);
            SetText("PlayerCurrentAttack", attack);
            SetText("PlayerStartDefense", defense);
            SetText("PlayerCurrentDefense", defense);
            SetText("PlayerStartHP", hp);
            SetText("PlayerCurrentHP", hp);
            SetText("PlayerStartMagic", magic);
            SetText("PlayerCurrentMagic", magic);
            break;
        case 1: 
            SetText("PlayerStartAttack", attack);
            SetText("PlayerStartDefense", defense);
            SetText("PlayerStartHP", hp);
            SetText("PlayerStartMagic", magic);    
            break;
        case 2: 
            SetText("PlayerCurrentAttack", attack);
            SetText("PlayerCurrentDefense", defense);
            SetText("PlayerCurrentHP", hp);
            SetText("PlayerCurrentMagic", magic);        
        default:
            break;
    }
}

function SetPlayerAttackDefense(attack, defense) {
    SetText("PlayerCurrentAttack", attack);
    SetText("PlayerCurrentDefense", defense);

}

function GetPlayerAttributes(type=3) {
    let array=[];
    switch (type) {
        case 3:
            GetText("PlayerStartAttack");
            GetText("PlayerCurrentAttack");
            GetText("PlayerStartDefense");
            GetText("PlayerCurrentDefense");
            GetText("PlayerStartHP");
            GetText("PlayerCurrentHP");
            GetText("PlayerStartMagic");
            GetText("PlayerCurrentMagic");
            return array
        case 1: 
            array[0] = GetText("PlayerStartAttack");
            array[1] = GetText("PlayerStartDefense");
            array[2] = GetText("PlayerStartHP");
            array[3] = GetText("PlayerStartMagic");    
            break;
        case 2: 
            GetText("PlayerCurrentAttack");
            GetText("PlayerCurrentDefense");
            GetText("PlayerCurrentHP");
            GetText("PlayerCurrentMagic");        
        default:
            break;
    }
}
/*
function NewGameLocation() {
    let a = document.getElementById("NewGameLocation").value;
    if (a=="Random") {
        startLocationType = "random"
    } else  startLocationType = "set"
}*/





//Start playing, send attributres to play page
function StartGame() {
    let Attack=GetText("NewGamePlayerAttack");
    let Defense=GetText("NewGamePlayerDefense");
    let HP=GetText("NewGamePlayerHP");
    let Magic=GetText("NewGamePlayerMagic");
    let Name=document.getElementById("NewGamePlayerName").value;
    let startLocationType=document.getElementById("NewGameLocation").value;
    if (Name=="") Name="Player";

    difficulty=document.getElementById("NewGameDifficulty").value;
    
    localStorage.setItem("SendAttack", Attack);
    localStorage.setItem("SendDefense", Defense);
    localStorage.setItem("SendHP", HP);
    localStorage.setItem("SendMagic", Magic);
    localStorage.setItem("SendName", Name);
    localStorage.setItem("Difficulty", difficulty);
    localStorage.setItem("startLocationType", startLocationType);
}




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


//Change element innerHTML
function SetText(id,text) {
    document.getElementById(id).innerHTML=text;
}

//Get element innerHTML
function GetText(id) {
    return document.getElementById(id).innerHTML;
}

//Get element value
function GetValue(id) {
    return document.getElementById(id).value;
}