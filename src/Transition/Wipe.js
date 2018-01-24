//@flow

import type Engine from "Engine";
import Base from "./Base";

import hero from "MainMenu/mech_hero.png";

const SECS = 0.5;

export default class Wipe extends Base {
  el: HTMLDivElement; in: boolean;
  init(engine: Engine) {
    super.init(engine);
    this.el = document.createElement("div");
    this.el.className = "transition";
    this.el.style.height = "10px";
    this.el.style.background = "grey";
    // engine.container.insertBefore(this.el, engine.container.firstChild);
    engine.container.appendChild(this.el);
    // this.el.appendChild(hero);
    this.time = 0;
    this.in = true;
  }
  time: number;
  update() {
    this.time += this.engine.deltaTime;
    if (this.in) {
      this.el.style.height =
        this.time * this.time / SECS * window.innerHeight + "px";
      if (this.time > SECS) {
        this.in = false;
        this.endLastScene();
        this.startNextScene();
      }
    } else {
      this.el.style.height =
        (2 - this.time / SECS) * window.innerHeight + "px";
      if (this.time > SECS * 2) {
        this.end();
      }
    }
  }
  end() {
    this.engine.container.removeChild(this.el);
    this.destroy();
  }
}