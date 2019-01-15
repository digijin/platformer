import * as PIXI from "pixi.js";

export default class Stage extends PIXI.Container{
	getInstancesOfType(type){
		//recurse
		return this.recurseSearchType(this, type);
	}
    
	recurseSearchType(node, type){
		let out = [];
		node.children.forEach(child => {
			if(child instanceof type){
				out.push(child);
			}else{
				out = out.concat(this.recurseSearchType(child, type));
			}
		});
		return out;

	}
}