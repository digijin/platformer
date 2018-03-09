// @flow

export default class StorageAdapter {
	list(): Array<string> {
		return [];
	}

	save(name: string, data: string) {}
	load(name: string): string {
		return "not implemented";
	}
}
