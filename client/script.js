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
    dropDiv.appendChild(drop)
    let title = document.createElement("div")
    title.textContent = drop.title
    dropDiv.appendChild(title)
    title.classList.add("title")
    let description = document.createElement("div")
    description.textContent = drop.description
    description.classList.add("description")
    dropDiv.appendChild(description)
}

function showDropList(drops, list) {
	list.innerHTML = null
	for(let drop of drops) {
		// add student to the studentList div
		addDropToList(drop, list)
	}
}

function handleAddDrop(event) {
	event.preventDefault()
    let textField = event.target.elements[0]
    let description = event.target.element[1]
    const drop = {
        title:textField.value,
        description:description.value,
    }
	addDrop(drop)
    textField.value = null
    description.value = null
	addDropToList(drop, dropList)
}

getDrops()
document.getElementById("add-drop-form").addEventListener("submit", handleAddDrop)