function Sprite(){
  if(arguments.length === 1 && Array.isArray(arguments[0])){
    arguments = arguments[0];
  }
  var image  = arguments[0];
  var frame  = arguments[1];
  var delay  = arguments[2];
  if(!image || getPrototypeOf(image) !== Image.prototype){
    console.log(arguments)
    console.warn('Sprite Error:: Not Image');
    return false;
  }
  this.image = image;
  this.frame = Array.isArray(frame) ? frame : [new Rect(0,0,image.width,image.height)];
  this.index = 0;
  this.count = this.frame.length;
  this.delay = typeof this.delay === 'number' ? delay : 100;
  this.nowFrame = this.frame[this.index];

  this.oldAniTime = getTime();
  this.callback   = {
    lastFrame : undefined,
    firstFrame: undefined
  };
}
Sprite.prototype.getWidth=function(){
  return this.nowFrame.width;
}
Sprite.prototype.getHeight=function(){
  return this.nowFrame.height;
}
Sprite.prototype.addCallback=function(type, func){
  var callbackTypes = ['lastFrame','firstFrame'];
  if(callbackTypes.indexOf(type) !== -1 && typeof func ==='function'){
    this.callback[type] = func;
  }
}
Sprite.prototype.attachFrame=function(frame){
  if(Array.isArray(frame)){
    arguments = frame;
  }
  var arr = [];
  for(var i = 0; i<arguments.length; i++){
    if(!arguments[i]){
      break;
    }
    if(getPrototypeOf(arguments[i]) === Rect.prototype){
      arr.push(arguments[i]);
      continue;
    }
    break;
  }
  if(arr.length === 0){
    return false;
  }else{
    this.frame = arr;
    this.count = arr.length;
    this.index = 0;
    return true;
  }
}
Sprite.prototype.update=function(){
  var now = getTime();
  if(now-this.oldAniTime >= this.delay){
    if(++this.index >= this.count){
      this.index = 0;
    }
    this.nowFrame = this.frame[this.index];

    if( this.count > 1 ){
      //callback: lastFrame
      if(this.index === this.count - 1 && typeof this.callback.lastFrame === 'function'){
        this.callback.lastFrame();
      }
      if(this.index === 0 && typeof this.callback.firstFrame === 'function'){
        this.callback.firstFrame();
      }
    }
    this.oldAniTime = now;
  }
}
Sprite.prototype.draw=function(ctx){
  if(!isContext(ctx)){
    return false;
  }
  var nowFrame = this.frame[this.index];
  ctx.drawImage(this.image, nowFrame.x, nowFrame.y, nowFrame.width, nowFrame.height, 0, 0, nowFrame.width, nowFrame.height);
  return true;
}
/**************Rect*************/
function Rect(x, y, width, height){
  if(!(this instanceof arguments.callee)){
    return new arguments.callee(x,y,width,height);
  }
  this.x      = typeof x === 'number' ? x : 0;
  this.y      = typeof y === 'number' ? y : 0;
  this.width  = typeof width === 'number' ? width :0;
  this.height = typeof height === 'number' ? height : 0;
  return true;
}
Rect.prototype.isCollision=function(oRect){
  if(getPrototypeOf(oRect) !== Rect.prototype){
    return false;
  }
  return (this.x>=oRect.x && this.x<=oRect.x+oRect.width && this.y>=oRect.y && this.y<=oRect.y+oRect.height) || (oRect.x>=this.x && oRect.x<=this.x+this.width && oRect.y>=this.y && oRect.y<=this.y+this.height);
}

Rect.prototype._isCollision=function(oRect, pos, oPos){
  if(getPrototypeOf(oRect) !== Rect.prototype || !Vector.isVector(pos) || !Vector.isVector(oPos)){
    return false;
  }
  return (this.x + pos.x>=oRect.x + oPos.x && this.x + pos.x<=oRect.x + oPos.x+oRect.width && this.y + pos.y>=oRect.y + oPos.y && this.y + pos.y<=oRect.y + oPos.y+oRect.height) ||
         (oRect.x + oPos.x>=this.x + pos.x && oRect.x + oPos.x<=this.x + pos.x+this.width && oRect.y + oPos.y>=this.y + pos.y && oRect.y + oPos.y<=this.y + pos.y+this.height);
}
