var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate
	this.el = el
	this.loopNum = 0
	this.period = parseInt(period, 1) || 1000
	this.txt = ""
	this.tick()
	this.isDeleting = false
}

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length
	var fullTxt = this.toRotate[i]

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1)
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1)
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>"

	var that = this
	var delta = 80 - Math.random() * 100

	if (this.isDeleting) {
		delta /= 2
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period
		this.isDeleting = true
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false
		this.loopNum++
		delta = 200
	}

	setTimeout(function () {
		that.tick()
	}, delta)
}

window.onload = function () {
	var elements = document.getElementsByClassName("typewrite")
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute("data-type")
		var period = elements[i].getAttribute("data-period")
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period)
		}
	}
	// INJECT CSS
	var css = document.createElement("style")
	css.type = "text/css"
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}"
	document.body.appendChild(css)
}

// ParticlesJS Config.
particlesJS("particles-js", {
	particles: {
		number: {
			value: 180,
			density: {
				enable: true,
				value_area: 800,
			},
		},
		color: {
			value: "#212121",
		},
		shape: {
			type: "circle",
			stroke: {
				width: 0,
				color: "#212121",
			},
			polygon: {
				nb_sides: 5,
			},
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: false,
				speed: 0.1,
				opacity_min: 0.1,
				sync: true,
			},
		},
		size: {
			value: 3,
			random: true,
			anim: {
				enable: false,
				speed: 5,
				size_min: 0.1,
				sync: false,
			},
		},
		line_linked: {
			enable: true,
			distance: 70,
			color: "#212121",
			opacity: 0.2,
			width: 1,
		},
		move: {
			enable: true,
			speed: 5,
			direction: "none",
			random: false,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 600,
			},
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: true,
				mode: "grab",
			},
			onclick: {
				enable: true,
				mode: "push",
			},
			resize: true,
		},
		modes: {
			grab: {
				distance: 140,
				line_linked: {
					opacity: 0.2,
				},
			},
			bubble: {
				distance: 400,
				size: 20,
				duration: 2,
				opacity: 0.2,
				speed: 3,
			},
			repulse: {
				distance: 10,
				duration: 4,
			},
			push: {
				particles_nb: 4,
			},
			remove: {
				particles_nb: 2,
			},
		},
	},
	retina_detect: true,
})
