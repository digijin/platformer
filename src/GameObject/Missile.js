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

export default class Missile extends Projectile {
	guided: boolean;
	remoteControl: boolean;
	trajectory: Line;
	constructor(params : Object) {
		super(params);
		// this.speed = 1;
		this.guided = true;
		this.tag("missile");
		this.maxhp = this.hp = 1000;
	}
	init(engine : Engine) {
		super.init(engine);
	}
	explode() {
		super.explode();

		this.engine.register(new ExplosionRadial({position: this.position, rotation: 0, delay: 0}));

	}
	move() {
		let old = this.position.clone();
		this.position.y += Math.sin(this.direction) * this.speed;
		this.position.x += Math.cos(this.direction) * this.speed;
		this.trajectory = new Line({a: old, b: this.position});
	}
	update = () => {
		this.move();

		this.remoteControl = false;

		//CHECK GRID
		this.checkGrid();
		//CHECK ENEMIES
		//USING EVERY SO I DONT EXPLODE MULTIPLE TIMES
		this.checkActors();

		//smoke trail
		this.engine.register(new Smoke({position: this.position.clone()}));
		this.engine.register(new Smoke({position: this.trajectory.percent(0.5)}));

		//aim at target
		if (this.guided) {
			if (this.remoteControl) {
				this.target = this.engine.mouse.point;
			}
			let diff = this.target.subtract(this.position);
			let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
			if (dist < config.missile.guidedDist) {
				this.guided = false;
			}
			let newdir = Math.atan2(diff.y, diff.x);

			let dirDiff = this.direction - newdir;
			if (dirDiff > Math.PI) 
				newdir += 2 * Math.PI;
			if (dirDiff < -Math.PI) 
				newdir -= 2 * Math.PI;
			
			//recalculate now we have removed cyclic variance
			dirDiff = newdir - this.direction;

			//TODO REMOVE HARDCODING
			if (Math.abs(dirDiff) < 0.5) {
				this.speed += this.engine.deltaTime * 16;
				this.direction += dirDiff / 3;
			} else {
				this.speed -= this.engine.deltaTime * 5;
				// this.speed = (this.speed + 1) /2;
				if (dirDiff > 0) {
					this.direction += this.engine.deltaTime * Math.PI * 2;
				} else {
					this.direction -= this.engine.deltaTime * Math.PI * 2;
				}
			}
			if (this.speed < 1) 
				this.speed = 1;
			if (this.speed > 12) 
				this.speed = 12;
			
			//dont spin it up too much
			if (this.direction > Math.PI) 
				this.direction -= Math.PI * 2;
			if (this.direction < -Math.PI) 
				this.direction += Math.PI * 2;
			}
		
		this.engine.ctx.drawSprite(missile, this.position, {
			w: 20,
			h: 10
		}, this.direction, {
			x: 0.2,
			y: 0.5
		});
	};

	checkActors() {
		this.engine.objectsTagged("actor").every((o : GameObject) => {
			if (o !== this.owner) {
				let a: Actor = ((o : any) : Actor); //RECAST
				if (a.getBoundingRect().contains(this.position)) {
					this.explode();
					// a.explode();
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
