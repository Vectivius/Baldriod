//Bejelentkezés ellenőrzés
if (localStorage.getItem("email") != undefined) {

    setTimeout(() => {
        Hidden("ButtonReg", true)
        Hidden("ButtonLogin", true)
        Hidden("ButtonAdmin", true)
        Hidden("ButtonAccount", false)
        Hidden("ButtonLoadGame", false)

        loadSaves()

        SetValue("UserEmail", localStorage.getItem("email"))
        
        
        //Admin
        if (localStorage.getItem("userLevel") == 2) {
            Hidden("ButtonAdmin", false)
        }
    }, 100)
} 


function showAccount() {
    if (HasClass("ButtonAccount", "buttonSelected")) {
        AddClass("ButtonAccount", "buttonSelected", 0)
        Hidden("DivUserAccount", true)
    } else {
        AddClass("ButtonAccount", "buttonSelected", 1)
        Hidden("DivUserAccount", false)
    }
}

 

function showSaves(hide = false) {
    if (hide == true) {
        Hidden("DivHomePageButtons", false)
        Hidden("DivSaves", true)    
    } else {
        Hidden("DivHomePageButtons", true)
        Hidden("DivUserAccount", true)
        Hidden("DivSaves", false)
        
    }
}






function loadSaves() {
    getData(`${route}save/all/${localStorage.getItem("userId")}`).then((data) => {
        console.log(data)
                const Header = document.getElementById("TrData")
                const Table = document.getElementById("TbodyData");

                let th = Header.insertCell(); th.outerHTML =`<th> Name </th>`
                 th = Header.insertCell(); th.outerHTML =`<th>  </th>`

    for(let i = 0; i<10; i++)  {           
        row = Table.insertRow();
        console.log(data[i])

        if (data[i] != undefined) {
            td = row.insertCell()
            td.innerHTML =`<td>${data[i].saveName}</td>`

            td = row.insertCell()
            td.innerHTML =`<td>Load</td>`
            td.className = "tdSelectable"
            td.id = `LoadSave-${data[i].id}`
        }
    }; 
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}


document.body.addEventListener("click", (event) => {
        if (event.target.id.includes('LoadSave') ) {
            LoadGame(event.target.id.split("-")[1])
        }
})