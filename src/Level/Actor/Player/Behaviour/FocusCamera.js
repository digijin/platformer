
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

import config from "config";


export default class FocusCamera extends Base{

    states = ALL
    update(){
    	const viewTarget = this.player.position.subtract({
    		x: config.game.width / 2,
    		y: config.game.height / 2,
    	});
    	// .subtract(this.viewTargetOffset);
    	this.engine.view.offset = this.engine.view.offset.easeTo(viewTarget, 5);
    }

}