//Random number generator
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


//Generate and save starting attributes
function Generate() {
    let Attack=RandomNumber(6,9);
    let Defense=RandomNumber(11,15);
    let HP=RandomNumber(12,18);
    let Magic=RandomNumber(6,15);
    let Name=document.getElementById("GeneratePlayerName").value;


        localStorage.setItem("SendAttack", Attack);
        localStorage.setItem("SendDefense", Defense);
        localStorage.setItem("SendHP", HP);
        localStorage.setItem("SendMagic", Magic);
        localStorage.setItem("SendName", Name);
     


    
    document.getElementById("GeneratePlayerAttack").innerHTML=`Attack: ${Attack}`;
    document.getElementById("GeneratePlayerDefense").innerHTML=`Defense: ${Defense}`;
    document.getElementById("GeneratePlayerHP").innerHTML=`HP: ${HP}`;
    document.getElementById("GeneratePlayerMagic").innerHTML=`Magic: ${Magic}`;
}



//Fight testing
function Test() {
    TextSet("EnemyAttack","8")
    TextSet("EnemyDefense","13")
    TextSet("EnemyHP","15")
    TextSet("EnemyMagic"," ")
}

//Enable or disable a button
function ButtonEnabled(id) {
    document.getElementById(id).disabled=false;
    
}
function ButtonDisabled(id) {
    document.getElementById(id).disabled=true;
}



//Attack of the player
function PlayerActionAttack() {
    ButtonDisabled("PlayerActionOther");
    ButtonDisabled("PlayerActionSpell");
    //document.getElementById("PlayerActionOther").

    //Get values from HTML elements
    let PlayerName=TextGet("PlayerName");
    let PlayerAttack=Number(TextGet("PlayerCurrentAttack"));
    let EnemyDefense=Number(TextGet("EnemyDefense"));
    let EnemyHP=Number(TextGet("EnemyHP"));

    let Random=RandomNumber(1,12);
    alert("Attack of "+PlayerName+": "+PlayerAttack+" + "+Random);
    

    //Check if player won round
    
    if (PlayerAttack+Random>EnemyDefense) {
        alert(`${PlayerAttack} + ${Random} > ${EnemyDefense}`);
        
        EnemyHP=EnemyHP-1;
        TextSet("EnemyHP",String(EnemyHP));
    }

    EnemyActionAttack();
}

function EnemyActionAttack() {
    let EnemyName=TextGet("EnemyName");
    let EnemyAttack=Number(TextGet("EnemyAttack"));
    let PlayerDefense=Number(TextGet("PlayerCurrentDefense"));
    let PlayerHP=Number(TextGet("PlayerCurrentHP"));

    let Random=RandomNumber(1,12);
    alert("Attack of "+EnemyName+": "+EnemyAttack+" + "+Random);

    if (EnemyAttack+Random>PlayerDefense) {
        alert(`${EnemyAttack} + ${Random} > ${PlayerDefense}`);
        PlayerHP=PlayerHP-1;
        TextSet("PlayerCurrentHP",String(PlayerHP));
    }
    ButtonEnabled("PlayerActionOther");
    ButtonEnabled("PlayerActionSpell");
}







//Change element innerHTML
function TextSet(id,text) {
    document.getElementById(id).innerHTML=text;
}

function TextGet(id) {
    return document.getElementById(id).innerHTML;
}