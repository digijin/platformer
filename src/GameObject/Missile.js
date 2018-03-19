//@flow

import missile from "assets/missile.png";
import Smoke from "GameObject/Smoke";
import Explosion from "GameObject/Explosion";
import ExplosionRadial from "GameObject/ExplosionRadial";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import type Actor from "Actor";

import Line from "Utility/Line";

import config from "config";

import type Engine from "Engine";

import GameObject from "GameObject";
import Projectile from "GameObject/Projectile";

import log from "loglevel";

import * as PIXI from "pixi.js";

export default class Missile extends Projectile {
    trajectory: Line;
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
    	//USING EVERY SO I DONT EXPLODE MULTIPLE TIMES
    	this.checkActors();

    	//smoke trail
    	this.engine.register(
    		new Smoke({
    			container: this.container,
    			position: this.position.clone()
    		})
    	);
    	this.engine.register(
    		new Smoke({
    			container: this.container,
    			position: this.trajectory.percent(0.5)
    		})
    	);

    	//aim at target
    	if (this.guided) {
    		if (this.remoteControl) {
    			// this.target = this.engine.mouse.point;
    			this.target = this.owner.getTargetPoint();
    		}
    		let diff = this.target.subtract(this.position);
    		let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
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
    			this.speed -= this.engine.deltaTime * this.acceleration / 3;
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
    maxSpeed: number = 40;
    minSpeed: number = 1;
    acceleration: number = 20;
    container: PIXI.Container;
    remoteControl: boolean;
    guided: boolean;

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
    	this.engine.register(
    		new ExplosionRadial({
    			parent: this.container,
    			position: this.position,
    			rotation: 0,
    			delay: 0
    		})
    	);
    }

    move() {
    	let old = this.position.clone();
    	this.position.y += Math.sin(this.direction) * this.speed;
    	this.position.x += Math.cos(this.direction) * this.speed;
    	this.trajectory = new Line({ a: old, b: this.position });
    }

    checkActors() {
    	this.engine.objectsTagged("actor").every((o: GameObject) => {
    		if (o !== this.owner) {
    			let a: Actor = ((o: any): Actor); //RECAST
    			if (a.getBoundingRect().contains(this.position)) {
    				this.explode();
    				// a.explode();
    				a.setAgro(this.owner);
    				a.damage(30 + Math.random() * 75);
    				return false;
    			}
    		}
    		return true;
    	});
    }

    checkGrid() {
    	let block = this.engine.grid.getBlockAtPoint(this.position);
    	if (block && !block.isEmpty()) {
    		this.explode();
    		let r = 15;
    		let rect = new Rect({
    			t: this.position.y - r,
    			r: this.position.x + r,
    			b: this.position.y + r,
    			l: this.position.x - r
    		});
    		let blocks = this.engine.grid.getBlocksOverlappingRect(rect);
    		blocks.forEach(b => b.damage(10 + Math.random() * 100));
    	}
    }
}
