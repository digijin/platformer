
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";


export default class Walk extends Base{

    states = [PlayerState.GROUNDED]
    update(){
    	this.player.h = this.engine.input.getAxis("horizontal");
    }
}