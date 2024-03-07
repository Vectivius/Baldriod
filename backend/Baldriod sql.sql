-- Active: 1694777276218@@127.0.0.1@3306@baldriod

CREATE TABLE IF NOT EXISTS enemy(
    id INT PRIMARY KEY AUTO_INCREMENT,
    enemyName TEXT UNIQUE,
    enemyAttack INT,
    enemyDefense INT,
    enemyHp INT,
    enemyDamage TEXT,
    enemyArmor INT,
    enemyMagic INT,
    enemyLevel INT
    );



CREATE TABLE IF NOT EXISTS weapon(
    id INT PRIMARY KEY AUTO_INCREMENT,
    weaponName TEXT,
    weaponAttack INT,
    weaponDefense INT,
    weaponDamage TEXT,
    weaponDurability INT,
    weaponCost INT,
    twoHanded BOOLEAN
    );




CREATE TABLE IF NOT EXISTS armor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    armorName TEXT,
    armorDefense INT,
    armorDamageReduction INT,
    armorDurability INT,
    armorCost INT,
    twoHandedPenalty INT
    );



CREATE TABLE IF NOT EXISTS spell(
    id INT PRIMARY KEY AUTO_INCREMENT,
    spellName TEXT,
    spellType TEXT,
    spellAttack TEXT,
    spellDefense TEXT,
    spellHp TEXT,
    spellCost INT,
    spellLength INT
);

CREATE TABLE IF NOT EXISTS item(
    id INT PRIMARY KEY AUTO_INCREMENT,
    itemName TEXT,
    stackable BOOLEAN,
    stackSize INT,
    itemCost INT,
    spellId INT,
    FOREIGN KEY (spellId) REFERENCES spell(id)
);


INSERT INTO `spell` VALUES
    (null,'Fireball', 'attack', '0', '0', '3-5', 5, 1),
    (null,'Lightning strike', 'attack', '0-1', '0-1', '1-7', 5, 1),
    (null,'Healing', 'defense', '0', '0', '2-9', 5, 1),
    (null,'Strength', 'defense', '2', '0', '0', 5, 3),
    (null,'Protection', 'defense', '0', '3', '0', 7, 3);

INSERT INTO `item` VALUES
    (null, 'Food', true, 10, 3, NULL),
    (null, 'Fireball scroll', true, 3, 17, (SELECT id from spell WHERE `spellName`='Fireball')),
    (null, 'Lightning strike scroll', true, 3, 17, (SELECT id from spell WHERE `spellName`='Lightning strike')),
    (null, 'Healing scroll', true, 3, 17, (SELECT id from spell WHERE `spellName`='Healing')),
    (null, 'Strength scroll', true, 3, 17, (SELECT id from spell WHERE `spellName`='Strength')),
    (null, 'Protection scroll', true, 3, 17, (SELECT id from spell WHERE `spellName`='Protection'));


INSERT INTO `enemy` VALUES
    (null,'Wolf', 6, 7, 12, "2-3", 0, 0, 1),
    (null,'Zombie', 6, 7, 12, "2-3", 0, 0, 1),
    (null,'Bear', 8, 8, 16, "2-7", 0, 0, 2),
    (null,'Crocodile', 6, 7, 12, "2-3", 0, 0, 2),
    (null,'Wraith', 6, 7, 12, "2-3", 0, 0, 3),
    (null,'Bone Serpent', 6, 7, 12, "2-3", 0, 0, 3);


INSERT INTO `Weapon` VALUES
    (null,'Dagger', 1, 0, "1-3", 40, 4, false),
    (null,'Axe', 2, 0, "3-7", 35, 5, false),
    (null,'Sword', 2, 1, "1-6", 60, 6, false),
    (null,'Spear', 4, 0, "4-12", 45, 16, true),
    (null,'Halberd', 3, 0, "3-18", 42, 20, true);
INSERT INTO `Armor` VALUES
    (null,'Leather armor', 1, 1, 85, 20, 0),
    (null,'Chain armor', 2, 3, 135, 45, 0),
    (null,'Plate armor', 3, 4, 250, 60, 0),
    (null,'Small shield', 1, 0, 8, 45, 0),
    (null,'Medium shield', 2, 0, 10, 65, 2),
    (null,'Large shield', 3, 0, 14, 120, 3);




ALTER TABLE enemy AUTO_INCREMENT = 1