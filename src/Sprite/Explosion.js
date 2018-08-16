import FilterSprite from "Sprite/Filter";
import Filter from "Filter/Explosion/Filter";

export default class ExplosionSprite extends FilterSprite {
	constructor() {
		super(new Filter());
		this.width = 200;
		this.height = 200;
	}
}
