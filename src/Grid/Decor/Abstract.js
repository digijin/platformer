import * as PIXI from "pixi.js";

export default class DecorType {
	id: string;
	textureId: string;
	destructable: boolean;
	image: any;
	height: number;
	width: number;
	hp: number;
	name: string;
	pattern: CanvasPattern;
	category: string;
	constructor(params: DecorTypeParams) {
		this.name = params.name;
		this.id = params.id;
		this.destructable = params.destructable;
		this.hp = params.hp;
		this.image = params.image;
		this.height = params.height;
		this.width = params.width;
		this.mode = params.mode;
		this.obstacle = params.obstacle;
		this.category = params.category;
		this.textureId = params.textureId;

		this.texture = PIXI.Texture.WHITE;

		this.image.onload = () => {
			let context = document.createElement("canvas").getContext("2d");
			if (context) {
				this.pattern = context.createPattern(this.image, "no-repeat");
				// console.log("made pattern", context, this.pattern);
			}
		};
	}

	init() {
		if (PIXI.loader.resources["decor"].textures) {
			this.texture =
				PIXI.loader.resources["decor"].textures[this.textureId];
		}
	}

	getTexture() {
		return this.texture;
	}

	getSprite() {
		return new PIXI.Sprite(this.getTexture());
	}
}
