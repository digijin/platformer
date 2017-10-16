//@flow
export default {
	game: {
		width: 800,
		height: 800
	},
	grid: {
		width: 50,
		height: 50
	},
	player: {
		size: {
			w: 80,
			h: 80
		},
		speed: 250
	},
	gravity: 10,
	debug: {
		fpsmeter: true
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
