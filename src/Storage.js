import type StorageAdapter from "Storage/Adapter";
import BrowserAdapter from "Storage/Browser";
import ElectronAdapter from "Storage/Electron";

export default class Storage {
	adapter: StorageAdapter;
	constructor() {
		if (process.browser && navigator.userAgent.indexOf("Electron") == -1) {
			this.adapter = new BrowserAdapter();
		} else {
			this.adapter = new ElectronAdapter("src/levels");
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
