export default class ObjectScene {
  ctx: Object;
  _x: number;
  _y: number;

  constructor(context: Object, x: number = 0, y: number = 0) {
    this.ctx = context;
    this._x = x;
    this._y = y;
    /*console.log({
      x: this._x,
      y: this._y
    });*/
    this.update();
  }
  getPosition() {
    return {
      x: this._x,
      y: this._y
    };
  }
  setPosition(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  update() {
    //console.log("update");
  }
}
