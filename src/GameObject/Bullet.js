//@flow

import type Engine from "Engine";
import type Point from "Utility/Point";
import type Actor from "Actor";
// import type Block from "Grid/Block";
import Line from "Utility/Line";
import GameObject from "GameObject";
// import Explosion from "GameObject/Explosion";
import { GlowFilter } from "@pixi/filter-glow";
import Projectile from "GameObject/Projectile";
import Shell from "GameObject/Shell";

import * as PIXI from "pixi.js";

import log from "loglevel";

const COLOR = 0xffff00;
const GLOWDIST = 10;
const GLOWSTRENGTH = 2;
const GLOWQUALITY = 0.5;

export default class Bullet extends Projectile {
    // x: number; position
    // y: number; position
    position: Point;
    h: number; //momentum
    v: number; //momentum
    time: number;
    owner: Actor;
    speed: number;
    trajectory: Line;
    container: PIXI.Container;
    style: string;
    color: number;
    lineWidth: number;
    dir: number;
    constructor(params: {
        position: Point,
        h: number,
        v: number,
        time: number,
        direction: number,
        target: Point,
        owner: Actor
    }) {
    	super(params);
    	this.tag("bullet");
    	this.speed = 200;
    	Object.assign(this, params);
    	this.time = 1;
    	this.color = COLOR;
    	this.lineWidth = 3;
    	this.h = Math.cos(this.dir);
    	this.v = Math.sin(this.dir);
    }

    graph: PIXI.Graphics;
    init(engine: Engine) {
    	super.init(engine);

    	if (!this.container) {
    		this.container = this.engine.stage;
    	}
    	this.graph = new PIXI.Graphics();
    	this.graph.filters = [
    		new GlowFilter(GLOWDIST, GLOWSTRENGTH, 0, this.color, GLOWQUALITY)
    	];
    	this.container.addChild(this.graph);
    }
    destroy() {
    	super.destroy();
    	this.exit();
    }
    exit() {
    	this.container.removeChild(this.graph);
    }
    damage: number = 2;

    explode() {
    	this.destroy();
    	// super.explode();

    	for (let i = 0; i < 1; i++) {
    		//we want red outlines to be on the outside
    		//pick a direction
    		let dir = Math.random() * Math.PI * 2;
    		let dist = Math.random() * 2;
    		let offset = {
    			x: Math.cos(dir) * dist,
    			y: Math.sin(dir) * dist
    		};
    		// this.engine.register(
    		//     new Explosion({
    		//         position: this.position.add(offset),
    		//         rotation: dir,
    		//         delay: Math.random() / 8,
    		//         size: 10
    		//     })
    		// );
    		this.engine.register(
    			new Shell({
    				container: this.container,
    				position: this.position.add(offset),
    				color: "red",
    				h: (Math.random() - 0.5) * 5,
    				v: (Math.random() - 0.5) * 5,
    				time: 0.5
    			})
    		);
    	}
    }
    update = () => {
    	this.time -= this.engine.deltaTime;

    	// let old: Point = this.position.clone();
    	this.move(); //sets trajectory

    	//CHECK TIME
    	if (this.time < 0) {
    		this.destroy();
    	}
    	//check decor
    	this.checkDecor((decor, hitTest) => {
    		this.position.x = hitTest.collision.x;
    		this.position.y = hitTest.collision.y;
    		decor.damage(1);
    	});

    	//CHECK GRID
    	this.checkGrid();

    	this.render();

    	//CHECK ENEMIES
    	this.checkEnemies((actor: Actor) => {
    		// setTimeout(() => {
    		this.explode();
    		// }, 0);
    		actor.setAgro(this.owner);
    		actor.damage(this.damage);
    	});
    };
    checkEnemies(func: (actor: Actor) => {}) {
    	this.engine.objectsTagged("actor").forEach((o: GameObject) => {
    		if (o !== this.owner) {
    			let a: Actor = ((o: any): Actor); //RECAST
    			if (this.cheapCheck(a) || this.expensiveCheck(a)) {
    				// a.damage(2);
    				func(a);
    			} else {
    				//ELSE USE EVEN MORE EXPENSIVE CHECK
    			}
    		}
    	});
    }
    cheapCheck(actor: Actor) {
    	return actor.getBoundingRect().contains(this.position);
    }
    expensiveCheck(actor: Actor) {
    	return this.trajectory.intersectsRect(actor.getBoundingRect()).result;
    }
    render() {
    	this.graph.clear();
    	this.graph.position.set(this.trajectory.a.x, this.trajectory.a.y);
    	this.graph
    		.lineStyle(this.lineWidth, this.color)
    		.moveTo(0, 0)
    		.lineTo(
    			this.position.x - this.trajectory.a.x,
    			this.position.y - this.trajectory.a.y
    		);
    }
}
