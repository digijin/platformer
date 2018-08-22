
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";
import config from "config";

export default class Boost extends Base{

    states = [PlayerState.GROUNDED, PlayerState.AIRBORNE]
    update(){
    	this.player.v += this.engine.deltaTime * config.gravity; //GRAVITY
    }
}