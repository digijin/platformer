
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

export default class RenderGrapple extends Base{

    states = []//ALL
    update(){
    	this.player.graph.clear();
    	this.player.graph.position.set(this.player.hand.position.x, this.player.hand.position.y);
    	this.player.graph
    		.lineStyle(5, 0xff0000)
    		.moveTo(0, 0)
    		.lineTo(
    			this.player.position.add(this.player.hand.offset).x - this.player.hand.position.x,
    			this.player.position.add(this.player.hand.offset).y - this.player.hand.position.y
    		);
    }

}