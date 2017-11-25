//@flow

export type BlockTypeParams = {
	// hp: name,
	name: string,
	id: string,
	destructable: boolean,
	hp?: number
};

export default class BlockType {
	name: string;
	id: string;
	destructable: boolean;
	hp: number | void;
	constructor(params: BlockTypeParams) {
		this.name = params.name;
		this.id = params.id;
		this.destructable = params.destructable;
		this.hp = params.hp;
	}
}

let blockTypeConfig: Array<BlockTypeParams> = [
	{
		name: "dirt",
		id: "1",
		destructable: true,
		hp: 100
	}
];

export const BlockTypes: Array<BlockType> = blockTypeConfig.map(
	c => new BlockType(c)
);

export const BlockTypeMap: Object = BlockTypes.reduce(
	(output: Object, type: BlockType) => {
		output[type.id] = type;
		return output;
	},
	{}
);
