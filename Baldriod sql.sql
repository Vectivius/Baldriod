-- Active: 1694777276218@@127.0.0.1@3306@baldriod

CREATE DATABASE IF NOT EXISTS Baldriod
    DEFAULT CHARACTER SET = 'utf8' COLLATE utf8_hungarian_ci;

CREATE TABLE IF NOT EXISTS Enemy(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    EnemyName TEXT UNIQUE,
    EnemyAttack INT,
    EnemyDefense INT,
    EnemyHp INT,
    EnemyMinDamage INT,
    EnemyMaxDamage INT,
    EnemyArmor INT,
    EnemyMagic INT
    );

CREATE TABLE IF NOT EXISTS Location(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    LocationName TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS EnemyLocation(
        Id INT AUTO_INCREMENT,
        EnemyId INT,
        LocationId INT,
        PRIMARY KEY (Id),
        FOREIGN KEY (EnemyId) REFERENCES Enemy(Id),
        FOREIGN KEY (LocationId) REFERENCES Location(Id)
    );



CREATE TABLE IF NOT EXISTS Weapon(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    WeaponName TEXT,
    WeaponAttack INT,
    WeaponDefense INT,
    WeaponMinDamage INT,
    WeaponMaxDamage INT,
    WeaponDurability INT,
    WeaponCost INT,
    TwoHanded BOOLEAN
    );




CREATE TABLE IF NOT EXISTS Armor(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ArmorName TEXT,
    ArmorDefense INT,
    ArmorDamageReduction INT,
    ArmorDurability INT,
    ArmorCost INT,
    TwoHandedPenalty INT
    );



CREATE TABLE IF NOT EXISTS Spell(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    SpellName TEXT,
    SpellType TEXT,
    SpellAttack TEXT,
    SpellDefense TEXT,
    SpellHp TEXT,
    SpellCost INT,
    SpellLength INT
);

CREATE TABLE IF NOT EXISTS Item(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ItemName TEXT,
    Stackable BOOLEAN,
    StackSize INT,
    ItemCost INT,
    SpellId INT,
    FOREIGN KEY (SpellId) REFERENCES Spell(Id)
);

INSERT INTO `Item` VALUES
    (null, 'Fireball scroll', true, 3, 17, (SELECT id from Spell WHERE `SpellName`='Fireball')),
    (null, 'Food', true, 10, 3, NULL);





INSERT INTO `Enemy` VALUES
    (null,'Wolf', 6, 7, 12, 2, 3, 0, 0),
    (null,'Bear', 8, 8, 16, 2, 7, 0, 0),
    (null,'Zombie', 6, 7, 12, 2, 3, 0, 0),
    (null,'Crocodile', 6, 7, 12, 2, 3, 0, 0),
    (null,'Wraith', 6, 7, 12, 2, 3, 0, 0),
    (null,'Bone Serpent', 6, 7, 12, 2, 3, 0, 0);


INSERT INTO `Location` VALUES
    (null,'Forest'),
    (null,'Desert'),
    (null,'Jungle');

INSERT INTO `EnemyLocation` VALUES
    (null, (SELECT id from Enemy WHERE `EnemyName`='Wolf'), (SELECT id from Location WHERE `LocationName`='Forest')),
    (null, (SELECT id from Enemy WHERE `EnemyName`='Bear'), (SELECT id from Location WHERE `LocationName`='Forest')),
    (null, (SELECT id from Enemy WHERE `EnemyName`='Zombie'), (SELECT id from Location WHERE `LocationName`='Forest')),
    (null, (SELECT id from Enemy WHERE `EnemyName`='Zombie'), (SELECT id from Location WHERE `LocationName`='Desert')),
    (null, (SELECT id from Enemy WHERE `EnemyName`='Zombie'), (SELECT id from Location WHERE `LocationName`='Jungle')),
    (null, (SELECT id from Enemy WHERE `EnemyName`='Wraith'), (SELECT id from Location WHERE `LocationName`='Desert')), -- 5 2
    (null, (SELECT id from Enemy WHERE `EnemyName`='Bone Serpent'), (SELECT id from Location WHERE `LocationName`='Desert')); -- 6 2

INSERT INTO `Weapon` VALUES
    (null,'Dagger', 1, 0, 1, 3, 40, 4, false),
    (null,'Axe', 2, 0, 3, 7, 35, 5, false),
    (null,'Sword', 2, 1, 1, 6, 60, 6, false),
    (null,'Spear', 4, 0, 4, 12, 45, 16, true),
    (null,'Halberd', 3, 0, 3, 18, 42, 20, true);
INSERT INTO `Armor` VALUES
    (null,'Leather armor', 1, 1, 85, 20, 0),
    (null,'Chain armor', 2, 3, 135, 45, 0),
    (null,'Plate armor', 3, 4, 250, 60, 0),
    (null,'Small shield', 1, 0, 8, 45, 0),
    (null,'Medium shield', 2, 0, 10, 65, 2),
    (null,'Large shield', 3, 0, 14, 120, 3);

INSERT INTO `Spell` VALUES
    (null,'Fireball', 'attack', '0', '0', '3-5', 5, 1),
    (null,'Lightning strike', 'attack', '0-1', '0-1', '1-7', 5, 1),
    (null,'Healing', 'defense', '0', '0', '2-9', 5, 1),
    (null,'Strength', 'defense', '2', '0', '0', 5, 3),
    (null,'Protection', 'defense', '0', '3', '0', 7, 3);


