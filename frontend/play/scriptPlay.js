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

let player = GetPlayer()


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
function NewRound() {
    Disabled("ButtonNewRound")
    Disabled("ButtonSaveGame")
    Hidden("ButtonTown", true)
    Hidden("DivEnemyAttributes", false)
    do {
        enemyId=RandomNumber(0,enemyList.length-1);
    } while (enemyList[enemyId].level > difficultyLevel)
        
        NewEnemy(enemyId)
}



//-/- Új ellenség -\-\\
function NewEnemy(id) {
    fighting = true
    EnableInventory(2)
    SetText("EnemyName",enemyList[id].name);
    SetText("EnemyAttack",enemyList[id].attack);
    SetText("EnemyDefense",enemyList[id].defense);
    SetText("EnemyHp",enemyList[id].hp);
    SetText("EnemyDamage",enemyList[id].damage);
    SetText("EnemyArmor",enemyList[id].armor);
    SetText("EnemyMagic",enemyList[id].magic);

    enemy = GetCurrentEnemy()
    

    Hidden("PlayerActionAttack", false)
    Hidden("PlayerActionSpell", false)
}











//-/- Játékos értékek lekérése -\-\\
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



//-/- Ellenség lekérése -\-\\
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




















//-/- Egy körben lévő sebzés -\-\\
let damageThisRound = {hp: 0, attack: 0, defense: 0, magic: 0}

function SetDamageThisRound(hp=0, attack=0, defense=0, magic=0) {
    damageThisRound.hp=hp
    damageThisRound.attack=attack
    damageThisRound.defense=defense
    damageThisRound.magic=magic
}















//-/- Játékos varázslat -\-\\
function PlayerActionSpell(scrollName = null, scrollPlace = null) {
    if (HasClass("PlayerActionSpell", "tdSelectable")) {
    
        AddClass("PlayerActionSpell", "tdSelectable", 0)
        AddClass("PlayerActionSpell", "hover", 1)
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
                    messageString+=messageString2.concat(`, ${hp} health`)
                } else {
                    messageString+=messageString2.concat(` ${hp} health`)
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
                            messageString+=messageString2.concat(`, ${hp} health`)
                        } else {
                            messageString+=messageString2.concat(` ${hp} health`)
                        }
                    }
                    Message(`${player.name} uses ${spell.name}<br> ${player.name} gains`+ messageString,1, ["PlayerActionSpell2", "", ""])
            
                    //Játekos mágia csökkentése
                    player.magic -=spell.cost
                    SetColor("PlayerCurrentMagic", "var(--red1)")
                    SetText("PlayerCurrentMagic", `${GetText('PlayerCurrentMagic')}-${spell.cost}`)
        }
    } else {
        Message("You don't have enough magic for this spell!",1,["UnselectSpellButton","",""])
        AddClass("PlayerActionAttack", "tdSelectable", 1)
    }
    } else {
        Message("Choose a spell first!",1,["UnselectSpellButton","",""])
        AddClass("PlayerActionAttack", "tdSelectable", 1)
    }

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

    AddClass("PlayerActionSpell", "tdSelectable", 1)

    

    if (enemy.hp < 1) {
        SetText("EnemyHp", "0")
        Message(`${enemy.name} dies`, 1, ["PlayerActionDamage2", "", ""])
    } else {
        EnemyAction()
    }
}











//-/- Játékos támadás -\-\\
function PlayerActionAttack() {
    if (HasClass("PlayerActionAttack", "tdSelectable")) {

    

    AddClass("PlayerActionAttack", "tdSelectable", 0)
    AddClass("PlayerActionAttack", "hover", 1)


    //Get attributes
    player = GetPlayer()
    weapon = GetWeapon(GetText("InventorySelectedWeapon"))
    weaponSlot = GetText("InventorySelectedWeaponSlot")
    enemy = GetCurrentEnemy()

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

    //Sikeres támadás
    if (player.attack+random>enemy.defense) {

        attackWithWeapon = true
        Message(`Attack of ${player.name}: ${player.attack} + ${random} <br> ${player.attack} + ${random} > ${enemy.defense} <br> Succesful attack!`,1, ["PlayerActionDamage", "", ""]);        
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
            
            Message(`${enemy.name} loses ${damageThisRound.hp} health`,1, ["PlayerActionDamage2", "", ""])
            // SetText("NextFunction", `PlayerActionDamage2`)
            SetColor("EnemyHp", "var(--red1)")

            SetText("EnemyHp",String(`${GetText("EnemyHp")}-${damageThisRound.hp}`));
        }
    }


function PlayerActionDamage2() {
    if (enemy.hp<=0) {
        //Ellenség meghal
        fighting = false
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





















//-/- Ellenség köre -\-\\
function EnemyAction() {

    //Kijelölések törlése
    for (let i = 0; i < itemListLength; i++) {
        AddClass(`InventoryItem${i+1}Use`, "tdSelected", 0)
    }

    AddClass("PlayerActionAttack", "hover", 0)
    AddClass("PlayerActionSpell", "hover", 0)
    SetColor("PlayerCurrentAttack", "var(--light3)")
    if (enemy.magic < 4) {
        EnemyActionAttack()
    } else {
        random = RandomNumber(0,1)
        if (random == 0) {
            EnemyActionSpell()
        } else EnemyActionSpell()
    }
}


//-/- Ellenség varázslat -\-\\
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
            //player.hp = GetText('PlayerStartHp') - hp
            player.hp = player.hp - hp

            if (attack != 0 || defense != 0) {
                messageString+=messageString2.concat(`, ${hp} health`)
            } else {
                messageString+=messageString2.concat(` ${hp} health`)
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
                        messageString+=messageString2.concat(`, ${hp} health`)
                    } else {
                        messageString+=messageString2.concat(` ${hp} health`)
                    }
                }
                Message(`${enemy.name} uses ${spell.name}<br> ${enemy.name} gains`+ messageString,1, ["EnemyActionSpell2", "", ""])
                Log(player)
        
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

    //player = GetPlayer()
    //player.hp = GetText("PlayerCurrentHp")
    Log("2")
    Log(player)

    if (player.hp < 1) {
        SetText("PlayerCurrentHp", "0")
        Message(`${player.name} dies`, 1, ["EnemyActionDamage2", "", ""])
    }
}



//-/- Ellenség támadás -\-\\
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

        enemyAttackWithWeapon = true
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
            Message(`${player.name} loses ${damageThisRound.hp} health`,1, ["EnemyActionDamage2", "", ""])
            // SetText("NextFunction", `EnemyActionDamage2`)
            SetColor("PlayerCurrentHp", "var(--red1)")

            SetText("PlayerCurrentHp",String(`${GetText("PlayerCurrentHp")}-${damageThisRound.hp}`));
        }
    }

function EnemyActionDamage2() {
    if (player.hp<=0) {
        //Player dies
        // SetText("NextFunction", ``)
        SetColor("PlayerCurrentHp", "var(--light3)")
        SetDamageThisRound(1)
        SetText("PlayerCurrentHp", "0")
        PlayerDies()
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














//-/- Kör vége -\-\\
function EndRound() {
    if (attackWithWeapon == true) {
            //Lose weapon durability
            let weaponSlot = GetText("InventorySelectedWeaponSlot")
            //Durability -1
            if (weaponSlot != "") {
               player.weapon.currentDurability--
               if (player.weapon.currentDurability<1) {
                   //RemoveWeapon1(Number(weaponSlot))
                   generalId = weaponSlot
                   itemType = "weapon"
                   RemoveItem2()
                   Message("Your weapon has broken!",1, ["", "", ""])
      
               } else {
                  SetText(`InventoryWeapon${weaponSlot}CurrentDurability`,player.weapon.currentDurability);
                  SetText(`InventorySelectedWeaponDurability`,"(" + player.weapon.durability + "/" + player.weapon.currentDurability + ")");
               }
           }
           attackWithWeapon = false
    }


if (enemyAttackWithWeapon == true) {
  //Lose armor durability
  let armorSlot = GetText("InventorySelectedArmorSlot")
  //Durability -1
  if (armorSlot != "") {
     player.armor.currentDurability--
     if (player.armor.currentDurability<1) {
         generalId = armorSlot
         itemType = "armor"
         RemoveItem2()
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
         itemType = "shield"
         RemoveItem2()
         Message("Your shield has broken!",1, ["", "", ""])

     } else {
        SetText(`InventoryShield${shieldSlot}CurrentDurability`,player.shield.currentDurability);
        SetText(`InventorySelectedShieldDurability`,"(" + player.shield.durability + "/" + player.shield.currentDurability + ")");
     }
 }
 enemyAttackWithWeapon = false
}
          

    SetColor("EnemyAttack", "var(--light3)")
    SetColor("EnemyHp", "var(--light3)")
    SetColor("PlayerCurrentAttack", "var(--light3)")
    SetColor("PlayerCurrentHp", "var(--light3)")

    AddClass("PlayerActionAttack", "tdSelectable", 1)
    AddClass("PlayerActionSpell", "tdSelectable", 1)
    AddClass("PlayerActionAttack", "hover", 0)
    AddClass("PlayerActionSpell", "hover", 0)
    //GetElement("PlayerActionItem").classList.add("tdSelectable")

    //Harc véget ért
    if (fighting == false) {

        Enabled("ButtonNewRound")
        Enabled("ButtonSaveGame")
        
                //Mágia növelése 1-gyel
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
            
                AddClass("PlayerActionAttack", "hover", 0)
                
                SetColor("EnemyHp", "var(--light3)")
                Hidden("DivEnemyAttributes", true)
                Hidden("PlayerActionAttack", true)
                Hidden("PlayerActionSpell", true)
                //Hidden("PlayerActionItem", true)
        
                Hidden("ButtonTown", false)        
    }
}










//-/- Játékos meghal -\-\\
function PlayerDies() {
    playerDead = true
    EnableInventory(0)
    Disabled("ButtonTown")
    Disabled("ButtonNewRound")

    AddClass("PlayerActionAttack", "tdDisabled", 1)
    AddClass("PlayerActionSpell", "tdDisabled", 1)
    //AddClass("PlayerActionItem", "tdDisabled", 1)

    AddClass("PlayerActionAttack", "tdSelectable", 0)
    AddClass("PlayerActionSpell", "tdSelectable", 0)
    //AddClass("PlayerActionItem", "tdSelectable", 0)
}


















//-/- Legyőzött ellenségtől pénz -\-\\
function GetEnemyCoins(enemyName) {
    let enemy = GetEnemy(enemyName)
    let min = Math.round(((enemy.attack*2)+enemy.defense+enemy.hp+(enemy.armor*2)+(enemy.magic*3))/10)
    let max = Math.round(((enemy.attack*2)+enemy.defense+enemy.hp+(enemy.armor*2)+(enemy.magic*3))/7)
    return RandomNumber(min, max)
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

        AddClass("MessageButtonContinue", "hover", 1)
        AddClass("MessageButtonYes", "hover", 1)
        AddClass("MessageButtonNo", "hover", 1)

        setTimeout(() => {        
            Continue("Continue")
        }, 50)

        
    }
};





//-/- Egy adat lekérése a listákból -\-\\
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
function GetScroll(name) {
    for (let i = 0; i < scrollList.length; i++) {
        if (scrollList[i].name==String(name)) {
            return scrollList[i]
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
function GetItem(name) {
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].name==String(name)) {
            return itemList[i]
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






function SetCoins(number) {
    let old = Number(GetText("InventoryCoins"))
    SetText("InventoryCoins", old+number)
}











function UnselectSpellButton() {
    AddClass("PlayerActionSpell", "tdSelectable", 1)
    AddClass("PlayerActionSpell", "hover", 0)
}




















//-/- Menü -\-\\

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


/* Open */

function OpenSettings() {
    HiddenSwitch('DivSettings')

    Hidden("DivAccount", true)
    AddClass("ButtonAccount", "buttonSelected", 0)

    Hidden("DivSave", true)
    AddClass("ButtonSave", "buttonSelected", 0)

    Hidden("DivLoad", true)
    AddClass("ButtonLoad", "buttonSelected", 0)


    /*
    Hidden("DivSave", true)
    AddClass("ButtonSave", "buttonSelected", 0)
    Hidden("DivLoad", true)
    AddClass("ButtonLoad", "buttonSelected", 0)*/

    if (GetElement('DivSettings').hidden == false) {
        GetElement('ButtonSettings').classList.add('buttonSelected')
    } else {
        GetElement('ButtonSettings').classList.remove('buttonSelected')
    }
}


function OpenAccount() {
    HiddenSwitch('DivAccount')

    Hidden("DivSettings", true)
    AddClass("ButtonSettings", "buttonSelected", 0)

    Hidden("DivSave", true)
    AddClass("ButtonSave", "buttonSelected", 0)

    Hidden("DivLoad", true)
    AddClass("ButtonLoad", "buttonSelected", 0)


    /*
    Hidden("DivSave", true)
    AddClass("ButtonSave", "buttonSelected", 0)
    Hidden("DivLoad", true)
    AddClass("ButtonLoad", "buttonSelected", 0)*/

    if (GetElement('DivAccount').hidden == false) {
        GetElement('ButtonAccount').classList.add('buttonSelected')
    } else {
        GetElement('ButtonAccount').classList.remove('buttonSelected')
    }
}


function OpenSaveGame() {
    HiddenSwitch("DivSave")

    Hidden("DivSettings", true)
    AddClass("ButtonSettings", "buttonSelected", 0)

    Hidden("DivAccount", true)
    AddClass("ButtonAccount", "buttonSelected", 0)

    Hidden("DivLoad", true)
    AddClass("ButtonLoad", "buttonSelected", 0)


    if (GetElement('DivSave').hidden == false) {
        AddClass('ButtonSave', 'buttonSelected', 1)
    } else {
        AddClass('ButtonSave', 'buttonSelected', 0)
    }
}

function OpenLoadGame() {
    HiddenSwitch("DivLoad")

    Hidden("DivSettings", true)
    AddClass("ButtonSettings", "buttonSelected", 0)

    Hidden("DivAccount", true)
    AddClass("ButtonAccount", "buttonSelected", 0)

    Hidden("DivSave", true)
    AddClass("ButtonSave", "buttonSelected", 0)


    if (GetElement('DivLoad').hidden == false) {
        AddClass('ButtonLoad', 'buttonSelected', 1)
    } else {
        AddClass('ButtonLoad', 'buttonSelected', 0)
    }
}





//-/- Játék mentése -\-\\
function SaveGame() {
    if (GetValue("SaveName") == "") {
        Message("Type a name first!", 1, ["", "", ""])
    } else {
        SaveGame2()
    }
}

function SaveGame2(localSave = false) {
    
    let weapon = ""
    let armor = ""
    let shield = ""
    let weaponDurability = ""
    let armorDurability = ""
    let shieldDurability = ""

    
    for (let i = 0; i < weaponListLength; i++) {
        weapon += GetText(`InventoryWeapon${i+1}`)
        weapon += "-"
    }
    for (let i = 0; i < armorListLength; i++) {
        armor += GetText(`InventoryArmor${i+1}`)
        armor += "-"
    }
    for (let i = 0; i < shieldListLength; i++) {
        shield += GetText(`InventoryShield${i+1}`)
        shield += "-"
    }



    for (let i = 0; i < weaponListLength; i++) {
        weaponDurability += GetText(`InventoryWeapon${i+1}CurrentDurability`)
        weaponDurability += "-"
    }
    for (let i = 0; i < armorListLength; i++) {
        armorDurability += GetText(`InventoryArmor${i+1}CurrentDurability`)
        armorDurability += "-"
    }
    for (let i = 0; i < shieldListLength; i++) {
        shieldDurability += GetText(`InventoryShield${i+1}CurrentDurability`)
        shieldDurability += "-"
    }




    let selectedItem1 = GetText("InventorySelectedWeaponSlot")
    if (selectedItem1 == "") selectedItem1 = 0
    let selectedItem2 = GetText("InventorySelectedArmorSlot")
    if (selectedItem2 == "") selectedItem2 = 0
    let selectedItem3 = GetText("InventorySelectedShieldSlot")
    if (selectedItem3 == "") selectedItem3 = 0
    

    let data = {
        saveName: GetValue("SaveName"),
        userId: localStorage.getItem("userId"),
        playerName: GetText("PlayerName"),
        PlayerAttack: GetText("PlayerStartAttack") + "-" + GetText("PlayerCurrentAttack"),
        PlayerDefense: GetText("PlayerStartDefense") + "-" + GetText("PlayerCurrentDefense"),
        PlayerHp: GetText("PlayerStartHp") + "-" + GetText("PlayerCurrentHp"),
        PlayerMagic: GetText("PlayerStartMagic") + "-" + GetText("PlayerCurrentMagic"),
        Weapons: weapon,
        Armors: armor,
        Shields: shield,
        WeaponsDurability: weaponDurability,
        ArmorsDurability: armorDurability,
        ShieldsDurability: shieldDurability,
        SelectedItems: selectedItem1 + "-" + selectedItem2 + "-" + selectedItem3
    }
    
    if (localSave == true) {
        localStorage.setItem("playerName", GetText("PlayerName"))

        localStorage.setItem("playerAttack", GetText("PlayerStartAttack") + "-" + GetText("PlayerCurrentAttack"))
        localStorage.setItem("playerDefense", GetText("PlayerStartDefense") + "-" + GetText("PlayerCurrentDefense"))
        localStorage.setItem("playerHp", GetText("PlayerStartHp") + "-" + GetText("PlayerCurrentHp"))
        localStorage.setItem("playerMagic", GetText("PlayerStartMagic") + "-" + GetText("PlayerCurrentMagic"))

        localStorage.setItem("weapons", weapon)
        localStorage.setItem("armors", armor)
        localStorage.setItem("shields", shield)
        localStorage.setItem("weaponsDurability", weaponDurability)
        localStorage.setItem("armorsDurability", armorDurability)
        localStorage.setItem("shieldsDurability", shieldDurability)
        localStorage.setItem("selectedItems", selectedItem1 + "-" + selectedItem2 + "-" + selectedItem3)


    } else {

    postData(`${route}save`,data)
    .then((response) => {
        console.log(data)
        console.log("Succesful save")
            return response.json();
            
        }).then((data) => {
            if (data.status == 404) {
                err = document.getElementById("error");
                err.innerHTML = data.error;
            }
            console.log(data.error);
        }).catch((error) => {
            console.log(error);
          }).finally(() => {
          });
        }
}


function ClickLoadGame(saveName) {
    if (saveName == "") {
        Message("Type a name first!", 1, ["", "", ""])
    } else {
        ClickLoadGame2(saveName)
    }






 
    
    





    
    
/*
    let weaponsString = localStorage.getItem("weaponsName")
    let weaponsNameList = weaponsString.split(",")

    SetText("PlayerCurrentAttack", localStorage.getItem("currentAttack"))
    SetText("PlayerCurrentDefense", localStorage.getItem("currentDefense"))
    SetText("PlayerCurrentHp", localStorage.getItem("currentHp"))
    SetText("PlayerCurrentMagic", localStorage.getItem("currentMagic"))*/
    
    //Log(weaponsNameList)

   // let weaponsDurability = localStorage.getItem("weaponsName")
/*
    for (let i = 0; i < weaponsNameList.length; i++) {
        ReloadWeaponList(weaponsNameList[i])
    }*/
}

function ClickLoadGame2(saveName) {
    LoadGame(saveName)
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