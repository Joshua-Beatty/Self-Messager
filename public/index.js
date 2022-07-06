function login() {
    console.log("clicked login")
    console.log(document.getElementById("username").value, document.getElementById("password").value)
    fetch("/api/auth/login", {
        method: "POST", body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }), headers: { "content-type": "application/json" }
    }).then((value) => value.text()).then((e) => console.log(e))
}
function signup() {
    console.log("clicked signup")
    fetch("/api/auth/signup", {
        method: "POST", body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }), headers: { "content-type": "application/json" }
    }).then((value) => value.text()).then((e) => console.log(e))

}
function newMessage() {

    console.log("clicked new message")
    fetch("/api/newMessage", {
        method: "POST", body: JSON.stringify({
            message: document.getElementById("message").value
        }), headers: { "content-type": "application/json" }
    }).then((value) => value.text()).then((e) => console.log(e))

}
function getNewMessages() {

    console.log("clicked new message")
    fetch("/api/getMessages").then((value) => value.text()).then((e) => console.log(e))

}
window.onload = (event) => {
    console.log('page is fully loaded');
};
function startListening(){
    
    const evtSource = new EventSource("/api/listener", { withCredentials: true } );
    const newElement = document.createElement("li");
    const eventList = document.getElementById("messages");
    newElement.textContent = "Started Listening";

    evtSource.onmessage = function (event) {
        const newElement = document.createElement("li");

        newElement.textContent = "message: " + event.data;
        eventList.appendChild(newElement);
    }
    eventList.appendChild(newElement);
}