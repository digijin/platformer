import GameObject from "GameObject";

import Point from "Utility/Point";
import MainMenu from "Scene/MainMenu";

import type Engine from "Engine";

let lettersConfig = [{
    color: "#00ff00",
    points: [{
        x: 2,
        y: 1
      },
      {
        x: 2,
        y: 3
      },
      {
        x: 1,
        y: 3
      },
      {
        x: 1,
        y: 2
      },
      {
        x: 2,
        y: 2
      }
    ]
  },
  {
    color: "#00ff00",
    points: [{
      x: 3,
      y: 2
    }, {
      x: 3,
      y: 3
    }]
  },
  {
    color: "#00ff00",
    points: [{
        x: 5,
        y: 3
      },
      {
        x: 4,
        y: 3
      },
      {
        x: 4,
        y: 2
      },
      {
        x: 5,
        y: 2
      },
      {
        x: 5,
        y: 4
      },
      {
        x: 4,
        y: 4
      }
    ]
  },
  {
    color: "#00ff00",
    points: [{
      x: 6,
      y: 2
    }, {
      x: 6,
      y: 3
    }]
  },
  {
    color: "#00b7ff",
    points: [{
      x: 7,
      y: 2
    }, {
      x: 7,
      y: 4
    }]
  },
  {
    color: "#00b7ff",
    points: [{
      x: 8,
      y: 2
    }, {
      x: 8,
      y: 3
    }]
  },
  {
    color: "#00b7ff",
    points: [{
        x: 9,
        y: 3
      },
      {
        x: 9,
        y: 2
      },
      {
        x: 10,
        y: 2
      },
      {
        x: 10,
        y: 3
      }
    ]
  },
  {
    color: "#00b7ff",
    points: [
      // { x: 8, y: 4 },
      // { x: 11, y: 4 },
      {
        x: 11,
        y: 3
      },
      {
        x: 11,
        y: 1
      },
      {
        x: 7,
        y: 1
      }
      // { x: 3, y: 1 }
    ]
  },
  {
    color: "#00ff00",
    points: [
      // { x: 1, y: 1 },
      // { x: 0, y: 1 },
      {
        x: 0,
        y: 2
      },
      {
        x: 0,
        y: 4
      },
      {
        x: 3,
        y: 4
      }
    ]
  }
];

type letterData = {
  color: string,
  points: Array < Point > ,
  dist: number
}
//add dists
let letters: Array < letterData > = lettersConfig.map((l: letterData) => {
  let dist = 0;
  l.points = l.points.map(p => new Point(p));
  for (let p = 1; p < l.points.length; p++) {
    //FLOWHACK
    dist += l.points[p - 1].distanceTo(l.points[p]);
  }
  l.dist = dist;
  return l;
});
const INITDELAY = 6;
const SPEED = 12;
const RENDERTIME = 12;
const HOLDTIME = 1 * SPEED;
const FADETIME = SPEED / 2;
const SPAWNCHANCE = 0.2;
const SPIKE_SPEED = 8;
let size = 40;
let width = size * 11;
let height = size * 5;

let offset = {
  x: (window.innerWidth - width) / 2,
  y: (window.innerHeight - height) / 2
};
export default class DigijinLogo extends GameObject {
  time: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  hiddenCanvas: HTMLCanvasElement;
  hiddenCtx: CanvasRenderingContext2D;
  constructor() {
    super();
    // console.log(letters);
    this.time = -INITDELAY;
  }

  init(engine: Engine) {
    super.init(engine);

    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.hiddenCanvas = document.createElement("canvas");
    this.hiddenCanvas.width = window.innerWidth;
    this.hiddenCanvas.height = window.innerHeight;
    engine.container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.hiddenCtx = this.hiddenCanvas.getContext("2d");
  }

  exit() {
    this.engine.container.removeChild(this.canvas);
  }

  update() {
    this.time += this.engine.deltaTime * SPEED;

    //fade out using hidden context
    this.hiddenContextFade();
    // let imageData = this.ctx.getImageData(
    // 	0,
    // 	0,
    // 	this.canvas.width,
    // 	this.canvas.height
    // );
    // let data = imageData.data;
    // for (let x = 0; x < this.canvas.width; x++) {
    // 	for (let y = 0; y < this.canvas.height; y++) {
    // 		let index = (y * this.canvas.width + x) * 4;
    // 		data[index + 3] = data[index + 3] - 10;
    // 	}
    // }
    // this.ctx.putImageData(imageData, 0, 0);

    let ctx = this.ctx;

    if (this.time > RENDERTIME + HOLDTIME) {
      // ctx.globalAlpha = (FADETIME - (this.time - RENDERTIME)) / FADETIME;
      // ctx.globalAlpha -= this.engine.deltaTime;
    } else {
      this.renderLetters(ctx, size, offset);
    }

    if (this.time > RENDERTIME + HOLDTIME + FADETIME) {
      document.body.style.backgroundColor = "lightblue";
    }
    if (this.time > RENDERTIME + HOLDTIME + FADETIME + SPEED) {
      //end
      ctx.globalAlpha = 1;
      this.engine.startScene(new MainMenu());
      window.dispatchEvent(new Event("logo-over"));
    }
  }

  hiddenContextFade() {
    this.hiddenCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.hiddenCtx.globalAlpha = 0.8;
    this.hiddenCtx.drawImage(this.canvas, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(this.hiddenCanvas, 0, 0);
  }

  renderLetters(ctx, size, offset) {
    ctx.save();
    letters.forEach((l, index) => {
      let progress = this.time - index * 1.5;
      ctx.strokeStyle = l.color;
      ctx.lineWidth = 3;
      // ctx.filter = "drop-shadow(0,0,4," + l.color + ")";
      ctx.shadowColor = l.color;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.beginPath();
      let from = l.points[0];
      ctx.moveTo(
        from.multiply(size).add(offset).x,
        from.multiply(size).add(offset).y
      );
      let to;
      for (let p = 1; p < l.points.length; p++) {
        to = l.points[p];
        let dist = from.distanceTo(to);
        if (progress > dist) {
          this.drawLine(ctx, to, size, offset);
        } else if (progress > 0) {
          this.drawPartialLine(
            from,
            to,
            progress,
            dist,
            l,
            ctx,
            size,
            offset
          );
        }
        progress -= dist;
        from = to;
      }
      ctx.stroke();

      // ctx.beginPath();
      // ctx.stroke();

      ctx.shadowColor = "none";
      ctx.shadowBlur = 0;
    });
    ctx.restore();
  }

  drawLine(ctx: CanvasRenderingContext2D, to, size, offset) {
    ctx.lineTo(
      to.multiply(size).add(offset).x,
      to.multiply(size).add(offset).y
    );
  }

  drawPartialLine(from, to, progress, dist, l, ctx: CanvasRenderingContext2D, size, offset) {
    let mid = from.percentTo(to, progress / dist);
    if (Math.random() < SPAWNCHANCE) {
      let dir = to.subtract(from).direction();
      dir += Math.PI / 2 * (Math.random() > 0.5 ? 1 : -1);
      this.engine.register(
        new Spike({
          position: mid,
          direction: dir,
          ctx: this.ctx,
          color: l.color
        })
      );
    }
    ctx.lineTo(
      mid.multiply(size).add(offset).x,
      mid.multiply(size).add(offset).y
    );
    ctx.arc(
      mid.multiply(size).add(offset).x,
      mid.multiply(size).add(offset).y,
      4,
      0,
      2 * Math.PI
    );
  }
}

class Spike extends GameObject {
  position: Point;
  direction: number;
  ctx: CanvasRenderingContext2D;
  color: string;
  constructor(params: {
    position: Point,
    direction: number,
    ctx: CanvasRenderingContext2D,
    color: string
  }) {
    super();
    this.position = params.position;
    this.direction = params.direction;
    this.ctx = params.ctx;
    this.color = params.color;
  }
  update() {
    if (Math.random() < 0.1) {
      let r = Math.random();
      if (r < 0.3) {
        this.direction += Math.PI / 2 * (Math.random() > 0.5 ? 1 : -1);
      } else if (r < 0.6) {
        this.engine.register(
          new Spike({
            position: this.position,
            direction: this.direction +
              Math.PI / 2 * (Math.random() > 0.5 ? 1 : -1),
            ctx: this.ctx,
            color: this.color
          })
        );
      } else {
        this.destroy();
      }
    }

    let to = this.position.move(
      this.direction,
      this.engine.deltaTime * SPIKE_SPEED
    );

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    this.ctx.moveTo(
      this.position.multiply(size).add(offset).x,
      this.position.multiply(size).add(offset).y
    );
    this.ctx.lineTo(
      to.multiply(size).add(offset).x,
      to.multiply(size).add(offset).y
    );
    this.ctx.stroke();
    this.position = to;
  }
}