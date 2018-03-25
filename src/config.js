//@flow
export default {
	game: {
		width: 800,
		height: 800
	},
	grid: {
		width: 32,
		// height: 20,
		tile: {
			width: 8,
			height: 8
		}
	},
	player: {
		size: {
			w: 40,
			h: 50
		},
		legspeed: 20,
		speed: 500,
		jump: {
			power: 10
		}
	},
	gravity: 20,
	debug: {
		fpsmeter: true,
		player: {
			boundingBox: false
		}
	},
	missile: {
		guidedDist: 50
	},
	fpsmeter: {
		graph: 1,
		theme: "transparent",
		heat: 0,
		history: 20,
		left: "auto",
		right: "5px",
		show: "ms"
	},
	enemy: {
		walkSpeed: 50,
		size: {
			w: 50,
			h: 50
		},
		registration: {
			x: 0.5,
			y: 1
		}
	},
	input: {
		keyboardMapping: {
			a: 65,
			d: 68,
			w: 87,
			s: 83,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			shift: 16,
			enter: 13,
			ctrl: 17,
			escape: 27,
			space: 32
		},
		axes: {
			horizontal: [
				{
					type: "keyboard",
					positive: "d",
					negative: "a"
				},
				{
					type: "keyboard",
					positive: "right",
					negative: "left"
				},
				{
					type: "gamepad",
					axis: 0
				}
			],
			vertical: [
				{
					type: "keyboard",
					positive: "s",
					negative: "w"
				},
				{
					type: "gamepad",
					axis: 1
				}
			],
			wheel: [
				{
					type: "mouse"
				}
			]
		},
		buttons: {
			boost: [
				{
					type: "keyboard",
					key: "shift"
				}
			],
			down: [
				{
					type: "keyboard",
					key: "down"
				},
				{
					type: "keyboard",
					key: "s"
				}
			],
			jump: [
				{
					type: "gamepad",
					button: 0
				},
				{
					type: "keyboard",
					key: "space"
				}
			],
			special: [
				{
					type: "gamepad",
					button: 1
				},
				{
					type: "gamepad",
					button: "lt"
				},
				{
					type: "mouse",
					button: 2
				}
			],
			fire: [
				{
					type: "gamepad",
					button: 2
				},
				{
					type: "gamepad",
					button: "rt"
				},
				{
					type: "keyboard",
					key: "ctrl"
				},
				{
					type: "mouse",
					button: 0
				}
			],
			editor_add: [
				{
					type: "mouse",
					button: 0
				}
			],
			editor_remove: [
				{
					type: "mouse",
					button: 2
				}
			],
			editor_speed: [
				{
					type: "keyboard",
					key: "shift"
				}
			],
			editor_modifier: [
				{
					type: "keyboard",
					key: "ctrl"
				}
			],
			editor_drag: [
				{
					type: "mouse",
					button: 1
				}
			],
			pause: [
				{
					type: "keyboard",
					key: "escape"
				}
			],
			stand: [
				{
					type: "gamepad",
					button: 5
				}
			]
		}
	}
};
