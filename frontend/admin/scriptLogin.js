
function Login() {
    //let email = "greg@g"//GetValue("LoginEmail")
    //let password = "greg"//GetValue("LoginPassword")
    let password = GetValue("LoginPassword")
    let email = GetValue("LoginEmail")
    let data = {
        email: email,
        password: password
    }

    postData(`${route}login`, data).then((response) => {
        console.log(response)

        if (!response.error) {
            localStorage.setItem("email", response[0].adminEmail)
            localStorage.setItem("password", response[0].adminPassword)
            location.href="pageAdmin.html"
        } else {
            Message("Incorrect email or password!", 1, ["", "", ""])
        }
        
    })


}


    // postData(`${route}login`,data)
    // .then((response) => {
    //     console.log(data)
    //     console.log("Succesful save")
    //     LoadTable(`${type}`)
    //         return response.json();
            
    //     }).then((data) => {
    //         if (data.status == 404) {
    //             err = document.getElementById("error");
    //             err.innerHTML = data.error;
    //         }
    //         console.log(data.error);
    //     }).catch((error) => {
    //         console.log(error);
    //       }).finally(() => {
    //       });


