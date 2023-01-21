var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog,dogImg,bone1;
var groundImage;
var bone,boneImage,boneGroup;
var stone,stoneImage,stoneGroup;

var score =0;

function preload(){
  dog_running = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png");
  groundImage = loadImage("road img.jpg")
  boneImage = loadImage("bone.png")
  stoneImage = loadImage("stone.png")

  gameOverImage = loadImage("game over.png")
  restartImg = loadImage("restart.png")
}

function setup(){
  createCanvas(800,400);

  ground = createSprite(300,180);
  ground.addImage("ground",groundImage);
  ground.scale = 4
  //ground.x = ground.width /2;
  
  dog = createSprite(50,200,20,50);
  dog.addAnimation("running", dog_running);
  edges = createEdgeSprites();
  dog.scale = 0.5;
  dog.x = 650

   gameOver = createSprite(400,200,200,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2

  restart = createSprite(30,20,400,100);
  restart.addImage(restartImg);
  restart.scale = 0.1

  boneGroup = createGroup();
  stoneGroup = createGroup(); 

  score = 0;

}


function draw(){
  
  background(900);
  
  if(gameState===PLAY){
   
  ground.velocityX = 4

  gameOver.visible = false
  restart.visible = false

  if(ground.x<100)
  {
    ground.x=400
  }
   
  score = score + Math.round(frameCount/60);

  if(ground.x>=400){
    ground.x=ground.width/2
  }
   
  //jump when the space key is preesed
  if(keyDown("space")&& dog.y >=100){
    dog.velocityY = -14;
  }
   
  //add gravity
 //dog.velocityY = dog.velocityY + 0.8

 spawnBone();
 spawnStone();

 if(boneGroup.isTouching(dog)){
   score = score + 1;
   boneGroup.destroyEach();
 }

 if(stoneGroup.isTouching(dog)){
   gameState = END;
 }
 }
 else if (gameState === END){
   gameOver.x=camera.position.x;
   restart.x=camera.position.x;
  gameOver.visible = true;
  restart.visible = true;
   ground.velocityX = 0;
   dog.velocityY = 0;
   stoneGroup.setVelocityEach(0);
   boneGroup.setVelocityEach(0);

   if(mousePressedOver(restart)){
       reset();
   }
 }

 else if(gameState === WIN){
   ground.velocityX = 0;
   ground.velocityY = 0;
   stoneGroup.setVelocityEach(0);
   boneGroup.setVelocityEach(0);

   stoneGroup.setVelocityEach(-1);
   boneGroup.setVelocityEach(-1);
 }

  drawSprites();

  textSize(20);
  stroke(3)
  fill("black")
  text("score:"+ score,camera.position.x,50);
   
  if(score >=5){
    dog.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("congragulations!! you win the game!! ", 70,200);
    gameState = WIN;

 }
}

function spawnBone(){
  // write your code here 
  if(frameCount%150 === 0){
    bone=createSprite(500,100,40,90)
    bone.addImage(boneImage)
    bone.y=Math.round(random(10,60))
    bone.scale=0.20
    bone.velocityX= 3

    var bone = createSprite(camera.position.x+500,330,40,10);
     
    //bone.velocityX = -(6 + 3*score/100)
    //bone.scale = 0.6;

    bone.depth=dog.depth
    dog.depth=dog.depth+1

    boneGroup.add(bone);
    
    bone.scale = 0.05;
    bone.lifetime = 134;
    
  }
 }

 function spawnStone(){
   //adding stones
   if(frameCount % 60 === 0){
     stone = createSprite(200,100,40,10)
     stone.addImage(stoneImage)
     stone.y = Math.round(random(10,100));
     stone.scale = 0.20
     stone.velocityX = 3

     //stone.velocityX = -(6 + 3*score/100)

     stone.depth = dog.depth
     dog.depth = dog.depth+1

     stoneGroup.add(stone);
     stone.lifetime = 134;
   }
 }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    dog.visible = true;
    dog.changeAnimation("running",
             dog_running);
    stoneGroup.destroyEach();
    boneGroup.destroyEach();
    score = 0;         
  }