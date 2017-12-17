export default class Player {
	currentPlayer: Player;
	primary: string;
	secondary: string;
	legs: string;
	body: string;
	name: string;

	constructor(params) {
		this.primary = "machinegun";
		this.secondary = "dumbfire";
		this.legs = "standard";
		this.body = "standard";
		Object.assign(this, params);
	}

	static getCurrentPlayer() {
		if (!this.currentPlayer) {
			this.currentPlayer = new Player();
		}
		return this.currentPlayer;
	}
	save(): string {
		return JSON.stringify(this);
	}
	static load(data): string {
		this.currentPlayer = new Player(JSON.parse(data));
	}
}
