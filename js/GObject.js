function GObject(sprite, pos, vel, accl){
  if(Object.getPrototypeOf(sprite) === Sprite.prototype){
    this.sprite = sprite;
  }else{
    console.warn('GObject Error:: No Sprite.');
    return false;
  }

  this.pos  = Vector.isVector(pos) ? pos : Vector2(0,0); //position
  this.vel  = Vector.isVector(vel) ? vel : Vector2(0,0); //velocity
  this.accl = Vector.isVector(vel) ? vel : Vector2(0,0); //acceleration

  this.oldUpdateTime = getTime();

  this.active = typeof active ==='boolean' ? active : true;
  __GObjectList.push(this);
}
GObject.prototype.update = function(){
  var now = getTime();
  var duration = (now - this.oldUpdateTime)/1000;
  var vel = Vector2(this.vel);
  this.pos.sum(vel.mul(duration));

  var accl = Vector2(this.accl);
  this.vel.sum(accl.mul(duration));

  this.sprite.update();
  this.oldUpdateTime = now;
}
GObject.prototype.setPosition = function(){
  if(arguments.length === 1 && Vector.isVector(arguments[0])){
    this.pos = arguments[0];
  }else if(arguments.length ===2 && typeof arguments[0] ==='number' && typeof arguments[1] ==='number'){
    this.pos = Vector2(arguments[0],arguments[1]);
  }
}
GObject.prototype.setVelocity = function(){
  if(arguments.length === 1 && Vector.isVector(arguments[0])){
    this.vel = arguments[0];
  }else if(arguments.length ===2 && typeof arguments[0] ==='number' && typeof arguments[1] ==='number'){
    this.vel = Vector2(arguments[0],arguments[1]);
  }
}
GObject.prototype.setAcceleration = function(){
  if(arguments.length === 1 && Vector.isVector(arguments[0])){
    this.accl = arguments[0];
  }else if(arguments.length ===2 && typeof arguments[0] ==='number' && typeof arguments[1] ==='number'){
    this.accl = Vector2(arguments[0],arguments[1]);
  }
}
GObject.prototype.getPosition = function(){
  return this.pos;
}
GObject.prototype.getVelocity = function(){
  return this.vel;
}
GObject.prototype.getAcceleration = function(){
  return this.accl;
}




GObject.prototype.render = function(ctx){
  if(!ctx || Object.getPrototypeOf(ctx) !== CanvasRenderingContext2D.prototype || this.active === false || Math.abs(this.pos.x) === Infinity || Math.abs(this.pos.y) ===Infinity){
    return false;
  }
  ctx.save();
  ctx.translate(this.pos.x,this.pos.y);
  this.sprite.draw(ctx);
  ctx.restore();
}
var __GObjectList = new Array();
