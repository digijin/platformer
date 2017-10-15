export default function player(state, action) {
	if (!state) {
		state = {
			money: 1000
		};
	}

	switch (action.type) {
		case "SPEND_MONEY":
			state.money -= action.cost;
			break;
	}
	return state;
}
