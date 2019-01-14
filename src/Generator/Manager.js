
import GameObject from "GameObject";
import Level from "Scene/Level";
import generateDungeon from "./generateDungeon";

class GeneratorManager extends GameObject {
	constructor(manager){
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
		for(let x = 0; x < 10; x++){
			if(result.done){
				this.destroy();
				this.engine.stage.removeChild(this.manager.container);
				this.engine.startScene(new Level());
			}
			result = this.gen.next();
		}
	}
}

export default GeneratorManager;