
import GameObject from "GameObject";
import Level from "Scene/Level";
import generateDungeon from "./generateDungeon";
import type GeneratorScene from "Scene/Generator";

class GeneratorManager extends GameObject {
	constructor(manager: GeneratorScene){
		super();
		this.manager = manager;
	}

	init(engine){
		super.init(engine);
		this.gen = generateDungeon(engine, this.manager);
	}

	update(){
		let result = this.gen.next();
		// let start = new Date().getTime();
		//todo: speedup better with time stuff
		for(let x = 0; x < 10; x++){
			if(result.done){
				this.destroy();
				this.engine.stage.removeChild(this.manager.container);
				this.engine.startScene(new Level());
				return;
			}
			result = this.gen.next();
		}
		this.manager.draw();
	}
}

export default GeneratorManager;