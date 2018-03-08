//@flow
// import dirt from "Grid/dirt.jpg";
// import brick_tile from "Grid/brick_tile.png";
// import metal_tile from "Grid/metal_tile.png";
// import wood_tile from "Grid/wood_tile.png";
// import grass from "Grid/grass.jpg";
// import stone from "Grid/stone.jpg";
// import tiles from "Grid/tiles.jpg";

// import brick2 from "Grid/brick2.png";
// import brick3 from "Grid/brick3.png";
// import moon from "Grid/moon.jpg";
// import volcanic from "Grid/volcanic.jpg";

import * as PIXI from "pixi.js";
PIXI.utils.skipHello();

// require("./sprites.json");
// require("./sprites.png");

export type BlockTypeParams = {
    // hp: name,
    name: string,
    id: string,
    image: any,
    destructable: boolean,
    hp: number,
    textureId: string
};

export default class BlockType {
    name: string;
    id: string;
    destructable: boolean;
    image: any;
    hp: number;
    textureId: string;
    texture: PIXI.Texture;
    textureId: string;
    pattern: CanvasPattern;
    constructor(params: BlockTypeParams) {
    	this.name = params.name;
    	this.id = params.id;
    	this.destructable = params.destructable;
    	this.hp = params.hp;
    	this.image = params.image;
    	this.textureId = params.textureId;

    	if (this.image) {
    		this.image.onload = () => {
    			let canvas = document.createElement("canvas");
    			canvas.width = this.image.width;
    			canvas.height = this.image.height;

    			// this.texture = new PIXI.Texture(
    			// 	new PIXI.BaseTexture(this.image)
    			// );
    			this.texture = PIXI.Texture.WHITE;
    			// this.textureId = "BlockType" + this.id;
    			// PIXI.Texture.addToCache(this.texture, this.textureId);

    			let context = canvas.getContext("2d");
    			if (context) {
    				context.drawImage(this.image, 0, 0);
    				// this.imageData = context.getImageData(
    				//   0,
    				//   0,
    				//   canvas.width,
    				//   canvas.height
    				// );
    				this.pattern = context.createPattern(this.image, "repeat");
    				// console.log("made pattern", context, this.pattern);
    			}
    		};
    	}
    }
    init() {
    	if (PIXI.loader.resources["blocks"].textures) {
    		this.texture =
                PIXI.loader.resources["blocks"].textures[this.textureId];
    	}
    }
}

let blockTypeConfig: Array<BlockTypeParams> = [
	{
		name: "empty",
		id: "0",
		image: "",
		textureId: "",
		destructable: false,
		empty: true,
		hp: 0
	},
	{
		name: "dirt",
		id: "1",
		image: require("./images/dirt.png"),
		textureId: "dirt.png",
		destructable: true,
		hp: 100
	},
	{
		name: "brick",
		id: "2",
		image: require("./images/brick_tile.png"),
		textureId: "brick_tile.png",
		destructable: true,
		hp: 400
	},
	{
		name: "metal",
		id: "3",
		image: require("./images/metal_tile.png"),
		textureId: "metal_tile.png",
		destructable: false,
		hp: 0
	},
	{
		name: "wood",
		id: "4",
		image: require("./images/wood_tile.png"),
		textureId: "wood_tile.png",
		destructable: true,
		hp: 10
	},
	{
		name: "grass",
		id: "5",
		image: require("./images/grass.png"),
		textureId: "grass.png",
		destructable: true,
		hp: 100
	},
	{
		name: "stone",
		id: "6",
		image: require("./images/stone.png"),
		textureId: "stone.png",
		destructable: true,
		hp: 100
	},
	{
		name: "tiles",
		id: "7",
		image: require("./images/tiles.png"),
		textureId: "tiles.png",
		destructable: true,
		hp: 100
	},
	{
		name: "brick2",
		id: "8",
		image: require("./images/brick2.png"),
		textureId: "brick2.png",
		destructable: false,
		hp: 100
	},
	{
		name: "brick3",
		id: "9",
		image: require("./images/brick3.png"),
		textureId: "brick3.png",
		destructable: true,
		hp: 100
	},
	{
		name: "moon",
		id: "10",
		image: require("./images/moon.png"),
		textureId: "moon.png",
		destructable: true,
		hp: 100
	},
	{
		name: "volcanic",
		id: "11",
		image: require("./images/volcanic.png"),
		textureId: "volcanic.png",
		destructable: true,
		hp: 100
	},
	{
		name: "pillar",
		id: "12",
		image: require("./images/pillar.png"),
		textureId: "pillar.png",
		destructable: true,
		hp: 100
	},
	{
		name: "servicestation_cover",
		id: "13",
		image: require("./images/servicestation_cover.png"),
		textureId: "servicestation_cover.png",
		destructable: true,
		hp: 100
	},
	{
		name: "window3x3",
		id: "14",
		image: require("./images/window3x3.png"),
		textureId: "window3x3.png",
		destructable: true,
		hp: 1
	},
	{
		name: "grate",
		id: "15",
		image: require("./images/grate.png"),
		textureId: "grate.png",
		destructable: true,
		hp: 100
	},
	{
		name: "concrete",
		id: "16",
		image: require("./images/concrete.png"),
		textureId: "concrete.png",
		destructable: false,
		hp: 100
	},
	{
		name: "chainlink",
		id: "17",
		image: require("./images/chainlink.png"),
		textureId: "chainlink.png",
		destructable: true,
		hp: 100
	},
	{
		name: "flat",
		id: "18",
		image: require("./images/flat.png"),
		textureId: "flat.png",
		destructable: true,
		hp: 100
	},
	{
		name: "awning",
		id: "19",
		image: require("./images/awning.png"),
		textureId: "awning.png",
		destructable: true,
		hp: 100
	},
	{
		name: "block",
		id: "20",
		image: require("./images/bevelledBlock.png"),
		textureId: "bevelledBlock.png",
		destructable: true,
		hp: 100
	},
	{
		name: "tiles",
		id: "21",
		image: require("./images/squaretiles.png"),
		textureId: "squaretiles.png",
		destructable: true,
		hp: 100
	},
	{
		name: "storepanel1",
		id: "22",
		image: require("./images/storepanel1.png"),
		textureId: "storepanel1.png",
		destructable: true,
		hp: 100
	},
	{
		name: "storepanel2",
		id: "23",
		image: require("./images/storepanel2.png"),
		textureId: "storepanel2.png",
		destructable: true,
		hp: 100
	},
	{
		name: "storepanel3",
		id: "24",
		image: require("./images/storepanel3.png"),
		textureId: "storepanel3.png",
		destructable: true,
		hp: 100
	},
	{
		name: "struts",
		id: "25",
		image: require("./images/struts.png"),
		textureId: "struts.png",
		destructable: true,
		hp: 100
	},
	{
		name: "flatgrey",
		id: "flatgrey.png",
		image: require("./images/flatgrey.png"),
		textureId: "flatgrey.png",
		destructable: false,
		hp: 100
	}
];

export const BlockTypes: Array<BlockType> = blockTypeConfig.map(
	c => new BlockType(c)
);

//look for any stray types
//doesnt exist in tests.
if (PIXI.loader.resources["blocks"]) {
	// export function findStrays() {
	Object.keys(PIXI.loader.resources["blocks"].textures).filter(key => {
		// console.log("check", key);
		//if every blocktype doesnt match that key
		if (
			BlockTypes.every(bt => {
				return bt.textureId !== key;
			})
		) {
			BlockTypes.push(
				new BlockType({
					name: key,
					id: key,
					image: require("./images/error.png"),
					textureId: key,
					destructable: false,
					hp: 100
				})
			);
			//pop in a new block type
			// console.log("pippedy poppedy into the hippedy hoppity");
			// console.log(key, "hasnt been done thing");
		}
	});
	// }
}

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
