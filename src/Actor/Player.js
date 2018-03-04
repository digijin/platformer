// @flow

import Point from "Utility/Point";
import Missile from "GameObject/Missile";
import Bullet from "GameObject/Bullet";
import Shell from "GameObject/Shell";
import mech from "assets/mech.png";

import Actor from "Actor";

import config from "config";
let hSpeed = config.player.speed;

import Rect from "Utility/Rect";
import type Engine from "Engine";

import { PrimaryMap } from "../Components/Primary";
import { SecondaryMap } from "../Components/Secondary";
import { EngineMap } from "../Components/Engine";

import type ComponentEngine from "../Components/Engine";

import * as PIXI from "pixi.js";

let firing = false;
let missile = {
    firing: false,
    maxEnergy: 800,
    reloadTime: 0.05,
    reload: 0,
    regenSpeed: 10,
    regenBaseSpeed: 150,
    regenSpeedIncrease: 150, //per second
    energy: 700,
    cost: 10
};

const HAND_STATE = {
    ARMED: 0,
    FIRED: 1,
    GRIPPED: 2,
    RELEASED: 3
};
let hand = {
    speed: 1000,
    reelSpeed: 400,
    offset: new Point({
        x: -config.player.size.w / 2,
        y: -config.player.size.h / 2
    }),
    position: new Point({ x: 0, y: 0 }),
    direction: 0,
    // firing: false,
    state: HAND_STATE.ARMED
};

import Leg from "Mech/Leg";
export default class Player extends Actor {
    leg: Leg;
    container: PIXI.Container;
    constructor(params: { position: Point, container: PIXI.Container }) {
        super(params);
        this.tag("player");
        this.z = 10;
        Object.assign(this, params);
        this.size = config.player.size;
        this.h = 0;
        this.v = 0;
        this.registration = {
            x: 0.5,
            y: 1
        };

        this.leg = new Leg({ parent: this, container: this.container });
    }
    damage() {
        //overrides parent, does nothing... invincible!
    }

    graph: PIXI.Graphics;
    init(engine: Engine) {
        super.init(engine);
        engine.register(this.leg);
        this.graph = new PIXI.Graphics();
        this.container.addChild(this.graph);
    }
    exit() {
        this.container.removeChild(this.graph);
    }
    update() {
        //adjust camera
        this.focusCameraOnSelf();

        //GAMEPAD HACK
        let gp = this.getGamePad();

        //constantly regen
        this.regenEnergy();

        /////////////////MISSILE MECHANICS
        this.updateMissile();

        ////////////////////BULLET FIRING
        this.updateGuns();

        ////////////////////////////HAND MECHANICS
        this.updateGrapple();

        ///////////////////////MOVEMENT
        this.updateMovement(gp);
        //LANDING

        // UI MISSILE
        this.render();
    }

    energy: number = 0;
    regenEnergy() {
        let engine: ComponentEngine =
            EngineMap[this.engine.currentPlayer.engine];

        this.energy += this.engine.deltaTime * engine.regenSpeed;
        this.energy = Math.min(this.energy, engine.maxPower);
    }
    spendEnergy(amount: number): boolean {
        if (this.energy >= amount) {
            this.energy -= amount;
            return true;
        }
        return false;
    }
    getEnergyPercent(): number {
        let engine: ComponentEngine =
            EngineMap[this.engine.currentPlayer.engine];
        return this.energy / engine.maxPower;
    }

    render() {
        //HAND
        // ctx.fillStyle = '#aaaaaa'
        // let pos = hand.offset.add(this.position);

        this.graph.clear();
        this.graph.position.set(hand.position.x, hand.position.y);
        this.graph
            .lineStyle(5, 0xff0000)
            .moveTo(0, 0)
            .lineTo(
                this.position.add(hand.offset).x - hand.position.x,
                this.position.add(hand.offset).y - hand.position.y
            );
    }
    // viewTargetOffset: Point = new Point();
    focusCameraOnSelf() {
        let viewTarget = this.position.subtract({
            x: config.game.width / 2,
            y: config.game.height / 2
        });
        // .subtract(this.viewTargetOffset);
        this.engine.view.offset = this.engine.view.offset.easeTo(viewTarget, 5);
    }

    updateMovement(gp: any) {
        let boundingRect = this.getBoundingRect();
        this.h = this.engine.input.getAxis("horizontal");
        if (gp && this.engine.input.getLastActivityDevice() == "gamepad") {
            this.h = gp.axes[0];
        }
        if (this.engine.input.getButton("stand")) {
            this.h = 0;
        }
        //check walls
        let hDelta = this.h * this.engine.deltaTime * config.player.speed;
        //VERTICAL MOVEMENT
        if (this.engine.input.getButton("jump")) {
            if (this.v == 0) {
                this.v = -config.player.jump.power; //jump
            }
            this.v -= this.engine.deltaTime * 4; //BOOSTERS
            this.engine.register(
                new Shell({
                    container: this.container,
                    position: this.position.subtract({
                        x: 0,
                        y: config.player.size.h / 2
                    }),
                    color: "red",
                    h: Math.random() - 0.5,
                    v: 5 + Math.random() * 2,
                    time: 0.2
                })
            );
        } else {
            this.v += this.engine.deltaTime * config.gravity; //GRAVITY
        }
        if (hand.state == HAND_STATE.GRIPPED) {
            //REEL IN
            let diff = this.position.add(hand.offset).subtract(hand.position);
            let dir = Math.atan2(diff.y, diff.x);
            this.h = -Math.cos(dir); //* deltaTime*hSpeed
            this.v = -Math.sin(dir) * this.engine.deltaTime * hand.reelSpeed;
            hDelta = this.h * this.engine.deltaTime * hand.reelSpeed;
        }
        if (!this.canMoveHori(hDelta)) {
            if (this.canStep(hDelta)) {
                //step up and keep going
                this.position.y -= config.grid.width;
            } else {
                this.h = 0;
                hDelta = 0;
            }
        }
        this.position.x += hDelta;
        if (!this.canMoveVert(this.v)) {
            this.v = 0;
            //TODO: if going down land on ground precisely
        }
        this.position.y += this.v;
    }

    updateGrapple() {
        if (hand.state == HAND_STATE.ARMED) {
            hand.position = this.position.add(hand.offset);
        }
        if (this.engine.input.getKey(69)) {
            //FIRE HAND
            if (hand.state == HAND_STATE.ARMED) {
                hand.state = HAND_STATE.FIRED;
                let diff = this.getTargetPoint().subtract(hand.position);
                let dir = Math.atan2(diff.y, diff.x);
                hand.direction = dir;
            }
        } else {
            if (hand.state == HAND_STATE.GRIPPED) {
                hand.state = HAND_STATE.RELEASED;
            }
        }
        if (hand.state == HAND_STATE.FIRED) {
            hand.position.x +=
                Math.cos(hand.direction) * this.engine.deltaTime * hand.speed;
            hand.position.y +=
                Math.sin(hand.direction) * this.engine.deltaTime * hand.speed;
            if (this.engine.grid.isPositionBlocked(hand.position)) {
                // if(grid.blockAtPosition(hand.position).block !== "0"){
                hand.state = HAND_STATE.GRIPPED;
            }
        }
        if (hand.state == HAND_STATE.RELEASED) {
            let target = this.position.add(hand.offset);
            let diff = target.subtract(hand.position);
            let dist = hand.position.distanceTo(target);
            let speed = this.engine.deltaTime * hand.speed;
            if (speed > dist) {
                hand.position = target;
                hand.state = HAND_STATE.ARMED;
            } else {
                let dir = Math.atan2(diff.y, diff.x);
                hand.position.x += Math.cos(dir) * speed;
                hand.position.y += Math.sin(dir) * speed;
            }
        }
    }

    updateGuns() {
        if (this.engine.input.getButton("fire")) {
            let primary = PrimaryMap[this.engine.currentPlayer.primary];
            if (Math.random() < 0.25) {
                this.engine.register(
                    new Shell({
                        container: this.container,
                        position: this.position.add({
                            x: 0,
                            y: -this.size.h / 2
                        }),
                        // x: this.position.x,
                        // y: this.position.y - (this.size.h/2),
                        h: Math.random() - 0.5,
                        v: -Math.random()
                    })
                );
            }
            let gunPoint = this.leg.gunBarrelPos;
            let diff = this.getTargetPoint().subtract(gunPoint);
            let dir = Math.atan2(diff.y, diff.x);

            this.engine.register(
                // new Bullet({
                new primary.projectile({
                    dir: dir,
                    container: this.container,
                    position: gunPoint,
                    owner: this,
                    time: 8,
                    h: Math.cos(dir) * 10,
                    v: Math.sin(dir) * 10
                })
            );
        }
    }

    //this stuff basically to hack in equip panel
    targetOffset: Point = new Point();
    getTargetPoint(): Point {
        return this.engine.mouse.point.subtract(this.targetOffset);
    }

    updateMissile() {
        let secondary = SecondaryMap[this.engine.currentPlayer.secondary];
        if (missile.reload > 0) {
            missile.reload -= this.engine.deltaTime;
        } else {
            if (
                this.engine.input.getButton("special") &&
                missile.energy >= missile.cost
            ) {
                missile.reload = missile.reloadTime;
                missile.energy -= missile.cost;
                missile.regenSpeed = missile.regenBaseSpeed;
                // missile = false;
                this.engine.register(
                    new secondary.projectile({
                        container: this.container,
                        owner: this,
                        direction:
                            -Math.PI / 2 +
                            (Math.random() - 0.5) +
                            this.leg.facing,
                        speed: 10 + Math.random() * 5,
                        position: this.leg.missileBarrelPos,
                        target: this.getTargetPoint().add(
                            new Point({
                                x: (Math.random() - 0.5) * 20,
                                y: (Math.random() - 0.5) * 20
                            })
                        )
                    })
                );
            } else {
                missile.regenSpeed +=
                    missile.regenSpeedIncrease * this.engine.deltaTime;
                missile.energy += missile.regenSpeed * this.engine.deltaTime;
                if (missile.energy > missile.maxEnergy) {
                    missile.energy = missile.maxEnergy;
                }
            }
        }
    }

    getGamePad() {
        let gp = this.engine.input.gamepad.getGamePad();
        if (this.engine.input.getDevice() == "gamepad") {
            this.engine.mouse.point = this.position
                .add({
                    x: 0,
                    y: -this.size.h / 2
                })
                .add({
                    x: gp.axes[0] * 300,
                    y: gp.axes[1] * 300
                });
        }
        return gp;
    }
}
