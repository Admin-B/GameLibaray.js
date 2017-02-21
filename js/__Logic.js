var background    = [];
var tilesetSprite = [];
var tileset       = [];
var player;

var gameState={
  start:true,
  gravity:Vector2(0,200),
  player:{
    sprite:{
      stand:{
        left :[Rect(0,114,25,54)],
        right:[Rect(0,169,25,54)]
      },
      left  :[Rect(0,114,25,54),Rect(25,114,25,54),Rect(52,114,25,54),Rect(77,114,21,54),Rect(100,114,27,54),Rect(126,114,25,54),Rect(150,114,25,54)],
      right :[Rect(0,169,25,54),Rect(25,169,25,54),Rect(50,169,25,54),Rect(77,169,21,54),Rect(100,169,27,54),Rect(126,169,25,54),Rect(150,169,25,54)]
    },
    direction:undefined,
    collide  :false
  }
};
function Setup(){
  background.push(
    new GObject(new Sprite(Resource.image.sky)),
    new GObject(new Sprite(Resource.image.city)),
    new GObject(new Sprite(Resource.image.cityF))
  );
  tilesetSprite.push(
    new Sprite(Resource.image.tileset,[Rect(240,0,48,32)])
  );
  /*tileset 1*/
  for(var i=0; i<10; i++){
    var tw = tilesetSprite[0].getWidth(),
        th = tilesetSprite[0].getHeight();
    tileset.push(
      new GObject(tilesetSprite[0],Vector2(i*tw,height-th))
    );
  }
  player = new GObject(
    new Sprite(Resource.image.character, gameState.player.sprite.stand.right)
  );
  player.attachGeometry(Rect(0,0,25,54));
  player.setPosition((width-player.width)/2,
                     300);
  player.setAcceleration(gameState.gravity);
}
function Draw(ctx){
  var pos = player.getPosition();
  if(!gameState.player.collide){
    for(var i = 0; i<tileset.length; i++){
      if(player.isCollision(tileset[i])){
        player.sprite.attachFrame(gameState.player.sprite.stand[gameState.player.direction]);
        player.setPosition(pos.x, tileset[i].pos.y-player.height);
        player.setVelocity(0,0);
        player.setAcceleration(0,0);
        gameState.player.collide = true;
        break;
      }
    }
  }
  background[1].setPosition(0,(pos.y + player.height - height) * 0.05);
  background[2].setPosition(0,(pos.y + player.height - height) * 0.1);

  player.drawGeometry(ctx);
  player.drawBox(ctx);
}
function keyDown(keyCode){
  move(keyCode);
}
function move(keyCode){
  if(keyCode !== 37 && keyCode !== 39){
    return false;
  }else{
    var t = keyCode === 37 ? 'left' : 'right';
  }
  if(gameState.player.collide){
    player.setAcceleration(gameState.gravity);
  }
  if(gameState.player.direction !== t){
      player.sprite.attachFrame(gameState.player.sprite[t]);
  }
  gameState.player.direction = t;
  gameState.player.collide = false;


  if(t == 'left'){
    player.setVelocity(-30,-120);
  }
  if(t == 'right'){
    player.setVelocity(30,-120);
  }
}
