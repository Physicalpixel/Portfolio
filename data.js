var type = document.getElementById("type")
var output = document.getElementById("id")

function showInputFields() {
	var d3cyInput = document.getElementById("d3Cy-input-fields")
	var hierarchyInput = document.getElementById("hierarchy-input-fields")

	if (type.value === "d3" || type.value === "cy") {
		document.getElementById("output").innerHTML = ""
		d3cyInput.style.display = "block"
		hierarchyInput.style.display = "none"
	} else if (type.value === "hierarchical") {
		document.getElementById("output").innerHTML = ""
		d3cyInput.style.display = "none"
		hierarchyInput.style.display = "block"
	} else {
		d3cyInput.style.display = "none"
		hierarchyInput.style.display = "none"
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

//code ofr D3 JSON
function getRandomString(n) {
	var str = ""
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (var i = 0; i < n; i++) {
		str += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return str
}

function generateNodeData() {
	return {
		id: getRandomString(5),
		name: getRandomString(5),
		size: getRandomInt(5, 20),
	}
}
function generateLinkData(nodes) {
	return {
		source: nodes[getRandomInt(0, nodes.length - 1)].id,
		target: nodes[getRandomInt(0, nodes.length - 1)].id,
		value: getRandomInt(1, 5),
	}
}
function generateForceSimulationData() {
	var numNodes = document.getElementById("nodes").value
	var numLinks = document.getElementById("links").value

	var nodes = []
	var links = []

	for (var i = 0; i < numNodes; i++) {
		nodes.push(generateNodeData())
	}

	for (var i = 0; i < numLinks; i++) {
		links.push(generateLinkData(nodes))
	}

	var data = {
		nodes: nodes,
		links: links,
	}

	document.getElementById("output").innerHTML = JSON.stringify(data, null, 2)
}

function generateCyJSON() {
	var numNodes = document.getElementById("nodes").value
	var numLinks = document.getElementById("links").value

	// create an empty array to hold the nodes and links
	var nodes = []
	var links = []

	// generate the nodes and links
	for (var i = 0; i < numNodes; i++) {
		nodes.push({ data: { id: "node" + i } })
	}
	for (var i = 0; i < numLinks; i++) {
		links.push({
			data: {
				source: "node" + Math.floor(Math.random() * numNodes),
				target: "node" + Math.floor(Math.random() * numNodes),
			},
		})
	}

	// create the JSON data object for Cytoscape.js
	var jsonData = { nodes: nodes, edges: links }

	// display the JSON data in the page
	document.getElementById("output").innerHTML = JSON.stringify(jsonData, null, 2)
}

function generateTreeData(numRecords, numLevels) {
	// Create an array to store the data
	var data = []
	// Generate the root nodes
	for (var i = 0; i < numRecords; i++) {
		var node = {
			id: i,
			name: "Node " + (i + 1),
			children: [],
		}
		// If there are more levels to generate, call the function recursively to generate the children nodes
		if (numLevels > 1) {
			node.children = generateTreeData(numRecords, numLevels - 1)
		}
		data.push(node)
	}
	return data
}

function generateData() {
	// Get the user input values
	var numRecords = document.getElementById("records").value
	var numLevels = document.getElementById("levels").value

	// Generate the sample data
	var data = generateTreeData(numRecords, numLevels)

	// Prettify the generated data
	var prettifiedData = JSON.stringify(data, null, 2)

	// Display the generated data in the "output" div element
	document.getElementById("output").innerHTML = "Generated data:<br><pre>" + prettifiedData + "</pre>"
}

// Add an event listener to the form submit button

document.getElementById("form").addEventListener("submit", function (event) {
	event.preventDefault()

	if (type.value == "d3") {
		generateForceSimulationData()
	} else if (type.value == "cy") {
		generateCyJSON()
	} else if (type.value == "hierarchical") {
		generateData()
	}
})

function copyDivContent() {
	const div = document.getElementById("output")
	const range = document.createRange()
	range.selectNode(div)
	window.getSelection().removeAllRanges()
	window.getSelection().addRange(range)
	document.execCommand("copy")
}

function showCopyButton() {
	const copyContainer = document.getElementById("copy-container")
	copyContainer.style.display = "block"
}
