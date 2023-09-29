import { config } from "./config.js";

console.log(config.node.mass)

// should be in ready() but breaks stuff
var canvas = document.getElementById("graphview");
var graph = canvas.getContext("2d");

var state =
{
	mouse: {
		x: 1,
		y: 1,
		is_down: false,

		previous: {
			x: 1,
			y: 1,
			is_down: false,
		}
	},

	viewport: {
		x: 0,
		y: 0,
		zoom: 1, // aka Z
	}
}

var nodes =
[
	{ name: 'node1', links: ['node2'] },
	{ name: 'node2', links: ['node1', 'node3'] },
	{ name: 'node3', links: ['node2'] }
]

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
	// 🩹 Nodes become blocky on update if we don't
	// fix_canvas_attreibutes() every time ...
	fix_canvas_attributes()

	update_state(event)

	// when its down run some fancy physics stuff to move them around
	// also remvoe this comment when its done
	// becauise this is just a TODO note to self.

	var node_index = 0;

	nodes.forEach(node =>
	{
		node_index += 1;

		// if we are hovering a node

		node.links.forEach(link =>
		{
			console.log("Node!");
		});

		draw_node(node_index * 30, 0);
	});

	if (state.mouse.x - state.viewport.x)
	{

	}

	if (state.mouse.is_down)
	{
		state.viewport.x += (state.mouse.previous.x - state.mouse.x);
		state.viewport.y += (state.mouse.previous.y - state.mouse.y);
	}

}

function update_state(event)
{
	switch (event.type)
	{
		case 'resize':
			console.log("resized canvas!");
			break;
		case 'ready':
			console.info("Ready!");
			break;
		case 'mousedown':
			state.mouse.is_down = true;
			break;
		case 'mouseup':
			state.mouse.is_down = false;
			break;
		case 'mousemove':
			state.mouse.previous.x = state.mouse.x;
			state.mouse.previous.y = state.mouse.y;

			state.mouse.x = event.clientX;
			state.mouse.y = event.clientY;
			break;
		default:
			console.warn(`Please add ${event.type} to the update_state() function!`);
	}
}

function fixed_update()
{
	console.log("tick (tick_clock_cycle)");
}

var loop = setInterval(fixed_update, 1000 / config.enviornment.tickrate);

/// === Bulk of code ===

function fix_canvas_attributes()
{
	canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

	graph.strokeStyle = "rgb(0, 0, 0, 0)";
	graph.fillStyle = config.node.color;
}

function handle_node()
{
	console.log("aaa");
}

function draw_node(x, y)
{
	graph.beginPath();

	// this is poorly documented so its:
	// center_x, center_y, start_angle (radians), end_angle (radians).
	// We multiply the last one by PI to do stuff and make it circular.

	graph.arc(x - state.viewport.x, y - state.viewport.y, config.node.size * state.viewport.zoom, 0, 2 * Math.PI);
	// graph.arc(x + state.viewport.x, y + state.viewport.y, config.node.size * state.viewport.zoom, 0, 2 * Math.PI);
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