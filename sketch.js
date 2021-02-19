var shark,sharkImage,fish,rand,fishGroup,bag,bagimage;
var bg,bgimage,f1,f2,f3,f1image,f2image,f3image,bagGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score,restartimage,restart,crab,crabImage,crabGroup;

function preload(){
sharkImage=loadImage("shark.png");
   bgImage=loadImage("water.jpg");
  f1image=loadImage("f1.png");
   f2image=loadImage("f2.png");
   f3image=loadImage("f3.png");
  bagimage=loadImage("bag.png");
  restartimage=loadImage("restart.png");
  crabImage=loadImage("crab.png");
}

function setup() {
 createCanvas(600,600);
  
  score=0;
  
  bg=createSprite(300,300);
  bg.addImage(bgImage);
  bg.scale=3;
  bg.velocityX=-2;
  
  shark=createSprite(200,200,1,1);
  shark.addImage(sharkImage);
  shark.scale=1;
    
  shark.setCollider("rectangle",0,0,200,20);
  //shark.debug = true;
  
  restart = createSprite(300,350);
  restart.addImage(restartimage);
  restart.scale=0.5;
  
  
  fishGroup=new Group();
  bagGroup=new Group();
  crabGroup= new Group();
}

function draw() {
  
   if(bg.x<200){
    bg.x=300;
  }
   if(gameState === PLAY){
  shark.y= World.mouseY;
  shark.x= World.mouseX;
     camera.position.x=shark.x;
     camera.position.y=shark.y;
  
  if(shark.isTouching(fishGroup)){
fishGroup.destroyEach();
      score=score+2;
  }
if(score===10){
  crab();
}
restart.visible=false;
     
  if(shark.isTouching(bagGroup)){
gameState=END;
  }
  if(shark.isTouching(crabGroup)){
gameState=END;
  }
  createFish();
  bag();
     
   }
  
   drawSprites(); 
  
  if (gameState === END) {
     
  shark.velocityX = 0;
  shark.velocityY = 0;
    
    if(shark.isTouching(bagGroup)){
      fill("blue");
      textSize(25);
      text("You touched the garbage!",150,400);
    }     
    
    if(shark.isTouching(crabGroup)){
      fill("blue");
      textSize(25);
      text("You touched the crab!",150,400);
    }     
    fishGroup.setLifetimeEach(-1);
    bagGroup.setLifetimeEach(-1);
    crabGroup.setVelocityXEach(0);
     
     fishGroup.setVelocityXEach(0);
     bagGroup.setVelocityXEach(0);
    crabGroup.setVelocityXEach(0);
    bg.velocityX=0;
    
    restart.visible=true;
         
     textSize(45);
     fill("blue");
     text("You Lose!!",200,300);
  
      }
  
  fill("red");
  textSize(20);
   text("Score: "+ score,250,50);

if(mousePressedOver(restart)) {
      reset();
    }
}

function createFish(){
  if(World.frameCount%80===0){
    fish= createSprite(600,300,20,20);
    fish.scale=0.5;
    fish.setCollider("circle",0,0,30);
   // fish.debug=true;
    rand=Math.round(random (1,3));
    
     if(rand == 1){
       fish.addImage(f1image);      
    }
    else if (rand == 2){
      fish.addImage(f2image);
    }
    else {
      fish.addImage(f3image);
    }

    
    fish.y=Math.round(random(200,450));
    fish.velocityX=-5;
    fish.lifetime=100;
    
   fishGroup.add(fish);
    
  }
}

function bag(){
  if(World.frameCount%100===0){
   var bag = createSprite(400,200,20,20);
  bag.addImage(bagimage);
    bag.y=Math.round(random(100,450));
    bag.debug=false;
    bag.setLifetime=100;
    bag.velocityX=-3;
    bag.scale=0.3;
    bagGroup.add(bag);
    
  }
}
function reset(){
  gameState=PLAY;
  restart.visible=false;
  bagGroup.destroyEach();
  fishGroup.destroyEach();
  bg.velocityX=-2;
  score=0;
}
function crab(){
  if(World.frameCount%120===0){
   var crab = createSprite(400,500,20,20);
  crab.addImage(crabImage);
    crab.setLifetime=100;
    crab.velocityX=-4;
    crab.scale=0.3;
    
    
    crabGroup.add(crab);
    
  }
}
