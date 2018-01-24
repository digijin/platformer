//@flow

import config from "config";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import type Grid from "Grid";

import type BlockType from "Grid/Block/Type";
import {
  BlockTypeMap
} from "Grid/Block/Type";

export default class Block {
  position: Point;
  type: string;
  backgroundType: string | void;
  grid: Grid;
  tint: number;
  hp: number;
  constructor(params: {
    position: Point,
    type: string,
    grid: Grid,
    tint ? : number,
    backgroundType ? : string
  }) {
    this.position = params.position;
    this.type = params.type;
    this.grid = params.grid;
    if (params.tint) {
      this.tint = params.tint;
    }
    if (typeof this.tint !== "number") {
      this.tint = 0xffffff;
    }

    if (!params.backgroundType) {
      params.backgroundType = this.type;
    }
    this.backgroundType = params.backgroundType;


    if (this.type !== "0") {
      this.hp = this.getType().hp;
    }
  }
  toString() {
    return JSON.stringify({
      position: this.position,
      type: this.type
    });
  }

  getType(): BlockType {
    return BlockTypeMap[this.type];
  }

  getBackgroundType(): BlockType {
    return BlockTypeMap[this.backgroundType];
  }

  isEmpty(): boolean {
    return this.type == "0";
  }

  isBackgroundEmpty(): boolean {
    return this.backgroundType == "0";
  }
  damage(amount: number) {
    let type = this.getType();
    if (type && type.destructable) {
      this.hp -= amount;
      if (this.hp <= 0) {
        this.destroy();
      }
    }
  }
  destroy() {
    this.type = "0";
    this.grid.bustCache(this);
  }
  //for editor
  add(blockId: string) {
    this.type = blockId;
    this.grid.bustCache(this);
  }
  addBackground(blockId: string) {
    this.backgroundType = blockId;
    this.grid.bustCache(this);
  }
  //for editor
  remove() {
    this.type = "0";
    this.grid.bustCache(this);
  }

  get center(): Point {
    return new Point({
      x: (this.position.x + 0.5) * config.grid.width,
      y: (this.position.y + 0.5) * config.grid.width
    });
  }
  get point(): Point {
    return new Point({
      x: this.position.x * config.grid.width,
      y: this.position.y * config.grid.width
    });
  }
  is(block: Block): boolean {
    return (
      block.position.x === this.position.x &&
      block.position.y === this.position.y
    );
  }

  get rect(): Rect {
    return new Rect({
      t: this.position.y * config.grid.width,
      r: (this.position.x + 1) * config.grid.width,
      b: (this.position.y + 1) * config.grid.width,
      l: this.position.x * config.grid.width
    });
  }

  // get key():string{
  //   return makeKey(this.x, this.y);
  // }

  // static fromPoint(point: Point) {
  // 	return new Block({
  // 		x: Math.floor(point.x / config.grid.width),
  // 		y: Math.floor(point.y / config.grid.width)
  // 	});
  // }
}