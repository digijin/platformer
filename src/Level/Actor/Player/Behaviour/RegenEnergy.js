
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

const REGEN_RATE = 100;
const MAX_POWER = 100;

export default class RegenEnergy extends Base{

    states = ALL
    update(){
    	this.player.energy += this.player.engine.deltaTime * REGEN_RATE;
    	this.player.energy = Math.min(this.player.energy, MAX_POWER);
    }

}