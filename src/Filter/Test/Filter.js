import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";
// import texture from "./texture.png";
import texture from "assets/mech.png";

import log from "loglevel";

const uniforms = {};

uniforms.iTime = -1;
uniforms.iMouse = [0, 0];
uniforms.iResolution = [window.innerWidth, window.innerHeight];
uniforms.iChannel0 = new PIXI.Texture(new PIXI.BaseTexture(texture));

export default class MenuBackgroundFilter extends PIXI.Filter {
	constructor() {
		super(null, fragment, uniforms);
		log.debug(this.uniforms);
	}

	get time() {
		return this.uniforms.iTime;
	}

	set time(val: number) {
		// log.debug(this.uniforms.iTime.value, val);
		this.uniforms.iTime = val;
	}

	set mouse(point: { x: number, y: number }) {
		// log.debug(point, this.uniforms.iMouse);
		this.uniforms.iMouse = [point.x, point.y];
	}
}
