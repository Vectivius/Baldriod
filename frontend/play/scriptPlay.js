class Enemy {
    constructor(id, name, attack, defense, hp, damage, armor, magic, level) {
        this.id=id
        this.name=name
        this.attack=attack
        this.defense=defense
        this.hp=hp
        this.damage=damage
        this.armor=armor
        this.magic=magic
        this.level=level
    }
}

class Weapon {
    constructor(id, name, attack, defense, damage, cost, durability, twoHanded) {
        this.id=id
        this.name=name
        this.attack=attack
        this.defense=defense
        this.damage=damage
        this.cost=cost
        this.durability=durability
        this.twoHanded=twoHanded
    }
}

class Armor {
    constructor(id, name, defense, damageReduction, cost, durability) {
        this.id=id
        this.name=name
        this.defense=defense
        this.damageReduction=damageReduction
        this.cost=cost
        this.durability=durability
    }
}

class Shield {
    constructor(id, name, defense, cost, durability, twoHandedPenalty) {
        this.id=id
        this.name=name
        this.defense=defense
        this.cost=cost
        this.durability=durability
        this.twoHandedPenalty=twoHandedPenalty
    }
}

class Spell {
    constructor(id, name, type, attack, defense, hp, cost, length) {
        this.id=id
        this.name=name
        this.type=type
        this.attack=attack
        this.defense=defense
        this.hp=hp
        this.cost=cost
        this.length=length
    }
}

class Item {
    constructor(id, name, stackable, stackSize, cost, spellId) {
        this.id=id
        this.name=name
        this.stackable=stackable
        this.stackSize=stackSize
        this.cost=cost
        this.spellId=spellId
    }
}

let weaponList = []
let armorList = []
let shieldList = []
let itemList = []
let spellList = []

let enemyList = []

let player = GetPlayer()

//Increase or decrease during fight
let attackModifier = 0
let defenseModifier = 0

//Max items
let weaponListLength = 5
let armorListLength = 3
let shieldListLength = 3
let itemListLength = 5


//Next function to call after message box
let nextFunctionContinue = ""
let nextFunctionYes = ""
let nextFunctionNo = ""

let difficulty = "normal"

let shopLoaded = false




let itemName = ""
let itemType = ""

let shopId = ""

let spellCost = 0
let generalId = 0
let currentLocation = 2

let fighting = false
let inventoryEnabled = true

let sellItem = false

function createWeapon(id,name,attack,defense, damage, cost, durability, twoHanded) {
    let weapon = new Weapon(id, name, attack, defense, damage, cost, durability, twoHanded)
    weaponList.push(weapon)
}
function createArmor(id,name,defense, damageReduction, cost, durability) {
    let armor = new Armor(id, name, defense, damageReduction, cost, durability)
    armorList.push(armor)
}
function createShield(id,name ,defense, cost, durability, twoHandedPenalty) {
    let shield = new Shield(id, name, defense, cost, durability, twoHandedPenalty)
    shieldList.push(shield)
}
function createItem(id, name, stackable, stackSize, cost, spellId) {
    let item = new Item(id, name, stackable, stackSize, cost, spellId)
    itemList.push(item)
}
function createSpell(id, name, type, attack, defense, hp, cost, length) {
    let spell = new Spell(id, name, type, attack, defense, hp, cost, length)
    spellList.push(spell)
}

function createEnemy(id,name,attack,defense, hp, damage, armor, magic, level) {
    let enemy = new Enemy(id, name,attack,defense, hp, damage, armor, magic, level)
    enemyList.push(enemy)
}



getData(`${route}weapon`).then((weapon) => {
    for (let i = 0; i < weapon.length; i++) {
        createWeapon(weapon[i].id, weapon[i].weaponName, weapon[i].weaponAttack, weapon[i].weaponDefense, weapon[i].weaponDamage, weapon[i].weaponCost, weapon[i].weaponDurability, weapon[i].twoHanded)
    }
})
getData(`${route}armor`).then((armor) => {
    for (let i = 0; i < armor.length; i++) {
        if (armor[i].armorName.includes("armor")) {
            createArmor(armor[i].id, armor[i].armorName, armor[i].armorDefense, armor[i].armorDamageReduction, armor[i].armorCost, armor[i].armorDurability)
        } else {
            createShield(armor[i].id, armor[i].armorName, armor[i].armorDefense, armor[i].armorCost, armor[i].armorDurability, armor[i].twoHandedPenalty)
        }
    }
})
getData(`${route}item`).then((item) => {
    for (let i = 0; i < item.length; i++) {
        createItem(item[i].id, item[i].itemName, item[i].stackable, item[i].stackSize, item[i].itemCost, item[i].spellId)
    }
})
getData(`${route}spell`).then((spell) => {
    for (let i = 0; i < spell.length; i++) {
        createSpell(spell[i].id, spell[i].spellName, spell[i].spellType, spell[i].spellAttack, spell[i].spellDefense, spell[i].spellHp, spell[i].spellCost, spell[i].spellLength)
    }
})


getData(`${route}enemy`).then((enemy) => {
    for (let i = 0; i < enemy.length; i++) {
        createEnemy(enemy[i].id, enemy[i].enemyName, enemy[i].enemyAttack, enemy[i].enemyDefense, enemy[i].enemyHp, enemy[i].enemyDamage, enemy[i].enemyArmor, enemy[i].enemyMagic, enemy[i].enemyLevel)
    }
})







let enemyId=0;

let difficultyLevel = 1

let enemyKilled = 0
let threeEnemyKilled = 0

function NewRound() {
    SetText("NextFunction", "")
    // Hidden("MessageButtonNo", true)
    // SetText("MessageButtonYes", "Continue")
    // GetElement("MessageButtonYes").style.width = "100%"
    //MapHide()
    Hidden("ButtonTown", true)
    //HiddenSwitch("EnterTown")
    let a = 0;
    Hidden("DivEnemyAttributes", false)
    //location.href = 'pageNewGame.html';
    let type=0    //RandomNumber(0,1);
    switch (type) {
        case 0:
            do {
                enemyId=RandomNumber(0,enemyList.length-1);
            } while (enemyList[enemyId].level > difficultyLevel)
                
                NewEnemy(enemyId)
            break;
        case 1: 
            break;
        default:
            break;
    }

}




function NewEnemy(id) {
    fighting = true
    EnableInventory(0)
    //inventoryEnabled = false
    SetText("EnemyName",enemyList[id].name);
    SetText("EnemyAttack",enemyList[id].attack);
    SetText("EnemyDefense",enemyList[id].defense);
    SetText("EnemyHp",enemyList[id].hp);
    SetText("EnemyDamage",enemyList[id].damage);
    SetText("EnemyArmor",enemyList[id].armor);
    SetText("EnemyMagic",enemyList[id].magic);

    enemy = GetCurrentEnemy()
    

    // document.getElementById("PlayerActionAttack").classList.add("buttonActionEnabled")
    // document.getElementById("PlayerActionSpell").classList.add("buttonActionEnabled")
    // document.getElementById("PlayerActionMode").classList.add("buttonActionEnabled")
    // document.getElementById("PlayerActionItem").classList.add("buttonActionEnabled")

    // document.getElementById("PlayerActionAttack").classList.remove("buttonActionDisabled")
    // document.getElementById("PlayerActionSpell").classList.remove("buttonActionDisabled")
    // document.getElementById("PlayerActionMode").classList.remove("buttonActionDisabled")
    // document.getElementById("PlayerActionItem").classList.remove("buttonActionDisabled")

    Hidden("PlayerActionAttack", false)
    Hidden("PlayerActionSpell", false)
    // Hidden("PlayerActionMode", false)
    Hidden("PlayerActionItem", false)

    // Enabled("PlayerActionAttack");
    // Enabled("PlayerActionSpell");
    // Enabled("PlayerActionMode");
    // Enabled("PlayerActionItem");
}

// function NewEnemy(name,attack,defense,hp,damage,armor=0,magic=0) {
//     SetText("EnemyName",name);
//     SetText("EnemyAttack",attack);
//     SetText("EnemyDefense",defense);
//     SetText("EnemyHp",hp);
//     SetText("EnemyDamage",damage);
//     SetText("EnemyArmor",armor);
//     SetText("EnemyMagic",magic);

//     Enabled("PlayerActionAttack");
//     Enabled("PlayerActionSpell");
//     Enabled("PlayerActionMode");
//     Enabled("PlayerActionItem");
// }











function GetPlayer() {
    let n=GetText("PlayerName");
    let a=Number(GetText("PlayerCurrentAttack"));
    let d=Number(GetText("PlayerCurrentDefense"));
    let h=Number(GetText("PlayerCurrentHp"));
    let m=Number(GetText("PlayerCurrentMagic"));
    let wd=0
    
    let w=null
    let ar = null
    let s = null
    

    //Weapon
    if (GetText("InventorySelectedWeaponSlot") != "") {
        w = GetWeapon(GetText("InventorySelectedWeapon"))
        w.slot = GetText("InventorySelectedWeaponSlot")
        w.currentDurability = GetText(`InventoryWeapon${w.slot}CurrentDurability`)
    }

    //Armor
    if (GetText("InventorySelectedArmorSlot") != "") {
        ar = GetArmor(GetText("InventorySelectedArmor"))
        ar.slot = GetText("InventorySelectedArmorSlot")
        ar.currentDurability = GetText(`InventoryArmor${ar.slot}CurrentDurability`)
    }

    //Shield
    if (GetText("InventorySelectedShieldSlot") != "") {
        s = GetShield(GetText("InventorySelectedShield"))
        s.slot = GetText("InventorySelectedShieldSlot")
        s.currentDurability = GetText(`InventoryShield${s.slot}CurrentDurability`)
    }

    let data = {name: n, attack: a, defense: d, hp: h, magic: m, weapon:w, armor:ar, shield:s}
    return data
}

function GetCurrentEnemy() {
    let n=GetText("EnemyName");
    let a=Number(GetText("EnemyAttack"));
    let d=Number(GetText("EnemyDefense"));
    let h=Number(GetText("EnemyHp"));
    let da=String(GetText("EnemyDamage"));
    let ar=Number(GetText("EnemyArmor"));
    let m=Number(GetText("EnemyMagic"));
    let enemy = {name: n, attack: a, defense: d, hp: h, damage: da, armor: ar, magic: m}
    return enemy
}




















//Get attributes
// let player = GetPlayer()
// let weapon = GetWeapon(GetText("InventorySelectedWeapon"))
// let weaponSlot = GetText("InventorySelectedWeaponSlot")
// let enemy = GetCurrentEnemy()
// let weaponCurrentDurability =0 
let damageThisRound = {hp: 0, attack: 0, defense: 0, magic: 0}
// let random

function SetDamageThisRound(hp=0, attack=0, defense=0, magic=0) {
    damageThisRound.hp=hp
    damageThisRound.attack=attack
    damageThisRound.defense=defense
    damageThisRound.magic=magic
}









// function PlayerActionSpell() {
//     if (GetElement("InventoryChoosenSpelll"))
// }





function PlayerActionItem() {
    player = GetPlayer()
    GetElement("PlayerActionAttack").classList.remove("tdClickable")
    GetElement("PlayerActionSpell").classList.remove("tdClickable")
    GetElement("PlayerActionItem").classList.remove("tdClickable")
    EnableInventory(2)
    //inventoryEnabled = true
}



function PlayerActionSpell(scrollName = null, scrollPlace = null) {
    GetElement("PlayerActionSpell").classList.add("hover")
    //Ellenség és játékos adatai
    player = GetPlayer()
    enemy = GetCurrentEnemy()
    let spell = null

    if(GetText("InventoryChoosenSpell") != "none" || scrollName != null) {

    

    //Varázslat választás
    if (scrollName == null) {
        spell = GetSpell(GetText("InventoryChoosenSpell"))
        generalId = 0
    } else {
        spell = GetSpell(scrollName.split(" ")[0])
        generalId = scrollPlace
    }

     
    

    //Véletlen értékek
    let attack = 0
    let defense = 0
    let hp = 0
    let minAttack = 0
    let maxAttack = 0

    if (spell.attack.includes("-")) {
        minAttack = Number(spell.attack.split("-")[0])
        maxAttack = Number(spell.attack.split("-")[1])
        attack = Number(RandomNumber(minAttack, maxAttack))
    } else {
        attack = Number(spell.attack)
    }

    if (spell.defense.includes("-")) {
        minDefense = Number(spell.defense.split("-")[0])
        maxDefense = Number(spell.defense.split("-")[1])
        defense = Number(RandomNumber(minDefense, maxDefense))
    } else {
        defense = Number(spell.defense)
    }

    if (spell.hp.includes("-")) {
        minHp = Number(spell.hp.split("-")[0])
        maxHp = Number(spell.hp.split("-")[1])
        hp = Number(RandomNumber(minHp, maxHp))
    } else {
        hp = Number(spell.hp)
    }

    if (spell.attack == "0") {
        attack = 0
    }
    
    if (spell.defense == "0") {
        defense = 0
    }
    
    if (spell.hp == "0") {
        hp = 0
    }

    

    //Támadó varázslat
        if (spell.type == "attack") {

            
            let messageString = ``
            let messageString2 = ""

        //Üzenet összerakás
        if (attack != 0) {
            SetColor("EnemyAttack", "var(--red1)")
            SetText("EnemyAttack", `${GetText('EnemyAttack')}-${attack}`)
            enemy.attack -= attack
            messageString+=messageString2.concat(` ${attack} attack`)
        }

        if (defense != 0) {
            SetColor("EnemyDefense", "var(--red1)")
            SetText("EnemyDefense", `${GetText('EnemyDefense')}-${defense}`)
            enemy.defense -= defense
            if (attack != 0) {
                messageString+=messageString2.concat(`, ${defense} defense`)
            }
            else {
                messageString+=messageString2.concat(` ${defense} defense`)
            }
        }

        if (hp != 0) {
            SetColor("EnemyHp", "var(--red1)")
            SetText("EnemyHp", `${GetText('EnemyHp')}-${hp}`)
            enemy.hp -= hp

            if (attack != 0 || defense != 0) {
                messageString+=messageString2.concat(`, ${hp} hp`)
            } else {
                messageString+=messageString2.concat(` ${hp} hp`)
            }
        }
        Message(`${player.name} uses ${spell.name}<br> ${enemy.name} loses`+ messageString,1, ["PlayerActionSpell2", "", ""])

        //Player magic decrease
        player.magic -=spell.cost
        SetColor("PlayerCurrentMagic", "var(--red1)")
        SetText("PlayerCurrentMagic", `${GetText('PlayerCurrentMagic')}-${spell.cost}`)

    } else if (spell.type = "defense") {
            
                    let messageString = ``
                    let messageString2 = ""
        
                //Üzenet összerakás
                if (attack != 0) {
                    SetColor("EnemyAttack", "var(--red1)")
                    SetText("EnemyAttack", `${GetText('EnemyAttack')}+${attack}`)
                    attackModifier+=attack
                    SetText("PlayerAttackModifier", attackModifier)
                    player.attack += attack
                    messageString+=messageString2.concat(` ${attack} attack`)
                }
        
                if (defense != 0) {
                    SetColor("PlayerCurrentDefense", "var(--red1)")
                    SetText("PlayerCurrentDefense", `${GetText('PlayerCurrentDefense')}+${defense}`)
                    defenseModifier+=defense
                    SetText("PlayerDefenseModifier", defenseModifier)
                    player.defense += defense
                    if (attack != 0) {
                        messageString+=messageString2.concat(`, ${defense} defense`)
                    }
                    else {
                        messageString+=messageString2.concat(` ${defense} defense`)
                    }
                }
        
                if (hp != 0) {
                    SetColor("PlayerCurrentHp", "var(--red1)")
                    SetText("PlayerCurrentHp", `${GetText('PlayerCurrentHp')}+${hp}`)
                    // hpModifier+=hp
                    // SetText("PlayerHpModifier", hpModifier)
                    player.hp += hp
        
                    if (attack != 0 || defense != 0) {
                        messageString+=messageString2.concat(`, ${hp} hp`)
                    } else {
                        messageString+=messageString2.concat(` ${hp} hp`)
                    }
                }
                Message(`${player.name} uses ${spell.name}<br> ${player.name} gains`+ messageString,1, ["PlayerActionSpell2", "", ""])
        
                //Játekos mágia csökkentése
                player.magic -=spell.cost
                SetColor("PlayerCurrentMagic", "var(--red1)")
                SetText("PlayerCurrentMagic", `${GetText('PlayerCurrentMagic')}-${spell.cost}`)
    }
} else {
    GetElement("PlayerActionSpell").classList.remove("hover")
    Message("Choose a spell first!",1,["","",""])
}
}

function PlayerActionSpell2() {
    SetColor("PlayerCurrentAttack", "var(--light3)")
    SetColor("PlayerCurrentDefense", "var(--light3)")
    SetColor("PlayerCurrentHp", "var(--light3)")
    SetColor("PlayerCurrentMagic", "var(--light3)")

    SetColor("EnemyAttack", "var(--light3)")
    SetColor("EnemyDefense", "var(--light3)")
    SetColor("EnemyHp", "var(--light3)")

    SetText("PlayerCurrentAttack", player.attack)
    SetText("PlayerCurrentDefense", player.defense)
    if (player.hp > GetText('PlayerStartHp')) {
        player.hp = GetText('PlayerStartHp')
    }
    SetText("PlayerCurrentHp", player.hp)

    SetText("PlayerCurrentMagic", player.magic)

    SetText("EnemyAttack", enemy.attack)
    SetText("EnemyDefense", enemy.defense)
    SetText("EnemyHp", enemy.hp)

    

    if (enemy.hp < 1) {
        SetText("EnemyHp", "0")
        Message(`${enemy.name} dies`, 1, ["PlayerActionDamage2", "", ""])
    } else {
        EnemyAction()
    }
}







//Attack of the player
function PlayerActionAttack() {
    GetElement("PlayerActionAttack").classList.add("hover")

    // Hidden("PlayerActionAttack", true)
    // Hidden("PlayerActionSpell", true)
    // Hidden("PlayerActionMode", true)
    // Hidden("PlayerActionItem", true)


    // Disabled("PlayerActionSpell");
    // Disabled("PlayerActionMode");
    // Disabled("PlayerActionItem");

    //Get attributes
    player = GetPlayer()
    weapon = GetWeapon(GetText("InventorySelectedWeapon"))
    weaponSlot = GetText("InventorySelectedWeaponSlot")
    enemy = GetCurrentEnemy()
    //weaponCurrentDurability = player.weapon.currentDurability

    //Get weapon durability (if there is choosen weapon)
    // if (weaponSlot != "") {
    //     weaponCurrentDurability = GetText(`InventoryWeapon${weaponSlot}CurrentDurability`)
    // }

    //Set damage to 1 if player doesn't have a weapon
    let playerDamageMin=1
    let playerDamageMax=1

    //Set weapon damage
    if (weapon == undefined) {
        playerDamageMin=1
        playerDamageMax=1
    } else {
        playerDamageMin=weapon.damage.split('-')[0];
        playerDamageMax=weapon.damage.split('-')[1];
    }


    //Attack message
    random=RandomNumber(1,12);    
    SetColor("PlayerCurrentAttack", "var(--red1)")

    //Check if player won round
    if (player.attack+random>enemy.defense) {

        //Popup message
        Message(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} > ${enemy.defense} <br> Succesful attack!`,1, ["PlayerActionDamage", "", ""]);
        // SetText("NextFunction", `PlayerActionDamage`)
        

        SetDamageThisRound(RandomNumber(Number(playerDamageMin), Number(playerDamageMax))-enemy.armor, 0, 0, 0)
        
        //Set minimum damage if less than one
        if (damageThisRound.hp<1) {
            damageThisRound.hp = 1
            enemy.hp--
        }
        //Calculate damage
        else {
            enemy.hp-=damageThisRound.hp
        }
} else if (player.attack+random<enemy.defense) {
    Message(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} < ${enemy.defense} <br> Unsuccesful attack!`,1, ["EnemyAction", "", ""]);
} else {
    Message(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} = ${enemy.defense} <br> Unsuccesful attack!`,1, ["EnemyAction", "", ""]);
}
}

function PlayerActionDamage() {
    SetColor("PlayerCurrentAttack", "var(--light3)")
        //Enemy dies
        if (enemy.hp<=0) {
            SetText("EnemyHp","0");
            Message(`${enemy.name} has died`,1, ["PlayerActionDamage2", "", ""])
            SetColor("EnemyHp", "var(--red1)")
            // SetText("NextFunction", `PlayerActionDamage2`)
        }
        //Enemy damaged
        else {
            
            Message(`${enemy.name} loses ${damageThisRound.hp} hp`,1, ["PlayerActionDamage2", "", ""])
            // SetText("NextFunction", `PlayerActionDamage2`)
            SetColor("EnemyHp", "var(--red1)")

            SetText("EnemyHp",String(`${GetText("EnemyHp")}-${damageThisRound.hp}`));
        }
    }

function PlayerActionDamage2() {
    if (enemy.hp<=0) {
        

        //Enemy dies
        // SetText("PlayerCurrentAttack", GetText("PlayerStartAttack"))
        // SetText("PlayerCurrentDefense", GetText("PlayerStartDefense"))

        if (player.magic < GetText("PlayerStartMagic")) {
            player.magic++
            SetText("PlayerCurrentMagic", player.magic)
        }
        SetText("InventoryCoins", Number(GetText("InventoryCoins")) + GetEnemyCoins(enemy.name))

        SetText("PlayerCurrentAttack", GetText("PlayerCurrentAttack") - attackModifier)
        SetText("PlayerCurrentDefense", GetText("PlayerCurrentDefense") - defenseModifier)
        // if (GetText("PlayerCurrentHp") > GetText("PlayerStartHp")) {
        //     SetText("PlayerCurrentHp", GetText("PlayerCurrentHp") - hpModifier)
        // }
        SetText("PlayerAttackModifier", "")
        SetText("PlayerDefenseModifier", "")
        // SetText("PlayerHpModifier", "")
        attackModifier = 0
        defenseModifier = 0

        enemyKilled+=1
        threeEnemyKilled+=1
        if (threeEnemyKilled == 3) {
            threeEnemyKilled = 0
            difficultyLevel+=1
        }

        fighting = false
        EnableInventory(1)
        //inventoryEnabled = true

        //Reload weapon and modifiers
        let weaponSlot = GetText("InventorySelectedWeaponSlot")
        if (weaponSlot != "") {
            ChangeSelectedItem(weaponSlot, "weapon")
            ChangeSelectedItem(weaponSlot, "weapon")
        }
    
        GetElement("PlayerActionAttack").classList.remove("hover")
        
        //MapChange(currentLocation)
        SetColor("EnemyHp", "var(--light3)")
        Hidden("DivEnemyAttributes", true)
        Hidden("PlayerActionAttack", true)
        Hidden("PlayerActionSpell", true)
        Hidden("PlayerActionItem", true)

        Hidden("ButtonTown", false)
        
        // Hidden("PlayerActionMode", true)
        
    

        // document.getElementById("PlayerActionAttack").classList.remove("buttonActionEnabled")
        // document.getElementById("PlayerActionSpell").classList.remove("buttonActionEnabled")
        // document.getElementById("PlayerActionMode").classList.remove("buttonActionEnabled")
        // document.getElementById("PlayerActionItem").classList.remove("buttonActionEnabled")
    
        // document.getElementById("PlayerActionAttack").classList.add("buttonActionDisabled")
        // document.getElementById("PlayerActionSpell").classList.add("buttonActionDisabled")
        // document.getElementById("PlayerActionMode").classList.add("buttonActionDisabled")
        // document.getElementById("PlayerActionItem").classList.add("buttonActionDisabled")
    

        // Disabled("PlayerActionAttack");
        // Disabled("PlayerActionSpell");
        // Disabled("PlayerActionMode");
        // Disabled("PlayerActionItem");

        
        //SetDamageThisRound(1)

        EndRound()
       
    } else {
        //Enemy damaged
        SetText("EnemyHp",String(enemy.hp));
        if (enemy.attack>=0) SetText("EnemyAttack",String(enemy.attack));
        if (enemy.defense>=0) SetText("EnemyDefense",String(enemy.defense));
        if (enemy.magic>=0) SetText("EnemyMagic",String(enemy.magic));
        SetColor("EnemyHp", "var(--light3)")
        EnemyAction()
    }
}






















function EnemyAction() {
    GetElement("PlayerActionAttack").classList.remove("hover")
    GetElement("PlayerActionSpell").classList.remove("hover")
    SetColor("PlayerCurrentAttack", "var(--light3)")
    if (enemy.magic < 4) {
        EnemyActionAttack()
    } else {
        random = RandomNumber(0,1)
        if (random == 0) {
            EnemyActionSpell()
        } else EnemyActionAttack
    }
}



function EnemyActionSpell() {
    //Ellenség és játékos adatai
    player = GetPlayer()
    enemy = GetCurrentEnemy()
    

    //Varázslat választás
    let random = RandomNumber(1, spellList.length)
    let spell = GetSpellById(random)
    do {
        random = RandomNumber(1, spellList.length)
        spell = GetSpellById(random)
    } while (spell.cost > enemy.magic)
    //let spell = GetSpellById(1)

    //Véletlen értékek
    let attack = 0
    let defense = 0
    let hp = 0
    let minAttack = 0
    let maxAttack = 0

    if (spell.attack.includes("-")) {
        minAttack = Number(spell.attack.split("-")[0])
        maxAttack = Number(spell.attack.split("-")[1])
        attack = Number(RandomNumber(minAttack, maxAttack))
    } else {
        attack = Number(spell.attack)
    }

    if (spell.defense.includes("-")) {
        minDefense = Number(spell.defense.split("-")[0])
        maxDefense = Number(spell.defense.split("-")[1])
        defense = Number(RandomNumber(minDefense, maxDefense))
    } else {
        defense = Number(spell.defense)
    }

    if (spell.hp.includes("-")) {
        minHp = Number(spell.hp.split("-")[0])
        maxHp = Number(spell.hp.split("-")[1])
        hp = Number(RandomNumber(minHp, maxHp))
    } else {
        hp = Number(spell.hp)
    }

    if (spell.attack == "0") {
        attack = 0
    }
    
    if (spell.defense == "0") {
        defense = 0
    }
    
    if (spell.hp == "0") {
        hp = 0
    }

    //Támadó varázslat
        if (spell.type == "attack") {
            
            let messageString = ``
            let messageString2 = ""

        //Üzenet összerakás
        if (attack != 0) {
            SetColor("PlayerCurrentAttack", "var(--red1)")
            attackModifier -= attack
            SetText("PlayerAttackModifier", attackModifier)
            player.attack = GetText('PlayerCurrentAttack') - attack
            SetText("PlayerCurrentAttack", `${GetText('PlayerCurrentAttack')}-${attack}`)
            messageString+=messageString2.concat(` ${attack} attack`)
        }

        if (defense != 0) {
            SetColor("PlayerCurrentDefense", "var(--red1)")
            defenseModifier -= defense
            SetText("PlayerDefenseModifier", defenseModifier)
            player.defense = GetText('PlayerCurrentDefense') - defense
            SetText("PlayerCurrentDefense", `${GetText('PlayerCurrentDefense')}-${defense}`)
            if (attack != 0) {
                messageString+=messageString2.concat(`, ${defense} defense`)
            }
            else {
                messageString+=messageString2.concat(` ${defense} defense`)
            }
        }

        if (hp != 0) {
            SetColor("PlayerCurrentHp", "var(--red1)")
            SetText("PlayerCurrentHp", `${GetText('PlayerCurrentHp')}-${hp}`)
            player.hp = GetText('PlayerStartHp') - hp

            if (attack != 0 || defense != 0) {
                messageString+=messageString2.concat(`, ${hp} hp`)
            } else {
                messageString+=messageString2.concat(` ${hp} hp`)
            }
        }
        Message(`${enemy.name} uses ${spell.name}<br> ${player.name} loses`+ messageString,1, ["EnemyActionSpell2", "", ""])

        //Ellenfél mágia csökkentése
        enemy.magic = GetText('EnemyMagic') - spell.cost
        SetColor("EnemyMagic", "var(--red1)")
        SetText("EnemyMagic", `${GetText('EnemyMagic')}-${spell.cost}`)

    } else if (spell.type = "defense") {        
                    
                    let messageString = ``
                    let messageString2 = ""
        
                //Üzenet összerakás
                if (attack != 0) {
                    SetColor("EnemyAttack", "var(--red1)")
                    SetText("EnemyAttack", `${GetText('EnemyAttack')}+${attack}`)
                    enemy.attack += attack
                    messageString+=messageString2.concat(` ${attack} attack`)
                }
        
                if (defense != 0) {
                    SetColor("EnemyDefense", "var(--red1)")
                    SetText("EnemyDefense", `${GetText('EnemyDefense')}+${defense}`)
                    enemy.defense += defense
                    if (attack != 0) {
                        messageString+=messageString2.concat(`, ${defense} defense`)
                    }
                    else {
                        messageString+=messageString2.concat(` ${defense} defense`)
                    }
                }
        
                if (hp != 0) {
                    SetColor("EnemyHp", "var(--red1)")
                    SetText("EnemyHp", `${GetText('EnemyHp')}+${hp}`)
                    enemy.hp += hp
        
                    if (attack != 0 || defense != 0) {
                        messageString+=messageString2.concat(`, ${hp} hp`)
                    } else {
                        messageString+=messageString2.concat(` ${hp} hp`)
                    }
                }
                Message(`${enemy.name} uses ${spell.name}<br> ${enemy.name} gains`+ messageString,1, ["EnemyActionSpell2", "", ""])
        
                //Ellenfél mágia csökkentése
                enemy.magic = GetText('EnemyMagic') - spell.cost
                SetColor("EnemyMagic", "var(--red1)")
                SetText("EnemyMagic", `${GetText('EnemyMagic')}-${spell.cost}`)
    }
}

function EnemyActionSpell2() {
    SetColor("PlayerCurrentAttack", "var(--light3)")
    SetColor("PlayerCurrentDefense", "var(--light3)")
    SetColor("PlayerCurrentHp", "var(--light3)")

    SetColor("EnemyAttack", "var(--light3)")
    SetColor("EnemyDefense", "var(--light3)")
    SetColor("EnemyHp", "var(--light3)")
    SetColor("EnemyMagic", "var(--light3)")

    SetText("PlayerCurrentAttack", player.attack)
    SetText("PlayerCurrentDefense", player.defense)
    SetText("PlayerCurrentHp", player.hp)

    SetText("EnemyAttack", enemy.attack)
    SetText("EnemyDefense", enemy.defense)
    SetText("EnemyHp", enemy.hp)
    SetText("EnemyMagic", enemy.magic)
}



function EnemyActionAttack() {
    //Get attributes
    player = GetPlayer()
    let playerArmor = 0
    if (player.armor != null) {
        playerArmor = player.armor.damageReduction
    }

    weapon = GetWeapon(GetText("InventorySelectedWeapon"))
    enemy = GetCurrentEnemy()

    //Set damage to 1 if player doesn't have a weapon
    let enemyDamageMin=(enemy.damage).split('-')[0];
    let enemyDamageMax=(enemy.damage).split('-')[1];

    //Attack message
    random=RandomNumber(1,12);    
    SetColor("EnemyAttack", "var(--red1)")

    //Check if enemy won round
    if (enemy.attack+random>player.defense) {

        //Popup message
        Message(`Attack of ${enemy.name}: ${enemy.attack} + ${random} <br> ${enemy.attack} + ${random} > ${player.defense} <br> Succesful attack!`,1, ["EnemyActionDamage", "", ""]);

        
        SetDamageThisRound(RandomNumber(Number(enemyDamageMin), Number(enemyDamageMax))-Number(playerArmor))

        //Set minimum damage if less than one
        if (damageThisRound.hp<1) {
            player.hp--
            damageThisRound.hp = 1
        } 
        //Calculate damage
        else {
            player.hp-=damageThisRound.hp
        }
} else if (enemy.attack+random<player.defense) {
    Message(`Attack of ${enemy.name}: ${enemy.attack} + ${random} <br> ${enemy.attack} + ${random} < ${player.defense} <br> Unsuccesful attack!`,1, ["EndRound", "", ""]);
} else {
    Message(`Attack of ${enemy.name}: ${enemy.attack} + ${random} <br> ${enemy.attack} + ${random} = ${player.defense} <br> Unsuccesful attack!`,1, ["EndRound", "", ""]);
}
}


function EnemyActionDamage() {
    SetColor("EnemyAttack", "var(--light3)")
        //Player dies
        if (player.hp<=0) {
            SetText("PlayerCurrentHp","0");
            Message(`${player.name} has died`,1, ["EnemyActionDamage2", "", ""])
            SetColor("PlayerCurrentHp", "var(--red1)")
            // SetText("NextFunction", `EnemyActionDamage2`)
        }
        //Player damaged
        else {
            Message(`${player.name} loses ${damageThisRound.hp} hp`,1, ["EnemyActionDamage2", "", ""])
            // SetText("NextFunction", `EnemyActionDamage2`)
            SetColor("PlayerCurrentHp", "var(--red1)")

            SetText("PlayerCurrentHp",String(`${GetText("PlayerCurrentHp")}-${damageThisRound.hp}`));
        }
    }

function EnemyActionDamage2() {
    if (enemy.hp<=0) {
        //Player dies
        // SetText("NextFunction", ``)
        SetColor("PlayerCurrentHp", "var(--light3)")
        SetDamageThisRound(1)

    } else {
        //Player damaged
        SetText("PlayerCurrentHp",String(player.hp));
        if (enemy.attack>=0) SetText("PlayerCurrentAttack",String(player.attack));
        if (enemy.defense>=0) SetText("PlayerCurrentDefense",String(player.defense));
        if (enemy.magic>=0) SetText("PlayerCurrentMagic",String(player.magic));
        SetColor("PlayerCurrentHp", "var(--light3)")
       EndRound()
        
    }
}















function EndRound() {

            //Lose weapon durability
            let weaponSlot = GetText("InventorySelectedWeaponSlot")
            //Durability -1
            if (weaponSlot != "") {
               player.weapon.currentDurability--
               if (player.weapon.currentDurability<1) {
                   //RemoveWeapon1(Number(weaponSlot))
                   generalId = weaponSlot
                   RemoveWeapon2()
                   Message("Your weapon has broken!",1, ["", "", ""])
      
               } else {
                  SetText(`InventoryWeapon${weaponSlot}CurrentDurability`,player.weapon.currentDurability);
                  SetText(`InventorySelectedWeaponDurability`,"(" + player.weapon.durability + "/" + player.weapon.currentDurability + ")");
               }
           }

            //Lose armor durability
            let armorSlot = GetText("InventorySelectedArmorSlot")
            //Durability -1
            if (armorSlot != "") {
               player.armor.currentDurability--
               if (player.armor.currentDurability<1) {
                   generalId = armorSlot
                   RemoveArmor2()
                   Message("Your armor has broken!",1, ["", "", ""])
                 
               } else {
                  SetText(`InventoryArmor${armorSlot}CurrentDurability`,player.armor.currentDurability);
                  SetText(`InventorySelectedArmorDurability`,"(" + player.armor.durability + "/" + player.armor.currentDurability + ")");
               }
           }

                      

            //Lose shield durability
            let shieldSlot = GetText("InventorySelectedShieldSlot")
            //Durability -1
            if (shieldSlot != "") {
               player.shield.currentDurability--
               if (player.shield.currentDurability<1) {
                   //RemoveWeapon1(Number(weaponSlot))
                   generalId = shieldSlot
                   RemoveWeapon2()
                   Message("Your shield has broken!",1, ["", "", ""])
      
               } else {
                  SetText(`InventoryShield${shieldSlot}CurrentDurability`,player.shield.currentDurability);
                  SetText(`InventorySelectedShieldDurability`,"(" + player.shield.durability + "/" + player.shield.currentDurability + ")");
               }
           }

    SetColor("EnemyAttack", "var(--light3)")
    SetColor("EnemyHp", "var(--light3)")
    SetColor("PlayerCurrentAttack", "var(--light3)")
    SetColor("PlayerCurrentHp", "var(--light3)")

    GetElement("PlayerActionAttack").classList.add("tdClickable")
    GetElement("PlayerActionSpell").classList.add("tdClickable")
    GetElement("PlayerActionItem").classList.add("tdClickable")

}














function GetEnemyCoins(enemyName) {
    let enemy = GetEnemy(enemyName)
    let min = Math.round(((enemy.attack*2)+enemy.defense+enemy.hp+(enemy.armor*2)+(enemy.magic*3))/10)
    let max = Math.round(((enemy.attack*2)+enemy.defense+enemy.hp+(enemy.armor*2)+(enemy.magic*3))/7)
    return RandomNumber(min, max)
}





























//Open settings
// const AreaDivSettings = document.getElementById("ButtonSettings")
// const AreaDivSettings2 = document.getElementById("DivSettings")
// AreaDivSettings.addEventListener("mouseleave", function() {
//     Hidden("DivSettings", true)
//     document.getElementById("ButtonSettings").classList.remove("hover")
// })
// AreaDivSettings.addEventListener("mouseover", function () {
//     Hidden("DivSettings", false)
//     document.getElementById("ButtonSettings").classList.add("hover")
// })
// AreaDivSettings2.addEventListener("mouseleave", function() {
//     Hidden("DivSettings", true)
//     document.getElementById("ButtonSettings").classList.remove("hover")
// })
// AreaDivSettings2.addEventListener("mouseover", function () {
//     Hidden("DivSettings", false)
//     document.getElementById("ButtonSettings").classList.add("hover")
// })

function OpenSettings() {
    HiddenSwitch('DivSettings')
    if (GetElement('DivSettings').hidden == false) {
        GetElement('ButtonSettings').classList.add('buttonSelected')
    } else {
        GetElement('ButtonSettings').classList.remove('buttonSelected')
    }
}

//Open difficulty list
const AreaSettingsDifficulty = document.getElementById("AreaDifficulty")
AreaSettingsDifficulty.addEventListener("mouseleave", function() {
    Hidden("Difficulty", true)
    document.getElementById("ButtonDifficulty").classList.remove("hover")
})
AreaSettingsDifficulty.addEventListener("mouseover", function () {
    Hidden("Difficulty", false)
    document.getElementById("ButtonDifficulty").classList.add("hover")
})

function SetDifficulty(difficultyName) {
    switch (difficultyName) {
        case "Easy":
            SetText("SettingsLabelDifficulty", "easy")
            AddClass("SettingsOptionEasy", "tdSelected", 1)
            AddClass("SettingsOptionMedium", "tdSelected", 0)
            AddClass("SettingsOptionHard", "tdSelected", 0)
            difficulty = "easy"
            break;
        case "Medium":
            SetText("SettingsLabelDifficulty", "medium")
            AddClass("SettingsOptionEasy", "tdSelected", 0)
            AddClass("SettingsOptionMedium", "tdSelected", 1)
            AddClass("SettingsOptionHard", "tdSelected", 0)

            difficulty = "medium"
            break;
        case "Hard":
            SetText("SettingsLabelDifficulty", "hard")
            AddClass("SettingsOptionEasy", "tdSelected", 0)
            AddClass("SettingsOptionMedium", "tdSelected", 0)
            AddClass("SettingsOptionHard", "tdSelected", 1)
            difficulty = "hard"
            break;
        default:
            break;
    }
}

//Open tooltip list
const AreaSettingsTooltip = document.getElementById("AreaSettingsTooltip")
AreaSettingsTooltip.addEventListener("mouseleave", function() {
    Hidden("DivSettingsTooltip", true)
    document.getElementById("ButtonSettingsTooltip").classList.remove("hover")
})
AreaSettingsTooltip.addEventListener("mouseover", function () {
    Hidden("DivSettingsTooltip", false)
    document.getElementById("ButtonSettingsTooltip").classList.add("hover")
})

function SettingsTooltip(yesOrNo) {
    if (yesOrNo == "yes") {
        AddClass("SettingsOptionYes", "tdSelected", 1)
        AddClass("SettingsOptionNo", "tdSelected", 0)
        GetElement("tooltipsDisabled").id = "tooltipsEnabled"
        SetText("LabelSettingsTooltip", "yes")
    } else {
        AddClass("SettingsOptionYes", "tdSelected", 0)
        AddClass("SettingsOptionNo", "tdSelected", 1)
        GetElement("tooltipsEnabled").id = "tooltipsDisabled"
        SetText("LabelSettingsTooltip", "no")
    }
}

// function SetDifficulty(difficulty) {
//     switch (difficulty) {
//         case "Easy":
//             SetText("SettingsLabelDifficulty", "Easy")
//             break;
//         case "Medium":
//             SetText("SettingsLabelDifficulty", "Medium")
//             break;
//         case "Hard":
//             SetText("SettingsLabelDifficulty", "Hard")
//             break;
//         default:
//             break;
//     }
// }












//DisableAreasExcept(idList = [1])

// let type = "List"

// eval('var ' + "Weapon" + type);
// alert(type)
// alert()

/*
function GetObject(type, name) {
    for (let i = 0; i < `${type}List`.length; i++) {
        if (`${type}List`[i].name==String(name)) {
            return `${type}List`[i]
        }
        
    }
}*/









// let addItem = document.querySelector("[id*=BuyWeapon]")

















document.body.addEventListener("click", (event) => {
    if (event.target.id.includes('ImgMarker') ) {
        let mapId = Number(event.target.id.split("-")[1])
        MapChange(mapId)
    }
})


function MapChange(id) {
    switch (id) {
        case 1:
            imgPlayer.className = "imgPlayer map1"
            MapHide()
            MapShow(idList=[2,3,6])
            currentLocation = 1
            Hidden("EnterTown", true)
            
            break;
    
        case 2:
            imgPlayer.className = "imgPlayer map2"
            MapHide()
            MapShow(idList=[1,3,4])
            currentLocation = 2
            Hidden("EnterTown", false)
            break;
    
        case 3:
            imgPlayer.className = "imgPlayer map3"
            MapHide()
            MapShow(idList=[1,2,5,6])
            currentLocation = 3
            Hidden("EnterTown", true)
            break;
    
        case 4:
            imgPlayer.className = "imgPlayer map4"
            MapHide()
            MapShow(idList=[2,5])
            currentLocation = 4
            Hidden("EnterTown", true)
            break;
    
        case 5:
            imgPlayer.className = "imgPlayer map5"
            MapHide()
            MapShow(idList=[3,4,6])
            currentLocation = 5
            Hidden("EnterTown", true)
            break;
    
        case 6:
            imgPlayer.className = "imgPlayer map6"
            MapHide()
            MapShow(idList=[1,3,4,5])
            currentLocation = 6
            Hidden("EnterTown", true)
            break;
    
        default:
            break;
    }
}


function MapHide() {
    for (let i = 0; i < 6; i++) {
            document.querySelector(`[id*=ImgMarker-${i+1}]`).hidden = true;
    }
}
function MapShow(idList = []) {
    for (let i = 0; i < 9; i++) {
        if (idList.includes(i+1)) {
            document.querySelector(`[id*=ImgMarker-${i+1}]`).hidden = false;
        }
    }
}






// let imgPlayer = document.createElement("img")
// imgPlayer.src = "../images/player.png"
// let divMap = document.getElementById("DivMap")

// let TdMap1 = document.getElementById("TdMap-1")
// let TdMap2 = document.getElementById("TdMap-2")
// let TdMap3 = document.getElementById("TdMap-3")
// let TdMap4 = document.getElementById("TdMap-4")
// let TdMap5 = document.getElementById("TdMap-5")
// let TdMap6 = document.getElementById("TdMap-6")

// let imgMarker1 = document.createElement("img")
// imgMarker1.src = "../images/marker.png"
// imgMarker1.id = "ImgMarker-1"
// TdMap1.appendChild(imgMarker1)
// imgMarker1.hidden = true

// let imgMarker2 = document.createElement("img")
// imgMarker2.src = "../images/marker.png"
// imgMarker2.id = "ImgMarker-2"
// TdMap2.appendChild(imgMarker2)
// imgMarker2.hidden = true

// let imgMarker3 = document.createElement("img")
// imgMarker3.src = "../images/marker.png"
// imgMarker3.id = "ImgMarker-3"
// TdMap3.appendChild(imgMarker3)
// imgMarker3.hidden = true

// let imgMarker4 = document.createElement("img")
// imgMarker4.src = "../images/marker.png"
// imgMarker4.id = "ImgMarker-4"
// TdMap4.appendChild(imgMarker4)
// imgMarker4.hidden = true

// let imgMarker5 = document.createElement("img")
// imgMarker5.src = "../images/marker.png"
// imgMarker5.id = "ImgMarker-5"
// TdMap5.appendChild(imgMarker5)
// imgMarker5.hidden = true

// let imgMarker6 = document.createElement("img")
// imgMarker6.src = "../images/marker.png"
// imgMarker6.id = "ImgMarker-6"
// TdMap6.appendChild(imgMarker6)
// imgMarker6.hidden = true

// divMap.appendChild(imgPlayer)
//MapChange(currentLocation)






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

function ReloadShop1() {
    let cost = 0
    switch (difficulty) {
        case "easy":
            cost = 20
            break;

        case "normal":
            cost = 30
            break;

        case "hard":
            cost = 40
            break;
    
        default:
            break;
    }
    Message(`Do you want to reload the shop for ${cost} coins?`, 2, ["", "ReloadShop2", ""])
}

function ReloadShop2() {
    let cost = 0
    switch (difficulty) {
        case "easy":
            cost = 20
            break;

        case "normal":
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



function LoadTable(table) {
    switch (table) {
        case "Shop": if (shopLoaded == false) {
            SetText("tbodyShop", "")
            LoadShop()
            shopLoaded = true
        }
            break;
    
        default:
            break;
    }
}


























const DivMessageBg = document.getElementById("DivMessageBg")
const ButtonActionAttack = document.getElementById("ButtonActionAttack")
const ButtonActionSpell = document.getElementById("ButtonActionSpell")



/* Gyorsbillentyűk */
document.onkeypress = function (enter) {
    enter = enter || window.event;
    if (DivMessageBg.id == "DivMessageBgVisible") {
        DivMessageBg.id = "DivMessageBg"
        //Hidden('DivMessageBg', true); 
        Continue("Continue")
    }
};





function GetWeapon(name) {
    for (let i = 0; i < weaponList.length; i++) {
        if (weaponList[i].name==String(name)) {
            return weaponList[i]
        }
    }
}
function GetArmor(name) {
    for (let i = 0; i < armorList.length; i++) {
        if (armorList[i].name==String(name)) {
            return armorList[i]
        }
    }
}
function GetShield(name) {
    for (let i = 0; i < shieldList.length; i++) {
        if (shieldList[i].name==String(name)) {
            return shieldList[i]
        }
    }
}
function GetOtherItem(name) {
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].name==String(name)) {
            return itemList[i]
        }
    }
}
function GetSpell(name) {
    for (let i = 0; i < spellList.length; i++) {
        if (spellList[i].name==String(name)) {
            return spellList[i]
        }
    }
}
function GetSpellById(id) {
    for (let i = 0; i < spellList.length; i++) {
        if (spellList[i].id==String(id)) {
            return spellList[i]
        }
    }
}
function GetEnemy(name) {
    for (let i = 0; i < enemyList.length; i++) {
        if (enemyList[i].name==String(name)) {
            return enemyList[i]
        }
    }
}
function GetLocation(name) {
    for (let i = 0; i < locationList.length; i++) {
        if (locationList[i].name==String(name)) {
            return locationList[i]
        }
    }
}



function GetGeneralItem(name, type) {
    switch (type) {
        case "weapon":
            for (let i = 0; i < weaponList.length; i++) {
                if (weaponList[i].name==String(name)) {
                    return weaponList[i]
                }
            }
            break;
        case "armor":
            for (let i = 0; i < armorList.length; i++) {
                if (armorList[i].name==String(name)) {
                    return armorList[i]
                }
            }
            break;
        case "shield":
            for (let i = 0; i < shieldList.length; i++) {
                if (shieldList[i].name==String(name)) {
                    return shieldList[i]
                }
            }
            break;
        case "item":
            for (let i = 0; i < itemList.length; i++) {
                if (itemList[i].name==String(name)) {
                    return itemList[i]
                }
            }
            break;
    
        default:
            break;
    }
}

function SetCoins(number) {
    let old = Number(GetText("InventoryCoins"))
    SetText("InventoryCoins", old+number)
}


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


function Continue(type) {
    let next = ""

    if (type == "Yes") {
        next = nextFunctionYes

    } else if (type == "No") {
        next = nextFunctionNo

    } else if (type == "Continue") {
        next = nextFunctionContinue
    }
    //nextFunction //GetText("NextFunction")
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

        case "RemoveWeapon2":
            RemoveWeapon2()
            CloseWeaponList()
            break;
        case "RemoveArmor2":
            RemoveArmor2()
            CloseArmorList()
            break;
        case "RemoveShield2":
            RemoveShield2()
            CloseShieldList()
            break;

        case "CloseWeaponList":
            CloseWeaponList()
            break;
        case "CloseArmorList":
            CloseArmorList()
            break;
        case "CloseShieldList":
            CloseShieldList()
            break;
    
        case "EndRound":
            EndRound()
            break;
        default:
            break;
    }
}







