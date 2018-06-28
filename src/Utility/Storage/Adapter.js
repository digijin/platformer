// @flow

export default class StorageAdapter {
	list(): Array<string> {
		return [];
	}

	// eslint-disable-next-line no-unused-vars
	save(name: string, data: string) {}
	// eslint-disable-next-line no-unused-vars
	load(name: string): string {
		return "not implemented";
	}
}
