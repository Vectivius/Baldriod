//-/- Osztályok -\-\\
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

class Scroll {
    constructor(id, name, cost, spellId) {
        this.id=id
        this.name=name
        this.cost=cost
        this.spellId=spellId
    }
}















//-/- Változók -\-\\
let weaponList = []
let armorList = []
let shieldList = []
let scrollList = []
let spellList = []

let itemList = [
    {name: "Food", cost: 4, stackSize: 10, shopAmount: "5-15", usable: true},
    {name: "Small backpack", cost: 7, stackSize: 1, shopAmount: "1", usable: false},
    {name: "Large backpack", cost: 12, stackSize: 1, shopAmount: "1", usable: false},
    {name: "Grenade", cost: 10, stackSize: 3, shopAmount: "2-6", usable: true, damage: "3-9"},
]

let enemyList = []

let player = getPlayer()


//Increase or decrease during fight
let attackModifier = 0
let defenseModifier = 0

let attackWithWeapon = false
let enemyAttackWithWeapon = false

//Max items
let weaponListLength = 3  //4   //5
let armorListLength = 1  //2   //3
let shieldListLength = 1 //2   //3
let itemListLength = 3 //4   //5


let shopLoaded = false

let playerDead = false


let itemName = ""
let itemType = ""

let shopId = ""

let spellCost = 0
let generalId = 0
let unselectId = ""
let currentLocation = 2

let fighting = false

let sellItem = false







let enemyId=0;

let difficultyLevel = 1

let enemyKilled = 0
let threeEnemyKilled = 0



















//-/- Adatok betöltése az adatbázisból -\-\\
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
function createScroll(id, name, cost, spellId) {
    let item = new Scroll(id, name, cost, spellId)
    scrollList.push(item)
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
getData(`${route}scroll`).then((scroll) => {
    for (let i = 0; i < scroll.length; i++) {
        createScroll(scroll[i].id, scroll[i].scrollName, scroll[i].scrollCost, scroll[i].spellId)
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




















































//-/- Új kör -\-\\
function newRound() {
    disabled("ButtonNewRound")
    disabled("ButtonSaveGame")
    disabled("ButtonTown")
    hidden("DivEnemyAttributes", false)
    do {
        enemyId=randomNumber(0,enemyList.length-1);
    } while (enemyList[enemyId].level > difficultyLevel)
        
        newEnemy(enemyId)
}



//-/- Új ellenség -\-\\
function newEnemy(id) {
    fighting = true
    enableInventory(2)
    setText("EnemyName",enemyList[id].name);
    setText("EnemyAttack",enemyList[id].attack);
    setText("EnemyDefense",enemyList[id].defense);
    setText("EnemyHp",enemyList[id].hp);
    setText("EnemyDamage",enemyList[id].damage);
    setText("EnemyArmor",enemyList[id].armor);
    setText("EnemyMagic",enemyList[id].magic);

    enemy = getCurrentEnemy()
    

    hidden("PlayerActionAttack", false)
    hidden("PlayerActionSpell", false)
}











//-/- Játékos értékek lekérése -\-\\
function getPlayer() {
    let n=getText("PlayerName");
    let a=Number(getText("PlayerCurrentAttack"));
    let d=Number(getText("PlayerCurrentDefense"));
    let h=Number(getText("PlayerCurrentHp"));
    let m=Number(getText("PlayerCurrentMagic"));
    let wd=0
    
    let w=null
    let ar = null
    let s = null
    

    //Weapon
    if (getText("InventorySelectedWeaponSlot") != "") {
        w = getWeapon(getText("InventorySelectedWeapon"))
        w.slot = getText("InventorySelectedWeaponSlot")
        w.currentDurability = getText(`InventoryWeapon${w.slot}CurrentDurability`)
    }

    //Armor
    if (getText("InventorySelectedArmorSlot") != "") {
        ar = getArmor(getText("InventorySelectedArmor"))
        ar.slot = getText("InventorySelectedArmorSlot")
        ar.currentDurability = getText(`InventoryArmor${ar.slot}CurrentDurability`)
    }

    //Shield
    if (getText("InventorySelectedShieldSlot") != "") {
        s = getShield(getText("InventorySelectedShield"))
        s.slot = getText("InventorySelectedShieldSlot")
        s.currentDurability = getText(`InventoryShield${s.slot}CurrentDurability`)
    }

    let data = {name: n, attack: a, defense: d, hp: h, magic: m, weapon:w, armor:ar, shield:s}
    return data
}



//-/- Ellenség lekérése -\-\\
function getCurrentEnemy() {
    let n=getText("EnemyName");
    let a=Number(getText("EnemyAttack"));
    let d=Number(getText("EnemyDefense"));
    let h=Number(getText("EnemyHp"));
    let da=String(getText("EnemyDamage"));
    let ar=Number(getText("EnemyArmor"));
    let m=Number(getText("EnemyMagic"));
    let enemy = {name: n, attack: a, defense: d, hp: h, damage: da, armor: ar, magic: m}
    return enemy
}




















//-/- Egy körben lévő sebzés -\-\\
let damageThisRound = {hp: 0, attack: 0, defense: 0, magic: 0}

function setDamageThisRound(hp=0, attack=0, defense=0, magic=0) {
    damageThisRound.hp=hp
    damageThisRound.attack=attack
    damageThisRound.defense=defense
    damageThisRound.magic=magic
}















//-/- Játékos varázslat -\-\\
function playerActionSpell(scrollName = null, scrollPlace = null) {
    if (hasClass("PlayerActionSpell", "tdSelectable")) {
    
        addClass("PlayerActionSpell", "tdSelectable", 0)
        addClass("PlayerActionSpell", "hover", 1)
        //Ellenség és játékos adatai
        player = getPlayer()
        enemy = getCurrentEnemy()
        let spell = null
    
        if(getText("InventoryChoosenSpell") != "none" || scrollName != null) {

    
        //Varázslat választás
        if (scrollName == null) {
            spell = getSpell(getText("InventoryChoosenSpell"))
            generalId = 0
        } else {
            spell = getSpell(scrollName.split(" ")[0])
            generalId = scrollPlace
        }

        if (player.magic >= spell.cost) {


        //Véletlen értékek
        let attack = 0
        let defense = 0
        let hp = 0
        let minAttack = 0
        let maxAttack = 0
    
        if (spell.attack.includes("-")) {
            minAttack = Number(spell.attack.split("-")[0])
            maxAttack = Number(spell.attack.split("-")[1])
            attack = Number(randomNumber(minAttack, maxAttack))
        } else {
            attack = Number(spell.attack)
        }
    
        if (spell.defense.includes("-")) {
            minDefense = Number(spell.defense.split("-")[0])
            maxDefense = Number(spell.defense.split("-")[1])
            defense = Number(randomNumber(minDefense, maxDefense))
        } else {
            defense = Number(spell.defense)
        }
    
        if (spell.hp.includes("-")) {
            minHp = Number(spell.hp.split("-")[0])
            maxHp = Number(spell.hp.split("-")[1])
            hp = Number(randomNumber(minHp, maxHp))
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
                setColor("EnemyAttack", "var(--red1)")
                setText("EnemyAttack", `${getText('EnemyAttack')}-${attack}`)
                enemy.attack -= attack
                messageString+=messageString2.concat(` ${attack} attack`)
            }
    
            if (defense != 0) {
                setColor("EnemyDefense", "var(--red1)")
                setText("EnemyDefense", `${getText('EnemyDefense')}-${defense}`)
                enemy.defense -= defense
                if (attack != 0) {
                    messageString+=messageString2.concat(`, ${defense} defense`)
                }
                else {
                    messageString+=messageString2.concat(` ${defense} defense`)
                }
            }
    
            if (hp != 0) {
                setColor("EnemyHp", "var(--red1)")
                setText("EnemyHp", `${getText('EnemyHp')}-${hp}`)
                enemy.hp -= hp
    
                if (attack != 0 || defense != 0) {
                    messageString+=messageString2.concat(`, ${hp} health`)
                } else {
                    messageString+=messageString2.concat(` ${hp} health`)
                }
            }
            sendMessage(`${player.name} uses ${spell.name}<br> ${enemy.name} loses`+ messageString,1, ["PlayerActionSpell2", "", ""])
    
            //Player magic decrease
            player.magic -=spell.cost
            setColor("PlayerCurrentMagic", "var(--red1)")
            setText("PlayerCurrentMagic", `${getText('PlayerCurrentMagic')}-${spell.cost}`)
    
        } else if (spell.type = "defense") {
                
                        let messageString = ``
                        let messageString2 = ""
            
                    //Üzenet összerakás
                    if (attack != 0) {
                        setColor("EnemyAttack", "var(--red1)")
                        setText("EnemyAttack", `${getText('EnemyAttack')}+${attack}`)
                        attackModifier+=attack
                        setText("PlayerAttackModifier", attackModifier)
                        player.attack += attack
                        messageString+=messageString2.concat(` ${attack} attack`)
                    }
            
                    if (defense != 0) {
                        setColor("PlayerCurrentDefense", "var(--red1)")
                        setText("PlayerCurrentDefense", `${getText('PlayerCurrentDefense')}+${defense}`)
                        defenseModifier+=defense
                        setText("PlayerDefenseModifier", defenseModifier)
                        player.defense += defense
                        if (attack != 0) {
                            messageString+=messageString2.concat(`, ${defense} defense`)
                        }
                        else {
                            messageString+=messageString2.concat(` ${defense} defense`)
                        }
                    }
            
                    if (hp != 0) {
                        setColor("PlayerCurrentHp", "var(--red1)")
                        setText("PlayerCurrentHp", `${getText('PlayerCurrentHp')}+${hp}`)
                        // hpModifier+=hp
                        // setText("PlayerHpModifier", hpModifier)
                        player.hp += hp
            
                        if (attack != 0 || defense != 0) {
                            messageString+=messageString2.concat(`, ${hp} health`)
                        } else {
                            messageString+=messageString2.concat(` ${hp} health`)
                        }
                    }
                    sendMessage(`${player.name} uses ${spell.name}<br> ${player.name} gains`+ messageString,1, ["PlayerActionSpell2", "", ""])
            
                    //Játekos mágia csökkentése
                    player.magic -=spell.cost
                    setColor("PlayerCurrentMagic", "var(--red1)")
                    setText("PlayerCurrentMagic", `${getText('PlayerCurrentMagic')}-${spell.cost}`)
        }
    } else {
        sendMessage("You don't have enough magic for this spell!",1,["UnselectSpellButton","",""])
        addClass("PlayerActionAttack", "tdSelectable", 1)
    }
    } else {
        sendMessage("Choose a spell first!",1,["UnselectSpellButton","",""])
        addClass("PlayerActionAttack", "tdSelectable", 1)
    }

}
}










function playerActionSpell2() {
    setColor("PlayerCurrentAttack", "var(--light3)")
    setColor("PlayerCurrentDefense", "var(--light3)")
    setColor("PlayerCurrentHp", "var(--light3)")
    setColor("PlayerCurrentMagic", "var(--light3)")

    setColor("EnemyAttack", "var(--light3)")
    setColor("EnemyDefense", "var(--light3)")
    setColor("EnemyHp", "var(--light3)")

    setText("PlayerCurrentAttack", player.attack)
    setText("PlayerCurrentDefense", player.defense)
    if (player.hp > getText('PlayerStartHp')) {
        player.hp = getText('PlayerStartHp')
    }
    setText("PlayerCurrentHp", player.hp)

    setText("PlayerCurrentMagic", player.magic)

    setText("EnemyAttack", enemy.attack)
    setText("EnemyDefense", enemy.defense)
    setText("EnemyHp", enemy.hp)

    addClass("PlayerActionSpell", "tdSelectable", 1)

    

    if (enemy.hp < 1) {
        setText("EnemyHp", "0")
        sendMessage(`${enemy.name} dies`, 1, ["PlayerActionDamage2", "", ""])
    } else {
        enemyAction()
    }
}











//-/- Játékos támadás -\-\\
function playerActionAttack() {
    if (hasClass("PlayerActionAttack", "tdSelectable")) {

    

    addClass("PlayerActionAttack", "tdSelectable", 0)
    addClass("PlayerActionAttack", "hover", 1)


    //Get attributes
    player = getPlayer()
    weapon = getWeapon(getText("InventorySelectedWeapon"))
    weaponSlot = getText("InventorySelectedWeaponSlot")
    enemy = getCurrentEnemy()

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
    random=randomNumber(1,12);    
    setColor("PlayerCurrentAttack", "var(--red1)")

    //Sikeres támadás
    if (player.attack+random>enemy.defense) {

        attackWithWeapon = true
        sendMessage(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} > ${enemy.defense} <br> Succesful attack!`,1, ["PlayerActionDamage", "", ""]);        
        setDamageThisRound(randomNumber(Number(playerDamageMin), Number(playerDamageMax))-enemy.armor, 0, 0, 0)
        
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
    sendMessage(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} < ${enemy.defense} <br> Unsuccesful attack!`,1, ["EnemyAction", "", ""]);
} else {
    sendMessage(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} = ${enemy.defense} <br> Unsuccesful attack!`,1, ["EnemyAction", "", ""]);
}
}
}

function playerActionDamage() {
    setColor("PlayerCurrentAttack", "var(--light3)")
        //Enemy dies
        if (enemy.hp<=0) {
            setText("EnemyHp","0");
            sendMessage(`${enemy.name} has died`,1, ["PlayerActionDamage2", "", ""])
            setColor("EnemyHp", "var(--red1)")
            // setText("NextFunction", `PlayerActionDamage2`)
        }
        //Enemy damaged
        else {
            
            sendMessage(`${enemy.name} loses ${damageThisRound.hp} health`,1, ["PlayerActionDamage2", "", ""])
            // setText("NextFunction", `PlayerActionDamage2`)
            setColor("EnemyHp", "var(--red1)")

            setText("EnemyHp",String(`${getText("EnemyHp")}-${damageThisRound.hp}`));
        }
    }


function playerActionDamage2() {
    if (enemy.hp<=0) {
        //Ellenség meghal
        fighting = false
        endRound()
        
       
    } else {
        //Enemy damaged
        setText("EnemyHp",String(enemy.hp));
        if (enemy.attack>=0) setText("EnemyAttack",String(enemy.attack));
        if (enemy.defense>=0) setText("EnemyDefense",String(enemy.defense));
        if (enemy.magic>=0) setText("EnemyMagic",String(enemy.magic));
        setColor("EnemyHp", "var(--light3)")
        enemyAction()
    }
}





















//-/- Ellenség köre -\-\\
function enemyAction() {

    //Kijelölések törlése
    for (let i = 0; i < itemListLength; i++) {
        addClass(`InventoryItem${i+1}Use`, "tdSelected", 0)
    }

    addClass("PlayerActionAttack", "hover", 0)
    addClass("PlayerActionSpell", "hover", 0)
    setColor("PlayerCurrentAttack", "var(--light3)")
    if (enemy.magic < 4) {
        enemyActionAttack()
    } else {
        random = randomNumber(0,1)
        if (random == 0) {
            enemyActionSpell()
        } else enemyActionSpell()
    }
}


//-/- Ellenség varázslat -\-\\
function enemyActionSpell() {
    //Ellenség és játékos adatai
    player = getPlayer()
    enemy = getCurrentEnemy()
    

    //Varázslat választás
    let random = randomNumber(1, spellList.length)
    let spell = getSpellById(random)
    do {
        random = randomNumber(1, spellList.length)
        spell = getSpellById(random)
    } while (spell.cost > enemy.magic)

    //Véletlen értékek
    let attack = 0
    let defense = 0
    let hp = 0
    let minAttack = 0
    let maxAttack = 0

    if (spell.attack.includes("-")) {
        minAttack = Number(spell.attack.split("-")[0])
        maxAttack = Number(spell.attack.split("-")[1])
        attack = Number(randomNumber(minAttack, maxAttack))
    } else {
        attack = Number(spell.attack)
    }

    if (spell.defense.includes("-")) {
        minDefense = Number(spell.defense.split("-")[0])
        maxDefense = Number(spell.defense.split("-")[1])
        defense = Number(randomNumber(minDefense, maxDefense))
    } else {
        defense = Number(spell.defense)
    }

    if (spell.hp.includes("-")) {
        minHp = Number(spell.hp.split("-")[0])
        maxHp = Number(spell.hp.split("-")[1])
        hp = Number(randomNumber(minHp, maxHp))
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
            setColor("PlayerCurrentAttack", "var(--red1)")
            attackModifier -= attack
            setText("PlayerAttackModifier", attackModifier)
            player.attack = getText('PlayerCurrentAttack') - attack
            setText("PlayerCurrentAttack", `${getText('PlayerCurrentAttack')}-${attack}`)
            messageString+=messageString2.concat(` ${attack} attack`)
        }

        if (defense != 0) {
            setColor("PlayerCurrentDefense", "var(--red1)")
            defenseModifier -= defense
            setText("PlayerDefenseModifier", defenseModifier)
            player.defense = getText('PlayerCurrentDefense') - defense
            setText("PlayerCurrentDefense", `${getText('PlayerCurrentDefense')}-${defense}`)
            if (attack != 0) {
                messageString+=messageString2.concat(`, ${defense} defense`)
            }
            else {
                messageString+=messageString2.concat(` ${defense} defense`)
            }
        }

        if (hp != 0) {
            setColor("PlayerCurrentHp", "var(--red1)")
            setText("PlayerCurrentHp", `${getText('PlayerCurrentHp')}-${hp}`)
            //player.hp = getText('PlayerStartHp') - hp
            player.hp = player.hp - hp

            if (attack != 0 || defense != 0) {
                messageString+=messageString2.concat(`, ${hp} health`)
            } else {
                messageString+=messageString2.concat(` ${hp} health`)
            }
        }
        sendMessage(`${enemy.name} uses ${spell.name}<br> ${player.name} loses`+ messageString,1, ["EnemyActionSpell2", "", ""])

        //Ellenfél mágia csökkentése
        enemy.magic = getText('EnemyMagic') - spell.cost
        setColor("EnemyMagic", "var(--red1)")
        setText("EnemyMagic", `${getText('EnemyMagic')}-${spell.cost}`)

    } else if (spell.type = "defense") {        
                    
                    let messageString = ``
                    let messageString2 = ""
        
                //Üzenet összerakás
                if (attack != 0) {
                    setColor("EnemyAttack", "var(--red1)")
                    setText("EnemyAttack", `${getText('EnemyAttack')}+${attack}`)
                    enemy.attack += attack
                    messageString+=messageString2.concat(` ${attack} attack`)
                }
        
                if (defense != 0) {
                    setColor("EnemyDefense", "var(--red1)")
                    setText("EnemyDefense", `${getText('EnemyDefense')}+${defense}`)
                    enemy.defense += defense
                    if (attack != 0) {
                        messageString+=messageString2.concat(`, ${defense} defense`)
                    }
                    else {
                        messageString+=messageString2.concat(` ${defense} defense`)
                    }
                }
        
                if (hp != 0) {
                    setColor("EnemyHp", "var(--red1)")
                    setText("EnemyHp", `${getText('EnemyHp')}+${hp}`)
                    enemy.hp += hp
        
                    if (attack != 0 || defense != 0) {
                        messageString+=messageString2.concat(`, ${hp} health`)
                    } else {
                        messageString+=messageString2.concat(` ${hp} health`)
                    }
                }
                sendMessage(`${enemy.name} uses ${spell.name}<br> ${enemy.name} gains`+ messageString,1, ["EnemyActionSpell2", "", ""])
        
                //Ellenfél mágia csökkentése
                enemy.magic = getText('EnemyMagic') - spell.cost
                setColor("EnemyMagic", "var(--red1)")
                setText("EnemyMagic", `${getText('EnemyMagic')}-${spell.cost}`)
    }
}

function enemyActionSpell2() {
    setColor("PlayerCurrentAttack", "var(--light3)")
    setColor("PlayerCurrentDefense", "var(--light3)")
    setColor("PlayerCurrentHp", "var(--light3)")

    setColor("EnemyAttack", "var(--light3)")
    setColor("EnemyDefense", "var(--light3)")
    setColor("EnemyHp", "var(--light3)")
    setColor("EnemyMagic", "var(--light3)")

    setText("PlayerCurrentAttack", player.attack)
    setText("PlayerCurrentDefense", player.defense)
    setText("PlayerCurrentHp", player.hp)



    setText("EnemyAttack", enemy.attack)
    setText("EnemyDefense", enemy.defense)
    setText("EnemyHp", enemy.hp)
    setText("EnemyMagic", enemy.magic)

    //player = GetPlayer()
    //player.hp = getText("PlayerCurrentHp")

    if (player.hp < 1) {
        setText("PlayerCurrentHp", "0")
        sendMessage(`${player.name} dies`, 1, ["EnemyActionDamage2", "", ""])
    }
}



//-/- Ellenség támadás -\-\\
function enemyActionAttack() {
    //Get attributes
    player = getPlayer()
    let playerArmor = 0
    if (player.armor != null) {
        playerArmor = player.armor.damageReduction
    }

    weapon = getWeapon(getText("InventorySelectedWeapon"))
    enemy = getCurrentEnemy()

    //Set damage to 1 if player doesn't have a weapon
    let enemyDamageMin=(enemy.damage).split('-')[0];
    let enemyDamageMax=(enemy.damage).split('-')[1];

    //Attack message
    random=randomNumber(1,12);    
    setColor("EnemyAttack", "var(--red1)")

    //Check if enemy won round
    if (enemy.attack+random>player.defense) {

        enemyAttackWithWeapon = true
        sendMessage(`Attack of ${enemy.name}: ${enemy.attack} + ${random} <br> ${enemy.attack} + ${random} > ${player.defense} <br> Succesful attack!`,1, ["EnemyActionDamage", "", ""]);

        
        setDamageThisRound(randomNumber(Number(enemyDamageMin), Number(enemyDamageMax))-Number(playerArmor))

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
    sendMessage(`Attack of ${enemy.name}: ${enemy.attack} + ${random} <br> ${enemy.attack} + ${random} < ${player.defense} <br> Unsuccesful attack!`,1, ["EndRound", "", ""]);
} else {
    sendMessage(`Attack of ${enemy.name}: ${enemy.attack} + ${random} <br> ${enemy.attack} + ${random} = ${player.defense} <br> Unsuccesful attack!`,1, ["EndRound", "", ""]);
}
}


function enemyActionDamage() {
    setColor("EnemyAttack", "var(--light3)")
        //Player dies
        if (player.hp<=0) {
            setText("PlayerCurrentHp","0");
            sendMessage(`${player.name} has died`,1, ["EnemyActionDamage2", "", ""])
            setColor("PlayerCurrentHp", "var(--red1)")
            // setText("NextFunction", `EnemyActionDamage2`)
        }
        //Player damaged
        else {
            sendMessage(`${player.name} loses ${damageThisRound.hp} health`,1, ["EnemyActionDamage2", "", ""])
            // setText("NextFunction", `EnemyActionDamage2`)
            setColor("PlayerCurrentHp", "var(--red1)")

            setText("PlayerCurrentHp",String(`${getText("PlayerCurrentHp")}-${damageThisRound.hp}`));
        }
    }

function enemyActionDamage2() {
    if (player.hp<=0) {
        //Player dies
        // setText("NextFunction", ``)
        setColor("PlayerCurrentHp", "var(--light3)")
        setDamageThisRound(1)
        setText("PlayerCurrentHp", "0")
        playerDies()
    } else {
        //Player damaged
        setText("PlayerCurrentHp",String(player.hp));
        if (enemy.attack>=0) setText("PlayerCurrentAttack",String(player.attack));
        if (enemy.defense>=0) setText("PlayerCurrentDefense",String(player.defense));
        if (enemy.magic>=0) setText("PlayerCurrentMagic",String(player.magic));
        setColor("PlayerCurrentHp", "var(--light3)")
       endRound()
        
    }
}














//-/- Kör vége -\-\\
function endRound() {
    if (attackWithWeapon == true) {
            //Lose weapon durability
            let weaponSlot = getText("InventorySelectedWeaponSlot")
            //Durability -1
            if (weaponSlot != "") {
               player.weapon.currentDurability--
               if (player.weapon.currentDurability<1) {
                   //RemoveWeapon1(Number(weaponSlot))
                   generalId = weaponSlot
                   itemType = "weapon"
                   removeItem2()
                   sendMessage("Your weapon has broken!",1, ["", "", ""])
      
               } else {
                  setText(`InventoryWeapon${weaponSlot}CurrentDurability`,player.weapon.currentDurability);
                  setText(`InventorySelectedWeaponDurability`,"(" + player.weapon.durability + "/" + player.weapon.currentDurability + ")");
               }
           }
           attackWithWeapon = false
    }


if (enemyAttackWithWeapon == true) {
  //Lose armor durability
  let armorSlot = getText("InventorySelectedArmorSlot")
  //Durability -1
  if (armorSlot != "") {
     player.armor.currentDurability--
     if (player.armor.currentDurability<1) {
         generalId = armorSlot
         itemType = "armor"
         removeItem2()
         sendMessage("Your armor has broken!",1, ["", "", ""])
       
     } else {
        setText(`InventoryArmor${armorSlot}CurrentDurability`,player.armor.currentDurability);
        setText(`InventorySelectedArmorDurability`,"(" + player.armor.durability + "/" + player.armor.currentDurability + ")");
     }
 }

            

  //Lose shield durability
  let shieldSlot = getText("InventorySelectedShieldSlot")
  //Durability -1
  if (shieldSlot != "") {
     player.shield.currentDurability--
     if (player.shield.currentDurability<1) {
         //RemoveWeapon1(Number(weaponSlot))
         generalId = shieldSlot
         itemType = "shield"
         removeItem2()
         sendMessage("Your shield has broken!",1, ["", "", ""])

     } else {
        setText(`InventoryShield${shieldSlot}CurrentDurability`,player.shield.currentDurability);
        setText(`InventorySelectedShieldDurability`,"(" + player.shield.durability + "/" + player.shield.currentDurability + ")");
     }
 }
 enemyAttackWithWeapon = false
}
          

    setColor("EnemyAttack", "var(--light3)")
    setColor("EnemyHp", "var(--light3)")
    setColor("PlayerCurrentAttack", "var(--light3)")
    setColor("PlayerCurrentHp", "var(--light3)")

    addClass("PlayerActionAttack", "tdSelectable", 1)
    addClass("PlayerActionSpell", "tdSelectable", 1)
    addClass("PlayerActionAttack", "hover", 0)
    addClass("PlayerActionSpell", "hover", 0)
    //getElement("PlayerActionItem").classList.add("tdSelectable")

    //Harc véget ért
    if (fighting == false) {

        enabled("ButtonNewRound")
        enabled("ButtonSaveGame")
        
                //Mágia növelése 1-gyel
                if (player.magic < getText("PlayerStartMagic")) {
                    player.magic++
                    setText("PlayerCurrentMagic", player.magic)
                }
                setText("InventoryCoins", Number(getText("InventoryCoins")) + getEnemyCoins(enemy.name))
        
                setText("PlayerCurrentAttack", getText("PlayerCurrentAttack") - attackModifier)
                setText("PlayerCurrentDefense", getText("PlayerCurrentDefense") - defenseModifier)
                // if (getText("PlayerCurrentHp") > getText("PlayerStartHp")) {
                //     setText("PlayerCurrentHp", getText("PlayerCurrentHp") - hpModifier)
                // }
                setText("PlayerAttackModifier", "")
                setText("PlayerDefenseModifier", "")
                // setText("PlayerHpModifier", "")
                attackModifier = 0
                defenseModifier = 0
        
                enemyKilled+=1
                threeEnemyKilled+=1
                if (threeEnemyKilled == 3) {
                    threeEnemyKilled = 0
                    difficultyLevel+=1
                }
        
                fighting = false
                enableInventory(1)
                //inventoryEnabled = true
        
                //Reload weapon and modifiers
                let weaponSlot = getText("InventorySelectedWeaponSlot")
                if (weaponSlot != "") {
                    changeSelectedItem(weaponSlot, "weapon")
                    changeSelectedItem(weaponSlot, "weapon")
                }
            
                addClass("PlayerActionAttack", "hover", 0)
                
                setColor("EnemyHp", "var(--light3)")
                hidden("DivEnemyAttributes", true)
                hidden("PlayerActionAttack", true)
                hidden("PlayerActionSpell", true)
                //hidden("PlayerActionItem", true)
        
                enabled("ButtonTown")        
    }
}










//-/- Játékos meghal -\-\\
function playerDies() {
    playerDead = true
    enableInventory(0)
    disabled("ButtonTown")
    disabled("ButtonNewRound")

    addClass("PlayerActionAttack", "tdDisabled", 1)
    addClass("PlayerActionSpell", "tdDisabled", 1)
    //addClass("PlayerActionItem", "tdDisabled", 1)

    addClass("PlayerActionAttack", "tdSelectable", 0)
    addClass("PlayerActionSpell", "tdSelectable", 0)
    //addClass("PlayerActionItem", "tdSelectable", 0)
}


















//-/- Legyőzött ellenségtől pénz -\-\\
function getEnemyCoins(enemyName) {
    let enemy = getEnemy(enemyName)
    let min = Math.round(((enemy.attack*2)+enemy.defense+enemy.hp+(enemy.armor*2)+(enemy.magic*3))/10)
    let max = Math.round(((enemy.attack*2)+enemy.defense+enemy.hp+(enemy.armor*2)+(enemy.magic*3))/7)
    return randomNumber(min, max)
}























const DivMessageBg = document.getElementById("DivMessageBg")
const ButtonActionAttack = document.getElementById("ButtonActionAttack")
const ButtonActionSpell = document.getElementById("ButtonActionSpell")



/* Gyorsbillentyűk */
document.onkeypress = function (enter) {
    enter = enter || window.event;
    if (DivMessageBg.id == "DivMessageBgVisible") {
        DivMessageBg.id = "DivMessageBg"
        //hidden('DivMessageBg', true); 

        addClass("MessageButtonContinue", "hover", 1)
        addClass("MessageButtonYes", "hover", 1)
        addClass("MessageButtonNo", "hover", 1)

        setTimeout(() => {        
            callNewFunction("Continue")
        }, 50)

        
    }
};





//-/- Egy adat lekérése a listákból -\-\\
function getWeapon(name) {
    for (let i = 0; i < weaponList.length; i++) {
        if (weaponList[i].name==String(name)) {
            return weaponList[i]
        }
    }
}
function getArmor(name) {
    for (let i = 0; i < armorList.length; i++) {
        if (armorList[i].name==String(name)) {
            return armorList[i]
        }
    }
}
function getShield(name) {
    for (let i = 0; i < shieldList.length; i++) {
        if (shieldList[i].name==String(name)) {
            return shieldList[i]
        }
    }
}
function getScroll(name) {
    for (let i = 0; i < scrollList.length; i++) {
        if (scrollList[i].name==String(name)) {
            return scrollList[i]
        }
    }
}
function getSpell(name) {
    for (let i = 0; i < spellList.length; i++) {
        if (spellList[i].name==String(name)) {
            return spellList[i]
        }
    }
}
function getSpellById(id) {
    for (let i = 0; i < spellList.length; i++) {
        if (spellList[i].id==String(id)) {
            return spellList[i]
        }
    }
}
function getEnemy(name) {
    for (let i = 0; i < enemyList.length; i++) {
        if (enemyList[i].name==String(name)) {
            return enemyList[i]
        }
    }
}
function getLocation(name) {
    for (let i = 0; i < locationList.length; i++) {
        if (locationList[i].name==String(name)) {
            return locationList[i]
        }
    }
}
function getItem(name) {
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].name==String(name)) {
            return itemList[i]
        }
    }
}



function getGeneralItem(name, type) {
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
        case "scroll":
            for (let i = 0; i < scrollList.length; i++) {
                if (scrollList[i].name==String(name)) {
                    return scrollList[i]
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






function setCoins(number) {
    let old = Number(getText("InventoryCoins"))
    setText("InventoryCoins", old+number)
}











function unselectSpellButton() {
    addClass("PlayerActionSpell", "tdSelectable", 1)
    addClass("PlayerActionSpell", "hover", 0)
}




















//-/- Menü -\-\\

function setDifficulty(difficultyName) {
    switch (difficultyName) {
        case "Easy":
            setText("SettingsLabelDifficulty", "easy")
            addClass("SettingsOptionEasy", "tdSelected", 1)
            addClass("SettingsOptionMedium", "tdSelected", 0)
            addClass("SettingsOptionHard", "tdSelected", 0)
            difficulty = "easy"
            break;
        case "Medium":
            setText("SettingsLabelDifficulty", "medium")
            addClass("SettingsOptionEasy", "tdSelected", 0)
            addClass("SettingsOptionMedium", "tdSelected", 1)
            addClass("SettingsOptionHard", "tdSelected", 0)

            difficulty = "medium"
            break;
        case "Hard":
            setText("SettingsLabelDifficulty", "hard")
            addClass("SettingsOptionEasy", "tdSelected", 0)
            addClass("SettingsOptionMedium", "tdSelected", 0)
            addClass("SettingsOptionHard", "tdSelected", 1)
            difficulty = "hard"
            break;
        default:
            break;
    }
}



function settingsTooltip(yesOrNo) {
    if (yesOrNo == "yes") {
        addClass("SettingsOptionYes", "tdSelected", 1)
        addClass("SettingsOptionNo", "tdSelected", 0)
        getElement("tooltipsDisabled").id = "tooltipsEnabled"
        setText("LabelSettingsTooltip", "yes")
    } else {
        addClass("SettingsOptionYes", "tdSelected", 0)
        addClass("SettingsOptionNo", "tdSelected", 1)
        getElement("tooltipsEnabled").id = "tooltipsDisabled"
        setText("LabelSettingsTooltip", "no")
    }
}


/* Open */

function openSettings() {
    hiddenSwitch('DivSettings')

    hidden("DivAccount", true)
    addClass("ButtonAccount", "buttonSelected", 0)

    hidden("DivSave", true)
    addClass("ButtonSave", "buttonSelected", 0)

    hidden("DivLoad", true)
    addClass("ButtonLoad", "buttonSelected", 0)


    /*
    hidden("DivSave", true)
    addClass("ButtonSave", "buttonSelected", 0)
    hidden("DivLoad", true)
    addClass("ButtonLoad", "buttonSelected", 0)*/

    if (getElement('DivSettings').hidden == false) {
        getElement('ButtonSettings').classList.add('buttonSelected')
    } else {
        getElement('ButtonSettings').classList.remove('buttonSelected')
    }
}


function openAccount() {
    hiddenSwitch('DivAccount')

    hidden("DivSettings", true)
    addClass("ButtonSettings", "buttonSelected", 0)

    hidden("DivSave", true)
    addClass("ButtonSave", "buttonSelected", 0)

    hidden("DivLoad", true)
    addClass("ButtonLoad", "buttonSelected", 0)


    /*
    hidden("DivSave", true)
    addClass("ButtonSave", "buttonSelected", 0)
    hidden("DivLoad", true)
    addClass("ButtonLoad", "buttonSelected", 0)*/

    if (getElement('DivAccount').hidden == false) {
        getElement('ButtonAccount').classList.add('buttonSelected')
    } else {
        getElement('ButtonAccount').classList.remove('buttonSelected')
    }
}


function openSaveGame() {
    hiddenSwitch("DivSave")

    hidden("DivSettings", true)
    addClass("ButtonSettings", "buttonSelected", 0)

    hidden("DivAccount", true)
    addClass("ButtonAccount", "buttonSelected", 0)

    hidden("DivLoad", true)
    addClass("ButtonLoad", "buttonSelected", 0)


    if (getElement('DivSave').hidden == false) {
        addClass('ButtonSave', 'buttonSelected', 1)
    } else {
        addClass('ButtonSave', 'buttonSelected', 0)
    }
}

function openLoadGame() {
    hiddenSwitch("DivLoad")

    hidden("DivSettings", true)
    addClass("ButtonSettings", "buttonSelected", 0)

    hidden("DivAccount", true)
    addClass("ButtonAccount", "buttonSelected", 0)

    hidden("DivSave", true)
    addClass("ButtonSave", "buttonSelected", 0)


    if (getElement('DivLoad').hidden == false) {
        addClass('ButtonLoad', 'buttonSelected', 1)
    } else {
        addClass('ButtonLoad', 'buttonSelected', 0)
    }
}





//-/- Játék mentése -\-\\
function saveGame() {
    if (getValue("SaveName") == "") {
        sendMessage("Type a name first!", 1, ["", "", ""])
    } else {
        saveGame2()
    }
}


function saveGame2() {
    let saveName = getValue("SaveName")
    getData(`${route}saves/get/${localStorage.getItem("userId")}/${saveName}/name`).then((response) => {
        if (response[0] != undefined) {
            generalId = response[0].id
            sendMessage("This save already exists. Do you want to overwrite it?", 2, ["", "saveGame3", ""])
        } else {
            saveGame3()
        }
    })
}


function saveGame3(localSave = false, replace = false) {

    let weapon = ""
    let armor = ""
    let shield = ""
    let weaponDurability = ""
    let armorDurability = ""
    let shieldDurability = ""

    
    for (let i = 0; i < weaponListLength; i++) {
        weapon += getText(`InventoryWeapon${i+1}`)
        weapon += "-"
    }
    for (let i = 0; i < armorListLength; i++) {
        armor += getText(`InventoryArmor${i+1}`)
        armor += "-"
    }
    for (let i = 0; i < shieldListLength; i++) {
        shield += getText(`InventoryShield${i+1}`)
        shield += "-"
    }



    for (let i = 0; i < weaponListLength; i++) {
        weaponDurability += getText(`InventoryWeapon${i+1}CurrentDurability`)
        weaponDurability += "-"
    }
    for (let i = 0; i < armorListLength; i++) {
        armorDurability += getText(`InventoryArmor${i+1}CurrentDurability`)
        armorDurability += "-"
    }
    for (let i = 0; i < shieldListLength; i++) {
        shieldDurability += getText(`InventoryShield${i+1}CurrentDurability`)
        shieldDurability += "-"
    }




    let selectedItem1 = getText("InventorySelectedWeaponSlot")
    if (selectedItem1 == "") selectedItem1 = 0
    let selectedItem2 = getText("InventorySelectedArmorSlot")
    if (selectedItem2 == "") selectedItem2 = 0
    let selectedItem3 = getText("InventorySelectedShieldSlot")
    if (selectedItem3 == "") selectedItem3 = 0
    

    let data = {
        saveName: getValue("SaveName"),
        userId: localStorage.getItem("userId"),
        playerName: getText("PlayerName"),
        PlayerAttack: getText("PlayerStartAttack") + "-" + getText("PlayerCurrentAttack"),
        PlayerDefense: getText("PlayerStartDefense") + "-" + getText("PlayerCurrentDefense"),
        PlayerHp: getText("PlayerStartHp") + "-" + getText("PlayerCurrentHp"),
        PlayerMagic: getText("PlayerStartMagic") + "-" + getText("PlayerCurrentMagic"),
        Weapons: weapon,
        Armors: armor,
        Shields: shield,
        WeaponsDurability: weaponDurability,
        ArmorsDurability: armorDurability,
        ShieldsDurability: shieldDurability,
        SelectedItems: selectedItem1 + "-" + selectedItem2 + "-" + selectedItem3
    }

    //Local storage
    localStorage.setItem("playerName", getText("PlayerName"))

    localStorage.setItem("playerAttack", getText("PlayerStartAttack") + "-" + getText("PlayerCurrentAttack"))
    localStorage.setItem("playerDefense", getText("PlayerStartDefense") + "-" + getText("PlayerCurrentDefense"))
    localStorage.setItem("playerHp", getText("PlayerStartHp") + "-" + getText("PlayerCurrentHp"))
    localStorage.setItem("playerMagic", getText("PlayerStartMagic") + "-" + getText("PlayerCurrentMagic"))

    localStorage.setItem("weapons", weapon)
    localStorage.setItem("armors", armor)
    localStorage.setItem("shields", shield)
    localStorage.setItem("weaponsDurability", weaponDurability)
    localStorage.setItem("armorsDurability", armorDurability)
    localStorage.setItem("shieldsDurability", shieldDurability)
    localStorage.setItem("selectedItems", selectedItem1 + "-" + selectedItem2 + "-" + selectedItem3)
    
    if (localSave != true) {

        //Delete old
        if (replace == true) {
            deleteData(`${route}delete/saves/${generalId}`)
        }

        //Save
        postData(`${route}saves/new/${data.userId}`,data, localStorage.getItem("token"))
        .then((response) => {
            console.log(data)
                return response.json()
            }).then((data) => {
                if (data.status == 404) {
                    err = document.getElementById("error");
                    err.innerHTML = data.error;
                }
                console.log(data.error);
            }).catch((error) => {
                console.log(error);
              }).finally(() => {
                location.href="pagePlay.html"
              });


        }
}


function clickLoadGame(saveName) {
    if (saveName == "") {
        sendMessage("Type a name first!", 1, ["", "", ""])
    } else {
        clickLoadGame2(saveName)
    }






 
    
    





    
    
/*
    let weaponsString = localStorage.getItem("weaponsName")
    let weaponsNameList = weaponsString.split(",")

    setText("PlayerCurrentAttack", localStorage.getItem("currentAttack"))
    setText("PlayerCurrentDefense", localStorage.getItem("currentDefense"))
    setText("PlayerCurrentHp", localStorage.getItem("currentHp"))
    setText("PlayerCurrentMagic", localStorage.getItem("currentMagic"))*/
    
    //Log(weaponsNameList)

   // let weaponsDurability = localStorage.getItem("weaponsName")
/*
    for (let i = 0; i < weaponsNameList.length; i++) {
        ReloadWeaponList(weaponsNameList[i])
    }*/
}

function clickLoadGame2(saveName) {
    loadGame(saveName)
}




//Open difficulty list
const AreaSettingsDifficulty = document.getElementById("AreaDifficulty")
AreaSettingsDifficulty.addEventListener("mouseleave", function() {
    hidden("Difficulty", true)
    document.getElementById("ButtonDifficulty").classList.remove("hover")
})
AreaSettingsDifficulty.addEventListener("mouseover", function () {
    hidden("Difficulty", false)
    document.getElementById("ButtonDifficulty").classList.add("hover")
})

//Open tooltip list
const AreaSettingsTooltip = document.getElementById("AreaSettingsTooltip")
AreaSettingsTooltip.addEventListener("mouseleave", function() {
    hidden("DivSettingsTooltip", true)
    document.getElementById("ButtonSettingsTooltip").classList.remove("hover")
})
AreaSettingsTooltip.addEventListener("mouseover", function () {
    hidden("DivSettingsTooltip", false)
    document.getElementById("ButtonSettingsTooltip").classList.add("hover")
})







//Rename
function renameSave() {
    let data = {
        newName: getValue("NewSaveName"),
        userId: localStorage.getItem("userId")
    }
    postData(`${route}saves/rename/${localStorage.getItem("userId")}/${generalId}`, data, localStorage.getItem("token")).then((data) => {
        setText("TrData", "")
        setText("TbodyData", "")
        hidden("DivRenameSave", true)
        loadSaves()
    })
}
//Delete
function deleteSave() {

    let data = {
        userId: localStorage.getItem("userId")
    }

    deleteData(`${route}saves/delete/${localStorage.getItem("userId")}/${generalId}`, data, localStorage.getItem("token")).then((data) => {
        setText("TrData", "")
        setText("TbodyData", "")
        loadSaves()
    })
}




document.body.addEventListener("click", (event) => {

       //Load
        if (event.target.id.includes('LoadSave') ) {
            loadGame(event.target.id.split("-")[1])
        }

       //Rename
        if (event.target.id.includes('EditSave') ) {

            let list = document.getElementsByClassName("tdSelected")

            for (let i = 0; i < list.length; i++) {
                list[i].classList.remove("tdSelected") 
            }

            addClass(event.target.id, "tdSelected", 1)
            generalId = event.target.id.split("-")[1]
            hidden("DivRenameSave", false)

        }

       //Delete
        if (event.target.id.includes('DeleteSave') ) {

            deselectItems()

            addClass(event.target.id, "tdSelected", 1)
            generalId = event.target.id.split("-")[1]
            hidden("DivRenameSave", true)
            sendMessage("Are you sure you want to delete this save?", 2, ["", "deleteSave", "deselectItems"])

        }


})


// document.body.addEventListener("mouseover", (event) => {
//     if (event.target.id == "ButtonLoad" || event.target.id == "DivLoad") {
//         hidden("DivLoad", false)
//     }
// })



// document.body.addEventListener("mouseleave", (event) => {
//     if (event.target.id != "ButtonLoad" && event.target.id != "DivLoad") {
//         hidden("DivLoad", false)
//     }
// })








function showAccountEdit(hide = false) {
    if (hide == true) {
        hidden("DivEditAccount", true)
        hidden("DivUserAccount", false)
        setValue("EditPassword", "")
        localStorage.removeItem("userPassword")
        saveGame3(true)
        location.href="pagePlay.html"
    } else {
        hidden("DivUserAccount", true)
        hidden("DivEditAccount", false)
        setValue("EditEmail", localStorage.getItem("userEmail"))
        setValue("EditName", localStorage.getItem("userName"))
        loadPassword()
    }
}




function loadPassword() {
            getData(`${route}user/password/${localStorage.getItem("userId")}`, localStorage.getItem("token")).then((response) => {
                console.log(response)
                setValue("EditPassword", response[0].userPassword)
                localStorage.setItem("userPassword", response[0].userPassword)
            })
}

function saveEditedAccount() {
    let data = {
        email: getValue("EditEmail"),
        name: getValue("EditName"),
        password: getValue("EditPassword")
    }
    putData(`${route}user/edit/${localStorage.getItem("userId")}`, data, localStorage.getItem("token")).then(() => {
        setValue("UserEmail", data.email)
        setValue("UserName", data.name)
        localStorage.setItem("userEmail", data.email)
        localStorage.setItem("userName", data.name)
        localStorage.setItem("userPassword", data.password)

        if (localStorage.getItem("userEmail") == data.email && localStorage.getItem("userName") == data.name && localStorage.getItem("userPassword") == data.password) {
            sendMessage("Succesful save!", 1, ["", "", ""])
        }
    })
}

