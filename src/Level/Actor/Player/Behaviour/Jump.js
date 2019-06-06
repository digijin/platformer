
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";

import config from "config";

export default class Jump extends Base{

    states = [PlayerState.GROUNDED]
    update(){
    	if(this.engine.input.getButtonDown("jump")){
    		this.player.v = -config.player.jump.power;
    		this.player.changeState(PlayerState.AIRBORNE);
    	}
    }
}