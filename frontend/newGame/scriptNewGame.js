

var maxAttributes = 46;

//-/- Lenyíló listák nyitása vagy csukása -\-\\
/* Nehézség */
const AreaNewGameDifficulty = document.getElementById("AreaNewGameDifficulty")
AreaNewGameDifficulty.addEventListener("mouseleave", function() {
    Hidden("NewGameDifficulty", true)
    document.getElementById("ButtonNewGameDifficulty").classList.remove("hover")
})
AreaNewGameDifficulty.addEventListener("mouseover", function () {
    Hidden("NewGameDifficulty", false)
    document.getElementById("ButtonNewGameDifficulty").classList.add("hover")
})

/* Kezdőértékek megadásának módja */
const AreaNewGameAttributes = document.getElementById("AreaNewGameAttributes")
AreaNewGameAttributes.addEventListener("mouseleave", function() {
    Hidden("NewGameAttributes", true)
    AddClass("ButtonAttributesList", "hover", 0)
})
AreaNewGameAttributes.addEventListener("mouseover", function () {
    Hidden("NewGameAttributes", false)
    AddClass("ButtonAttributesList", "hover", 1)
})













//-/- Nehézség kiválasztása -\-\\
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



//-/- Kezdőértékek megadásának módjának kiválasztása -\-\\
function NewGameAttributes(mode) {
    if (mode=="Random") {
        AddClass("SettingsOptionRandom", `tdSelected`, 1);
        AddClass("SettingsOptionSelect", `tdSelected`, 0);

        SetText("LabelAttributesMode", "Random")
        Enabled("ButtonGenerate");
        Disabled("SetAmount");
        SetValue("SetAmount", "")
        let list = document.querySelectorAll(".setAttributePlus") 
        for (let i = 0; i < list.length; i++) {
            list[i].innerHTML = ""
            list[i].classList.remove("tdSelectable")
            list[i].disabled=true;
        }

        list = document.querySelectorAll(".setAttributeMinus") 
        for (let i = 0; i < list.length; i++) {
            list[i].innerHTML = ""
            list[i].classList.remove("tdSelectable")
            list[i].disabled=true;
        }
    }
    else {
        AddClass("SettingsOptionRandom", `tdSelected`, 0)
        AddClass("SettingsOptionSelect", `tdSelected`, 1)

        SetText("LabelAttributesMode", String(GetText("SettingsOptionSelect")))
        Disabled("ButtonGenerate")
        Enabled("SetAmount")
        SetValue("SetAmount", "10")
        let list = document.querySelectorAll(".setAttributePlus") 
        for (let i = 0; i < list.length; i++) {
            list[i].innerHTML = "+"
            list[i].classList.add("tdSelectable")
            list[i].disabled=true;
        }

        list = document.querySelectorAll(".setAttributeMinus") 
        for (let i = 0; i < list.length; i++) {
            list[i].innerHTML = "-"
            list[i].classList.add("tdSelectable")
            list[i].disabled=true;
        }
        SetNewGameAttributes()
        Disabled("ButtonStartGame")
    }
}


















//Min total: 35     Hard: 40   Medium: 46     Easy: 52       Max total: 57 


//-/- Véletlen kezdőértékek -\-\\
function Generate() {
    let Attack=RandomNumber(6,9);
    let Defense=RandomNumber(11,15);
    let HP=RandomNumber(12,18);
    let Magic=RandomNumber(6,15);
    SetNewGameAttributes(Attack,Defense,HP,Magic)
    Enabled("ButtonStartGame")
}












//-/- Kiválasztható kezdőértékek -\-\\
function SetAttribute(increase, type) {
    if (GetText("LabelAttributesMode").includes("Selectable")) {
        let sum=Number(GetText("NewGamePlayerAttack"))+Number(GetText("NewGamePlayerDefense"))+Number(GetText("NewGamePlayerHP"))+Number(GetText("NewGamePlayerMagic"))
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
        //Növelés
        if (increase == true) {
            if (sum<maxAttributes) {
                let a=Number(GetText(id));
                let b = sum+amount-1;
                if (b<maxAttributes) {
                    SetText(id, `${a+amount}`);
                    //Mennyi elérhető még
                    if (amount>0) {
                        SetText("LabelAttributesMode", `Selectable (total: ${maxAttributes}/${sum+amount})`);
                    }
                }
    
            }
            //Kezdőgomb elérhető
            if (GetText("NewGamePlayerAttack") != "0" && GetText("NewGamePlayerDefense") != "0" && GetText("NewGamePlayerHP") != "0" && GetText("NewGamePlayerMagic") != "0"){
                Enabled("ButtonStartGame")
            }

          //Csökkentés
        } else if (GetText(id) >0 ) {
            Disabled("ButtonStartGame")
            let a=Number(GetText(id));
    
            if (a-amount>=0) {
                SetText(id, `${a-amount}`);
                //Mennyi elérhető még
                SetText("LabelAttributesMode", `Selectable (total: ${maxAttributes}/${sum-amount})`);
            }
                
            //Kezdőgomb elérhető
            if (GetText("NewGamePlayerAttack") != "0" && GetText("NewGamePlayerDefense") != "0" && GetText("NewGamePlayerHP") != "0" && GetText("NewGamePlayerMagic") != "0"){
                Enabled("ButtonStartGame")
            }
            }
    }
    }






//-/- Kezdőértékek beállítása -\-\\
function SetNewGameAttributes(a=0,b=0,c=0,d=0) {
    SetText("NewGamePlayerAttack", a);
    SetText("NewGamePlayerDefense", b);
    SetText("NewGamePlayerHP", c);
    SetText("NewGamePlayerMagic", d);    
}





//Játék kezdőse, adatok elküldése a játék oldalra
function StartGame() {
    let Attack=GetText("NewGamePlayerAttack")
    let Defense=GetText("NewGamePlayerDefense")
    let HP=GetText("NewGamePlayerHP")
    let Magic=GetText("NewGamePlayerMagic")
    let Name=GetValue("NewGamePlayerName")
    if (Name=="") Name="Player";

    difficulty=GetText("SettingsLabelDifficulty").toLowerCase()
    
    localStorage.setItem("startAttack", Attack);
    localStorage.setItem("startDefense", Defense);
    localStorage.setItem("startHp", HP);
    localStorage.setItem("startMagic", Magic);
    localStorage.setItem("playerName", Name);
    localStorage.setItem("difficulty", difficulty);
}

