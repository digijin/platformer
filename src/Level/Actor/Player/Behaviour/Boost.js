
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";


export default class Boost extends Base{

    states = [PlayerState.AIRBORNE]
    update(){
    	// console.log(this.engine.input.getButton("boost"));
    }
}