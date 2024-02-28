export async function getData(url="") {
    const response = await fetch(url, {
         method: "GET", // POST, PUT, DELETE ...       
        headers: {
         "Content-Type" : "application/json",
        },    
    })
    return response.json();   
}; 

async function postData(url="", data = {}) {
const response = await fetch(url, {
     method: "POST", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 

async function deleteData(url="", data = {}) {
const response = await fetch(url, {
     method: "DELETE", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 

async function putData(url="", data = {}) {
const response = await fetch(url, {
     method: "PUT", // POST, PUT, DELETE ...       
    headers: {
     "Content-Type" : "application/json",
    }, 
    body: JSON.stringify(data),   
})
return response;   
}; 

export { getData, postData, deleteData, putData };


