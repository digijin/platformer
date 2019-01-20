import * as PIXI from "pixi.js";
import Rigidbody from "Rigidbody";
import config from "config";

import Behaviour from "./Behaviour";
import Point from "Utility/Point";

import PlayerState from "Level/Actor/Player/State";
import type { PlayerStateType } from "Level/Actor/Player/State";

import Globals from "../../../Globals";

export const HAND_STATE = {
	ARMED: 0,
	FIRED: 1,
	GRIPPED: 2,
	RELEASED: 3,
};
const hand = {
	speed: 2000,
	reelSpeed: 1200,
	offset: new Point({
		x: -config.player.size.w / 2,
		y: -config.player.size.h / 2,
	}),
	position: new Point({ x: 0, y: 0 }),
	direction: 0,
	distance: 500,
	// firing: false,
	state: HAND_STATE.ARMED,
};


export default class PlayerCharacter extends Rigidbody{

	targetOffset: Point = new Point();
	energy: number = 0;
	container: PIXI.Container;
	primaryReload: number = 0;
	graph: PIXI.Graphics;
	state: PlayerStateType = PlayerState.AIRBORNE;
	hand = hand;
    leg: Leg;
    z:number = 10;
    constructor(params){
    	super(params);
    	this.position = params.position;
    	this.engine = params.engine;
    	this.size = config.player.size;
    	this.h = 0;
    	this.v = 0;
    	this.registration = {
    		x: 0.5,
    		y: 1,
    	};
        
    	this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    	this.sprite.anchor = this.registration;
    	this.sprite.width = this.size.w;
    	this.sprite.height = this.size.h;
    	this.addChild(this.sprite);
    	this.behaviours = Behaviour.map(b => new b(this, params.engine));
		
    	this.graph = new PIXI.Graphics();
    	this.addChild(this.graph);
    	Globals.set("player", this);

    }
    

    exit() {
    	this.container.removeChild(this.graph);
    }

    update() {
    	// this.position = new Point(this.position);
    	this.behaviours.forEach(b=>b.run());
    }

    changeState(newstate: PlayerStateType){
    	this.state = newstate;
    }

    spendEnergy(amount: number): boolean {
    	if (this.energy >= amount) {
    		this.energy -= amount;
    		return true;
    	}
    	return false;
    }

    damage() {
    	//overrides parent, does nothing... invincible!
    }

    getEnergyPercent(): number {
    	const engine: ComponentEngine =
			EngineMap[this.engine.currentPlayer.engine];
    	return this.energy / engine.maxPower;
    }

    getGamePad() {
    	const gp = this.engine.input.gamepad.getGamePad();
    	if (this.engine.input.getDevice() == "gamepad") {
    		this.engine.mouse.point = this.position
    			.add({
    				x: 0,
    				y: -this.size.h / 2,
    			})
    			.add({
    				x: gp.axes[0] * 300,
    				y: gp.axes[1] * 300,
    			});
    	}
    	return gp;
    }

    getTargetPoint(): Point {
    	return this.engine.mouse.point.subtract(this.targetOffset);
    }

    
}