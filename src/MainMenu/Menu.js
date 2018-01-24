// @flow
import GameObject from "GameObject";

import Level from "Scene/Level";

import Point from "Utility/Point";

import mechHero from "./mech_hero.png";

import type Engine from "Engine";
import explosion from "assets/explosion.png";
import skyline from "assets/skyline.png";

// import ExplosionRadial from "GameObject/ExplosionRadial";
import ExplosionUp1 from "GameObject/ExplosionUp1";
import ExplosionUp2 from "GameObject/ExplosionUp2";
import ExplosionUp3 from "GameObject/ExplosionUp3";
import ExplosionUp4 from "GameObject/ExplosionUp4";
import ExplosionUp5 from "GameObject/ExplosionUp5";
import ExplosionUp6 from "GameObject/ExplosionUp6";
import * as PIXI from "pixi.js";

type Particle = {
  time: number,
  position: Point,
  rotation: number
};

export default class MainMenu extends GameObject {
  hero: PIXI.Sprite
  constructor() {
    super();
    // this.particles = [];
    // this.spawnTimer = 0;
    // this.timePassed = 0;

    this.hero = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(mechHero)));
    this.hero.anchor = {
      x: 0.5,
      y: 0.5
    };
  }
  init(engine: Engine) {
    super.init(engine);
    this.engine.stage.addChild(this.hero);
  }
  update() {
    this.hero.position.x = window.innerWidth / 2;
    this.hero.position.y = window.innerHeight / 2;

    this.engine.view.offset.x += 400 * this.engine.deltaTime;
  }
  exit() {
    this.engine.stage.removeChild(this.hero);
  }

}