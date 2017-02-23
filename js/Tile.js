function Tile(image, rect){
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(image, rect);
    }
    if(!rect){
        return new Sprite(image, rect);
    }else if(getPrototypeOf(rect) === Rect.prototype){
        return new Sprite(image, [rect]);
    }
    return false;
}