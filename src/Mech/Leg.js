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

import type Engine from "Engine";

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

    cockpit: PIXI.Sprite;
    upperleg: PIXI.Sprite;
    lowerleg: PIXI.Sprite;
    foot: PIXI.Sprite;
    gun: PIXI.Sprite;
    rearupperleg: PIXI.Sprite;
    rearlowerleg: PIXI.Sprite;
    rearfoot: PIXI.Sprite;
    container: PIXI.Container;
    constructor(params: { parent: Player, container: PIXI.Container }) {
        super();
        this.parent = params.parent;
        this.container = params.container;
        this.offset = new Point({ x: 0, y: -50 });
        this.stride = 0;
        this.torsoOffset = new Point();
        this.frontFootPos = new Point();
        this.rearFootPos = new Point();
    }
    init(engine: Engine) {
        super.init(engine);
        let cockpitTex = new PIXI.Texture(new PIXI.BaseTexture(cockpit));
        let footTex = new PIXI.Texture(new PIXI.BaseTexture(foot));
        let upperlegTex = new PIXI.Texture(new PIXI.BaseTexture(upperleg));
        let lowerlegTex = new PIXI.Texture(new PIXI.BaseTexture(lowerleg));
        let gunTex = new PIXI.Texture(new PIXI.BaseTexture(gun));
        this.cockpit = new PIXI.Sprite(cockpitTex);
        this.cockpit.anchor = {
            x: 0.5,
            y: 0.5
        };
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
            this.container.addChild(spr);
        });
    }
    exit() {
        [
            this.cockpit,
            this.upperleg,
            this.lowerleg,
            this.foot,
            this.gun,
            this.rearupperleg,
            this.rearlowerleg,
            this.rearfoot
        ].forEach(spr => {
            this.container.removeChild(spr);
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
                this.stride +=
                    this.engine.deltaTime *
                    config.player.speed *
                    this.parent.h /
                    30;

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
        this.frontFootPos = this.frontFootPos.easeTo(frontFootPosTarget, 2);
        this.rearFootPos = this.rearFootPos.easeTo(rearFootPosTarget, 2);
        this.position = this.parent.position
            .add(this.offset)
            .add(this.torsoOffset);
        let facing =
            this.engine.input.mouse.position.x > this.engine.renderer.width / 2
                ? FACING_RIGHT
                : FACING_LEFT;
        this.facing = facing;
        //and render it
        this.ik(this.frontFootPos, facing, {
            upper: this.upperleg,
            lower: this.lowerleg,
            foot: this.foot
        });
        this.head(this.position, facing);
        this.ik(this.rearFootPos, facing, {
            upper: this.rearupperleg,
            lower: this.rearlowerleg,
            foot: this.rearfoot
        });

        this.gunPosition(
            this.position.add({
                x: facing * 20,
                y: 20
            }),
            facing
        );
    }
    gunBarrelPos: Point;
    gunPosition(pos: Point, facing: Facing = FACING_LEFT) {
        let dir = this.engine.mouse.point.subtract(pos).direction();
        // if (facing < 0) {
        // 	dir += Math.PI;
        // }
        this.gun.position = pos;
        this.gun.rotation = dir;
        this.gun.scale.y = facing;
        this.gun.anchor = {
            x: 0.25,
            y: 0.5
        };

        this.gunBarrelPos = pos
            .move(dir, 40)
            .move(dir + Math.PI * facing / 2, -3);
    }
    missileBarrelPos: Point;
    head(pos: Point, facing: Facing = FACING_LEFT) {
        this.missileBarrelPos = this.position.subtract({
            x: 16 * facing,
            y: 16
        });

        this.cockpit.position = pos;
        this.cockpit.scale.x = facing;
    }
    ik(
        target: Point,
        facing: Facing = FACING_LEFT,
        sprites: {
            upper: any,
            lower: any,
            foot: any
        }
    ) {
        let floor = this.parent.position.y;

        let dist = this.position.distanceTo(target);

        if (dist > branchLength * numBranches) {
            dist = branchLength * numBranches;
        }
        let dir = target.subtract(this.position).direction();
        let endpoint = this.position.move(dir, dist);

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

        // upperleg 20x40
        let upperlegdirection =
            joint.subtract(this.position).direction() - Math.PI / 2;

        sprites.upper.position = this.position;
        sprites.upper.anchor = {
            x: 0.5,
            y: 0.25
        };
        sprites.upper.scale.x = facing;
        sprites.upper.rotation = upperlegdirection;

        let lowerlegdirection =
            endpoint.subtract(joint).direction() - Math.PI / 2;

        sprites.lower.position = joint;
        sprites.lower.anchor = {
            x: 0.5,
            y: 0.25
        };
        sprites.lower.scale.x = facing;
        sprites.lower.rotation = lowerlegdirection;

        sprites.foot.position = endpoint;
        sprites.foot.anchor = {
            x: 0.5,
            y: 1
        };
    }
}
