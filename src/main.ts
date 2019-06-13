import Point from "./componets/Point";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "./config";
let SIZE = 20;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let DISTANCE = 300;

function setSizeCanvas(canv: Object) {
  canv.setAttribute("width", WINDOW_WIDTH.toString() + "px");
  canv.setAttribute("height", WINDOW_HEIGHT.toString() + "px");
}
setSizeCanvas(canvas);

let points: Point = [];
for (let i = 0; i < SIZE; i++) {
  points.push(
    new Point(
      ctx,
      i,
      WINDOW_WIDTH / 2 + Math.sin(10 * i) * (WINDOW_WIDTH / 5),
      WINDOW_HEIGHT / 2 + Math.sin(10 * i) * (WINDOW_HEIGHT / 2),
      (Math.random() + 1) * 2,
      (Math.random() + 1) * (Math.random() + 1)
    )
  );
}

function Distance(a: Object, b: Object) {
  let x = Math.abs(Math.abs(a.getPosition().x) - Math.abs(b.getPosition().x));
  let y = Math.abs(Math.abs(a.getPosition().y) - Math.abs(b.getPosition().y));

  let c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let r = 1 - c / DISTANCE;
  return r;
}
function DrawLine(a: Object, b: Object) {
  let r = Distance(a, b) - 0.1;
  let color = "rgba(255, 255, 255," + r + ")";
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(a.getPosition().x, a.getPosition().y);
  ctx.lineTo(b.getPosition().x, b.getPosition().y);
  ctx.stroke();
  return r;
}

let last = new Date();
function update() {
  let t2 = new Date();
  if (t2.getTime() - last.getTime() > 1000 / 30) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    for (let i = 0; i < SIZE - 1; i++) {
      points[i].move();
      points[i].resetOpacity(0);
      for (let j = 0; j < SIZE - 1; j++) {
        if (i < j) {
          DrawLine(points[i], points[j]);
        }
        if (i !== j) {
          let newop = Distance(points[i], points[j]);
          points[i].setOpacity(newop);
        }
      }
      //console.log(`${i} = ${maxOpacity}`);

      points[i].update();
    }
    last = t2;
  }

  setTimeout(() => {
    update();
  }, 1);
}
setTimeout(() => {
  update();
}, 10);
