function ImageLoader(){
  this.images = {};
}

ImageLoader.prototype.load = function (key, imgURL) {
  var img = new Image();
  img.src = imgURL;
  this.images[key] = img;
};

ImageLoader.prototype.drawSprite = function(ctx, key, sx, sy, sw, sh, dx, dy, dw, dh){
  ctx.drawImage(this.images[key],
    sx, sy, sw, sh,
    dx, dy, dw, dh
  );

}

ImageLoader.prototype.drawFrame = function(ctx,key,row,col,x,y, size){
  this.drawSprite(ctx, key, col*size, row*size, size, size, x, y, size, size);
}
