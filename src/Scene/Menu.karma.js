import Game from "Game";
import Menu from "Scene/Menu";
// import StartMenu from "Scene/StartMenu";
import * as PIXI from "pixi.js";
import recurseSearch from "test/util/recurseSearch";

PIXI.Loader.shared.add("blocks", "assets/sprites.json");
PIXI.Loader.shared.add("decor", "assets/decorsprites.json");

describe("scene/menu.karma.js", () => {
	let container;
	let game;
	const getByTestingId = id => {
		return recurseSearch(id, game.engine.stage);
	};

	beforeAll(function () {
		// FLOWHACK
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 1000;
		container = document.createElement("div");

		// FLOWHACK
		document.body.appendChild(container);
		game = new Game(container);
	});
	afterAll(function () {
		game.destroy();

		// FLOWHACK
		document.body.removeChild(container);
	});
	//
	describe("boot", () => {
		it("should start logo", done => {
			// setTimeout(done, 2000);
			window.addEventListener("logo-start", done);
		});
		it("should be inited", () => {
			expect(game.inited).toBe(true);
		});
		// it('should open mainmenu', done => {
		// 	game.engine.startScene(new StartMenu());
		// 	setTimeout(done, 1000)
		// })
		it("should open menu scene", done => {
			window.addEventListener("menu-start", done);

			game.engine.startScene(new Menu());

			// setTimeout(done, 1000);
		});
	});

	describe("missions", () => {
		it("should find button", () => {
			expect(getByTestingId("SideMenu-MISSIONS")).toBeDefined();
		});
		it("should click butotn", done => {
			getByTestingId("SideMenu-MISSIONS").onClick();
			setTimeout(done, 100);
		});
	});

	describe("outfitting", () => {
		it("should find button", () => {
			expect(getByTestingId("SideMenu-OUTFITTING")).toBeDefined();
		});
		it("should click butotn", done => {
			getByTestingId("SideMenu-OUTFITTING").onClick();
			setTimeout(done, 100);
		});
		it("should click all children", done => {
			const cont = getByTestingId("OutfittingContainer");
			cont.children.forEach((o, i) => {
				setTimeout(() => {
					const btn = recurseSearch("OutfittingButton", o);
					if (btn) {
						btn.onClick();
					}
				}, 100 * i);
			});
			setTimeout(done, (cont.children.length + 1) * 100);
		});
	});

	describe("start mission", () => {
		afterAll(done => {
			window.addEventListener("menu-start", done);
			game.engine.startScene(new Menu());
			// setTimeout(done, 1000);
		});
		it("should enter mission section", done => {
			getByTestingId("SideMenu-MISSIONS").onClick();
			setTimeout(done, 100);
		});
		it("should click a MissionsButton", done => {
			expect(getByTestingId("MissionsButton")).toBeDefined();
			getByTestingId("MissionsButton").onClick();
			setTimeout(done, 100);
		});
		it("should click launch", done => {
			expect(getByTestingId("LaunchButton")).toBeDefined();
			getByTestingId("LaunchButton").onClick();
			setTimeout(done, 100);
		});
	});
});
