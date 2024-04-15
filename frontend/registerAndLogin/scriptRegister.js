function register() {
    let data = {
        name: getValue("RegName"),
        email: getValue("RegEmail"),
        password: getValue("RegPassword"),
        userLevel: 1
    }

    if (getValue("RegName") == "" || getValue("RegEmail") == ""  || getValue("RegPassword") == "") {
        sendMessage("Fill all inputs!", 1, ["", "", ""])
    } else if (!getValue("RegEmail").includes("@")) {
        sendMessage("Incorrect email!", 1, ["", "", ""])
    } else {
        postData(`${route}reg`,data)
        .then((response) => {
            console.log(data)
            console.log("Succesful save")
                //return response.json();
                localStorage.setItem("userEmail", data.email)
                localStorage.setItem("userName", data.name)
                localStorage.setItem("userLevel", 1)
                localStorage.setItem("userId", response.result[0].id)
                localStorage.setItem("token", response.accesToken)
                location.href="../home/pageHome.html"
                
            }).then((data) => {
                if (data.status == 404) {
                    err = document.getElementById("error");
                    err.innerHTML = data.error;
                } else {

                }
                console.log(data.error);
            }).catch((error) => {
                console.log(error);
              }).finally(() => {

              });
    }


}



function login() {
    let data = {
        email: getValue("LoginEmail"),
        password: getValue("LoginPassword")
    }

    if (getValue("LoginEmail") == ""  || getValue("LoginPassword") == "") {
        sendMessage("Fill all inputs!", 1, ["", "", ""])
    } else {
        postData(`${route}user/login`, data).then((response) => {
            console.log(response)
    
            if (!response.error) {
                localStorage.setItem("userEmail", response.result[0].userEmail)
                localStorage.setItem("userName", response.result[0].userName)
                localStorage.setItem("userLevel", response.result[0].userLevel)
                localStorage.setItem("userId", response.result[0].id)
                localStorage.setItem("token", response.accesToken)
                location.href="../home/pageHome.html"
            } else {
                sendMessage("Incorrect email or password!", 1, ["", "", ""])
            }
            
        })
    }
}