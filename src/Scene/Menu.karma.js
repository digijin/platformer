import Game from "Game";
import Menu from "Scene/Menu";
import MainMenu from 'Scene/MainMenu';
import * as PIXI from "pixi.js";
PIXI.loader.add("blocks", "assets/sprites.json");
PIXI.loader.add("decor", "assets/decorsprites.json");

fdescribe("scene/menu.karma.js", () => {
    let container;
    let game;

	let getByTestingId = (id) => {
		return recurseSearch(id, game.engine.stage);
	}
	let recurseSearch = (id, node) => {
		// debugger;
		// console.log("searching", node);
		if(node.testingId == id){
			// console.log(node, node.testingId, id)
			return node;
		}
		let result = node.children.find(child => {
			return recurseSearch(id, child);
		})
		return result;
	}

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

			setTimeout(done, 1000)
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
		it('should click into missions section', done => {
            setTimeout(done, 8000);
        })
	})

});
