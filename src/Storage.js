import type StorageAdapter from "Storage/Adapter";
import BrowserAdaptor from "Storage/Browser";

export default class Storage {
	adapter: StorageAdapter;
	constructor() {
		if (process.browser) {
			this.adapter = new BrowserAdaptor();
		}
	}
	list(): Array<string> {
		return this.adapter.list();
	}
	save(name: string, data: string) {
		return this.adapter.save(name, data);
	}
	load(name: string): string {
		return this.adapter.load(name);
	}
}
