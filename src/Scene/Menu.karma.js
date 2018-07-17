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
		it('should open mainmenu', done => {
			game.engine.startScene(new MainMenu());
			setTimeout(done, 1000)
		})
        it("should open menu scene", done => {
            game.engine.startScene(new Menu());

			setTimeout(done, 1100)
        });
    });

	describe('missions', () => {
		// it('should force remove loading for now ____HACK', done => {
		// 	let cont = getByTestingId("MenuContainer");
		// 	let loading = getByTestingId("MenuLoadingHACK");
		// 	if(loading){
		// 		cont.removeChild(loading);
		// 		setTimeout(done, 1000)
		// 	}else{
		// 		done();
		// 	}
		//
		// })
		it('should find button', () => {
			expect(getByTestingId("SideMenu-MISSIONS")).toBeDefined();
		})
		it('should click butotn', () => {
			let button = getByTestingId("SideMenu-MISSIONS")
			// console.log(button);
		})
		it('should click into missions section', done => {
            setTimeout(done, 8000);
        })
	})

});
