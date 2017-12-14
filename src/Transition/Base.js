//@flow

import type Engine from "Engine";
import GameObject from "GameObject";

export default class TransitionBase extends GameObject {
	_onStartNextScene: Function;
	onStartNextScene(fn: Function) {
		this._onStartNextScene = fn;
	}
	startNextScene() {
		this._onStartNextScene();
	}
	_onEndLastScene: Function;
	onEndLastScene(fn: Function) {
		this._onEndLastScene = fn;
	}
	endLastScene() {
		this._onEndLastScene();
	}
	update() {
		this.endLastScene();
		this.startNextScene();
	}
}
