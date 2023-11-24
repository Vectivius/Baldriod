

class Enemy {
    id
    name
    attack
    defense
    hp
    damage
    magic
}

const wolf = {
    id: 1,
    name: "Wolf",
    attack: 6,
    defense: 7,
    hp: 12,
    damage: "2-3"
};


const zombie = {
    id: 2,
    name: "Zombie",
    attack: 8,
    defense: 7,
    hp: 11,
    damage: "1-4"
};

const data = {
    id: [1,2],
    name: [wolf,zombie]
}


let gameLocation="forest";
let enemyId=0;

function NewRound() {
    map.removeEventListener("click", ChangeMap)
    DisableAreasExcept(idList=[])
    let a = 0;
    Hidden("DivEnemyAttributes", false)
    //location.href = 'pageNewGame.html';
    let type=0    //RandomNumber(0,1);
    switch (type) {
        case 0:
            switch (gameLocation) {
                case "forest":
                    enemyId=RandomNumber(1,2);
                    switch (enemyId) {
                        case 1:
                            a=data.name[0]
                            //alert(a)
                            //NewEnemy(wolf.name,wolf.attack,wolf.defense,wolf.hp,wolf.damage)
                            NewEnemy(a.name,a.attack,a.defense,a.hp,a.damage)
                            break;
                    
                            case 2: 
                            a=data.name[1]
                            //alert(a)
                            //NewEnemy(zombie.name,zombie.attack,zombie.defense,zombie.hp,zombie.damage)
                            NewEnemy(a.name,a.attack,a.defense,a.hp,a.damage)
                            break;
                        default:
                            break;
                    }
                    break;
                    default:
                        break;
            }
            break;
        case 1: 
            break;
        default:
            break;
    }

}

function NewEnemy(name,attack,defense,hp,damage,magic=0) {
    SetText("EnemyName",name);
    SetText("EnemyAttack",attack);
    SetText("EnemyDefense",defense);
    SetText("EnemyHP",hp);
    SetText("EnemyDamage",damage);
    SetText("EnemyMagic",magic);

    Enabled("PlayerActionAttack");
    Enabled("PlayerActionSpell");
    Enabled("PlayerActionMode");
    Enabled("PlayerActionItem");
}


//Attack of the player
function PlayerActionAttack() {
    //Disabled("PlayerActionAttack");
    Disabled("PlayerActionSpell");
    Disabled("PlayerActionMode");
    Disabled("PlayerActionItem");

    //Get player attributes
    let PlayerName=GetText("PlayerName");
    let PlayerAttack=Number(GetText("PlayerCurrentAttack"));
    let PlayerDamageMin=Number(GetText("PlayerWeaponDamage").split('-')[0]);
    let PlayerDamageMax=Number(GetText("PlayerWeaponDamage").split('-')[1]);

    //Get enemy attributes
    let EnemyName=GetText("EnemyName");
    let EnemyDefense=Number(GetText("EnemyDefense"));
    let EnemyHP=Number(GetText("EnemyHP"));


    let Random=RandomNumber(1,12);
    alert("Attack of "+PlayerName+": "+PlayerAttack+" + "+Random);
    


    //Check if player won round
    if (PlayerAttack+Random>EnemyDefense) {
        alert(`${PlayerAttack} + ${Random} > ${EnemyDefense}`);
        
        EnemyHP=EnemyHP-RandomNumber(PlayerDamageMin, PlayerDamageMax);

        //Check if enemy died
        if (EnemyHP<=0) {
            SetText("EnemyHP","0");
            alert(`${EnemyName} has died`)
            Hidden("DivEnemyAttributes", true)
            Disabled("PlayerActionAttack");
            Disabled("PlayerActionSpell");
            Disabled("PlayerActionMode");
            Disabled("PlayerActionItem");
            map.addEventListener("click", ChangeMap)
            ShowMap()
        }
        else {
            SetText("EnemyHP",String(EnemyHP));
            EnemyActionAttack();
        }
    }
}

//Attack of the enemy
function EnemyActionAttack() {
    //Get enemy attributes
    let EnemyName=GetText("EnemyName");
    let EnemyAttack=Number(GetText("EnemyAttack"));
    let EnemyDamageMin=Number(GetText("EnemyDamage").split('-')[0]);
    let EnemyDamageMax=Number(GetText("EnemyDamage").split('-')[1]);

    //Get player attributes
    let PlayerDefense=Number(GetText("PlayerCurrentDefense"));
    let PlayerHP=Number(GetText("PlayerCurrentHP"));


    let Random=RandomNumber(1,12);
    alert("Attack of "+EnemyName+": "+EnemyAttack+" + "+Random);

    //Check if enemy won round
    if (EnemyAttack+Random>PlayerDefense) {
        alert(`${EnemyAttack} + ${Random} > ${PlayerDefense}`);
        PlayerHP=PlayerHP-RandomNumber(EnemyDamageMin, EnemyDamageMax);;
        SetText("PlayerCurrentHP",String(PlayerHP));
    }

    Enabled("PlayerActionItem");
    Enabled("PlayerActionSpell");
    Enabled("PlayerActionMode");
}







function HiddenSwitch(id) {
    let a = document.getElementById(id);
    if (a.hidden==true) {
       a.hidden=false;
    } else a.hidden=true;
    switch (id) {
            case "InventoryWeaponList":
                Hidden("InventoryArmorList", true)
                break;
            case "InventoryArmorList":
                Hidden("InventoryWeaponList", true)
                break;
        default:
            break;
    }
}



const map = document.querySelector("#Map")//.getElementsByTagName("td");
//map.addEventListener("mouseover", ShowMap);
map.addEventListener("click", ChangeMap);

function ShowMap() {
    //let d = event.target.id;
    const start = document.querySelector("[id*=MapStart]");
    let startId = start.id

    switch (startId) {
        case "Map1 MapStart":
            /*enabledAreas[0]="Map4"
            enabledAreas[1]="Map2"*/
            //document.getElementById("Map4").style.backgroundColor="blue"
            document.getElementById("Map4").className="mapEnabled"
            document.getElementById("Map2").className="mapEnabled"
            DisableAreasExcept(idList=[4,2])
            break;

        case "Map2 MapStart":
             document.getElementById("Map1").className="mapEnabled"
             document.getElementById("Map3").className="mapEnabled"
             DisableAreasExcept(idList=[1,3])
             break;

        case "Map3 MapStart":
             document.getElementById("Map2").className="mapEnabled"
             document.getElementById("Map6").className="mapEnabled"
             DisableAreasExcept(idList=[2,6])
             break;

        case "Map4 MapStart":
             document.getElementById("Map1").className="mapEnabled"
             document.getElementById("Map5").className="mapEnabled"
             document.getElementById("Map7").className="mapEnabled"
             DisableAreasExcept(idList=[1,5,7])
             break;

        case "Map5 MapStart":
             document.getElementById("Map4").className="mapEnabled"
             document.getElementById("Map2").className="mapEnabled"
             document.getElementById("Map6").className="mapEnabled"
             document.getElementById("Map8").className="mapEnabled"
             DisableAreasExcept(idList=[4,2,6,8])
             break;

        case "Map6 MapStart":
             document.getElementById("Map3").className="mapEnabled"
             document.getElementById("Map5").className="mapEnabled"
             document.getElementById("Map9").className="mapEnabled"
             DisableAreasExcept(idList=[3,5,9])
             break;

        case "Map7 MapStart":
             document.getElementById("Map4").className="mapEnabled"
             document.getElementById("Map8").className="mapEnabled"
             DisableAreasExcept(idList=[4,8])
             break;

        case "Map8 MapStart":
             document.getElementById("Map7").className="mapEnabled"
             document.getElementById("Map5").className="mapEnabled"
             document.getElementById("Map9").className="mapEnabled"
             DisableAreasExcept(idList=[7,5,9])
             break;

        case "Map9 MapStart":
             document.getElementById("Map6").className="mapEnabled"
             document.getElementById("Map8").className="mapEnabled"
             DisableAreasExcept(idList=[6,8])
             break;
    
               
        default:
            
            break;
    }
}


function ChangeMap(event) {
    let d = event.target.id;
    //destination.style.backgroundColor = "white";
    // document.querySelector(`[id=${destination}]`).style.backgroundColor = "red";
    //document.querySelector(`[id=${start}]`).style.backgroundColor = "red";


    const destination = document.getElementById(`${d}`);
    const start = document.querySelector("[id*=MapStart]");
    
    let startId = start.id
    //alert(startId)


    //let r = destination.document.querySelector("[id*=yes]")

    if (destination.className=="mapEnabled" && start!=destination) {
        destination.className=="mapDisabled"

        /*destination.style.backgroundColor = "red";
        start.style.backgroundColor = "white";*/
    
        destination.id=`${destination.id.concat(" MapStart")}`
        start.id=`${start.id.replace(" MapStart", "")}`
        ShowMap()

        
    }
}


function DisableAreasExcept(idList = []) {
    for (let i = 0; i < 9; i++) {
        if (!idList.includes(i+1)) {
            document.querySelector(`[id*=Map${i+1}]`).className="mapDisabled";
        }
    }
}

//DisableAreasExcept(idList = [1])

