function registerUser(){

let id=document.getElementById("id").value
let user=document.getElementById("username").value
let password=document.getElementById("password").value

fetch(`http://localhost:5186/api/User/register?id=${id}&user=${user}&password=${password}`,{
method:"POST"
})
.then(res=>res.text())
.then(data=>{
document.getElementById("msg").innerText=data
})

}