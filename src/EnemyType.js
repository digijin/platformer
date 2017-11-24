//@flow
import config from "config";

export type EnemyTypeParams = {
	// hp: name,
	name: string,
	walkSpeed: number,
	jumpSpeed: number,
	size: { w: number, h: number },
	registration: { x: number, y: number }
};

export default class EnemyType {
	name: string;
	walkSpeed: number;
	jumpSpeed: number;
	size: { w: number, h: number };
	registration: { x: number, y: number };

	constructor(params: EnemyTypeParams) {
		Object.assign(this, params);
	}
}

let enemyTypeConfig: Array<EnemyTypeParams> = [
	{
		name: "hopper",
		walkSpeed: 50,
		jumpSpeed: 100,
		size: { w: 50, h: 50 },
		registration: { x: 0.5, y: 1 },
		idle: "rabbit",
		agro: "agro"
	},
	{
		name: "lil bouncy",
		walkSpeed: 50,
		jumpSpeed: 100,
		size: { w: 20, h: 20 },
		registration: { x: 0.5, y: 1 },
		idle: "bounce",
		agro: "agro"
	},
	{
		name: "guard",
		walkSpeed: 50,
		jumpSpeed: 100,
		size: { w: 60, h: 60 },
		registration: { x: 0.5, y: 1 },
		idle: "patrol",
		agro: "agro"
	}
];

export const EnemyTypes: Array<EnemyType> = enemyTypeConfig.map(
	c => new EnemyType(c)
);
