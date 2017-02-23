function Container() {
    this.addItem(Array.from(arguments));
}
Container.prototype.items = new Array();
Container.prototype.update = function (ctx) {
    for (var i = 0; i < this.items.length; i++) {
        this.items[i].update();
    }
}
Container.prototype.draw = function (ctx) {
    for (var i = 0; i < this.items.length; i++) {
        this.items[i].draw(ctx);
    }
}
Container.prototype.getWidth = function () {
    return this.width;
}
Container.prototype.getHeight = function () {
    return this.height;
}
Container.prototype.addItem = function () {
    if (Array.isArray(arguments[0])) {
        arguments = arguments[0];
    }
    var max = {
        width: -Infinity,
        height: -Infinity
    };
    for (var i = 0; i < arguments.length; i++) {
        if (getPrototypeOf(arguments[i]) !== Sprite.prototype) {
            break;
        }
        var w = arguments[i].getWidth(),
            h = arguments[i].getHeight();
        if (max.width < w) {
            max.width = w;
        }
        if (max.height < h) {
            max.height = h;
        }
        this.items.push(arguments[i]);
    }
    this.width = w;
    this.height = h;
}