
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";
import BoosterParticle from "GameObject/Particle/BoosterParticle";
import Point from "Utility/Point";
import config from "config";
const DASH_DIST = 200;
export default class Dash extends Base{

    states = [PlayerState.DASH]

    dist = 0;
    update(){
    	if(this.player.h == 0){
    		this.player.h = 1;
    	}
    	const hDelta = this.player.h * this.engine.deltaTime * 500;//legs.speed;
    	this.dist += hDelta;
    	if (this.player.canMoveHori(hDelta) && Math.abs(this.dist) < DASH_DIST) {
    		this.player.position.x += hDelta;
    	}else{
    		this.dist = 0;
    		this.player.changeState(PlayerState.GROUNDED);
    	}
        
    	this.engine.register(
    		new BoosterParticle({
    			container: this.player.container,
    			position: new Point(this.player.position).subtract({
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