function Map(rows, collumns) {
  this.SIZE = 32;
  this.playerStart = [60,60];
  this.level = 1;
  this.shouldDraw = true;
  this.enemies = [];
  this.cells = [];
  this.secret = false;
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx) {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1 || (this.cells[r][c] == 5 && !this.secret)){
          wall = new Sprite();
          wall.imgKey = 'wall';
          wall.SIZE = 2;
          wall.poses = [{row: 0, col:0, frames:1, v: 0}];
          wall.imgSizes = [-15,-20,32];
          wall.images = this.images;
          wall.y = (r+0.5)*this.SIZE;
          wall.x = (c+0.5)*this.SIZE;
          wall.desenhar(ctx)
        // ctx.fillStyle = "brown";
        // ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].desenhar(ctx);
  }
};

Map.prototype.nextLevel = function(){
  this.level += 1;
  this.enemies = [];
  this.secret = false;
    this.setCells([
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,2,0,0,0,0,1,0,0,0,3,1],
        [1,6,2,0,0,1,0,1,0,0,0,0,1],
        [1,1,1,1,0,0,2,1,1,5,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,2,0,1],
        [1,4,0,0,0,0,1,0,2,0,0,0,1],
        [1,0,0,2,0,1,0,1,0,0,0,0,1],
        [1,1,1,0,0,0,0,1,1,1,1,0,1],
        [1,1,1,1,0,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]);
    pc.x = 60;
    pc.y = 300;
}

Map.prototype.showSecret = function () {
  this.secret = true;
};


Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 0:
              this.cells[i][j] = 0;
              break;
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          // newEnemy = new Sprite();
          // newEnemy.images = this.images;
          // newEnemy.y = (i+0.5)*this.SIZE;
          // newEnemy.x = (j+0.5)*this.SIZE;
          // this.enemies.push(newEnemy);
          break;
       case 3:
           newEnemy = new Sprite();
           newEnemy.imgKey = 'portal';
           newEnemy.SIZE = 2;
           newEnemy.poses = [{row: 0, col:0, frames:1, v: 1}];
           newEnemy.imgSizes = [-15,-20,32];
           newEnemy.images = this.images;
           newEnemy.y = (i+0.5)*this.SIZE;
           newEnemy.x = (j+0.5)*this.SIZE;
           this.enemies.push(newEnemy);
          this.cells[i][j] = 3;
          break;
        case 4:
            alavanca = new Sprite();
            alavanca.imgKey = 'switch';
            alavanca.SIZE = 2;
            alavanca.poses = [{row: 0, col:0, frames:1, v: 1}];
            alavanca.imgSizes = [-15,-15,38];
            alavanca.images = this.images;
            alavanca.y = (i+0.5)*this.SIZE;
            alavanca.x = (j+0.5)*this.SIZE;
            this.alavanca = alavanca;
            this.enemies.push(alavanca);
          this.cells[i][j] = 4;
          break;
        case 5:
              this.cells[i][j] = 5;
              break;
        case 6:
              this.cells[i][j] = 6;
            potion = new Sprite();
            potion.imgKey = 'potion';
            potion.SIZE = 2;
            potion.poses = [{row: 0, col:0, frames:1, v: 1}];
            potion.imgSizes = [-15,-15,38];
            potion.images = this.images;
            potion.y = (i+0.5)*this.SIZE;
            potion.x = (j+0.5)*this.SIZE;
            this.potion = potion;
            this.enemies.push(potion);


              break;
        default:
          // this.cells[i][j] = 0;
          break;
      }
    }
  }
};
Map.prototype.removePotion = function(){
    var idx = this.enemies.indexOf(this.potion);
    this.enemies.splice(idx, 1);
}

Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};
Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};
