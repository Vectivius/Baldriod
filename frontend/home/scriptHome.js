//Bejelentkezés ellenőrzés
if (localStorage.getItem("userEmail") != undefined) {

    setTimeout(() => {
        hidden("ButtonReg", true)
        hidden("ButtonLogin", true)
        hidden("ButtonAdmin", true)
        hidden("ButtonAccount", false)
        hidden("ButtonLoadGame", false)

        loadSaves()

        setValue("UserEmail", localStorage.getItem("userEmail"))
        setValue("UserName", localStorage.getItem("userName"))


        
        
        //Admin
        if (localStorage.getItem("userLevel") == 2) {
            hidden("ButtonAdmin", false)
        }
    }, 100)
} 


 








function showAccount(hide = false) {
    if (hide == true) {
        hidden("DivUserAccount", true)
        hidden("DivHomePageButtons", false)
    } else {
        hidden("DivHomePageButtons", true)
        hidden("DivUserAccount", false)
    }
}


function showAccountEdit(hide = false) {
    if (hide == true) {
        hidden("DivEditAccount", true)
        hidden("DivUserAccount", false)
        setValue("EditPassword", "")
        localStorage.removeItem("userPassword")
        location.href="pageHome.html"
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
















function showSaves(hide = false) {
    if (hide == true) {
        hidden("DivHomePageButtons", false)
        hidden("DivSaves", true)
        hidden("DivRenameSave", true)
    } else {
        hidden("DivHomePageButtons", true)
        hidden("DivUserAccount", true)
        hidden("DivSaves", false)
    }
}





function loadSaves() {
    getData(`${route}saves/getall/${localStorage.getItem("userId")}`, localStorage.getItem("token")).then((data) => {
        console.log(data)
                const Header = document.getElementById("TrData")
                const Table = document.getElementById("TbodyData");

                let th = Header.insertCell(); th.outerHTML =`<th> Name </th>`
                 th = Header.insertCell(); th.outerHTML =`<th>  </th>`
                 th = Header.insertCell(); th.outerHTML =`<th>  </th>`
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

            td = row.insertCell()
            td.innerHTML =`<td>Rename</td>`;
            td.className = "tdSelectable tdRename";
            td.id = `EditSave-${data[i].id}`
        
            td = row.insertCell()
            td.innerHTML =`<td>Delete</td>`;
            td.className = "tdSelectable";
            td.id = `DeleteSave-${data[i].id}`
        }
    }; 
})
.catch((error) => {
console.error("Hiba történt:", error);
});
}


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

            //Close
            if (event.target.classList.contains("tdSelected")) {
                hidden("DivRenameSave", true)
                deselectItems()

            } else {
            //Open
            let list = document.getElementsByClassName("tdSelected")

            for (let i = 0; i < list.length; i++) {
                list[i].classList.remove("tdSelected") 
            }

            addClass(event.target.id, "tdSelected", 1)
            generalId = event.target.id.split("-")[1]
            hidden("DivRenameSave", false)
            }



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