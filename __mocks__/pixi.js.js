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
	utils: {
		skipHello: () => {}
	},
	loader: {
		add: () => {},
		load: () => {},
		resources: {
			blocks: {
				textures: []
			}
		}
	},
	autoDetectRenderer: () => {},
	BaseTexture: Klass,
	Texture: Klass,
	Container: Klass,
	BaseTexture: Klass,
	extras: {
		TilingSprite: Klass
	},
	BLEND_MODES: {}
};

module.exports = pixi;
