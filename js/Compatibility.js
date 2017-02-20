// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// checking event listener compatibility
if (typeof Element.prototype.addEventListener === 'undefined') {
  Element.prototype.addEventListener = function (e, callback) {
    e = 'on' + e;
    return this.attachEvent(e, callback);
  };
}

function getMousePos(event) {
  var mouseX,mouseY
  var e = event.originalEvent || event,
    canvas = event.currentTraget || event.srcElement,
    boundingRect = canvas.getBoundingClientRect();
  if(e.touches){
    mouseX = e.touches[0].clientX-boundingRect.left;
    mouseY = e.touches[0].clientY-boundingRect.top;
  }else{
    mouseX = e.clientX-boundingRect.left;
    mouseY = e.clientY-boundingRect.top;
  }
  return Vector2(mouseX,mouseY);
}

function getWindowSize() {
  if (window.innerWidth && window.innerHeight) {
    return Vector2(window.innerWidth, window.innerHeight);
  }
  if (document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight) {
    return Vector2(document.documentElement.clientWidth, document.documentElement.clientHeight);
  }
  if (document.body) {
    return Vector2(document.body.clientWidth, document.body.clientHeight);
  }
}
