var sidebar = document.querySelector(".sidebar")
var sidebarElements = document.querySelectorAll(".sidebar div")
var main = document.querySelector(".main-content-main")
var footer = document.querySelector(".footer")
const gridContainer = document.querySelector(".main-content")
const elem = document.getElementById("graph")

let gridHtml = ""

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
					eI.style.cssText = "font-size:14px;"
				})
				var className = ele.target.className
				eachItem.style.cssText = "font-size:20px;"
				gridHtml = ""

				data.forEach((item) => {
					if (item.tech.includes(className) == true) {
						gridContainer.innerHTML = ""
						gridHtml += `<a style="background-color:${item.color}" href="${item.url}"rel="noopener noreferrer" target="_blank">
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
			<div>
		      <div>${item.title}</div>
		   </div>
			</a>`
		})
		gridContainer.innerHTML = gridHtml
	})
