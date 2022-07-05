function login(){
    console.log("clicked login")
    console.log(document.getElementById("username").value, document.getElementById("password").value)
    fetch("/api/auth/login", { method: "POST", body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }), headers: {"content-type": "application/json"} }).then((value)=>value.json()).then((e)=>console.log(e))
}
function signup(){
    console.log("clicked signup")
    fetch("/api/auth/signup", { method: "POST", body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }), headers: {"content-type": "application/json"}  }).then((value)=>value.json()).then((e)=>console.log(e))

}
function newMessage(){
    
    console.log("clicked new message")
    fetch("/api/newMessage", { method: "POST", body: JSON.stringify({
        message: document.getElementById("message").value
    }), headers: {"content-type": "application/json"}  }).then((value)=>value.json()).then((e)=>console.log(e))

}