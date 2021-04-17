var backImage,backgr;
var player, player_running;
var ground,ground_img, bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
   // textSize(50);

  if(keyDown(32) && player.y >= 120) {
      player.velocityY = -12;
  }
   
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += + 0.01
    }

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;
    backgr.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(15);
    fill(255);
    text("Score: " + score, 650, 50);
    textSize(30);
    fill(255);
    text("Game Over!", 300,220);
  }

  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 400;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0 || frameCount % 270 === 0 || frameCount % 390 === 0){
    var obstacle = createSprite(800, 320, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 400;
    obstacle.setCollider("circle", 50,50);
    //player.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  }
}