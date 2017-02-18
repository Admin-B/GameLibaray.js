function Sprite(){
  if(arguments.length === 1 && Array.isArray(arguments[0])){
    arguments = arguments[0];
  }
  var image  = arguments[0];
  var frame  = arguments[1];
  var delay  = arguments[2];
  if(!image || Object.getPrototypeOf(image) !== Image.prototype){
    console.log(arguments)
    console.warn('Sprite Error:: Not Image');
    return false;
  }
  this.image = image;
  this.frame = Array.isArray(frame) ? frame : [new Rect(0,0,image.width,image.height)];
  this.index = 0;
  this.count = this.frame.length;
  this.delay = typeof delay === 'number' ? delay : 100;

  this.nowFrame = this.frame[this.index];

  this.oldAniTime = getTime();
  this.callback   = {
    lastFrame : undefined,
    firstFrame: undefined
  };
}
Sprite.prototype.addCallback=function(type, func){
  var callbackTypes = ['lastFrame','firstFrame'];
  if(callbackTypes.indexOf(type) !== -1 && typeof func ==='function'){
    this.callback[type] = func;
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
  if(!ctx || Object.getPrototypeOf(ctx) !== CanvasRenderingContext2D.prototype){
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
  if(Object.getPrototypeOf(oRect) !== Rect.prototype){
    return false;
  }
  return (this.x>=oRect.x && this.x<=oRect.x+oRect.width && this.y>=oRect.y && this.y<=oRect.y+oRect.height) || (oRect.x>=this.x && oRect.x<=this.x+this.width && oRect.y>=this.y && oRect.y<=this.y+this.height)
}
