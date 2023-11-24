CREATE DATABASE Baldriod
    DEFAULT CHARACTER SET = 'utf8' COLLATE utf8_hungarian_ci;

CREATE TABLE Enemy(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EnemyName TEXT,
    EnemyAttack INT,
    EnemyDefense INT,
    EnemyHp INT,
    EnemyMagic INT,
    EnemyMinDamage INT,
    EnemyMaxDamage INT,
    LocationId INT
    );

CREATE TABLE Location(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    LocationName TEXT
);


CREATE TABLE Weapon(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    WeaponName TEXT,
    WeaponAttack INT,
    WeaponDefense INT,
    WeaponMinDamage INT,
    WeaponMaxDamage INT,
    WeaponCost INT
    );

CREATE TABLE Armor(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ArmorName TEXT,
    ArmorAttack INT,
    ArmorDefense INT,
    ArmorDamageReduction INT,
    ArmorCost INT
    );

CREATE TABLE Spell(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    SpellName TEXT
);

CREATE TABLE Item(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ItemName TEXT,
    Stackable BOOLEAN,
    StackSize INT
);


