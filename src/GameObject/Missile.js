//@flow

import Smoke from "GameObject/Smoke";
// import ExplosionRadial from "GameObject/ExplosionRadial";
import Rect from "Utility/Rect";
import type Actor from "Level/Actor";

import Line from "Utility/Line";

import config from "config";

import type Engine from "Engine";

import Projectile from "GameObject/Projectile";

// import log from "loglevel";

import * as PIXI from "pixi.js";

import EnemyCharacter from "Level/Actor/Enemy/Character";

// import FilterSprite from "GameObject/FilterSprite";
import FilterSprite from "Sprite/Explosion";

export default class Missile extends Projectile {
    update = () => {
    	this.move();

    	//CHECK GRID
    	this.checkGrid();
    	//check decor
    	this.checkDecor((decor, hitTest) => {
    		this.position.x = hitTest.collision.x;
    		this.position.y = hitTest.collision.y;
    		decor.damage(1);
    	});
    	//CHECK ENEMIES
    	this.checkActors();

    	//smoke trail
    	this.engine.register(
    		new Smoke({
    			container: this.container,
    			position: this.position.clone(),
    		})
    	);
    	this.engine.register(
    		new Smoke({
    			container: this.container,
    			position: this.trajectory.percent(0.5),
    		})
    	);

    	//aim at target
    	if (this.guided) {
    		if (this.remoteControl) {
    			// this.target = this.engine.mouse.point;
    			this.target = this.owner.getTargetPoint();
    		}
    		const diff = this.target.subtract(this.position);
    		const dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
    		if (dist < config.missile.guidedDist) {
    			this.guided = false;
    		}
    		let newdir = Math.atan2(diff.y, diff.x);

    		let dirDiff = this.direction - newdir;
    		if (dirDiff > Math.PI) newdir += 2 * Math.PI;
    		if (dirDiff < -Math.PI) newdir -= 2 * Math.PI;

    		//recalculate now we have removed cyclic variance
    		dirDiff = newdir - this.direction;

    		//TODO REMOVE HARDCODING
    		if (Math.abs(dirDiff) < 0.5) {
    			this.speed += this.engine.deltaTime * this.acceleration;
    			this.direction += dirDiff / 3;
    		} else {
    			this.speed -= (this.engine.deltaTime * this.acceleration) / 3;
    			// this.speed = (this.speed + 1) /2;
    			if (dirDiff > 0) {
    				this.direction += this.engine.deltaTime * Math.PI * 2;
    			} else {
    				this.direction -= this.engine.deltaTime * Math.PI * 2;
    			}
    		}
    		if (this.speed < this.minSpeed) {
    			this.speed = this.minSpeed;
    		}
    		if (this.speed > this.maxSpeed) {
    			this.speed = this.maxSpeed;
    		}

    		//dont spin it up too much
    		if (this.direction > Math.PI) {
    			this.direction -= Math.PI * 2;
    		}
    		if (this.direction < -Math.PI) {
    			this.direction += Math.PI * 2;
    		}
    	}
    };

    guided: boolean;
    acceleration: number = 20;
    container: PIXI.Container;
    remoteControl: boolean;
    trajectory: Line;

    maxSpeed: number = 40;

    minSpeed: number = 1;

    constructor(params: { container: PIXI.Container }) {
    	super(params);

    	this.guided = true;
    	this.remoteControl = false;
    	this.container = params.container;
    	this.tag("missile");
    	
    }

    init(engine: Engine) {
    	super.init(engine);
    }

    explode() {
    	super.explode();
    	// this.engine.register(
    	// 	new FilterSprite({
    	// 		parent: this.container,
    	// 		position: this.position,
    	// 		// rotation: 0,
    	// 		delay: 0
    	// 	})
    	// );
    	const sprite = new FilterSprite();
    	sprite.position = this.position;
    	this.container.addChild(sprite);
    }

    move() {
    	const old = this.position.clone();
    	this.position.y += Math.sin(this.direction) * this.speed;
    	this.position.x += Math.cos(this.direction) * this.speed;
    	this.trajectory = new Line({ a: old, b: this.position });
    }

    checkActors() {
    	// console.log(this.owner, this.owner instanceof EnemyCharacter);
    	if(this.owner instanceof EnemyCharacter){
    		this.ifHitsPlayerThen(() => {
    			this.explode();
    		});
    	}else{
    		//hit enemy
    		this.ifHitsEnemyThen(enemy => {
    			this.explode();
    			enemy.setAgro(this.owner);
    			enemy.damage(30 + Math.random() * 75);
    			return false;
    		});
    	}
    }

    checkGrid() {
    	const block = this.engine.grid.getBlockAtPoint(this.position);
    	if (block && !block.isVacant()) {
    		this.explode();
    		const r = 15;
    		const rect = new Rect({
    			t: this.position.y - r,
    			r: this.position.x + r,
    			b: this.position.y + r,
    			l: this.position.x - r,
    		});
    		const blocks = this.engine.grid.getBlocksOverlappingRect(rect);
    		blocks.forEach(b => b.damage(10 + Math.random() * 100));
    	}
    }
}
