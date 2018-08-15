export default class Player {
	static getCurrentPlayer() {
    	if (!this.currentPlayer) {
    		this.currentPlayer = new Player();
    	}
    	return this.currentPlayer;
	}

	static load(data): string {
    	this.currentPlayer = new Player(JSON.parse(data));
	}

    currentPlayer: Player;
    primary: string;
    secondary: string;
    legs: string;
    body: string;
    name: string;

    constructor(params) {
    	this.primary = "StarterPrimary";
    	this.secondary = "StarterSecondary";
    	this.body = "StarterBody";
    	this.legs = "StarterLegs";
    	this.booster = "StarterBooster";
    	this.engine = "StarterEngine";
    	this.sidekick = "none";
    	Object.assign(this, params);
    }

    save(): string {
    	return JSON.stringify(this);
    }
}
