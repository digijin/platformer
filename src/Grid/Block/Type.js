//@flow
import dirtTile from "Grid/dirt.jpg";
import brickTile from "Grid/brick_tile.png";
import metalTile from "Grid/metal_tile.png";
import woodTile from "Grid/wood_tile.png";
import grassTile from "Grid/grass.jpg";
import stoneTile from "Grid/stone.jpg";
import tilesTile from "Grid/tiles.jpg";

import brick2 from "Grid/brick2.png";
import brick3 from "Grid/brick3.png";
import moon from "Grid/moon.jpg";
import volcanic from "Grid/volcanic.jpg";

export type BlockTypeParams = {
	// hp: name,
	name: string,
	id: string,
	image: any,
	destructable: boolean,
	hp: number
};

export default class BlockType {
	name: string;
	id: string;
	destructable: boolean;
	image: any;
	hp: number;
	pattern: CanvasPattern;
	constructor(params: BlockTypeParams) {
		this.name = params.name;
		this.id = params.id;
		this.destructable = params.destructable;
		this.hp = params.hp;
		this.image = params.image;

		if (this.image) {
			this.image.onload = () => {
				let context = document.createElement("canvas").getContext("2d");
				if (context) {
					this.pattern = context.createPattern(this.image, "repeat");
					// console.log("made pattern", context, this.pattern);
				}
			};
		}
	}
}

let blockTypeConfig: Array<BlockTypeParams> = [
	{
		name: "empty",
		id: "0",
		image: "",
		destructable: false,
		empty: true,
		hp: 0
	},
	{
		name: "dirt",
		id: "1",
		image: dirtTile,
		destructable: true,
		hp: 100
	},
	{
		name: "brick",
		id: "2",
		image: brickTile,
		destructable: true,
		hp: 400
	},
	{
		name: "metal",
		id: "3",
		image: metalTile,
		destructable: false,
		hp: 0
	},
	{
		name: "wood",
		id: "4",
		image: woodTile,
		destructable: true,
		hp: 10
	},
	{
		name: "grass",
		id: "5",
		image: grassTile,
		destructable: true,
		hp: 100
	},
	{
		name: "stone",
		id: "6",
		image: stoneTile,
		destructable: true,
		hp: 100
	},
	{
		name: "tiles",
		id: "7",
		image: tilesTile,
		destructable: true,
		hp: 100
	},
	{
		name: "brick2",
		id: "8",
		image: brick2,
		destructable: true,
		hp: 100
	},
	{
		name: "brick3",
		id: "9",
		image: brick3,
		destructable: true,
		hp: 100
	},
	{
		name: "moon",
		id: "10",
		image: moon,
		destructable: true,
		hp: 100
	},
	{
		name: "volcanic",
		id: "11",
		image: volcanic,
		destructable: true,
		hp: 100
	},
	{
		name: "pillar",
		id: "12",
		image: require("./pillar.png"),
		destructable: true,
		hp: 100
	},
	{
		name: "servicestation_cover",
		id: "13",
		image: require("./servicestation_cover.png"),
		destructable: true,
		hp: 100
	}
];

export const BlockTypes: Array<BlockType> = blockTypeConfig.map(
	c => new BlockType(c)
);

export const BlockTypeMap: Object = BlockTypes.reduce(
	(output: Object, type: BlockType) => {
		if (output[type.id]) {
			throw new Error("duplicate id for block type");
		}
		output[type.id] = type;
		return output;
	},
	{}
);
