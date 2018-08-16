//@flow
// import dirtTile from "Level/Grid/dirt_tile.png";
// import brickTile from "Level/Grid/brick_tile.png";
// import metalTile from "Level/Grid/metal_tile.png";
// import woodTile from "Level/Grid/wood_tile.png";

// import windowDecor from "Level/Grid/window.png";

import * as PIXI from "pixi.js";
PIXI.utils.skipHello();

// require("./decorsprites.json");
// require("./decorsprites.png");

import WindowDecor from "./Window";

import Abstract from "./Abstract";

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

let DecorType = Abstract;
export default DecorType;

let blockTypeConfig: Array<DecorTypeParams> = [
	{
		name: "door",
		id: "1",
		width: 1,
		height: 3,
		image: require("./images/door1x3.png"),
		textureId: "door1x3.png",
		destructable: true,
		obstacle: true,
		category: "general",
		hp: 5
	},
	{
		name: "window",
		id: "2",
		width: 2,
		height: 3,
		image: require("./images/window.png"),
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
		image: require("./images/cabinet1x3.png"),
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
		image: require("./images/copier3x3.png"),
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
		image: require("./images/desk4x3.png"),
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
		image: require("./images/plant1x3.png"),
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
		image: require("./images/waterfountain1x4.png"),
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
		image: require("./images/light3x2.png"),
		textureId: "light3x2.png",
		destructable: false,
		obstacle: false,
		category: "light",
		hp: 1,
		mode: PIXI.BLEND_MODES.ADD
	},
	{
		name: "toplit",
		id: "18",
		width: 1,
		height: 1,
		image: require("./images/toplit1x1.png"),
		textureId: "toplit1x1.png",
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
		image: require("./images/fuelsign2x4.png"),
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
		image: require("./images/petrolbowser2x4.png"),
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
		image: require("./images/poster/poster1.png"),
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
		image: require("./images/poster/poster2.png"),
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
		image: require("./images/poster/poster3.png"),
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
		image: require("./images/poster/poster4.png"),
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
		image: require("./images/poster/poster5.png"),
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
		image: require("./images/dumpster.png"),
		textureId: "dumpster.png",
		destructable: false,
		obstacle: false,
		category: "general",
		hp: 1
	},
	{
		name: "door",
		id: "17",
		width: 2,
		height: 3,
		image: require("./images/door2_1x3.png"),
		textureId: "door2_1x3.png",
		destructable: false,
		obstacle: false,
		category: "general",
		hp: 1
	},
	{
		name: "door",
		id: "19",
		width: 2,
		height: 3,
		image: require("./images/door2_2x3.png"),
		textureId: "door2_2x3.png",
		destructable: false,
		obstacle: false,
		category: "general",
		hp: 1
	},
	{
		name: "storefront",
		id: "20",
		width: 7,
		height: 4,
		image: require("./images/storefront.png"),
		textureId: "storefront.png",
		destructable: false,
		obstacle: false,
		category: "general",
		hp: 1
	},
	{
		name: "shadow",
		id: "21",
		width: 1,
		height: 1,
		image: require("./images/topshadow.png"),
		textureId: "topshadow.png",
		destructable: false,
		obstacle: false,
		category: "shadow",
		hp: 1
	},
	{
		name: "shadow",
		id: "22",
		width: 1,
		height: 1,
		image: require("./images/cornershadow.png"),
		textureId: "cornershadow.png",
		destructable: false,
		obstacle: false,
		category: "shadow",
		hp: 1
	},
	{
		name: "shadow",
		id: "23",
		width: 1,
		height: 1,
		image: require("./images/sideshadow.png"),
		textureId: "sideshadow.png",
		destructable: false,
		obstacle: false,
		category: "shadow",
		hp: 1
	},
	{
		name: "shadow",
		id: "24",
		width: 1,
		height: 1,
		image: require("./images/storeshopwindow.png"),
		textureId: "storeshopwindow.png",
		destructable: false,
		obstacle: false,
		category: "shadow",
		hp: 1
	},
	{
		name: "streetlight",
		id: "25",
		width: 5,
		height: 5,
		image: require("./images/streetlight.png"),
		textureId: "streetlight.png",
		destructable: false,
		obstacle: false,
		category: "light",
		hp: 1
	},
	{
		name: "neonlight.png",
		id: "neonlight.png",
		width: 3,
		height: 2,
		image: require("./images/neonlight.png"),
		textureId: "neonlight.png",
		destructable: false,
		obstacle: false,
		category: "light",
		hp: 1
	}
];

export const DecorTypes: Array<DecorType> = blockTypeConfig.map(
	c => new DecorType(c)
);
//add custom decor
DecorTypes.push(new WindowDecor());

if (PIXI.loader.resources["decor"]) {
	let renderer = PIXI.autoDetectRenderer(32, 32);
	// export function findStrays() {
	Object.keys(PIXI.loader.resources["decor"].textures).filter(key => {
		// console.log("check", key);
		//if every blocktype doesnt match that key
		if (
			DecorTypes.every(dt => {
				return dt.textureId !== key;
			})
		) {
			let texture = PIXI.loader.resources["decor"].textures[key];
			let sprite = new PIXI.Sprite(texture);
			let container = new PIXI.Container();
			container.addChild(sprite);
			let img = { src: renderer.extract.base64(container) };

			DecorTypes.push(
				new DecorType({
					name: key,
					id: key,
					width: 1,
					height: 1,
					image: img,
					textureId: key,
					destructable: false,
					obstacle: false,
					category: "stray",
					hp: 1
				})
			);
		}
	});
	// }
}

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
