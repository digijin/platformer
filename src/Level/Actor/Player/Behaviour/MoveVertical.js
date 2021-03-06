// @flow

import Base from "./Base";
import PlayerState, { AllExcept } from "Level/Actor/Player/State";
import config from "config";
import Shell from "GameObject/Shell";
import Point from "Utility/Point";

export default class MoveVertical extends Base {

	states = AllExcept(PlayerState.GRAPPLE);

	update() {
		// TODO: use player.state to determine in airborne and set grounded to airborne
		// console.log(this.player.h, this.player.v);
		// console.log(this.player.state);
		//TODO: check why deltatime is so huge
		let vDelta = this.player.v * this.engine.deltaTime * 60;
		vDelta = Math.min(vDelta, 100);
		const vertObjects = this.player.vertObstacles(vDelta);

		if (vertObjects.length > 0) {
			//LAND ON GROUND

			// console.log(vertObjects.length);

			//Figure out if all the blocks below are of "platform" type
			//because I can drop through platforms
			const allPlatform =
				vertObjects.find(o => {
					return o.isPlatform() === false;
				}) === undefined;

			switch (this.player.state) {
				case PlayerState.GROUNDED:
					if (allPlatform && this.engine.input.getButtonDown("down")) {
						vDelta = 1;
					} else {
						vDelta = 0;
						this.player.v = 0;
					}
					break;
				case PlayerState.AIRBORNE:
					// eslint-disable-next-line indent
					if (allPlatform && this.engine.input.getButton("down")) {
						break;
					}
				// eslint-disable-next-line no-fallthrough
				case PlayerState.SLAM:
					//set y to ground
					if (vDelta > 0) {
						this.player.position.y = vertObjects[0].position.y * config.grid.width;
						this.handleLanding(vDelta);
					}
					vDelta = 0;
					this.player.v = 0;

					break;
			}


		} else {
			//walk off a cliff...
			if (this.player.state === PlayerState.GROUNDED) {
				this.player.changeState(PlayerState.AIRBORNE);
			}
		}
		this.player.position.y += vDelta;
	}

	handleLanding(speed: number) {
		// console.log("land");
		this.player.changeState(PlayerState.GROUNDED);
		for (let i = 0; i < speed * 4; i++) {
			this.engine.register(
				new Shell({
					// container: this.player.container,
					container: this.player.parent,
					position: new Point(this.player.position).subtract({
						x: (Math.random() - 0.5) * 15 * speed,
						// y: config.player.size.h / 2
						y: 0,
					}),
					h: (Math.random() - 0.5) / 10,
					v: (-Math.random() * speed) / 4,
					time: 0.1 + Math.random(),
				}),
			);
		}
	}
}