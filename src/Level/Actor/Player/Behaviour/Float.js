
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";
import { clamp } from "lodash-es";


export default class Walk extends Base{

    states = [PlayerState.AIRBORNE]
    update(){
    	this.player.h +=
				this.engine.input.getAxis("horizontal") *
				this.engine.deltaTime *
				5;
    	this.player.h = clamp(this.player.h, -1, 1);
    }
}