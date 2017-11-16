import StorageAdapter from "./Adapter";

let prefix = "save_";

export default class BrowserAdapter extends StorageAdapter {
	list(): Array<string> {
		return Object.keys(localStorage)
			.filter(key => {
				return key.indexOf("save") == 0;
			})
			.map(key => {
				return key.substr(prefix.length);
			});
	}
	save(name: string, data: string) {
		return localStorage.setItem(name, data);
	}
	load(name: string): string {
		return localStorage.getItem(name);
	}
}
