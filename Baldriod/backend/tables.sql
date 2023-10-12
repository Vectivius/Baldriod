CREATE TABLE Enemy(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EnemyName TEXT,
    EnemyAttack INT,
    EnemyDefense INT,
    EnemyHp INT,
    EnemyMinDamage INT,
    EnemyMaxDamage INT
    );

CREATE TABLE Weapon(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    WeaponName TEXT,
    WeaponAttack INT,
    WeaponDefense INT,
    WeaponMinDamage INT,
    WeaponMaxDamage INT,
    WeaponCost INT,
    );

CREATE TABLE Armor(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ArmorName TEXT,
    ArmorAttack INT,
    ArmorDefense INT,
    ArmorMinDamageReduction INT,
    ArmorMaxDamageReduction INT,
    ArmorCost INT,
    );

    CREATE TABLE Spell(
        ID INT PRIMARY KEY AUTO_INCREMENT,
        SpellName TEXT,
    );


