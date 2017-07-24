export default function reducer(state = { scene: "menu" }, action) {
	// console.log("at", action.type);

	switch (action.type) {
		case "START_SCENE":
			state = { ...state, scene: action.scene };
	}

	return state;
}
