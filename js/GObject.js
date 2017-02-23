function GObject(item, pos, vel, accl) {
  var prototype = getPrototypeOf(item);
  if (prototype === Sprite.prototype || prototype === Container.prototype) {
    this.item = item;
  } else {
    console.warn('GObject Error:: No item.');
    return false;
  }
  this.pos = Vector.isVector(pos) ? pos : Vector2(0, 0); //position
  this.vel = Vector.isVector(vel) ? vel : Vector2(0, 0); //velocity
  this.accl = Vector.isVector(vel) ? vel : Vector2(0, 0); //acceleration

  this.geometry = [Rect(0, 0, item.getWidth(), item.getHeight())];
  this.rect = Rect(0, 0, item.getWidth(), item.getHeight());

  this.oldUpdateTime = getTime();
  this.status = new Object();

  this.active = typeof active === 'boolean' ? active : true;
  __GObjectList.push(this);
}

GObject.prototype.getItem = function () {
  return this.item;
}

GObject.prototype.changeItem = function (item) {
  var prototype = getPrototypeOf(item);
  if (prototype === Sprite.prototype || prototype === Container.prototype) {
    this.item = item;
    this.geometry = [Rect(0, 0, item.getWidth(), item.getHeight())];
    this.rect = Rect(0, 0, item.getWidth(), item.getHeight());
  }
  return this;
}

GObject.prototype.applyGeometry = function (g) {
  if (Array.isArray(g)) {
    arguments = g;
  }
  var arr = [];
  var rect = Rect(0, 0, 0, 0);
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i]) {
      break;
    }
    if (getPrototypeOf(arguments[i]) === Rect.prototype) {
      var t = arguments[i];
      arr.push(t);
      if (t.x < rect.x) {
        rect.x = t.x;
        rect.width += -t.x;
      }
      if (t.width > rect.width) {
        rect.width = t.width;
      }
      if (t.y < rect.y) {
        rect.y = t.y;
        rect.height += -rect.y;
      }
      if (t.y + t.height > rect.y + rect.height) {
        rect.height = t.height;
      }
      continue;
    }
    break;
  }
  if (arr.length === 0) {
  } else {
    this.geometry = arr;
    this.rect = rect;
  }
  return this;
}
GObject.prototype.drawGeometry = function (ctx) {
  if (!isContext(ctx)) {
  return this;

  }
  ctx.save();
  ctx.translate(this.pos.x, this.pos.y);
  ctx.strokeStyle = 'red';
  var g = this.geometry;
  for (var i = 0; i < g.length; i++) {
    ctx.strokeRect(
      g[i].x,
      g[i].y,
      g[i].width,
      g[i].height
    );
  }
  ctx.restore();
  return this;
}
GObject.prototype.getRect = function () {
  return this.rect;
}
GObject.prototype.drawRect = function (ctx) {
  if (!isContext(ctx)) {
    return this;
  }
  ctx.save();
  ctx.translate(this.pos.x, this.pos.y);
  ctx.fillStyle = 'rgba(255,255,0,0.5)';
  ctx.fillRect(
    this.rect.x,
    this.rect.y,
    this.rect.width,
    this.rect.height
  );
  ctx.restore();
  return this;
}
GObject.prototype.isCollision = function (t) {
  var tPrototype = getPrototypeOf(t);
  switch (tPrototype) {
    case Rect.prototype:
      if (!this.rect._isCollision(t, this.pos)) {
        return false;
      }
      for (var i = 0; i < this.geometry.length; i++) {
        if (this.geometry[i]._isCollision(t, this.pos)) {
          return true;
        }
      }
      break;
    case GObject.prototype:
      if (!this.rect._isCollision(t.rect, this.pos, t.pos)) {
        return false;
      }
      for (var i = 0; i < this.geometry.length; i++) {
        for (var j = 0; j < t.geometry.length; j++) {
          if (this.geometry[i]._isCollision(t.geometry[j], this.pos, t.pos)) {
            return true;
          }
        }
      }
      break;
  }
  return false;
}
GObject.prototype.update = function () {
  if (this.active === false) {
    this.oldUpdateTime = now;
    return this;
  }
  var now = getTime();
  var duration = (now - this.oldUpdateTime) / 1000;

  var vel = Vector2(this.vel);
  this.pos.sum(vel.mul(duration));

  var accl = Vector2(this.accl);
  this.vel.sum(accl.mul(duration));

  this.item.update();
  this.oldUpdateTime = now;
  return this;
}
GObject.prototype.setPosition = function () {
  if (arguments.length === 1 && Vector.isVector(arguments[0])) {
    this.pos = arguments[0];
  } else if (arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
    this.pos = Vector2(arguments[0], arguments[1]);
  }
  return this;
}
GObject.prototype.inWindow = function () {
  return this.rect._isCollision(Rect(0, 0, width, height), this.pos, Vector2());
}
GObject.prototype.setVelocity = function () {
  if (arguments.length === 1 && Vector.isVector(arguments[0])) {
    this.vel = arguments[0];
  } else if (arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
    this.vel = Vector2(arguments[0], arguments[1]);
  }
  return this;
}
GObject.prototype.setAcceleration = function () {
  if (arguments.length === 1 && Vector.isVector(arguments[0])) {
    this.accl = arguments[0];
  } else if (arguments.length === 2 && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
    this.accl = Vector2(arguments[0], arguments[1]);
  }
  return this;
}
GObject.prototype.getPosition = function () {
  return this.pos;
}
GObject.prototype.getVelocity = function () {
  return this.vel;
}
GObject.prototype.getAcceleration = function () {
  return this.accl;
}

GObject.prototype.render = function (ctx) {
  if (!isContext(ctx) || this.active === false || Math.abs(this.pos.x) === Infinity || Math.abs(this.pos.y) === Infinity) {
    return false;
  }
  ctx.save();
  ctx.translate(this.pos.x, this.pos.y);
  this.item.draw(ctx);
  ctx.restore();
  return true;
}
var __GObjectList = new Array();
