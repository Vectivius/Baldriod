function register() {
    let data = {
        name: GetValue("RegName"),
        email: GetValue("RegEmail"),
        password: GetValue("RegPassword"),
    }

    if (GetValue("RegName") == "" || GetValue("RegEmail") == ""  || GetValue("RegPassword") == "") {
        Message("Fill all inputs!", 1, ["", "", ""])
    } else if (!GetValue("RegEmail").includes("@")) {
        Message("Incorrect email!", 1, ["", "", ""])
    } else {
        postData(`${route}reg`,data)
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
                localStorage.setItem("email", data.email)
                localStorage.setItem("userLevel", 1)
                location.href="../home/pageHome.html"
              });
    }


}



function login() {
    let data = {
        email: GetValue("LoginEmail"),
        password: GetValue("LoginPassword")
    }

    if (GetValue("LoginEmail") == ""  || GetValue("LoginPassword") == "") {
        Message("Fill all inputs!", 1, ["", "", ""])
    } else {
        postData(`${route}login`, data).then((response) => {
            console.log(response)
    
            if (!response.error) {
                localStorage.setItem("email", response[0].userEmail)
                localStorage.setItem("userLevel", response[0].userLevel)
                location.href="../home/pageHome.html"
            } else {
                Message("Incorrect email or password!", 1, ["", "", ""])
            }
            
        })
    }


}