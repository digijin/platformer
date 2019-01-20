import * as PIXI from "pixi.js";
import Point from "Utility/Point";

import config from "config";

import Rect from "Utility/Rect";
// import type Engine from "Engine";
import Explosion from "GameObject/Explosion";
import type Block from "Level/Grid/Block";

import type Actor from "Level/Actor";

export default class Rigidbody extends PIXI.Container {
	size: { w: number, h: number };

	vertObstacles = (amount: number): Array<Block> => {
		const boundingRect = this.getBoundingRect();
		const targetRect = boundingRect.move({ x: 0, y: amount });
		const nowBlocks = this.engine.grid.getBlocksOverlappingRect(boundingRect);
		const nextBlocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
		//dont check in blocks we are already in
		const blocks = nextBlocks.filter(b => nowBlocks.indexOf(b) === -1);
		return blocks.filter(block => {
			//heading downwards onto platform
			if (amount > 0 && block.isPlatform()) {
				return true;
			}

			return !block.isVacant();
		});
	};

	registration: { x: number, y: number };

	//whether actor can step up
	canStep = (amount: number): boolean => {
		const boundingRect = this.getBoundingRect();
		const targetRect = boundingRect.move({ x: amount, y: 0 });
		if (!this.engine) {
			throw new Error("canStep doesnt have an engine");
		}
		const blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
		const obstacles = blocks.filter(block => {
			return !block.isEmpty();
		});
		//if only one block is an obstacle, and it is in lower corner
		let step: ?Block;
		if (obstacles.length == 1) {
			if (amount > 0) {
				//moving right
				if (!blocks[blocks.length - 1].isEmpty()) {
					step = blocks[blocks.length - 1];
				}
			} else {
				const bl = blocks.reduce((a: Block, b: Block) => {
					if (a.position.x < b.position.x) {
						//more left
						return a;
					}
					if (a.position.y > b.position.y) {
						//lower
						return a;
					}
					return b;
				});
				if (!bl.isEmpty()) {
					step = bl;
				}
			}
		}
		if (step) {
			return this.canMoveVert(-config.grid.width);
		}
		return false;
	};

	v: number;

	explode = () => {
		this.destroy();
		//fill rect with explosions
		const rect: Rect = this.getBoundingRect();
		const center: Point = rect.centerPoint();
		//find random points
		for (let i = 0; i < 20; i++) {
			const point: Point = new Point({
				x: rect.l + rect.width() * Math.random(),
				y: rect.t + rect.height() * Math.random(),
			});
			//direction from center
			const diff = point.subtract(center);
			const dir = Math.atan2(diff.y, diff.x);

			this.engine.register(
				new Explosion({
					position: point,
					rotation: dir,
					delay: Math.random() / 8,
				})
			);
		}
	};

	z: number;
	hp: number;
	maxhp: number;
	position: Point;

	canMoveVert = (amount: number): boolean => {
		return this.vertObstacles(amount).length == 0;
	};

	canMoveHori = (amount: number): boolean => {
		const boundingRect = this.getBoundingRect();
		const targetRect = boundingRect.move({ x: amount, y: 0 });
		const blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
		const obstacles = blocks.filter(block => {
			return !block.isVacant();
		});
		return obstacles.length == 0;
	};

	h: number;

	getBoundingRect = (): Rect => {
		return Rect.fromPosSizeRego(
			this.position,
			this.size,
			this.registration
			// { w: this.width, h: this.height },
			// this.anchor
		);
	};

	gravity = () => {
		this.v += this.engine.deltaTime * config.gravity; //GRAVITY
		if (!this.canMoveVert(this.v)) {
			if (this.v < 0) {
				//heading upwards
				this.v = 0.1;
			} else {
				//landed
				this.v = 0;
			}
		}
		this.position.y += this.v;
	};

	constructor(params: {}) {
		super();
		this.position = new Point();
		this.size = { w: 10, h: 10 };
		this.registration = { x: 0.5, y: 0.5 };

		this.v = 0;
		this.h = 0;
		this.hp = 1;
		this.maxhp = 1;
		Object.assign(this, params);

		// this.tag("actor");
	}

	setAgro(actor: Actor) {
		this.agro = actor;
	}

	damage(amount: number) {
		this.hp -= amount;
		if (this.hp <= 0) {
			this.explode();
		}
	}
}
