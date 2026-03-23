function login(){

let name=document.getElementById("name").value;
let password=document.getElementById("password").value;
console.log("login clicked")

fetch(`http://localhost:5186/api/User/login?name=${name}&password=${password}`,{
method:"POST"
})
.then(res => res.json())
.then(data => {

console.log(data)



if (data.role== "admin")
{
    window.location.href="admin.html"
}
else{
    window.location.href="parts.html"
}



})
.catch(error=>{
console.log(error);
document.getElementById("msg").innerText="Login failed"
})

}