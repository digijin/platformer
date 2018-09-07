
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";
import BoosterParticle from "GameObject/Particle/BoosterParticle";
import config from "config";

export default class Boost extends Base{

    states = [PlayerState.GROUNDED, PlayerState.AIRBORNE]
    update(){
    	// console.log(this.engine.input.getButton("boost"));
    	if (this.engine.input.getButtonDown("boost")) {
    		this.player.changeState(PlayerState.DASH);
    	}

    	if (this.engine.input.getButton("boost")) {
    		// console.log(this.engine.input.getAxis("horizontal"));
    		this.player.h *= 2;
    		this.engine.register(
    			new BoosterParticle({
    				container: this.player.container,
    				position: this.player.position.subtract({
    					x: 0,
    					y: config.player.size.h / 2,
    				}),
    				h: this.player.h,
    				v: 0.5,
    				time: 0.2,
    			})
    		);
    	}
    }
}