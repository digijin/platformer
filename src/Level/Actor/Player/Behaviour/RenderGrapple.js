
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

import Point from "Utility/Point";

export default class RenderGrapple extends Base{

    states = ALL
    update(){
    	this.player.graph.clear();
    	// this.player.graph.position.set(this.player.hand.position.x, this.player.hand.position.y);
    	const pos = new Point(this.player.position);
    	this.player.graph
    		.lineStyle(5, 0xff0000)
    		.moveTo(0, 0)
    		.lineTo(
    			// pos.add(this.player.hand.offset).x - this.player.hand.position.x,
    			// pos.add(this.player.hand.offset).y - this.player.hand.position.y
    			this.player.hand.position.x - pos.x,
    			this.player.hand.position.y - pos.y,
    		);
    }

}