var svg;
var width;
var height;
var bg;
var circle;
var dvd;
var ns = "http://www.w3.org/2000/svg";
var h = 0;
var c = false;
var d = true;
var buttons = [];
var texts = []

var anim = function() {
    var dr = 1;
    var dx = 1;
    var dy = 1;

    var draw = function() {
	h++;
	h = h % 360;
	bg.setAttribute("style", "fill:hsl(" + h + ", 100%, 60%);");
	var anybright = false;
	for (i=0; i<3;i++){
	    if (texts[i].getAttribute("bright")=="1") {
		buttons[i].setAttribute("style", "fill:hsl(" + (h+180)%360 + ", 100%, 80%)");
		anybright = true;
	    } else {
		buttons[i].setAttribute("style", "fill:hsl(" + (h+180)%360 + ", 100%, 60%)");
		svg.style.cursor="default";
	    }
	}
	if (anybright) { svg.style.cursor = "pointer"; } else { svg.style.cursor = "default"; }
	if (c) {
	    var radius = circle.getAttribute("r");
	    if (radius * 2 == Math.min(width, height) || radius <= 0) {
		dr = -dr;
	    }
	    circle.setAttribute("r", parseInt(radius) + dr);
	} else {
	    circle.setAttribute("r", 0);
	}
	if (d) {
	    var dvdx = parseInt(dvd.getAttribute("x"));
	    var dvdy = parseInt(dvd.getAttribute("y"));
	    dvd.setAttribute("width", Math.max(width,height)/5);
	    dvd.setAttribute("height", Math.max(width,height)/8);
	    if (dvdx > width - parseInt(dvd.getAttribute("width")) || dvdx < 0) {
		dx = -dx;
	    }
	    if (dvdy > height - parseInt(dvd.getAttribute("height")) || dvdy < 0) {
		dy = -dy;
	    }
	    dvd.setAttribute("x", dvdx+dx);
	    dvd.setAttribute("y", dvdy+dy);
	} else {
	    dvd.setAttribute("width", 0);
	    dvd.setAttribute("height", 0);
	}
	
	window.requestAnimationFrame(draw);
    };

    draw();
};

var varSetup = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    svg.width = width;
    svg.height = height;
    bg.setAttribute("x", 0);
    bg.setAttribute("y", 0);
    bg.setAttribute("width", width);
    bg.setAttribute("height", height);
    circle.setAttribute("cx", width/2);
    circle.setAttribute("cy", height/2);
    circle.setAttribute("r", 10);
    dvd.setAttribute("x", width/2);
    dvd.setAttribute("y", height/2);
    dvd.setAttribute("width", Math.max(width,height)/5);
    dvd.setAttribute("height", Math.max(width,height)/8);
    for (i=0; i < 3; i++) {
	buttons[i].setAttribute("height", 20);
	buttons[i].setAttribute("width", (texts[i].textContent.length+1)*10);
	buttons[i].setAttribute("y", height-30);
	buttons[i].setAttribute("bright", 0);
	if (i == 0) {
	    buttons[i].setAttribute("x", width - parseInt(buttons[i].getAttribute("width")) - 10)
	} else {
	    buttons[i].setAttribute("x", parseInt(buttons[i-1].getAttribute("x")) - parseInt(buttons[i].getAttribute("width")) - 10);
	}

	texts[i].setAttribute("font-size", "15");
	texts[i].setAttribute("font-family", "Courier New");
	texts[i].setAttribute("x", parseInt(buttons[i].getAttribute("x")) + parseInt(buttons[i].getAttribute("width"))/10);
	texts[i].setAttribute("y", parseInt(buttons[i].getAttribute("y")) + 15);
    }
    
};

var setup = function() {
    svg = document.getElementById("doodle");
    
    for (i=0; i < 3; i++) {
	buttons.push(document.createElementNS(ns, "rect"));
	texts.push(document.createElementNS(ns, "text"));
    }

    texts[2].textContent = "Circle";
    texts[1].textContent = "DVD";
    texts[0].textContent = "Stop";


    window.onresize = function() { 
	varSetup();
    };

    bg = document.createElementNS(ns, "rect");
    bg.setAttribute("style", "fill:hsl(" + h + ", 100%, 60%);");

    circle = document.createElementNS(ns, "circle");
    circle.setAttribute("style", "fill:#000000");

    dvd = document.createElementNS(ns, "image");
    dvd.setAttribute("href", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/1280px-DVD_logo.svg.png");
    dvd.setAttribute("style", "fill:#000000");
    
    varSetup();
    
    svg.appendChild(bg);
    svg.appendChild(circle);
    svg.appendChild(dvd);

    for (i=0; i < 3; i++) {
	svg.appendChild(buttons[i]);
	svg.appendChild(texts[i]);
	var makebright = function(e) {
	    this.setAttribute("bright", "1");
	};
	var dim = function(e) {
	    this.setAttribute("bright", "0");
	};
	texts[i].addEventListener("mouseenter", makebright);
	texts[i].addEventListener("mouseleave", dim);
    }

    texts[2].addEventListener("click", function(e) {
	d = false;
	c = true;
	circle.setAttribute("r", 10);
    });
    texts[1].addEventListener("click", function(e) {
	d = true;
	c = false;
    });
    texts[0].addEventListener("click", function(e) {
	d = false;
	c = false;
    });

    anim();
};

window.onload = setup
