
import player from "./player";
import mech from "./mech";


export default function reducer(state = {}, action){
	return {
		player: player(state.player, action),
		mech: mech(state.mech, action),
	};
}