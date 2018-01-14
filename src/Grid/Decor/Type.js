//@flow
// import dirtTile from "Grid/dirt_tile.png";
// import brickTile from "Grid/brick_tile.png";
// import metalTile from "Grid/metal_tile.png";
// import woodTile from "Grid/wood_tile.png";

// import windowDecor from "Grid/window.png";

import * as PIXI from "pixi.js";
PIXI.utils.skipHello();

require("./decorsprites.json");
require("./decorsprites.png");

PIXI.loader.add("decor", "/assets/decorsprites.json");

export type DecorTypeParams = {
	// hp: name,
	name: string,
	id: string,
	image: any,
	destructable: boolean,
	height: number,
	width: number,
	hp: number
};

export default class DecorType {
	name: string;
	id: string;
	destructable: boolean;
	image: any;
	height: number;
	width: number;
	hp: number;
	textureId: string;
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
}

let blockTypeConfig: Array<DecorTypeParams> = [
	{
		name: "door",
		id: "1",
		width: 1,
		height: 3,
		image: require("./door1x3.png"),
		textureId: "door1x3.png",
		destructable: true,
		obstacle: true,
		category: "general",
		hp: 10
	},
	{
		name: "window",
		id: "2",
		width: 2,
		height: 3,
		image: require("./window.png"),
		textureId: "window.png",
		destructable: false,
		obstacle: false,
		category: "general",
		hp: 1
	},
	{
		name: "cabinet",
		id: "3",
		width: 1,
		height: 3,
		image: require("./cabinet1x3.png"),
		textureId: "cabinet1x3.png",
		destructable: false,
		obstacle: false,
		category: "office",
		hp: 1
	},
	{
		name: "copier",
		id: "4",
		width: 3,
		height: 3,
		image: require("./copier3x3.png"),
		textureId: "copier3x3.png",
		destructable: false,
		obstacle: false,
		category: "office",
		hp: 1
	},
	{
		name: "desk",
		id: "5",
		width: 3,
		height: 3,
		image: require("./desk4x3.png"),
		textureId: "desk4x3.png",
		destructable: false,
		obstacle: false,
		category: "office",
		hp: 1
	},
	{
		name: "plant",
		id: "6",
		width: 1,
		height: 3,
		image: require("./plant1x3.png"),
		textureId: "plant1x3.png",
		destructable: false,
		obstacle: false,
		category: "office",
		hp: 1
	},
	{
		name: "waterfountain",
		id: "7",
		width: 1,
		height: 4,
		image: require("./waterfountain1x4.png"),
		textureId: "waterfountain1x4.png",
		destructable: false,
		obstacle: false,
		category: "office",
		hp: 1
	},
	{
		name: "light",
		id: "8",
		width: 3,
		height: 2,
		image: require("./light3x2.png"),
		textureId: "light3x2.png",
		destructable: false,
		obstacle: false,
		category: "light",
		hp: 1,
		mode: PIXI.BLEND_MODES.ADD
	},
	{
		name: "fuelsign",
		id: "9",
		width: 4,
		height: 2,
		image: require("./fuelsign2x4.png"),
		textureId: "fuelsign2x4.png",
		destructable: false,
		obstacle: false,
		category: "servo",
		hp: 1
	},
	{
		name: "petrolbowser",
		id: "10",
		width: 2,
		height: 4,
		image: require("./petrolbowser2x4.png"),
		textureId: "petrolbowser2x4.png",
		destructable: false,
		obstacle: false,
		category: "servo",
		hp: 1
	},
	{
		name: "poster1",
		id: "11",
		width: 2,
		height: 3,
		image: require("./poster/poster1.png"),
		textureId: "poster/poster1.png",
		destructable: false,
		obstacle: false,
		category: "poster",
		hp: 1
	},
	{
		name: "poster2",
		id: "12",
		width: 2,
		height: 3,
		image: require("./poster/poster2.png"),
		textureId: "poster/poster2.png",
		destructable: false,
		obstacle: false,
		category: "poster",
		hp: 1
	},
	{
		name: "poster3",
		id: "13",
		width: 2,
		height: 3,
		image: require("./poster/poster3.png"),
		textureId: "poster/poster3.png",
		destructable: false,
		obstacle: false,
		category: "poster",
		hp: 1
	},
	{
		name: "poster4",
		id: "14",
		width: 2,
		height: 3,
		image: require("./poster/poster4.png"),
		textureId: "poster/poster4.png",
		destructable: false,
		obstacle: false,
		category: "poster",
		hp: 1
	},
	{
		name: "poster5",
		id: "15",
		width: 2,
		height: 3,
		image: require("./poster/poster5.png"),
		textureId: "poster/poster5.png",
		destructable: false,
		obstacle: false,
		category: "poster",
		hp: 1
	},
	{
		name: "dumpster",
		id: "16",
		width: 5,
		height: 3,
		image: require("./dumpster.png"),
		textureId: "dumpster.png",
		destructable: false,
		obstacle: false,
		category: "general",
		hp: 1
	}
];

export const DecorTypes: Array<DecorType> = blockTypeConfig.map(
	c => new DecorType(c)
);

export const DecorTypeMap: Object = DecorTypes.reduce(
	(output: Object, type: DecorType) => {
		if (output[type.id]) {
			throw new Error("duplicate id for block type");
		}
		output[type.id] = type;
		return output;
	},
	{}
);
