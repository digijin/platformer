// @flow

// export type State = {
// 	scene: string,
// 	editor: {
// 		blockType: string
// 	}
// }

export default function reducer(
	state: Object = { scene: "menu" },
	action: Object
) {
	switch (action.type) {
		case "START_SCENE":
			state = { ...state, scene: action.scene };
			break;

		case "PAUSE":
			state = { ...state, scene: "pause" };
			break;

		case "END_SCENE":
			state = { ...state, scene: "none" };
			break;
	}

	return state;
}
