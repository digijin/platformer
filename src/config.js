//@flow
export default {
	game: {
		width: 800,
		height: 800
	},
	grid: {
		width: 20,
		height: 20
	},
	player: {
		size: {
			w: 40,
			h: 60
		},
		speed: 250
	},
	gravity: 10,
	debug: {
		fpsmeter: true
	},
	missile: { guidedDist: 50 },
	fpsmeter: {
		graph: 1,
		theme: "transparent",
		heat: 1,
		history: 50,
		left: "auto",
		right: "5px"
	},
	enemy: {
		walkSpeed: 50,
		size: { w: 50, h: 50 },
		registration: { x: 0.5, y: 1 }
	},
	input: {
		buttons: {
			jump: [
				{ type: "gamepad", button: 0 },
				{ type: "keyboard", key: "space" }
			],
			special: [
				{ type: "gamepad", button: 1 },
				{ type: "mouse", button: 2 }
			],
			fire: [
				{ type: "gamepad", button: 2 },
				{ type: "keyboard", key: "ctrl" },
				{ type: "mouse", button: 0 }
			],
			stand: [{ type: "gamepad", button: 5 }]
		}
	}
};
