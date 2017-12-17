import React from "react";

import Storage from "Storage";

export default class Load extends React.Component {
	constructor() {
		super();
		this.storage = new Storage("src/saves");
	}
	render() {
		console.log(this.storage.list());
		return <div>load</div>;
	}
}
