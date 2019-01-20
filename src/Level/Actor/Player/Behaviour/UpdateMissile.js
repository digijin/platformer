
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";
import { SecondaryMap } from "Components/Secondary";
import Point from "Utility/Point";

const missile = {
	firing: false,
	maxEnergy: 800,
	reloadTime: 0.05,
	reload: 0,
	regenSpeed: 10,
	regenBaseSpeed: 150,
	regenSpeedIncrease: 150, //per second
	energy: 700,
	cost: 10,
};

export default class UpdateMissile extends Base{

    states = ALL
    update(){
    	const secondary = SecondaryMap[this.engine.currentPlayer.secondary];
    	if (missile.reload > 0) {
    		missile.reload -= this.engine.deltaTime;
    	} else {
    		if (
    			this.engine.input.getButton("special") &&
				this.player.spendEnergy(secondary.energyCost)
    		) {
    			missile.reload = secondary.reloadTime;

    			// missile = false;
    			this.engine.register(
    				new secondary.projectile({
    					container: this.player.parent,
    					owner: this.player,
    					direction:
							-Math.PI / 2 +
							(Math.random() - 0.5)
							//this.player.leg.facing
    					,
    					speed: 10 + Math.random() * 5,
    					position: new Point(this.player.position),
    					target: this.player.getTargetPoint().add(
    						new Point({
    							x: (Math.random() - 0.5) * 20,
    							y: (Math.random() - 0.5) * 20,
    						})
    					),
    				})
    			);
    		}
    	}
    }

}