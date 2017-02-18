function Setup(){
  // one frame sprite :: can sharing.
  var prototype={
    tileset:{
      under:{
        'large' :new Sprite([Resource.image.tileset,[Rect(4  ,88,96,32)]]),
        'rect'  :new Sprite([Resource.image.tileset,[Rect(104,88,32,32)]]),
        'stairs_up'  :new Sprite([Resource.image.tileset,[Rect(140,88,32,32)]]),
        'stairs_down':new Sprite([Resource.image.tileset,[Rect(172,88,32,32)]]),
        'moon' :new Sprite([Resource.image.tileset,[Rect(160,0,24,24)]])
      }
    }
  };
  for(var x = 0 ; x <= 96*6; x+=96){
    new GObject(prototype.tileset.under.large, Vector2(x,height-32));
  }
  new GObject(prototype.tileset.under.stairs_up, Vector2(300,height-32-32));
  for(var x=332; x<332+32*5; x+=32){
    new GObject(prototype.tileset.under.rect, Vector2(x,height-32-32));
  }
  new GObject(prototype.tileset.under.stairs_down, Vector2(492,height-32-32));
  new GObject(prototype.tileset.under.moon, Vector2(width-50,10));
}
function Draw(ctx){
}
