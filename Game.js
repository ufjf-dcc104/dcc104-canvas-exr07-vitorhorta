var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var tesouros = 0;
var tesourosConquistados = 0;
var minas = 0;
var gameRunning = true;
function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 620;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  images.load("portal","portal.png");
  images.load("switch","switch.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,2,0,0,0,0,1,0,0,0,2,1],
    [1,0,2,0,0,1,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1],
    [1,4,0,0,0,0,0,0,0,0,2,0,1],
    [1,0,0,0,0,1,0,0,2,0,0,0,1],
    [1,0,0,2,0,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,5,1],
    [1,0,0,0,0,0,0,0,1,0,2,0,1],
    [1,2,0,0,0,0,0,0,1,0,3,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.x = map.playerStart[0];
  pc.y = map.playerStart[1];
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function contarObjetos(map,px,py) {
    var minasCount = 0;
    var tesourosCount = 0;
    for (var y = py-1; y <= py + 1; y++) {
        for (var x = px-1; x <= px + 1; x++) {
            if(map.cells[x][y] == 2) minasCount++;
            if(map.cells[x][y] == 3) tesourosCount++;
        }
    }
    minas = minasCount;
    tesouros = tesourosCount;
}


function passo(t){
  if (gameRunning) {
      dt = (t - anterior) / 1000;
      ctx.font = "20px Georgia";

      requestAnimationFrame(passo);
      //ctx.save();
      //ctx.translate(250,0);
      //ctx.scale(1,0.5);
      //ctx.rotate(Math.PI/4);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pc.mover(map, dt);
      // map.perseguir(pc);
      map.mover(dt);
      map.desenhar(ctx);
      pc.desenhar(ctx);
      if (map.cells[pc.gy][pc.gx] == 2) {
          console.log("Pisou ")
      }
      if (map.cells[pc.gy][pc.gx] == 3) {
          map.nextLevel(pc);
      }
      if (map.cells[pc.gy][pc.gx] == 4) {
          map.showSecret()
      }
      if (map.level >= 3) {
          ctx.font = "20px Georgia";

          ctx.fillStyle = "darkgreen";
          ctx.fillText("Parabéns, você venceu!", 150, 200, 400, 300);
          gameRunning = false;

      }
      contarObjetos(map, pc.gy, pc.gx);
      ctx.fillStyle = "darkgreen";
      // ctx.fillText("Energia", 10, 30);
      // ctx.fillStyle = 'green';
      // ctx.fillRect(10,50,10,20);
      anterior = t;
      //ctx.restore();
      frame = (frame < 9) ? frame : 1;
      // images.drawFrame(ctx,"pc",8,Math.floor(frame),0,0,64);
      frame += 2 * dt;
  }
}


function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:
        pc.vx = -100;
        pc.vy = 0;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        pc.vy = -100;
        pc.vx = 0;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:
        pc.vx = 100;
        pc.vy = 0;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        pc.vy = 100;
        pc.vx = 0;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
      case 39:
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 38:
      case 40:
        pc.vy = 0;
        break;
      default:

    }
  });
}
