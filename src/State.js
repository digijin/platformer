//@flow
//this for only large scale state changes that should go to disk
//not for state used within levels

import reducer from "./State/reducer";

export default class State {
	state: Object;
	constructor() {
		this.state = reducer({}, { type: "INIT" });
	}

	dispatch(action: Object) {
		this.state = reducer(this.state, action);
	}

	getState() {
		return this.state;
	}

	save() {
		localStorage.setItem("save", JSON.stringify(this.state, null, 1));
	}

	load() {
		let data = localStorage.getItem("save");
		if (data) {
			this.state = JSON.parse(data);
		}
	}
}
