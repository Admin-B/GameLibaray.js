var background = [];
var player;
var playerSprite = {
  standL:[Rect(0,114,25,54)],
  standR:[Rect(0,169,25,54)],
  left:[Rect(0,114,25,54),Rect(25,114,25,54),Rect(52,114,25,54),Rect(77,114,21,54),Rect(100,114,27,54),Rect(126,114,25,54),Rect(150,114,25,54)],
  right:[Rect(0,169,25,54),Rect(25,169,25,54),Rect(50,169,25,54),Rect(77,169,21,54),Rect(100,169,27,54),Rect(126,169,25,54),Rect(150,169,25,54)]
};
var gameState={
  start:false,
  gravity:Vector2(0,200),
  playerDir:'R'
};
function Setup(){
  // one frame sprite :: can sharing.
  var prototype={
    background:{
      sky:new Sprite(Resource.image.sky),
      city:new Sprite(Resource.image.city),
      cityF:new Sprite(Resource.image.cityF,[Rect(-10, 120, width, height)])
    }
  };
  background.push(new GObject(prototype.background.sky),new GObject(prototype.background.cityF),new GObject(prototype.background.city));
  player = new GObject(new Sprite(Resource.image.character,playerSprite.standR));
  player.setPosition(width/2-12.5,height-54);
}
function Draw(ctx){
  var playerPos = player.getPosition();
  if(playerPos.y + 54 > height){
    var standType = playerSprite['stand'+gameState.playerDir];
    player.sprite.attachFrame(standType);
    player.setPosition(playerPos.x,height-54);
    player.setVelocity(0,0);
    player.setAcceleration(0,0);
    gameState.start = false;
  }
}
function mouseClick(pos,prev){
  var first = false;
  if(gameState.start === false){
    player.setVelocity(0,-120);
    player.setAcceleration(gameState.gravity);
    first = true;
    gameState.start = true;
  }
  if(pos.x < width/2){
    if(gameState.playerDir ==='R' || first){
      player.sprite.attachFrame(playerSprite.left);
    }
    gameState.playerDir = 'L';
    player.setVelocity(-30,-120);
  }else{
    if(gameState.playerDir ==='L' || first){
      player.sprite.attachFrame(playerSprite.right);
    }
    gameState.playerDir = 'R';
    player.setVelocity(30,-120);
  }
}
