import Base from "./Base";
import * as PIXI from "pixi.js";
import type Engine from "Engine";
import GameObject from "GameObject";
import Physics from "Generator/AABBPhysics";


class PhysicsBox{
	constructor(box:Physics.Box, sprite:PIXI.Sprite){
		this.box = box;
		this.sprite = sprite;
	}
}

class Looper extends GameObject {

	init(engine){
		super.init(engine);
		this.container = new PIXI.Container();
		this.container.position.x = 100;
		this.container.position.y = 100;

		const indicator = new PIXI.Sprite(PIXI.Texture.WHITE);
		indicator.tint = 0x0;
		this.container.addChild(indicator);
		var w = new Physics.Engine();

		engine.stage.addChild(this.container);
		this.boxes = [];
		for(let i = 0; i < 10; i++){
			const obj = new Physics.Box(
				Math.random() * 100,
				Math.random() * 100,
				Math.random() * 100,
				Math.random() * 100,
				1
			);
			const spr = new PIXI.Sprite(PIXI.Texture.WHITE);
			spr.width = obj.size.x;
			spr.height = obj.size.y;

			w.addBox(obj);

			this.container.addChild(spr);
			this.boxes.push(new PhysicsBox(obj, spr));

		}

		
		var ground = new Physics.Box(0, 300, 200, 10);
		ground.restitution = 1;
		var object = new Physics.Box(0, 0, 40, 40, 1);
		var two = new Physics.Box(20, -40, 10, 10, 1);
		two.restitution = 0.1;
		
		w.addBox(ground);
		w.addBox(object);
		w.addBox(two);
		
		//object.applyImpulse(4, 0);

		this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.spriteGround = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.spriteTwo = new PIXI.Sprite(PIXI.Texture.WHITE);

		this.sprite.width = object.size.x;
		this.sprite.height = object.size.y;
		this.spriteGround.width = ground.size.x;
		this.spriteGround.height = ground.size.y;
		this.spriteTwo.width = two.size.x;
		this.spriteTwo.height = two.size.y;

		this.container.addChild(this.sprite);
		this.container.addChild(this.spriteGround);
		this.container.addChild(this.spriteTwo);
		
		this.w = w;
		this.object = object;
		this.ground = ground;
		this.two = two;
	}

	update(){
		//object.applyForce(0.5, 0);
		this.w.tick();

		this.sprite.position = this.object.position;
		// this.sprite.y -= this.object.size.y;
		this.spriteGround.position = this.ground.position;
		// this.spriteGround.y -= this.ground.size.y;
		this.spriteTwo.position = this.two.position;

	}
}

export default class GeneratorManager extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "red";
		this.container = new PIXI.Container();
		this.engine.stage.addChild(this.container);
		engine.register(new Looper(this));
	}

}


