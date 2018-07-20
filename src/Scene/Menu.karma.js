import Game from "Game";
import Menu from "Scene/Menu";
import MainMenu from 'Scene/MainMenu';
import * as PIXI from "pixi.js";
PIXI.loader.add("blocks", "assets/sprites.json");
PIXI.loader.add("decor", "assets/decorsprites.json");

describe("scene/menu.karma.js", () => {
    let container;
    let game;

	let getByTestingId = (id) => {
		return recurseSearch(id, game.engine.stage);
	}
	let recurseSearch = (id, node) => {
		// debugger;
		// console.log("checking if", node.testingId, "is",  id);
		if(node.testingId == id){
			// console.log('it is', node.testingId);
			return node;
		}
		let direct = node.children.find(child => {
			return child.testingId== id;
		})
		if(direct){
			// console.log("scan of children returns", direct.testingId)
			return direct;
		}

		// console.group('it is not so recurse children');
		let result;
		node.children.find(child => {
			// console.log("recursing ", child.testingId, id)
			// console.group('recursion');
			const search = recurseSearch(id, child);
			// console.groupEnd();
			if(search){
				result = search;
				// console.log("my search result is", search.testingId);
			}
			return search
		})
		// if(result){
		// 	console.log("result is ", result.testingId)
		// }else{
		// 	console.log('no result returned')
		// }
		// console.groupEnd();
		return result;
	}
	describe("recurseSearch", () => {
		let stage:PIXI.Container;
		let firstChild
		let secondChild
		let firstGrandChild
		let secondGrandChild
		let thirdGrandChild
		beforeAll(() => {
			stage = new PIXI.Container();
			firstChild = new PIXI.Container();
			secondChild = new PIXI.Container();
			firstGrandChild = new PIXI.Container();
			secondGrandChild = new PIXI.Container();
			thirdGrandChild = new PIXI.Container();
			stage.addChild(firstChild);
			stage.addChild(secondChild);
			firstChild.addChild(firstGrandChild);
			firstChild.addChild(secondGrandChild);
			secondChild.addChild(thirdGrandChild);
			stage.testingId = "stage";
			firstChild.testingId = "firstChild";
			secondChild.testingId = "secondChild";
			firstGrandChild.testingId = "firstGrandChild";
			secondGrandChild.testingId = "secondGrandChild";
			thirdGrandChild.testingId = "thirdGrandChild";
		})
		it("firstChild", () => {
			expect(recurseSearch("firstChild", stage)).toBe(firstChild)
		})
		it("secondChild", () => {
			expect(recurseSearch("secondChild", stage)).toBe(secondChild)
		})
		it("firstGrandChild", () => {
			expect(recurseSearch("firstGrandChild", stage).testingId).toBe(firstGrandChild.testingId)
		})
		it("secondGrandChild", () => {
			expect(recurseSearch("secondGrandChild", stage).testingId).toBe(secondGrandChild.testingId)
		})
		it("thirdGrandChild", () => {
			expect(recurseSearch("thirdGrandChild", stage).testingId).toBe(thirdGrandChild.testingId)
		})
		it("undefined", () => {
			expect(recurseSearch("undefined", stage)).not.toBeDefined()
		})



	})

    beforeAll(function() {
        // FLOWHACK
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 1000;
        container = document.createElement("div");

        // FLOWHACK
        document.body.appendChild(container);
        game = new Game(container);
    });
    afterAll(function() {
        game.destroy();

        // FLOWHACK
        document.body.removeChild(container);
    });
	//
	describe("boot", () => {
        it("shouldnt throw any errors initializing", done => {
            setTimeout(done, 2000);
        });
        it("should be inited", () => {
            expect(game.inited).toBe(true);
        });
		// it('should open mainmenu', done => {
		// 	game.engine.startScene(new MainMenu());
		// 	setTimeout(done, 1000)
		// })
        it("should open menu scene", done => {
            game.engine.startScene(new Menu());

			setTimeout(done, 1000)
        });
    });

	describe('missions', () => {
		it('should find button', () => {
			expect(getByTestingId("SideMenu-MISSIONS")).toBeDefined();
		})
		it('should click butotn', done => {
			getByTestingId("SideMenu-MISSIONS").onClick()
			setTimeout(done, 1000);
		})
	})

	describe('outfitting', () => {
		it('should find button', () => {
			expect(getByTestingId("SideMenu-OUTFITTING")).toBeDefined();
		})
		it('should click butotn', done => {
			getByTestingId("SideMenu-OUTFITTING").onClick()
			setTimeout(done, 1000);
		})
		it("should click all children", done => {
			let cont = getByTestingId("OutfittingContainer");
			cont.children.forEach((o,i) => {
				setTimeout(() => {
					let btn = recurseSearch('OutfittingButton', o);
					if(btn){btn.onClick();}
				}, 100*i);

			})
			setTimeout(done, (cont.children.length + 1) * 100);
		})
	})


	describe('start mission', () => {
		afterAll(done => {
			game.engine.startScene(new Menu());
			setTimeout(done, 1000);
		});
		it('should enter mission section', done => {
			getByTestingId("SideMenu-MISSIONS").onClick()
			setTimeout(done, 100);
		});
		it('should click a MissionsButton', done => {
			expect(getByTestingId("MissionsButton")).toBeDefined();
			getByTestingId("MissionsButton").onClick();
			setTimeout(done, 100);
		});
		it('should click launch', done => {
			expect(getByTestingId("LaunchButton")).toBeDefined();
			getByTestingId("LaunchButton").onClick();
			setTimeout(done, 100);
		});

	})

	it('should wait', done => {
		setTimeout(done, 1000);
	})
});
