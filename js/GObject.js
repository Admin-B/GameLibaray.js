function GObject(sprite, pos, active){
  if(Object.getPrototypeOf(sprite) === Sprite.prototype){
    this.sprite = sprite;
  }else{
    console.warn('GObject Error:: No Sprite.');
    return false;
  }
  if(Vector.isVector(pos)){
    this.x = pos.x;
    this.y = pos.y;
  }else{
    this.x = 0;
    this.y = 0;
  }
  this.active = typeof active ==='boolean' ? active : true;
  __GObjectList.push(this);
}
GObject.prototype.update = function(){
  this.sprite.update();
}
GObject.prototype.render = function(ctx){
  if(!ctx || Object.getPrototypeOf(ctx) !== CanvasRenderingContext2D.prototype || this.active === false){
    return false;
  }
  ctx.save();
  ctx.translate(this.x,this.y);
  this.sprite.draw(ctx);
  ctx.restore();
}
var __GObjectList = new Array();
