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
		description: "different design",
		objectives: [{ text: "more killing shit" }]
	}),

	new Mission({
		level: require("levels/level.txt"),
		title: "Second Mission",
		description: "Exactly the same as first mission. here for testing",
		objectives: [
			{ text: "dont kill everything" },
			{ text: "just joking, kill everything" }
		]
	}),

	new Mission({
		level: require("levels/testinglevel.txt"),
		title: "Testing Mission",
		description: "for automated testing. very basic level",
		objectives: [{ text: "kill one thing" }]
	})
);
