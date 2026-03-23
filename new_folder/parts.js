window.onload = loadParts;

function loadParts(){

fetch("http://localhost:5186/api/vehicle/all")
.then(res => res.json())
.then(data => {
console.log("All Parts:", data);
displayData(data);
});

}

function searchParts(){

let name = document.getElementById("searchText").value.trim();

console.log("Searching:", name);

fetch(`http://localhost:5186/api/vehicle/search?name=${name}`)
.then(res => res.json())
.then(data => {
console.log("Search Result:", data);
displayData(data);
})
.catch(err => console.log(err));

}

function displayData(parts){

let table = document.getElementById("tableBody");

table.innerHTML = "";

parts.forEach(p => {

table.innerHTML += `
<tr>
<td>${p.id}</td>
<td>${p.partname}</td>
<td>${p.vehicle}</td>
<td>${p.price}</td>
</tr>
`;

});

}