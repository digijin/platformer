// @flow
import GameObject from "GameObject";
import Point from "Point";

import config from "config";

import Rect from "Rect";
import Engine from "Engine";
import Explosion from "Explosion";
let engine: Engine;

export default class Actor extends GameObject {
	position: Point;
	h: number;
	v: number;
	size: { w: number, h: number };
	registration: { x: number, y: number };
	z: number;
	constructor() {
		super();
		this.v = 0;
		this.h = 0;

		this.tag("actor");
		engine = Engine.getInstance();
	}

	explode = () => {
		this.destroy();
		//fill rect with explosions
		let rect: Rect = this.getBoundingRect();
		let center: Point = rect.centerPoint();
		//find random points
		for (let i = 0; i < 20; i++) {
			let point: Point = new Point({
				x: rect.l + rect.width() * Math.random(),
				y: rect.t + rect.height() * Math.random()
			});
			//direction from center
			let diff = point.subtract(center);
			let dir = Math.atan2(diff.y, diff.x);

			this.engine.register(
				new Explosion({
					position: point,
					rotation: dir,
					delay: Math.random() / 8
				})
			);
		}
	};

	gravity = () => {
		this.v += engine.deltaTime * config.gravity; //GRAVITY
		if (!this.canMoveVert(this.v)) {
			this.v = 0;
		}
		this.position.y += this.v;
	};
	getBoundingRect = (): Rect => {
		return Rect.fromPosSizeRego(
			this.position,
			this.size,
			this.registration
		);
	};
	canMoveHori = (amount: number): boolean => {
		let boundingRect = this.getBoundingRect();
		let targetRect = boundingRect.move({ x: amount, y: 0 });
		let blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
		let obstacles = blocks.filter(block => {
			return !block.isEmpty();
		});
		return obstacles.length == 0;
	};
	canMoveVert = (amount: number): boolean => {
		let boundingRect = this.getBoundingRect();
		let targetRect = boundingRect.move({ x: 0, y: amount });
		let blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
		let obstacles = blocks.filter(block => {
			return !block.isEmpty();
		});
		return obstacles.length == 0;
	};
}
