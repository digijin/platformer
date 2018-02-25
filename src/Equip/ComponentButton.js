import * as PIXI from "pixi.js";

import GameObject from "GameObject";

export default class Button extends GameObject {
    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    backgroundColor: number = 0x555555;
    backgroundColorOver: number = 0x999999;
    backgroundColorSelected: number = 0x222222;

    padding: { x: number, y: number } = { x: 10, y: 2 };

    container: PIXI.Container;

    over: boolean = false;
    constructor(params: { text: string, action: any }) {
        super();
        this.container = new PIXI.Container();
        this.container.buttonMode = true;
        this.container.interactive = true;

        this.text = new PIXI.Text(params.text, {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.text.position = this.padding;
        this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.background.tint = this.backgroundColor;
        this.background.width = this.text.width + this.padding.x * 2;
        this.background.height = this.text.height + this.padding.y * 2;
        this.container.addChild(this.background);
        this.container.addChild(this.text);

        this.container.on("mousedown", e => {
            // console.log("md");
        });
        this.container.on("mouseover", e => {
            // console.log("mo");
            this.over = true;
            this.text.style.fill = this.textColorOver;
            this.background.tint = this.backgroundColorOver;
        });
        this.container.on("mouseout", e => {
            // console.log("mo");
            this.over = false;
            this.text.style.fill = this.textColor;
            this.background.tint = this.backgroundColor;
        });
    }
}
