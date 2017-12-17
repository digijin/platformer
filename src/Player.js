export default class Player {
	currentPlayer: Player;
	primary: string;
	secondary: string;
	legs: string;
	body: string;

	constructor() {
		this.primary = "machinegun";
		this.secondary = "dumbfire";
		this.legs = "standard";
		this.body = "standard";
	}

	static getCurrentPlayer() {
		if (!this.currentPlayer) {
			this.currentPlayer = new Player();
		}
		return this.currentPlayer;
	}
}
