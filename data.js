var type = document.getElementById("type")
const output = document.getElementById("output")

/////////sales data block/////below for sales data///////////////
const salesForm = document.getElementById("sales-form")
const attributesContainer = document.getElementById("attributes")

// An array of objects representing the available attributes
const attributes = [
	{ name: "customer_name", type: "string" },
	{ name: "product_name", type: "string" },
	{ name: "quantity", type: "number" },
	{ name: "price", type: "number" },
	{ name: "total_amount", type: "number" },
	{ name: "date_purchased", type: "string" },
	{ name: "payment_method", type: "string" },
	{ name: "shipping_address", type: "string" },
	{ name: "promo_code", type: "string" },
	{ name: "tax", type: "number" },
]

// Loop through the attributes array and create an input field for each attribute
for (const attribute of attributes) {
	const input = document.createElement("input")
	input.type = "checkbox"
	input.name = "attributes"
	input.value = attribute.name
	input.id = attribute.name
	input.dataset.type = attribute.type

	const label = document.createElement("label")
	label.htmlFor = attribute.name
	label.textContent = attribute.name

	attributesContainer.appendChild(input)
	attributesContainer.appendChild(label)
	attributesContainer.appendChild(document.createElement("br"))
}
/////////////sales data block/////////////////above for sales data////////////////////////
////////////// input fie;lds to select the type of data////////////////

function showInputFields() {
	var d3cyInput = document.getElementById("d3Cy-input-fields")
	var hierarchyInput = document.getElementById("hierarchy-input-fields")
	var salesInput = document.getElementById("sales-input-fields")
	var sankeyInput = document.getElementById("sankey-input-fields")

	if (type.value === "d3" || type.value === "cy") {
		document.getElementById("output").innerHTML = ""
		d3cyInput.style.display = "block"
		hierarchyInput.style.display = "none"
		sankeyInput.style.display = "none"
	} else if (type.value === "hierarchical") {
		salesInput.style.display = "none"
		document.getElementById("output").innerHTML = ""
		d3cyInput.style.display = "none"
		hierarchyInput.style.display = "block"
		sankeyInput.style.display = "none"
	} else if (type.value === "JSON") {
		document.getElementById("output").innerHTML = ""
		salesInput.style.display = "block"
		d3cyInput.style.display = "none"
		hierarchyInput.style.display = "none"
		sankeyInput.style.display = "none"
	} else if (type.value === "sankeyJSON") {
		document.getElementById("output").innerHTML = ""
		salesInput.style.display = "none"
		d3cyInput.style.display = "none"
		hierarchyInput.style.display = "none"
		sankeyInput.style.display = "block"
	} else {
		document.getElementById("output").innerHTML = ""
		salesInput.style.display = "none"
		d3cyInput.style.display = "none"
		hierarchyInput.style.display = "none"
		sankeyInput.style.display = "none"
	}
}
////////////////////d3 json///////////////////////////

function generateForceSimulationData() {
	// Get the number of nodes and links from the input fields
	const numNodes = document.getElementById("nodes").value
	const numLinks = document.getElementById("links").value

	const nodes = Array.from({ length: numNodes }, (_, i) => ({ id: i }))

	let links = []
	let count = 0
	let selfLoopCount = 0
	while (count < numLinks) {
		const source = Math.floor(Math.random() * numNodes)
		const target = Math.floor(Math.random() * numNodes)

		// Check if the link already exists
		if (links.some((link) => link.source === source && link.target === target)) {
			continue
		}

		// Check if the remove self-loops checkbox is checked
		if (document.getElementById("remove-self-loops").checked && source === target) {
			continue
		}

		// Increment the self-loop count if necessary
		if (source === target) {
			selfLoopCount++
		}

		links.push({ source, target })
		count++
	}
	const maxLinks = (numNodes * (numNodes - 1)) / 2

	// Check if the number of links exceeds the maximum number
	if (numLinks > maxLinks) {
		// Display an error message
		output.textContent = "Links limit reached. Increase the number of nodes or the decrease the number of links"
		output.style.color = "red"
		return
	}

	// Generate a random number of self-loops if the checkbox is not checked
	if (!document.getElementById("remove-self-loops").checked) {
		const maxSelfLoops = Math.floor((numLinks - count) / 2)
		const additionalSelfLoops = Math.floor(Math.random() * (maxSelfLoops + 1))
		selfLoopCount += additionalSelfLoops

		// Add the additional self-loops to the links array
		for (let i = 0; i < additionalSelfLoops; i++) {
			links.push({ source: i, target: i })
		}
	}

	// Combine the nodes and links into a single object
	const data = { nodes, links }

	var prettifiedData = JSON.stringify(data, null, 2)
	output.style.color = "black"
	output.innerHTML = "Number of self-loops:" + selfLoopCount + "<br>Generated data:<br><pre>" + prettifiedData + "</pre>"
}
//////////////////////////cy /////////////////////////////////
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
	var data = { elements: { nodes: nodes, edges: links } }

	// display the JSON data in the page
	var prettifiedData = JSON.stringify(data, null, 2)
	output.style.color = "black"
	output.innerHTML = "Generated data:<br><pre>" + prettifiedData + "</pre>"
}

///////////////////heirarchical data//////////////////////////////////

function generateData() {
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

// ////////////view on submit////////////////////////////

document.getElementById("form").addEventListener("submit", function (event) {
	event.preventDefault()

	if (type.value == "d3") {
		generateForceSimulationData()
	} else if (type.value == "cy") {
		generateCyJSON()
	} else if (type.value == "hierarchical") {
		generateData()
	} else if (type.value == "JSON") {
		generateSalesData()
	} else if (type.value == "sankeyJSON") {
		generateSankeyData()
	}
})

//////////to generate copy button///////////////////
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

///////////////sales JSON data//////////////////////////////////
function generateSalesData() {
	const numRecords = document.getElementById("num-records").value
	const selectedAttributes = []
	const attributeElements = document.querySelectorAll('input[name="attributes"]:checked')
	for (const element of attributeElements) {
		selectedAttributes.push({ name: element.value, type: element.dataset.type })
	}

	if (selectedAttributes.length === 0) {
		output.textContent = "Please select at least one attribute."
		return
	}
	const data = []
	const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Gina", "Harry", "Ivy", "Jack"]
	const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"]
	const streetNames = ["Main Street", "Maple Avenue", "Park Boulevard", "Elm Street", "Oak Street", "Pine Street"]
	const cityNames = ["Anytown", "Sometown", "Mytown", "Yourtown", "Theirtown"]
	const promoCodePrefixes = ["SALE", "DISCOUNT", "PROMO"]
	const promoCodeSuffixes = ["10OFF", "20OFF", "30OFF"]
	for (let i = 0; i < numRecords; i++) {
		const record = {}
		for (const attribute of selectedAttributes) {
			if (attribute.name === "customer_name") {
				record[attribute.name] = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)]
			} else if (attribute.name === "product_name") {
				record[attribute.name] = "Product " + (i + 1)
			} else if (attribute.name === "quantity") {
				record[attribute.name] = Math.floor(Math.random() * 10) + 1
			} else if (attribute.name === "price") {
				record[attribute.name] = Math.random() * 100
			} else if (attribute.name === "total_amount") {
				record[attribute.name] = Math.random() * 1000
			} else if (attribute.name === "date_purchased") {
				const minDate = new Date(2020, 0, 1) // January 1, 2020
				const maxDate = new Date(2022, 0, 1) // January 1, 2022
				const randomTimestamp = Math.random() * (maxDate.getTime() - minDate.getTime()) + minDate.getTime()
				record[attribute.name] = new Date(randomTimestamp).toISOString()
			} else if (attribute.name === "payment_method") {
				const paymentMethods = ["credit card", "debit card", "paypal", "cash"]
				record[attribute.name] = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
			} else if (attribute.name === "shipping_address") {
				record[attribute.name] = Math.floor(Math.random() * 100) + " " + streetNames[Math.floor(Math.random() * streetNames.length)] + ", " + cityNames[Math.floor(Math.random() * cityNames.length)] + " USA"
			} else if (attribute.name === "promo_code") {
				record[attribute.name] = promoCodePrefixes[Math.floor(Math.random() * promoCodePrefixes.length)] + Math.floor(Math.random() * 100) + promoCodeSuffixes[Math.floor(Math.random() * promoCodeSuffixes.length)]
			} else if (attribute.name === "tax") {
				record[attribute.name] = Math.random() * 10
			}
		}
		data.push(record)
	}
	var prettifiedData = JSON.stringify(data, null, 2)
	output.innerHTML = "Generated data:<br><pre>" + prettifiedData + "</pre>"
}

/////////////////////Sankey JSON/////////////////////

function generateSankeyData() {
	function generatenodeLinkData(numNodes, numLinks) {
		const nodes = []
		for (let i = 0; i < numNodes; i++) {
			nodes.push({ name: `Node ${i}` })
		}
		const links = []
		for (let i = 0; i < numLinks; i++) {
			links.push({ source: Math.floor(Math.random() * numNodes), target: Math.floor(Math.random() * numNodes), value: Math.random() })
		}

		return { nodes: nodes, links: links }
	}

	const numNodes = document.getElementById("num-nodes").value
	const numLinks = document.getElementById("num-links").value
	const data = generatenodeLinkData(numNodes, numLinks)
	var prettifiedData = JSON.stringify(data, null, 2)
	output.innerHTML = "Generated data:<br><pre>" + prettifiedData + "</pre>"
}
