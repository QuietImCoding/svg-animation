var svg;
var width;
var height;
var bg;
var circle;
var dvd;
var ns = "http://www.w3.org/2000/svg";
var h = 0;

var anim = function() {
    h++;
    h = h % 360;
    bg.setAttribute("style", "fill:hsl(" + h + ", 100%, 60%);");
    window.requestAnimationFrame(anim);
};

var setup = function() {
    svg = document.getElementById("doodle");
    width = window.innerWidth;
    height = window.innerHeight;
    svg.width = width;
    svg.height = height;

    window.onresize = function() { 
	width = window.innerWidth; 
	height = window.innerHeight; 
	svg.width = width;
	svg.height = height;
	circle.setAttribute("cx", width/2);
	circle.setAttribute("cy", height/2);
    };


    bg = document.createElementNS(ns, "rect");
    bg.setAttribute("x", 0);
    bg.setAttribute("y", 0);
    bg.setAttribute("width", width);
    bg.setAttribute("height", height);
    bg.setAttribute("style", "fill:hsl(" + h + ", 100%, 60%);");

    circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", width/2);
    circle.setAttribute("cy", height/2);
    circle.setAttribute("r", 10);
    circle.setAttribute("style", "fill:#000000");

    dvd = document.createElementNS(ns, "rect");
    dvd.setAttribute("x", width/2);
    dvd.setAttribute("y", height/2);
    dvd.setAttribute("width", 10);
    dvd.setAttribute("height", 10);
    //dvd.setAttribute("href", "https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg");
    dvd.setAttribute("style", "fill:#000000");

    svg.appendChild(bg);
    //svg.appendChild(circle);
    svg.appendChild(dvd);

    anim();
};

window.onload = setup
