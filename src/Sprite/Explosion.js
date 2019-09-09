import FilterSprite from "Sprite/Filter";
import Filter from "Filter/Explosion/Filter";

export default class ExplosionSprite extends FilterSprite {
	constructor() {
		const filter = new Filter();
		filter.seed = Math.floor(Math.random() * 100);
		super(filter);
		this.width = 100;
		this.height = 100;
	}
}
