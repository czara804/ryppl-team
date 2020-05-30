const url = "http://localhost:3030"

// dom elements
let dropList = document.getElementById("drop-list")

function getDrops() {
	fetch(`${url}/drops`).then((response) => response.json())
	.then((drops) => showDropList(drops, dropList))
	.catch((error) => console.error(error))
}

function addDrop(drop) {
	fetch(`${url}/drops`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(drop)
    }).then((response)=> response.json())
    .then((data)=> {
        console.log(data)
        addDropToList(data, dropList)
    })
	.catch((error) => console.error(error))
}

function addDropToList(drop, list) {
	let dropDiv = document.createElement("div")
    dropDiv.classList.add("drop")
    let title = document.createElement("div")
    title.textContent = drop.title
    dropDiv.appendChild(title)
    title.classList.add("title")
    let category = document.createElement("div")
    category.textContent = drop.category
    category.classList.add("category")
    dropDiv.appendChild(category)
    let username = document.createElement("div")
    username.textContent = drop.username
    username.classList.add("username")
    dropDiv.appendChild(username)
    let description = document.createElement("div")
    description.textContent = drop.description
    description.classList.add("description")
    dropDiv.appendChild(description)

    list.appendChild(dropDiv)
}

function showDropList(drops, list) {
    console.log(drops);
	list.innerHTML = null
	for(let drop of drops) {
		// add student to the studentList div
		addDropToList(drop, list)
	}
}

function handleAddDrop(event) {
	event.preventDefault()
    let textField = event.target.elements[0]
    let category = event.target.elements[1]
    let description = event.target.elements[2]
    let username = event.target.elements[3]
    const drop = {
        title:textField.value,
        category:category.value,
        description:description.value,
        username:username.value,
    }
	addDrop(drop)
    textField.value = null
    category.value = null
    description.value = null
    username.value =null
	addDropToList(drop, dropList)
}

getDrops()
document.getElementById("add-drop-form").addEventListener("submit", handleAddDrop)