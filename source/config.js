export var config =
{
	node: {
		mass: 1.0,
		repel: 1.0,
		link_force: 1.0,
		size: 6,
		gravity: 9.8, // how much do they want to stick together in a ball
		do_scaling: false,

		color: 'rgb(156, 156, 255)',
	},

	links: {
		thickness: 1,
		do_arrows: false,
	},

	text: {
		fade_threashold: 1,
	},

	enviornment: {
		friction: 1.0,
	}
}