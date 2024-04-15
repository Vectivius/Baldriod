

var maxAttributes = 46;

//-/- Lenyíló listák nyitása vagy csukása -\-\\
/* Nehézség */
const AreaNewGameDifficulty = document.getElementById("AreaNewGameDifficulty")
AreaNewGameDifficulty.addEventListener("mouseleave", function() {
    hidden("NewGameDifficulty", true)
    document.getElementById("ButtonNewGameDifficulty").classList.remove("hover")
})
AreaNewGameDifficulty.addEventListener("mouseover", function () {
    hidden("NewGameDifficulty", false)
    document.getElementById("ButtonNewGameDifficulty").classList.add("hover")
})

/* Kezdőértékek megadásának módja */
const AreaNewGameAttributes = document.getElementById("AreaNewGameAttributes")
AreaNewGameAttributes.addEventListener("mouseleave", function() {
    hidden("NewGameAttributes", true)
    addClass("ButtonAttributesList", "hover", 0)
})
AreaNewGameAttributes.addEventListener("mouseover", function () {
    hidden("NewGameAttributes", false)
    addClass("ButtonAttributesList", "hover", 1)
})













//-/- Nehézség kiválasztása -\-\\
function newGameDifficulty(difficulty) {
   let a = getText("LabelAttributesMode");
    switch (difficulty) {
        case "Easy":
            setText("SettingsLabelDifficulty", `Easy`);
            addClass("SettingsOptionEasy", `tdSelected`, 1);
            addClass("SettingsOptionMedium", `tdSelected`, 0);
            addClass("SettingsOptionHard", `tdSelected`, 0);

            if (getText("LabelAttributesMode").includes("Selectable")) {
                setText("LabelAttributesMode", `Selectable (total: 52)`);
            }
            setText("SettingsOptionSelect", `Selectable (total: 52)`);
            maxAttributes=52;
            setNewGameAttributes();
            break;

        case "Medium":
            setText("SettingsLabelDifficulty", `Medium`);
            addClass("SettingsOptionEasy", `tdSelected`, 0);
            addClass("SettingsOptionMedium", `tdSelected`, 1);
            addClass("SettingsOptionHard", `tdSelected`, 0);

            if (getText("LabelAttributesMode").includes("Selectable")) {
                setText("LabelAttributesMode", `Selectable (total: 46)`);
            }
            setText("SettingsOptionSelect", `Selectable (total: 46)`); 
            maxAttributes=46;
            setNewGameAttributes();
            break;

        case "Hard":
            setText("SettingsLabelDifficulty", `Hard`);
            addClass("SettingsOptionEasy", `tdSelected`, 0);
            addClass("SettingsOptionMedium", `tdSelected`, 0);
            addClass("SettingsOptionHard", `tdSelected`, 1);

            if (getText("LabelAttributesMode").includes("Selectable")) {
                setText("LabelAttributesMode", `Selectable (total: 40)`);
            }
            setText("SettingsOptionSelect", `Selectable (total: 40)`);  
            maxAttributes=40;
            setNewGameAttributes();
            break;
    
        default:
            break;
    }
}



//-/- Kezdőértékek megadásának módjának kiválasztása -\-\\
function newGameAttributes(mode) {
    if (mode=="Random") {
        addClass("SettingsOptionRandom", `tdSelected`, 1);
        addClass("SettingsOptionSelect", `tdSelected`, 0);

        setText("LabelAttributesMode", "Random")
        enabled("ButtonGenerate");
        disabled("SetAmount");
        setValue("SetAmount", "")
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
        addClass("SettingsOptionRandom", `tdSelected`, 0)
        addClass("SettingsOptionSelect", `tdSelected`, 1)

        setText("LabelAttributesMode", String(getText("SettingsOptionSelect")))
        disabled("ButtonGenerate")
        enabled("SetAmount")
        setValue("SetAmount", "10")
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
        setNewGameAttributes()
        disabled("ButtonStartGame")
    }
}


















//Min total: 35     Hard: 40   Medium: 46     Easy: 52       Max total: 57 


//-/- Véletlen kezdőértékek -\-\\
function generateAttributes() {
    let Attack=randomNumber(6,9);
    let Defense=randomNumber(11,15);
    let HP=randomNumber(12,18);
    let Magic=randomNumber(6,15);
    setNewGameAttributes(Attack,Defense,HP,Magic)
    enabled("ButtonStartGame")
}











//-/- Kiválasztható kezdőértékek -\-\\
function changeAttribute(increase, type) {
    if (getText("LabelAttributesMode").includes("Selectable")) {
        let sum=Number(getText("NewGamePlayerAttack"))+Number(getText("NewGamePlayerDefense"))+Number(getText("NewGamePlayerHP"))+Number(getText("NewGamePlayerMagic"))
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
                let a=Number(getText(id));
                let b = sum+amount-1;
                if (b<maxAttributes) {
                    setText(id, `${a+amount}`);
                    //Mennyi elérhető még
                    if (amount>0) {
                        setText("LabelAttributesMode", `Selectable (total: ${maxAttributes}/${sum+amount})`);
                    }
                }
    
            }
            //Kezdőgomb elérhető
            if (getText("NewGamePlayerAttack") != "0" && getText("NewGamePlayerDefense") != "0" && getText("NewGamePlayerHP") != "0" && getText("NewGamePlayerMagic") != "0"){
                enabled("ButtonStartGame")
            }

          //Csökkentés
        } else if (getText(id) >0 ) {
            disabled("ButtonStartGame")
            let a=Number(getText(id));
    
            if (a-amount>=0) {
                setText(id, `${a-amount}`);
                //Mennyi elérhető még
                setText("LabelAttributesMode", `Selectable (total: ${maxAttributes}/${sum-amount})`);
            }
                
            //Kezdőgomb elérhető
            if (getText("NewGamePlayerAttack") != "0" && getText("NewGamePlayerDefense") != "0" && getText("NewGamePlayerHP") != "0" && getText("NewGamePlayerMagic") != "0"){
                enabled("ButtonStartGame")
            }
            }
    }
    }






//-/- Kezdőértékek beállítása -\-\\
function setNewGameAttributes(a=0,b=0,c=0,d=0) {
    setText("NewGamePlayerAttack", a);
    setText("NewGamePlayerDefense", b);
    setText("NewGamePlayerHP", c);
    setText("NewGamePlayerMagic", d);    
}





//Játék kezdőse, adatok elküldése a játék oldalra
function startGame() {
    let Attack=getText("NewGamePlayerAttack")
    let Defense=getText("NewGamePlayerDefense")
    let HP=getText("NewGamePlayerHP")
    let Magic=getText("NewGamePlayerMagic")
    let Name=getValue("NewGamePlayerName")
    if (Name=="") Name="Player";

    difficulty=getText("SettingsLabelDifficulty").toLowerCase()
    
    localStorage.setItem("startAttack", Attack);
    localStorage.setItem("startDefense", Defense);
    localStorage.setItem("startHp", HP);
    localStorage.setItem("startMagic", Magic);
    localStorage.setItem("playerName", Name);
    localStorage.setItem("difficulty", difficulty);

    localStorage.removeItem("playerAttack")
}
