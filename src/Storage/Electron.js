import StorageAdapter from "./Adapter";

let prefix = "save_";

export default class ElectronAdapter extends StorageAdapter {
	fs;
	constructor() {
		super();
		//imported here so webpack doesnt spaz out when making web bundle
		/* istanbul ignore next */
		this.fs = require("fs");
	}
	list(): Array<string> {
		return this.fs.readdirSync;
	}
	save(name: string, data: string) {
		return localStorage.setItem(prefix + name, data);
	}
	load(name: string): string {
		return localStorage.getItem(prefix + name);
	}
}
