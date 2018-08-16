//@flow

// import type Engine from "Engine";
import GameObject from "GameObject";

export default class TransitionBase extends GameObject {
    _onStartNextScene: Function;
    _onEndLastScene: Function;
    update() {
        this.endLastScene();
        this.startNextScene();
    }

    onStartNextScene(fn: Function) {
        this._onStartNextScene = fn;
    }

    startNextScene() {
        this._onStartNextScene();
    }

    onEndLastScene(fn: Function) {
        this._onEndLastScene = fn;
    }

    endLastScene() {
        this._onEndLastScene();
    }
}
