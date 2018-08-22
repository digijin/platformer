
import Base from "./Base";
import PlayerState, { ALL } from "Level/Actor/Player/State";
import config from "config";
import Shell from "GameObject/Shell";


export default class MoveVertical extends Base{

    states = ALL
    update(){
    	const vertObjects = this.player.vertObstacles(this.player.v);
    	if (vertObjects.length > 0) {
    		//LAND ON GROUND
    		const isLanding = this.player.position.y % config.grid.width !== 0;
    		if (this.player.v > 0) {
    			this.player.position.y = vertObjects[0].position.y * config.grid.width;
    		}
    		const allPlatform =
				vertObjects.find(o => {
					return o.isPlatform() == false;
				}) == undefined;
    		if (allPlatform && this.engine.input.getButton("down")) {
    			//jump through platform
    		} else {
    			if (isLanding) {
    				this.handleLanding(this.player.v);
    			}
    			this.player.v = 0;
    		}
    	}
    }

    handleLanding(speed: number) {
    	this.player.changeState(PlayerState.GROUNDED);
    	for (let i = 0; i < speed * 4; i++) {
    		this.engine.register(
    			new Shell({
    				container: this.player.container,
    				position: this.player.position.subtract({
    					x: (Math.random() - 0.5) * 15 * speed,
    					// y: config.player.size.h / 2
    					y: 0,
    				}),
    				h: (Math.random() - 0.5) / 10,
    				v: (-Math.random() * speed) / 4,
    				time: 0.1 + Math.random(),
    			})
    		);
    	}
    }
}