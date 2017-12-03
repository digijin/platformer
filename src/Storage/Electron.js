import StorageAdapter from "./Adapter";

let prefix = "save_";

export default class ElectronAdapter extends StorageAdapter {
	fs;
	path;
	savedir;
	constructor(dir: string) {
		super();
		//imported here so webpack doesnt spaz out when making web bundle
		/* istanbul ignore next */
		this.fs = eval('require("fs")');
		this.path = eval('require("path")');
		this.savedir = this.path.resolve(dir);
		if (!this.fs.existsSync(this.savedir)) {
			this.fs.mkdirSync(this.savedir);
		}
	}
	list(): Array<string> {
		return this.fs
			.readdirSync(this.savedir)
			.map(save => save.substr(0, save.length - 4));
	}
	saveFileName(name: string): string {
		return this.path.resolve(this.savedir, name + ".txt");
	}
	save(name: string, data: string) {
		return this.fs.writeFileSync(this.saveFileName(name), data);
	}
	load(name: string): string {
		return this.fs.readFileSync(this.saveFileName(name)).toString();
	}
}
