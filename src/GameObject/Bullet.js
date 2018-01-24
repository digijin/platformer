//@flow

import type Engine from "Engine";
import type Point from "Utility/Point";
import type Actor from "Actor";
import type Block from "Grid/Block";
import Line from "Utility/Line";
import GameObject from "GameObject";
import Explosion from "GameObject/Explosion";

import Projectile from "GameObject/Projectile";

import * as PIXI from 'pixi.js'

export default class Bullet extends Projectile {
  // x: number; //position
  // y: number; //position
  position: Point;
  h: number; //momentum
  v: number; //momentum
  time: number;
  owner: Actor;
  speed: number;
  trajectory: Line;
  graph: PIXI.Graphics
  constructor(params: {
    position: Point,
    h: number,
    v: number,
    time: number,
    owner: Actor
  }) {
    super(params);
    this.tag("bullet");
    this.speed = 200;
    Object.assign(this, params);
    this.time = 1;
  }

  init(engine: Engine) {
    super.init(engine);
    this.graph = new PIXI.Graphics()
    this.engine.stage.addChild(this.graph)
  }
  destroy() {
    super.destroy();
    this.engine.stage.removeChild(this.graph)
  }

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
      this.engine.register(
        new Explosion({
          position: this.position.add(offset),
          rotation: dir,
          delay: Math.random() / 8,
          size: 10
        })
      );
    }
  }

  update = () => {
    this.time -= this.engine.deltaTime;

    let old: Point = this.position.clone();
    this.move();

    //CHECK TIME
    if (this.time < 0) {
      this.destroy();
    }
    //check decor
    this.checkDecor();

    //CHECK GRID
    this.checkGrid();

    this.graph.clear();
    this.graph.position.set(old.x - this.engine.view.offset.x, old.y - this.engine.view.offset.y);
    this.graph.lineStyle(5, 0xffffff).moveTo(0, 0).lineTo(this.position.x - old.x, this.position.y - old.y)

    // this.engine.ctx.context.save();
    // this.engine.ctx.context.shadowColor = "red";
    // this.engine.ctx.context.shadowBlur = 30;
    // this.engine.ctx.drawLine(d
    //   old,
    //   this.position,
    //   "yellow"
    //   // this.position.add({ x: this.h, y: this.v })
    // );
    // this.engine.ctx.context.restore();
    //CHECK ENEMIES
    this.engine.objectsTagged("actor").forEach((o: GameObject) => {
      if (o !== this.owner) {
        let a: Actor = ((o: any): Actor); //RECAST
        if (a.getBoundingRect().contains(this.position)) {
          this.explode();
          // this.destroy();
          a.damage(2);
        }
      }
    });
  };
}