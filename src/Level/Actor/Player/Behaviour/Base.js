// @flow

import type { PlayerStateType } from "Level/Actor/Player/State";
import type Player from "Level/Actor/Player";
import type Engine from "Engine";
export default class BasePlayerBehaviour{
    states: Array<PlayerStateType>;
    player: Player;
    constructor( player: Player, engine: Engine ){
    	this.player = player;
    	this.engine = engine;
    }

    update(){

    }

    begin(){

    }

    run(){
    	// console.log(this.states, this.player.state);
    	if(this.states.indexOf(this.player.state) > -1){
    		// console.log("boop");
    		this.update();
    	}
    }

}