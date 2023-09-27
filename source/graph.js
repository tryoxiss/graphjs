import { config } from "./config.js";

console.log(config.node.mass)

const TICKRATE = 20;

var viewport_x = 1;
var viewport_y = 1;

var mouse_x = 1;
var mouse_y = 1;

// should be in ready() but breaks stuff
var canvas = document.getElementById("graphview");
var graph = canvas.getContext("2d");

/// === Callbacks ===

function ready()
{
	fix_canvas_attributes()

	update({ type: 'ready' });
}

function resize()
{
	fix_canvas_attributes()

	update({ type: 'resize' });
}

function update(event)
{
	// when its down run some fancy physics stuff to move them around
	// also remvoe this comment when its done
	// becauise this is just a TODO note to self.
	if (event.type == 'mousedown')
	{
		let pass;
	}

	draw_node(10, 20);
}

function fixed_update()
{
	console.log("tick");
}

var loop = setInterval(fixed_update, 1000 / TICKRATE);

/// === Bulk of code ===

function fix_canvas_attributes()
{
	canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

	graph.strokeStyle = "rgb(156, 156, 255, 0)";
	graph.fillStyle = config.node.color;
}

function draw_node(x, y)
{
	graph.beginPath();

	// this is poorly documented so its:
	// center_x, center_y, start_angle (radians), end_angle (radians).
	// We multiply the last one by PI to do stuff and make it circular.
	graph.arc(x, y, config.node.size, 0, 2 * Math.PI);
	graph.fill('evenodd');
    graph.stroke();
}

window.addEventListener('load', ready);
window.addEventListener('resize', resize);

// update() garbage
document.addEventListener('mouseup', update);
document.addEventListener('mousedown', update);
document.addEventListener('mousemove', update);
document.addEventListener('keydown', update);
document.addEventListener('keyup', update);