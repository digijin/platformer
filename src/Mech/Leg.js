//@flow

import GameObject from "GameObject";

import type Player from "Actor/Player";
import Point from "Utility/Point";

import cockpit from "Player/cockpit.png";
import foot from "Player/foot.png";
import upperleg from "Player/upperleg.png";
import lowerleg from "Player/lowerleg.png";
import gun from "Player/gun.png";
import config from "config";

import * as PIXI from "pixi.js";

const branchLength = 30;
const numBranches = 2;

type Facing = 1 | -1;
export const FACING_RIGHT: Facing = 1;
export const FACING_LEFT: Facing = -1;

export default class Leg extends GameObject {
	parent: Player;
	offset: Point;
	position: Point;
	stride: number;
	torsoOffset: Point;
	frontFootPos: Point;
	rearFootPos: Point;
	facing: Facing;
	constructor(params: { parent: Player }) {
		super();
		this.parent = params.parent;
		this.offset = new Point({ x: 0, y: -50 });
		this.stride = 0;
		this.torsoOffset = new Point();
		this.frontFootPos = new Point();
		this.rearFootPos = new Point();
	}
	init(engine) {
		super.init(engine);

		let cockpitTex = new PIXI.Texture(new PIXI.BaseTexture(cockpit));
		let footTex = new PIXI.Texture(new PIXI.BaseTexture(foot));
		let upperlegTex = new PIXI.Texture(new PIXI.BaseTexture(upperleg));
		let lowerlegTex = new PIXI.Texture(new PIXI.BaseTexture(lowerleg));
		let gunTex = new PIXI.Texture(new PIXI.BaseTexture(gun));

		this.cockpit = new PIXI.Sprite(cockpitTex);
		this.cockpit.anchor = { x: 0.5, y: 0.5 };
		this.foot = new PIXI.Sprite(footTex);
		this.upperleg = new PIXI.Sprite(upperlegTex);
		this.lowerleg = new PIXI.Sprite(lowerlegTex);
		this.gun = new PIXI.Sprite(gunTex);
		this.rearfoot = new PIXI.Sprite(footTex);
		this.rearupperleg = new PIXI.Sprite(upperlegTex);
		this.rearlowerleg = new PIXI.Sprite(lowerlegTex);
		[
			this.cockpit,
			this.foot,
			this.upperleg,
			this.lowerleg,
			this.gun,
			this.rearfoot,
			this.rearupperleg,
			this.rearlowerleg
		].forEach(spr => {
			this.engine.stage.addChild(spr);
		});
	}
	exit() {
		[
			this.cockpit,
			this.foot,
			this.upperleg,
			this.lowerleg,
			this.gun,
			this.rearfoot,
			this.rearupperleg,
			this.rearlowerleg
		].forEach(spr => {
			this.engine.stage.removeChild(spr);
		});
	}
	update() {
		let offsetTarget;
		if (this.engine.input.getAxis("vertical") == 1) {
			offsetTarget = new Point({ x: 0, y: -30 });
		} else {
			offsetTarget = new Point({ x: 0, y: -50 });
		}
		this.offset = this.offset.easeTo(offsetTarget, 5);
		let torsoOffsetTarget = new Point();
		//default standing targets
		let frontFootPosTarget = new Point({ x: 10, y: 0 }).add(
			this.parent.position
		);
		let rearFootPosTarget = new Point({ x: -10, y: 0 }).add(
			this.parent.position
		);
		//override defaults if moving
		if (this.parent.v !== 0) {
			//if not on ground
			torsoOffsetTarget.y = -10;
		} else {
			//on ground
			if (this.parent.h !== 0) {
				//if moving
				this.stride += this.engine.deltaTime * 10 * this.parent.h;

				frontFootPosTarget = new Point({
					x: Math.cos(this.stride) * 30,
					y: Math.sin(this.stride) * 20
				}).add(this.parent.position);
				rearFootPosTarget = new Point({
					x: Math.cos(this.stride + Math.PI) * 30,
					y: Math.sin(this.stride + Math.PI) * 20
				}).add(this.parent.position);
				torsoOffsetTarget.y += Math.sin(this.stride * 2) * 10;
			}
		}
		//ease it all in
		this.torsoOffset = this.torsoOffset.easeTo(torsoOffsetTarget, 5);
		this.frontFootPos = this.frontFootPos.easeTo(frontFootPosTarget, 5);
		this.rearFootPos = this.rearFootPos.easeTo(rearFootPosTarget, 5);
		this.position = this.parent.position
			.add(this.offset)
			.add(this.torsoOffset);
		let facing =
			this.engine.input.mouse.position.x > this.engine.canvas.width / 2
				? FACING_RIGHT
				: FACING_LEFT;
		this.facing = facing;
		//and render it
		this.ik(this.frontFootPos, facing);
		this.head(this.position, facing);
		this.ik(this.rearFootPos, facing);

		this.gunPosition(this.position.add({ x: facing * 20, y: 20 }), facing);
	}
	gunBarrelPos: Point;
	gunPosition(pos: Point, facing: Facing = FACING_LEFT) {
		let dir = this.engine.mouse.point.subtract(pos).direction();
		// if (facing < 0) {
		// 	dir += Math.PI;
		// }
		this.gun.position = pos.subtract(this.engine.view.offset);
		this.gun.rotation = dir;
		this.gun.scale.y = facing;
		this.gun.anchor = { x: 0.25, y: 0.5 };

		this.gunBarrelPos = pos.move(dir, 20);
	}
	missileBarrelPos: Point;
	head(pos: Point, facing: Facing = FACING_LEFT) {
		this.missileBarrelPos = this.position.subtract({
			x: 16 * facing,
			y: 16
		});

		this.cockpit.position = pos.subtract(this.engine.view.offset);
		this.cockpit.scale.x = facing;
	}
	ik(target: Point, facing: Facing = FACING_LEFT) {
		let floor = this.parent.position.y;
		// this.engine.ctx.drawLine(this.position, target, "#ffff00");
		let dist = this.position.distanceTo(target);

		if (dist > branchLength * numBranches) {
			dist = branchLength * numBranches;
		}
		let dir = target.subtract(this.position).direction();
		let endpoint = this.position.move(dir, dist);
		// this.engine.ctx.drawLine(this.position, endpoint, "#ff0000", 2);

		if (endpoint.y > floor) {
			let ratio =
				(floor - this.position.y) / (endpoint.y - this.position.y);
			dist *= ratio;
			endpoint = this.position.move(dir, dist);
		}
		let midpoint = this.position.move(dir, dist / 2);
		let b = Math.sqrt(Math.pow(branchLength, 2) - Math.pow(dist / 2, 2));

		dir += Math.PI / 2;
		let joint = midpoint.move(dir, b * facing);

		// this.engine.ctx.drawLine(this.position, joint, "#555555", 5);
		// this.engine.ctx.drawLine(joint, endpoint, "#555555", 5);

		// upperleg 20x40
		let upperlegdirection =
			joint.subtract(this.position).direction() - Math.PI / 2;
		this.engine.ctx.drawSprite(
			upperleg,
			this.position,
			{ w: 20, h: 40 },
			upperlegdirection,
			{
				x: 0.5,
				y: 0.25
			},
			{ x: facing, y: 1 }
		);
		let lowerlegdirection =
			endpoint.subtract(joint).direction() - Math.PI / 2;
		this.engine.ctx.drawSprite(
			lowerleg,
			joint,
			{ w: 16, h: 33 },
			lowerlegdirection,
			{
				x: 0.5,
				y: 0.25
			},
			{ x: facing, y: 1 }
		);

		this.engine.ctx.drawSprite(foot, endpoint, { w: 25, h: 10 }, 0, {
			x: 0.5,
			y: 1
		});
	}
}
