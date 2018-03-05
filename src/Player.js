export default class Player {
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
