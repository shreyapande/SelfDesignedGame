var player, playerAnimation;
var bird, birdAnimation;
var bg, bgImg;
var coin, coinImg, coinScore=0;
var car, carImg;
var score= 0;
var edges;

function preload(){
    playerAnimation= loadAnimation("girl1.png", "girl2.png","girl3.png","girl4.png","girl5.png",
    "girl6.png","girl7.png","girl8.png");
  
    birdAnimation= loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png",
    "bird6.png","bird7.png","bird8.png","bird9.png","bird10.png","bird11.png","bird12.png",
    "bird13.png","bird14.png")
  
    bgImg= loadImage("bg.jpg");
    coinImg= loadImage("coin.png");
    carImg= loadImage("car.png");
}

function setup(){

  createCanvas(900,600);

  bg= createSprite(600,300,1200,800);
  bg.addImage(bgImg);
  bg.scale= 2;
  bg.velocityX= -3;
  bg.x= bg.width/2;
  
  player= createSprite(100,450);
  player.addAnimation("running",playerAnimation);
  player.scale= 0.50;

  coinGroup= new Group();
  birdGroup= new Group();
  carGroup= new Group();

  edges= createEdgeSprites();
}

function draw(){

  background("grey");

  player.collide(edges);
  score= score+1;

  if(bg.x<0){
    bg.x= bg.width/2
  }

  if(keyIsDown(UP_ARROW)){
    player.y= player.y-10;
  }
  if(keyIsDown(DOWN_ARROW)){
    player.y= player.y+10;
  }

  for(var i=0; i<coinGroup.length; i++){
    if(coinGroup.get(i).isTouching(player)){
        coinGroup.get(i).destroy();
        coinScore+=1;
    }
    }

    spawnCoins();
    spawnBirds();
    spawnCars();
    drawSprites();

  textSize(30);
  fill("black");
  stroke(5);
  text("SCORE: "+score,500,40);

  textSize(30);
  fill("black");
  stroke(5);
  text("COINS: "+coinScore,30,40);
}

function spawnCoins(){
  
    if(frameCount%20===0){
      
      coin= createSprite(1000,10);
      coin.y= Math.round(random(500,5));
      coin.velocityX= -4;
      coin.addImage(coinImg);
      coin.scale= 0.09;
      coin.lifetime= 500;
      coin.velocityX = -(3 + score/200);
      coinGroup.add(coin);
     }
  }
  
  function spawnBirds(){
    if(frameCount%90===0){
      bird= createSprite(1000,10);
      bird.y= Math.round(random(400,10));
      bird.velocityX= -3;
      bird.scale= 0.50;
      bird.addAnimation("flying",birdAnimation);
      bird.lifetime= 500;
      birdGroup.add(bird);
    }
  }

  function spawnCars(){
    if(frameCount%90===0){
      car= createSprite(900,500);
      car.y= Math.round(random(600,400));
      car.addImage(carImg);
      car.velocityX= -3;
      car.scale= 0.1;
      car.lifetime= 500;
      carGroup.add(car);
    }
  }
  