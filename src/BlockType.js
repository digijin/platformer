//@flow
import dirtTile from "Grid/dirt_tile.png";
import brickTile from "Grid/brick_tile.png";
import metalTile from "Grid/metal_tile.png";
import woodTile from "Grid/wood_tile.png";

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
	constructor(params: BlockTypeParams) {
		this.name = params.name;
		this.id = params.id;
		this.destructable = params.destructable;
		this.hp = params.hp;
		this.image = params.image;
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
