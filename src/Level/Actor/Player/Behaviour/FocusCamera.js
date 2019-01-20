
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

import config from "config";
import Point from "Utility/Point";


export default class FocusCamera extends Base{

    states = ALL
    update(){
    	// debugger;
    	//NOTE: this.player.position may be a pixi observable point
    	// instead of a Utility/Point, so check it first

    	const viewTarget = new Point(this.player.position).subtract({
    		x: config.game.width / 2,
    		y: config.game.height / 2,
    	});
    	// .subtract(this.viewTargetOffset);
    	this.engine.view.offset = this.engine.view.offset.easeTo(viewTarget, 5);
    }

}