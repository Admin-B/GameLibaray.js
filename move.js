(function () {
    var canvas = document.getElementById('DOMcanvas');
    /********* preload *********/
    Resource.addImage('sky', './resources/Sky.png', preload);
    Resource.addImage('city', './resources/City Background.png', preload);
    Resource.addImage('cityF', './resources/City Foreground.png', preload);

    Resource.addImage('character', './resources/character.png', preload);
    Resource.addImage('tileset', './resources/tileset.png', preload);
    var loaded = 0;
    var max = 5;
    function preload() {
        if (++loaded == max) {
            //Run Program
            Run(canvas);
        }
    }
})();

var background;

var player;
var sprite;
var state;

function Setup(ctx) {
    background = new GObject(
        new Container(
            Tile(Resource.image.sky),
            Tile(Resource.image.cityF).setPosition(0, -100),
            Tile(Resource.image.city).setPosition(0, 50)
        )
    );
    sprite = {
        stand: {
            left: Sprite(Resource.image.character, Rect(3, 114, 19, 54)),
            right: Sprite(Resource.image.character, Rect(3, 170, 19, 54))
        },
        move: {
            left: Sprite(Resource.image.character,
                [Rect(28, 114, 19, 54), Rect(51, 114, 23, 54), Rect(78, 114, 19, 54), Rect(100, 114, 25, 54), Rect(128, 114, 19, 54), Rect(151, 114, 23, 54), Rect(3, 114, 19, 54)]
            ),
            right: Sprite(Resource.image.character,
                [Rect(28, 170, 19, 54), Rect(51, 170, 23, 54), Rect(78, 170, 19, 54), Rect(100, 170, 25, 54), Rect(128, 170, 19, 54), Rect(151, 170, 23, 54), Rect(3, 170, 19, 54)]
            )
        }
    };
    player = new GObject(sprite.stand.right);
    player.setPosition(width / 2 - 9.5, height / 2 - 27);
    player.status.speed = 50;
    // player.setVelocity(50, 0);
}

function Draw() {
    var pos = player.getPosition();
    if (player.inWindow()) {
        background.getItem().items[1].setPosition(-Math.max(0, pos.x * 0.1), -150);
        background.getItem().items[2].setPosition(-Math.max(0, pos.x * 0.6), 50);
    }
}

function keyDown(keyCode) {
    if (!wasKeyDown(keyCode)) {
        var nSprite;
        var speed = player.status.speed;
        switch (keyCode) {
            case 39:
                nSprite = sprite.move.right;
                player.setVelocity(speed, 0);
                break;
            case 37:
                nSprite = sprite.move.left;
                player.setVelocity(-speed, 0);
                break;
        }
        if (nSprite) {
            player.changeItem(nSprite.clearFrame());
            player.status.keyCode = keyCode;
        }
    }
}

function keyUp(keyCode){
    if(keyCode === player.status.keyCode){
        var direction = player.getVelocity().x < 0 ? 'left' : 'right';
        player.setVelocity(0,0);
        player.changeItem(sprite.stand[direction]);
        
        player.status.keyCode = undefined;
    }
}
