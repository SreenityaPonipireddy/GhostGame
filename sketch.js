var ghost, ghostImage;
var door, doorImage, doorGroup;
var tower, towerImage;
var climber, climberImage, climberGroup;
var invisibleBlock, ibGroup;
var gameState="PLAY";
var loudSound;


function preload(){
ghostImage = loadImage("ghost-jumping.png");
doorImage = loadImage("door.png");
towerImage = loadImage("tower.png");
climberImage = loadImage("climber.png");  

loudSound = loadSound("spooky.wav");

}







function setup(){
createCanvas(600, 600);
  

  //Creating tower sprite
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.setVelocity(0, 1);
  
  //Creating ghost sprite
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale=0.3;
  
  
  //Creating Groups
  ibGroup= new Group();
  doorGroup = new Group();
  climberGroup = new Group();
}







function draw(){
background("black");
console.log(frameCount);
  if (gameState==="PLAY"){
  //loudSound.play();
 if (tower.y>400){
   tower.y=tower.width/2;
 }
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.4;
  
  if (keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if (climberGroup.isTouching(ghost)){
    ghost.setVelocity(0,0);
  }
      
  if (ibGroup.isTouching(ghost)){
    ghost.destroy();
    //background("black");
    //doorGroup.visible=false;
    //climberGroup.visible=false;
   gameState="END"; 
  }
    
  
    spawnDoors();
  }
  if (gameState==="END"){
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    ibGroup.destroyEach();
    tower.destroy();
    
    textSize(35);
    text("Game OVER!", 230, 250);
  }

  
  
  drawSprites();
  
}

function spawnDoors(){
    if (frameCount%240===0){
      door = createSprite(200, 0);
      door.addImage("door", doorImage);
      door.velocityY=1;
      door.x=Math.round(random(120, 400));
      door.lifetime=800;
      doorGroup.add(door);
      
      ghost.depth=door.depth;
      ghost.depth=ghost.depth+3;
      
      climber = createSprite(200, 50);
      climber.addImage("climber", climberImage);
      climber.velocityY=1;
      climber.x=door.x;
      climberGroup.add(climber);
      
      console.log(climber.x);
      climber.lifetime=800;
      
      invisibleBlock = createSprite(200, 65);
      invisibleBlock.width=climber.width;
      invisibleBlock.height=2;
      //invisibleBlock.debug=true;
      invisibleBlock.velocityY=1;
      invisibleBlock.x=door.x;
      
      invisibleBlock.lifetime=800;
      ibGroup.add(invisibleBlock);
    }
}
