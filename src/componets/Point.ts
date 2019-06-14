import ObjectScene from "./ObjectScene";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./../config";
export default class Point extends ObjectScene {
  _r: number;
  _directionX: number = Math.random() - 0.5;
  _directionY: number = Math.random() - 0.5;
  _speed: number = 2;
  _opacity: number = 0.1;
  _id: number = 1;
  constructor(
    context: Object,
    id: number,
    x: number = 0,
    y: number = 0,
    r: number = 10,
    speed: number = 3
  ) {
    super(context, x, y);
    this._id = id;
    this._r = r;
    this._speed = speed;
  }
  getRadius() {
    return this._r;
  }
  setRadius(r: number) {
    this._r = r;
  }
  resetOpacity() {
    this._opacity = 0;
  }
  setOpacity(opacity: number) {
    this._opacity = opacity > this._opacity ? opacity : this._opacity;
  }
  move() {
    let x = this._x;
    let y = this._y;
    if (x >= WINDOW_WIDTH) {
      this._directionX = Math.random() * -1;
    }
    if (x <= 0) {
      this._directionX = Math.random();
    }
    if (y >= WINDOW_HEIGHT) {
      this._directionY = Math.random() * -1;
    }
    if (y <= 0) {
      this._directionY = Math.random();
    }
    x += this._speed * this._directionX;
    y += this._speed * this._directionY;
    this.setPosition(x, y);
  }
  update() {
    super.update();
    this.ctx.translate(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);

    this.ctx.translate(-WINDOW_WIDTH / 2, -WINDOW_HEIGHT / 2);
    this.ctx.shadowColor = "red";
    this.ctx.shadowBlur = 15;
    this.ctx.strokeStyle = "rgba(255,255,255," + this._opacity + ")";
    this.ctx.fillStyle = "rgba(255,255,255," + this._opacity + ") )";
    this.ctx.beginPath();
    this.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();

    /* this.ctx.fillStyle = "red";
    this.ctx.fillText(this._id, this._x, this._y);*/
  }
}
