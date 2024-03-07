

var maxAttributes = 46;

//Open new game difficulty list
document.body.addEventListener
const AreaNewGameDifficulty = document.getElementById("AreaNewGameDifficulty")
AreaNewGameDifficulty.addEventListener("mouseleave", function() {
    Hidden("NewGameDifficulty", true)
    document.getElementById("ButtonNewGameDifficulty").classList.remove("hover")
})
AreaNewGameDifficulty.addEventListener("mouseover", function () {
    Hidden("NewGameDifficulty", false)
    document.getElementById("ButtonNewGameDifficulty").classList.add("hover")
})

//Open new game attributes list
const AreaNewGameAttributes = document.getElementById("AreaNewGameAttributes")
AreaNewGameAttributes.addEventListener("mouseleave", function() {
    Hidden("NewGameAttributes", true)
    document.getElementById("ButtonNewGameAttributes").classList.remove("hover")
})
AreaNewGameAttributes.addEventListener("mouseover", function () {
    Hidden("NewGameAttributes", false)
    document.getElementById("ButtonNewGameAttributes").classList.add("hover")
})

//Open new game location list
const AreaNewGameLocation = document.getElementById("AreaNewGameLocation")
AreaNewGameLocation.addEventListener("mouseleave", function() {
    Hidden("NewGameLocation", true)
    document.getElementById("ButtonNewGameLocation").classList.remove("hover")
})
AreaNewGameLocation.addEventListener("mouseover", function () {
    Hidden("NewGameLocation", false)
    document.getElementById("ButtonNewGameLocation").classList.add("hover")
})


//#region Check settings
//Check the choosen difficulty
function NewGameDifficulty(difficulty) {
   let a = GetText("LabelAttributesMode");
    switch (difficulty) {
        case "Easy":
            SetText("SettingsLabelDifficulty", `Easy`);
            AddClass("SettingsOptionEasy", `tdSelected`, 1);
            AddClass("SettingsOptionMedium", `tdSelected`, 0);
            AddClass("SettingsOptionHard", `tdSelected`, 0);

            if (GetText("LabelAttributesMode").includes("Selectable")) {
                SetText("LabelAttributesMode", `Selectable (total: 52)`);
            }
            SetText("SettingsOptionSelect", `Selectable (total: 52)`);
            maxAttributes=52;
            SetNewGameAttributes();
            break;

        case "Medium":
            SetText("SettingsLabelDifficulty", `Medium`);
            AddClass("SettingsOptionEasy", `tdSelected`, 0);
            AddClass("SettingsOptionMedium", `tdSelected`, 1);
            AddClass("SettingsOptionHard", `tdSelected`, 0);

            if (GetText("LabelAttributesMode").includes("Selectable")) {
                SetText("LabelAttributesMode", `Selectable (total: 46)`);
            }
            SetText("SettingsOptionSelect", `Selectable (total: 46)`); 
            maxAttributes=46;
            SetNewGameAttributes();
            break;

        case "Hard":
            SetText("SettingsLabelDifficulty", `Hard`);
            AddClass("SettingsOptionEasy", `tdSelected`, 0);
            AddClass("SettingsOptionMedium", `tdSelected`, 0);
            AddClass("SettingsOptionHard", `tdSelected`, 1);

            if (GetText("LabelAttributesMode").includes("Selectable")) {
                SetText("LabelAttributesMode", `Selectable (total: 40)`);
            }
            SetText("SettingsOptionSelect", `Selectable (total: 40)`);  
            maxAttributes=40;
            SetNewGameAttributes();
            break;
    
        default:
            break;
    }
}



//Check selected attribute mode
function NewGameAttributes(mode) {
    // let mode = document.getElementById("NewGameAttributes").value;
    if (mode=="Random") {
        AddClass("SettingsOptionRandom", `tdSelected`, 1);
        AddClass("SettingsOptionSelect", `tdSelected`, 0);

        SetText("LabelAttributesMode", "Random")
        Enabled("NewGameAttributesGenerateButtons");
        Disabled("SetAmount");
        document.getElementById("SetAmount").style.backgroundColor = "#988b7f";
        const list = document.querySelectorAll(".setAttribute") 
        for (let i = 0; i < list.length; i++) {
            list[i].classList.add("setAttributeDisabled")
            list[i].classList.remove("setAttributeEnabled")
            list[i].disabled=true;
        }
    }
    else {
        AddClass("SettingsOptionRandom", `tdSelected`, 0);
        AddClass("SettingsOptionSelect", `tdSelected`, 1);

        SetText("LabelAttributesMode", String(GetText("SettingsOptionSelect")))
        Disabled("NewGameAttributesGenerateButtons");
        Enabled("SetAmount");
        document.getElementById("SetAmount").style.backgroundColor = "var(--light3)";
        const list = document.querySelectorAll(".setAttribute") 
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("setAttributeDisabled")
            list[i].classList.add("setAttributeEnabled")
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
                    SetText("LabelAttributesMode", `Selectable (total: ${maxAttributes}/${sum+amount})`);
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
            SetText("LabelAttributesMode", `Selectable (total: ${maxAttributes}/${sum-amount})`);
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
            SetText("PlayerStartHp", hp);
            SetText("PlayerCurrentHp", hp);
            SetText("PlayerStartMagic", magic);
            SetText("PlayerCurrentMagic", magic);
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

function SetPlayerAttack(attack) {
    SetText("PlayerCurrentAttack", attack);
}
function SetPlayerDefense(defense) {
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
            GetText("PlayerStartHp");
            GetText("PlayerCurrentHp");
            GetText("PlayerStartMagic");
            GetText("PlayerCurrentMagic");
            return array
        case 1: 
            array[0] = GetText("PlayerStartAttack");
            array[1] = GetText("PlayerStartDefense");
            array[2] = GetText("PlayerStartHp");
            array[3] = GetText("PlayerStartMagic");    
            break;
        case 2: 
            GetText("PlayerCurrentAttack");
            GetText("PlayerCurrentDefense");
            GetText("PlayerCurrentHp");
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

    difficulty=document.getElementById("SettingsLabelDifficulty").innerHTML.toLowerCase()
    
    localStorage.setItem("SendAttack", Attack);
    localStorage.setItem("SendDefense", Defense);
    localStorage.setItem("SendHP", HP);
    localStorage.setItem("SendMagic", Magic);
    localStorage.setItem("SendName", Name);
    localStorage.setItem("Difficulty", difficulty);
    localStorage.setItem("startLocationType", startLocationType);
}

