export default class BlockType {
	name: string;
	id: string;
	constructor(params: { name: string, id: string }) {
		this.name = params.name;
		this.id = params.id;
	}
}
