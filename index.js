var menu = document.getElementsByClassName("menu-icon") //returns an array wherein the [0] element is the div hence menu[0] below
menu[0].addEventListener("click", function () {
	var sidebar = document.querySelector(".sidebar")
	sidebar.classList.toggle("collapsed")
	var main = document.querySelector(".main-content-main")
	main.classList.toggle("collapsed")
	var footer = document.querySelector(".footer")
	footer.classList.toggle("collapsed")
})
const gridContainer = document.querySelector(".main-content")
let gridHtml = ""

fetch("./data.json")
	.then((res) => res.json())
	.then((data) => {
		var sidebar = document.getElementsByClassName("sidebar")[0]
		sidebar.addEventListener("click", (d) => {
			var className = d.target.className
			gridHtml = ""
			data.forEach((item) => {
				if (item.tech.includes(className) == true) {
					gridContainer.innerHTML = ""
					gridHtml += `<a href="${item.url}"rel="noopener noreferrer" target="_blank">
				<div class="grid-item">
					<h3>${item.title}</h3> 			           
				</div>
				</a>`
					gridContainer.innerHTML = gridHtml
				}
			})
		})

		data.forEach((item) => {
			gridHtml += `<a href="${item.url}"rel="noopener noreferrer" target="_blank">
			<div class="grid-item">
		      <h3>${item.title}</h3>
		   </div>
			</a>`
		})

		gridContainer.innerHTML = gridHtml
	})

const N = 100
const gData = {
	nodes: [...Array(N).keys()].map((i) => ({ id: i })),
	links: [...Array(N).keys()]
		.filter((id) => id)
		.map((id) => ({
			source: id,
			target: Math.round(Math.random() * (id - 1)),
		})),
}
