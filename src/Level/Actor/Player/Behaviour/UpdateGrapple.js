import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";
import config from "config";
import { HAND_STATE } from "../../Player";
import Point from "Utility/Point";
import Line from "../../../../Utility/Line";
import Enemy from "../../Enemy";
import type Block from "Grid/Block";

import PlayerState from "Level/Actor/Player/State";


export default class UpdateGrapple extends Base{

	states = ALL;
	
	grippedObject;
	grippedObjectType:string;
	targetPosition:Point;
	trajectory;//hack
	
	fireHand(){
		this.player.hand.state = HAND_STATE.FIRED;
		const diff = this.player.getTargetPoint().subtract(this.player.hand.position);
		this.player.hand.direction = Math.atan2(diff.y, diff.x);
		this.targetPosition = null;
		this.grippedObject = null;
		this.grippedObjectType = null;

	}

	ifHitsEnemyThen(doThis: (actor: Actor) => {}) {
		//using every so a missile doesnt blow up twice
    	this.engine.manager.getEnemies().every( en => {
    		if(en !== this.owner){
    			if (this.cheapCheck(en) || this.expensiveCheck(en)) {
    				doThis(en);
    				return false;
    			}
    		}
    		return true;
    	});
	}

	cheapCheck(actor: Actor) {
    	return actor.getBoundingRect().contains(this.trajectory.b);
	}

	expensiveCheck(actor: Actor) {
    	return this.trajectory.intersectsRect(actor.getBoundingRect()).result;
	}

	update(){
    	if (this.player.hand.state === HAND_STATE.ARMED) {
    		this.player.hand.position = new Point(this.player.position).add(this.player.hand.offset);
			if (this.engine.input.getButtonDown("grapple")) {
				//FIRE HAND
				if (this.player.hand.state === HAND_STATE.ARMED) {
					this.fireHand();
				}
			}
    	}
    	if (this.player.hand.state === HAND_STATE.FIRED) {
    		const old = new Point(this.player.hand.position);
    		this.player.hand.position.x +=
				Math.cos(this.player.hand.direction) * this.engine.deltaTime * this.player.hand.speed;
    		this.player.hand.position.y +=
				Math.sin(this.player.hand.direction) * this.engine.deltaTime * this.player.hand.speed;
    		const curr = new Point(this.player.hand.position);
    		if (curr.distanceTo(this.player.position) > this.player.hand.distance) {
				this.player.hand.state = HAND_STATE.RELEASED;
				this.player.changeState(PlayerState.AIRBORNE);
    		}
    		//todo unify this with projectile.js, maybe make grapple a projectile
    		this.trajectory = new Line({ a: old, b: curr });
			//CHECK ENEMIES
			this.ifHitsEnemyThen(enemy => {
				// console.log(enemy);
				this.player.hand.state = HAND_STATE.GRIPPED;
				this.grippedObject = enemy;
				this.grippedObjectType = "Enemy";
			});


    		//CHECK GRID
    		const blocks = this.trajectory.blockPixels();
    		// console.log(blocks.length, "blocks");
    		const empty = blocks.every(b => {
    			const block = this.engine.grid.getBlock(b);
    			if (!block) {
    				return false;
    			}
    			if (block.isVacant() && !block.isPlatform()) {
    				return true;
    			} else {
    				const hitTest = this.trajectory.intersectsRect(block.rect);
    				if (hitTest.result && hitTest.collision) {
    					this.player.hand.position.y = hitTest.collision.y;
    					this.player.hand.position.x = hitTest.collision.x;
    					// console.log("damage block");
    					// block.damage(1);
						this.grippedObject = block;
						this.grippedObjectType = "Block";
						this.targetPosition = this.findTargetPositionOnBlock();
    					return false;
    				}
    			}
    		});
    		if (!empty) {
				
				this.player.hand.state = HAND_STATE.GRIPPED;
			}
			// if(this.player.hand.state == HAND_STATE.GRIPPED){
			// 	console.log(this.grippedObject, this.grippedObjectType);
			// }
    	}
    	if (this.player.hand.state === HAND_STATE.RELEASED) {
    		const target = new Point(this.player.position).add(this.player.hand.offset);
    		const diff = target.subtract(this.player.hand.position);
    		const dist = this.player.hand.position.distanceTo(target);
    		const speed = this.engine.deltaTime * this.player.hand.speed;
    		if (speed > dist) {
    			this.player.hand.position = target;
    			this.player.hand.state = HAND_STATE.ARMED;
    		} else {
    			const dir = Math.atan2(diff.y, diff.x);
    			this.player.hand.position.x += Math.cos(dir) * speed;
    			this.player.hand.position.y += Math.sin(dir) * speed;
    		}
    	}
    	if(this.player.hand.state === HAND_STATE.GRIPPED){
			////////////////////////MOVEMENT CODE

    		//REEL IN
			let diff = new Point(this.player.position).add(this.player.hand.offset).subtract(this.player.hand.position);
			if(this.targetPosition){
				diff = new Point(this.player.position).subtract(this.targetPosition);
			}
    		const dir = Math.atan2(diff.y, diff.x);
    		this.player.h = -Math.cos(dir); //* deltaTime*hSpeed
    		this.player.v = -Math.sin(dir) * this.engine.deltaTime * this.player.hand.reelSpeed;
			const hDelta = this.player.h * this.engine.deltaTime * this.player.hand.reelSpeed;
			const vertObjects = this.player.vertObstacles(this.player.v);

			const spaceMoving = new Point({ x: this.player.v, y: hDelta }).length();
			
			if (vertObjects.length === 0) {
				this.player.position.y += this.player.v;
			}else{
				this.land();
			}
			if (this.player.canMoveHori(hDelta)) {
				this.player.position.x += hDelta;
			}else{
				this.land();
			}
			
			
			////////////////////END MOVEMENT CODE
			
			const spaceLeft = new Point(this.player.position).subtract(this.player.hand.position).length();
    		// console.log(spaceLeft, spaceMoving);
    		if(spaceLeft < spaceMoving){ //TODO: unfuck this
				this.land();
    		}

    		// TODO JUMP ESCAPE CLAUSE
    		if(this.engine.input.getButtonDown("jump")){
				this.player.hand.state = HAND_STATE.RELEASED;
				this.player.changeState(PlayerState.AIRBORNE);
    		}
    	}

    	// console.log("hand state", this.player.hand.state);
	}

	land(){
		if(this.grippedObjectType === "Block"){
			//check if top block
			let block:Block;
			// const above = this.engine.grid.getBlock({ x: block.position.x, y: block.position.y - 1 });
			const above = new Array(3).fill(0).map((o, i) => {
				return this.engine.grid.getBlock({
					x: this.grippedObject.position.x,
					y: this.grippedObject.position.y - i,
				});
			});

			if(above[1].isVacant()){
				block = above[0];
			}else if(above[2].isVacant()){
				block = above[1];
			}
			
			if(block){
				const rect = block.rect;
				this.player.position.x = rect.l;
				this.player.position.y = rect.t;
				this.player.v = 0;
				this.player.h = 0;
			}
		}

		this.player.hand.state = HAND_STATE.RELEASED;
		this.player.changeState(PlayerState.AIRBORNE);
	}

	findTargetPositionOnBlock(){
		let block:Block;
		// const above = this.engine.grid.getBlock({ x: block.position.x, y: block.position.y - 1 });
		const above = new Array(3).fill(0).map((o, i) => {
			return this.engine.grid.getBlock({
				x: this.grippedObject.position.x,
				y: this.grippedObject.position.y - i,
			});
		});

		if(above[1].isVacant()){
			block = above[0];
		}else if(above[2].isVacant()){
			block = above[1];
		}
			
		if(block){
			const rect = block.rect;
			// this.player.position.x = rect.l;
			// this.player.position.y = rect.t;
			return new Point({ x: rect.l, y: rect.t });
		}
	}

}