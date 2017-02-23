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
            Tile(Resource.image.city)
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
    player = new GObject(sprite.move.right);
    player.setPosition(- 9.5, height / 2 - 27);
    player.setVelocity(50, 0);
}

function Draw() {
    var pos = player.getPosition();
    if (player.inWindow()) {
        background.getItem().items[1].setPosition(-Math.max(0, pos.x * 0.1), 0);
    }
}