(function () {
    var canvas = document.getElementById('canvas');
    /********* preload *********/
    Resource.addImage('groundTileset', './resources/ground_tiles.png', preload);

    var loaded = 0;
    var max = 1;
    function preload() {
        if (++loaded == max) {
            //Run Program
            Run(canvas);
        }
    }
})();

var gameState = {
    map: {
        data: [],
        size: Vector2(100, 100),
        tileSize: 32,
    }
};

var tileset = new Array();
function Setup() {
    tileset.push(
        Tile(Resource.image.groundTileset, Rect(32, 64, 32, 32)),
        Tile(Resource.image.groundTileset, Rect(64, 64, 32, 32)),
        Tile(Resource.image.groundTileset, Rect(32, 96, 32, 32)),
        Tile(Resource.image.groundTileset, Rect(64, 96, 32, 32))
    );
    /* 맵 공간 확보 */
    var map = gameState.map;
    for (var y = 0; y < map.size.y; y++) {
        map.data[y] = new Array(map.size.x);
    }
    for (var x = 0; x < width / 32; x += 2) {
        for (var y = 0; y < height / 32; y += 2) {
            attachTile(Vector2(2, 2), Vector2(x, y), //size, position, data
                [
                    [tileset[0], tileset[1]],
                    [tileset[2], tileset[3]]
                ]);
        }
    }

}

function attachTile(size, pos, sprite) {
    var map = gameState.map;
    if (size.x === 1 && size.y === 1) {
        map.data[pos.y][pos.x] = new GObject(sprite).setPosition(pos.x * map.tileSize, pos.y * map.tileSize);
        return;
    }
    if (size.x > 1 || size.y > 1) {
        for (var y = pos.y; y < pos.y + size.y; y++) {
            for (var x = pos.x; x < pos.x + size.x; x++) {
                map.data[pos.y][pos.x] = new GObject(sprite[y - pos.y][x - pos.x]).setPosition(x * map.tileSize, y * map.tileSize);
            }
        }
        return;
    }
}
