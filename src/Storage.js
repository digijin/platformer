import type StorageAdapter from "Storage/Adapter";
import BrowserAdaptor from "Storage/Browser";

export default class Storage {
	adapter: StorageAdapter;
	constructor() {
		if (process.browser) {
			this.adapter = new BrowserAdaptor();
		}
	}
}
