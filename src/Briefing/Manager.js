// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import MissionsPanel from "./MissionsPanel";
import InfoPanel from "./InfoPanel";
import ActionPanel from "./ActionPanel";
import BasePanel from "./BasePanel";
import RadarPanel from "./RadarPanel";
import GraphPanel from "./GraphPanel";
import BarPanel from "./BarPanel";
import SideMenu from "./SideMenu";
import LineChartPanel from "./LineChartPanel";
import { GlitchFilter } from "@pixi/filter-glitch";
import { OldFilmFilter } from "@pixi/filter-old-film";
import { CRTFilter } from "@pixi/filter-crt";
import { ZoomBlurFilter } from "@pixi/filter-zoom-blur";

import * as PIXI from "pixi.js";

import dottedbg from "./dottedbg.png";

import Point from "Utility/Point";

class BriefingContainer extends PIXI.Container {}
class NewBriefingContainer extends PIXI.Container {}

export default class BriefingManager extends GameObject {
    onMissionChange = mission => {
    	// console.log("mission changed to", mission);

    	this.infoPanel.render(mission);
    };

    container: PIXI.Container;
    infoPanel: InfoPanel;
    spacing: number = 20;
    mouseControl: Boolean = true;

    glitching: boolean = false;
    missionsPanel: MissionsPanel;

    init(engine: Engine) {
    	super.init(engine);
    	this.tag("briefingmanager");
    	this.container = new BriefingContainer();
    	this.newcontainer = new NewBriefingContainer();

    	this.bg = new PIXI.extras.TilingSprite(
    		new PIXI.Texture(new PIXI.BaseTexture(dottedbg))
    	);
    	this.bg.z = -1;
    	this.bg.width = window.innerWidth;
    	this.bg.height = window.innerHeight;
    	this.bg.x = -window.innerWidth / 2;
    	this.bg.y = -window.innerHeight / 2;
    	// this.engine.stage.addChild(this.bg);
    	this.container.addChild(this.bg);

    	// this.bg.filters = [new OldFilmFilter({ sepia: 0, noise: 0.1 })];

    	this.container.filters = [new CRTFilter(), new ZoomBlurFilter()];
    	this.container.filters[1].strength = 0.2;
    	this.container.filters[1].center = [
    		window.innerWidth / 2,
    		window.innerHeight / 2
    	];
    	//SIDE SideMenu
    	this.sideMenu = new SideMenu();
    	this.engine.register(this.sideMenu);
    	this.newcontainer.addChild(this.sideMenu.container);

    	//MISSIONS
    	this.missionsPanel = new MissionsPanel({
    		offset: new Point(),
    		z: -0.8,
    		onMissionChange: this.onMissionChange,
    		delay: 1
    	});
    	this.engine.register(this.missionsPanel);
    	this.missionsPanel.props.offset.x =
            -this.missionsPanel.container.width - this.spacing;
    	this.missionsPanel.props.offset.y =
            -this.missionsPanel.container.height - this.spacing;
    	this.container.addChild(this.missionsPanel.container);
    	//ACTIONS
    	this.actionPanel = new ActionPanel({
    		offset: new Point({
    			x: 0,
    			// y: this.missionsPanel.container.height + this.spacing
    			y: 0
    		}),
    		z: -0.8,
    		delay: 2
    	});
    	this.engine.register(this.actionPanel);
    	this.actionPanel.props.offset.x =
            -this.actionPanel.container.width - this.spacing;
    	this.container.addChild(this.actionPanel.container);
    	//BASE
    	this.basePanel = new BasePanel({
    		offset: new Point({
    			// x: this.missionsPanel.container.width + this.spacing,
    			x: 0,
    			y: 0
    		}),
    		z: -0.8,
    		delay: 3
    	});
    	this.engine.register(this.basePanel);
    	this.basePanel.props.offset.y =
            -this.basePanel.container.height - this.spacing;
    	this.container.addChild(this.basePanel.container);
    	//INFO
    	this.infoPanel = new InfoPanel({
    		offset: new Point({
    			// x: this.missionsPanel.container.width + this.spacing,
    			// y: this.basePanel.container.height + this.spacing
    			x: 0,
    			y: 0
    		}),
    		z: -0.8,
    		delay: 4
    	});
    	this.engine.register(this.infoPanel);
    	this.container.addChild(this.infoPanel.container);

    	//RADAR
    	this.radarPanel = new RadarPanel({
    		offset: new Point({
    			// x: this.missionsPanel.container.width + this.spacing,
    			x: 0,
    			y: 0
    		}),
    		z: -0.8,
    		target: { z: 0.3 },
    		delay: 3
    	});
    	this.engine.register(this.radarPanel);
    	this.radarPanel.props.offset.y =
            -this.radarPanel.container.height -
            this.spacing -
            this.basePanel.container.height -
            this.spacing;
    	this.container.addChild(this.radarPanel.container);
    	//GRAPH
    	this.graphPanel = new GraphPanel({
    		offset: new Point({
    			// x: this.missionsPanel.container.width + this.spacing,
    			x: 0,
    			y: 0
    		}),
    		z: -0.8,
    		target: { z: 0.1 },
    		delay: 3
    	});
    	this.engine.register(this.graphPanel);
    	this.graphPanel.props.offset.x =
            -this.graphPanel.container.width -
            this.spacing -
            this.actionPanel.container.width -
            this.spacing;
    	this.container.addChild(this.graphPanel.container);
    	//BAR
    	this.barPanel = new BarPanel({
    		offset: new Point({
    			// x: this.missionsPanel.container.width + this.spacing,
    			x: 0,
    			y: 0
    		}),
    		z: -0.8,
    		target: { z: 0.2 },
    		delay: 3
    	});
    	this.engine.register(this.barPanel);
    	this.barPanel.props.offset.x =
            -this.barPanel.container.width - this.spacing;
    	this.barPanel.props.offset.y =
            -this.barPanel.container.height -
            this.spacing -
            this.missionsPanel.container.height -
            this.spacing;
    	this.container.addChild(this.barPanel.container);
    	//LINE CHART
    	this.lineChartPanel = new LineChartPanel({
    		offset: new Point({
    			// x: this.missionsPanel.container.width + this.spacing,
    			x: 0,
    			y: 0
    		}),
    		z: -0.8,
    		target: { z: 0.1 },
    		delay: 3
    	});
    	this.engine.register(this.lineChartPanel);
    	this.lineChartPanel.props.offset.x =
            -this.lineChartPanel.container.width - this.spacing;
    	this.lineChartPanel.props.offset.y =
            -this.lineChartPanel.container.height -
            this.spacing -
            this.barPanel.container.height -
            this.spacing -
            this.missionsPanel.container.height -
            this.spacing;
    	this.container.addChild(this.lineChartPanel.container);

    	//container
    	this.container.position.x = this.engine.renderer.width / 2;
    	this.container.position.y = this.engine.renderer.height / 2;

    	//sort kids
    	// console.log("sorting kids", this.container.children.length);
    	this.container.children.sort((a, b) => {
    		// let az = a.props.target ? a.props.target.z : 0;
    		// let bz = b.props.target ? b.props.target.z : 0;
    		// console.log(az, bz);
    		// return bz - az;
    		// console.log(a.z, b.z);
    		return a.z - b.z;
    	});

    	this.engine.stage.addChild(this.container);
    	this.engine.stage.addChild(this.newcontainer);
    }

    exit() {
    	this.engine.stage.removeChild(this.container);
    	this.engine.stage.removeChild(this.newcontainer);
    }

    update() {
    	this.animateFilters();
    	// this.glitch();
    	let target = new Point({
    		// x: (this.engine.renderer.width - this.container.width) / 2,
    		// y: (this.engine.renderer.height - this.container.height) / 2
    		x: this.engine.renderer.width / 2,
    		y: this.engine.renderer.height / 2
    	});
    	// console.log(this.engine.mouse.position, target);
    	if (this.mouseControl) {
    		this.engine.view.offset = this.engine.mouse.position
    			.subtract(target)
    			.multiply(0.1)
    			.easeTo(this.engine.view.offset, 2);
    	} else {
    		this.engine.view.offset = new Point().easeTo(
    			this.engine.view.offset,
    			2
    		);
    	}

    	this.container.position = target;
    	// .easeTo(
    	//     this.container.position,
    	//     1 + this.engine.deltaTime
    	// );
    }

    glitch() {
    	if (Math.random() < 0.01) {
    		this.container.filters = [new GlitchFilter()];
    	} else {
    		this.container.filters = [];
    	}
    }

    animateFilters() {
    	// this.bg.filters.forEach(f => {
    	//     // if (f.time) {
    	//     f.time += this.engine.deltaTime;
    	//     // }
    	// });
    	this.container.filters[0].time += this.engine.deltaTime * 40;
    	if (this.container.filters.length > 1) {
    		this.container.filters[1].strength -= this.engine.deltaTime / 10;
    		if (this.container.filters[1].strength < 0) {
    			this.container.filters = [this.container.filters[0]];
    		}
    	}

    	// console.log(this.bg.filters[0].time);
    }
}
