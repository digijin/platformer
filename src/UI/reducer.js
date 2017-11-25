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
	}

	return state;
}
