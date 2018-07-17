import Game from "Game";
import Menu from "Scene/Menu";
import * as PIXI from "pixi.js";
PIXI.loader.add("blocks", "assets/sprites.json");
PIXI.loader.add("decor", "assets/decorsprites.json");

describe("scene/menu.karma.js", () => {
    let container;
    let game;
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
        it("should open menu scene", () => {
            game.engine.startScene(new Menu());
        });
    });

	describe('missions', () => {
		it('should click into missions section', done => {
            setTimeout(done, 8000);
        })
	})

});
