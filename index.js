var sidebar = document.querySelector(".sidebar")
var sidebarElements = document.querySelectorAll(".sidebar div")
var main = document.querySelector(".main-content-main")
var footer = document.querySelector(".footer")
const gridContainer = document.querySelector(".main-content")
const elem = document.getElementById("graph")
let gridHtml = ""

const N = 1000
const gData = {
	nodes: [...Array(N).keys()].map((i) => ({ id: i })),
	links: [...Array(N).keys()]
		.filter((id) => id)
		.map((id) => ({
			source: id,
			target: Math.round(Math.random() * (id - 1)),
		})),
}

const distance = 800

const Graph = ForceGraph3D()(document.getElementById("graph")).enableNodeDrag(false).enableNavigationControls(false).showNavInfo(false).cameraPosition({ z: distance }).graphData(gData).linkWidth(0.5).nodeRelSize(0.8).linkOpacity(0.1).nodeOpacity(0.4)

// camera orbit
let angle = 0
setInterval(() => {
	Graph.cameraPosition({
		x: distance * Math.sin(angle),
		z: distance * Math.cos(angle),
	})
	angle += Math.PI / 3000
}, 10)

var menu = document.getElementsByClassName("menu-icon") //returns an array wherein the [0] element is the div hence menu[0] below
menu[0].addEventListener("click", function () {
	sidebar.classList.toggle("collapsed")
	main.classList.toggle("collapsed")
	footer.classList.toggle("collapsed")
})

fetch("./data.json")
	.then((res) => res.json())
	.then((data) => {
		sidebarElements.forEach((eachItem) => {
			eachItem.addEventListener("click", (ele) => {
				sidebarElements.forEach((eI) => {
					eI.style.cssText = "color: white; background-color: none;"
				})
				var className = ele.target.className
				eachItem.style.cssText = "color: black; background-color: rgb(240, 239, 239);"
				gridHtml = ""

				data.forEach((item) => {
					if (item.tech.includes(className) == true) {
						gridContainer.innerHTML = ""
						gridHtml += `<a href="${item.url}"rel="noopener noreferrer" target="_blank">
						<div class="grid-item">
						<div>${item.title}</div> 			           
						</div> </a>`
						gridContainer.innerHTML = gridHtml
					}
				})
			})
		})

		data.forEach((item) => {
			gridHtml += `<a style="background-color:${item.color}" href="${item.url}"rel="noopener noreferrer" target="_blank">
			<div class="main-content" >
		      <div>${item.title}</div>
		   </div>
			</a>`
		})
		gridContainer.innerHTML = gridHtml
	})
