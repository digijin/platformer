// @flow

// export type State = {
// 	scene: string,
// 	editor: {
// 		blockType: string
// 	}
// }

export default function reducer(state = { scene: "menu" }, action) {
	switch (action.type) {
		case "START_SCENE":
			state = { ...state, scene: action.scene };
	}

	return state;
}
