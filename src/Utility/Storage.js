import type StorageAdapter from "./Storage/Adapter";
import BrowserAdapter from "./Storage/Browser";
import ElectronAdapter from "./Storage/Electron";

export default class Storage {
	adapter: StorageAdapter;
	constructor(type: string = "src/levels") {
		if (process.browser && navigator.userAgent.indexOf("Electron") == -1) {
			this.adapter = new BrowserAdapter(type);
		} else {
			try {
				this.adapter = new ElectronAdapter(type);
			} catch (e) {
				//fallback in electron web mode for testing
				this.adapter = new BrowserAdapter(type);
			}
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

	remove(name: string) {
		return this.adapter.remove(name);
	}
}
