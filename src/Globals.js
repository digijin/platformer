import Promise from "promise";

class Globals {
	values = {};
	valuePromises = {};

	get(key) {
		const value = this.values[key];
		return new Promise(resolve => {
			if (value) {
				resolve(value);
			} else {
				if (!this.valuePromises[key]) {
					this.valuePromises[key] = [];
				}
				this.valuePromises[key].push(resolve);
			}
		});
	}

	set(key, value) {
		this.values[key] = value;
		if (this.valuePromises[key]) {
			this.valuePromises[key].forEach(resolve => {
				resolve(value);
			});

			this.valuePromises[key] = [];
		}
	}

	remove(key) {
		delete this.values[key];
	}

	clear() {
		this.values = {};
		this.valuePromises = {};
	}
}

export default new Globals();
