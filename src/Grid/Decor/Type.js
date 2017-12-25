//@flow
import dirtTile from "Grid/dirt_tile.png";
import brickTile from "Grid/brick_tile.png";
import metalTile from "Grid/metal_tile.png";
import woodTile from "Grid/wood_tile.png";

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
	constructor(params: DecorTypeParams) {
		this.name = params.name;
		this.id = params.id;
		this.destructable = params.destructable;
		this.hp = params.hp;
		this.image = params.image;
		this.height = params.height;
		this.width = params.width;

		let context = document.createElement("canvas").getContext("2d");
		if (context) {
			this.pattern = context.createPattern(this.image, "repeat");
		}
	}
}

let blockTypeConfig: Array<DecorTypeParams> = [
	{
		name: "door",
		id: "1",
		width: 1,
		height: 3,
		image: woodTile,
		destructable: true,
		hp: 10
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
