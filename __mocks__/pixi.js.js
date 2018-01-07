// const pixi = jest.genMockFromModule("pixi.js");

class Klass {
	constructor() {
		this.position = { x: 0, y: 0 };
		this.tilePosition = { x: 0, y: 0 };
	}
	addChild() {}
}
let prox = new Proxy(
	{},
	{
		get(target, name) {
			// return () => {};
			return Klass;
		}
	}
);

const pixi = {
	skipHello: () => {},
	autoDetectRenderer: () => {},
	BaseTexture: Klass,
	Texture: Klass,
	Container: Klass,
	BaseTexture: Klass,
	extras: {
		TilingSprite: Klass
	}
};

module.exports = pixi;
