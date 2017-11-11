//@flow
import config from "config";

export type EnemyTypeParams = {
	// hp: name,
	walkSpeed: number,
	jumpSpeed: number,
	size: { w: number, h: number },
	registration: { x: number, y: number }
};

export default class EnemyType {
	walkSpeed: number;
	jumpSpeed: number;
	size: { w: number, h: number };
	registration: { x: number, y: number };
	constructor(params: EnemyTypeParams) {}
}

let enemyTypeConfig: Array<EnemyTypeParams> = [
	{
		walkSpeed: 50,
		jumpSpeed: 100,
		size: { w: 50, h: 50 },
		registration: { x: 0.5, y: 1 }
	}
];

export const EnemyTypes: Array<EnemyType> = enemyTypeConfig.map(
	c => new EnemyType(c)
);
