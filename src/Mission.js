// @flow

export default class Mission {
	level: any;
	title: string;
	description: string;
	objectives: Array<{ text: string }>;
	constructor(params) {
		Object.assign(this, params);
	}
}

export const Missions = [];
Missions.push(
	new Mission({
		level: require("levels/level.txt"),
		title: "First Mission",
		reward: 0,
		rank: 1,
		description: "This is your first mission. Go shoot shit til it dies",
		objectives: [
			{ text: "Go To X" },
			{ text: "Kill Y" },
			{ text: "Obtain z" },
			{ text: "clear everything" }
		]
	}),

	new Mission({
		level: require("levels/flatcolour.txt"),
		title: "flat colours",
		reward: 1000,
		rank: 2,
		description: "different design",
		objectives: [{ text: "more killing shit" }]
	}),

	new Mission({
		level: require("levels/level.txt"),
		title: "Second Mission",
		reward: 25000,
		rank: 3,
		description: "Exactly the same as first mission. here for testing",
		objectives: [
			{ text: "dont kill everything" },
			{ text: "just joking, kill everything" }
		]
	}),

	new Mission({
		level: require("levels/testinglevel.txt"),
		title: "Testing Mission",
		reward: 123456,
		rank: 4,
		description: "for automated testing. very basic level",
		objectives: [{ text: "kill one thing" }]
	})
);
