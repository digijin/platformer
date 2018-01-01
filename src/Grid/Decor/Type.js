//@flow
import dirtTile from "Grid/dirt_tile.png";
import brickTile from "Grid/brick_tile.png";
import metalTile from "Grid/metal_tile.png";
import woodTile from "Grid/wood_tile.png";

import windowDecor from "Grid/window.png";

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
	pattern: CanvasPattern;
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

		this.image.onload = () => {
			let context = document.createElement("canvas").getContext("2d");
			if (context) {
				this.pattern = context.createPattern(this.image, "no-repeat");
				// console.log("made pattern", context, this.pattern);
			}
		};
	}
}

let blockTypeConfig: Array<DecorTypeParams> = [
	{
		name: "door",
		id: "1",
		width: 1,
		height: 3,
		image: require("./door1x3.png"),
		destructable: true,
		obstacle: true,
		hp: 10
	},
	{
		name: "window",
		id: "2",
		width: 2,
		height: 3,
		image: windowDecor,
		destructable: false,
		obstacle: false,
		hp: 1
	},
	{
		name: "cabinet",
		id: "3",
		width: 1,
		height: 3,
		image: require("./cabinet1x3.png"),
		destructable: false,
		obstacle: false,
		hp: 1
	},
	{
		name: "copier",
		id: "4",
		width: 3,
		height: 3,
		image: require("./copier3x3.png"),
		destructable: false,
		obstacle: false,
		hp: 1
	},
	{
		name: "desk",
		id: "5",
		width: 3,
		height: 3,
		image: require("./desk4x3.png"),
		destructable: false,
		obstacle: false,
		hp: 1
	},
	{
		name: "plant",
		id: "6",
		width: 1,
		height: 3,
		image: require("./plant1x3.png"),
		destructable: false,
		obstacle: false,
		hp: 1
	},
	{
		name: "waterfountain",
		id: "7",
		width: 1,
		height: 4,
		image: require("./waterfountain1x4.png"),
		destructable: false,
		obstacle: false,
		hp: 1
	},
	{
		name: "light",
		id: "8",
		width: 3,
		height: 2,
		image: require("./light3x2.png"),
		destructable: false,
		obstacle: false,
		hp: 1,
		mode: "soft-light"
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
