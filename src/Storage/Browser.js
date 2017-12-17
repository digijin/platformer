import StorageAdapter from "./Adapter";

// let prefix = "save_";

export default class BrowserAdapter extends StorageAdapter {
	prefix: string;
	constructor(type) {
		super();
		this.prefix = type;
	}
	list(): Array<string> {
		return Object.keys(localStorage)
			.filter(key => {
				return key.indexOf(this.prefix) == 0;
			})
			.map(key => {
				return key.substr(this.prefix.length);
			});
	}
	save(name: string, data: string) {
		return localStorage.setItem(this.prefix + name, data);
	}
	load(name: string): string {
		return localStorage.getItem(this.prefix + name);
	}
}
