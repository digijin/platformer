//@flow

import type Engine from "Engine";
import Base from "./Base";

import hero from "MainMenu/mech_hero.png";


import SmokeExplosionUpTransitionAnimation from "GameObject/SmokeExplosionUpTransition";

const SECS = 1;

export default class SmokeExplosionUpTransition extends Base {
  el: HTMLDivElement; in: boolean;
  swapped: boolean
  transition: SmokeExplosionUpTransitionAnimation
  init(engine: Engine) {
    super.init(engine);
    // this.engine.container.appendChild(this.el);
    this.transition = new SmokeExplosionUpTransitionAnimation();
    this.engine.register(this.transition);
    this.time = 0;
    this.swapped = false;
  }
  time: number;
  update() {
    this.time += this.engine.deltaTime;

    if (!this.swapped && this.transition.movie.currentFrame >= 35) {
      this.swapped = true;
      this.endLastScene();
      this.startNextScene();
    }

    if (this.time > SECS * 2) {
      this.end();
    }
  }
  end() {
    // this.engine.container.removeChild(this.el);
    this.destroy();
  }
}