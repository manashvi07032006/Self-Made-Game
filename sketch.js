const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bombGroup_player, bombGroup_enemy, platform, seaImg;
var ship_player, cannon1, bottom_player, holder;
var ship_enemy, cannon2, bottom_enemy;
var bombImg, bottomm, player, player_ani, playerImg, enemy, enemy_ani, enemyImg;
var cannonBalls_player, cannonBalls_enemy;
var balls=[];
var score = 0;

function preload(){
   seaImg = loadImage("sea2.gif");
   bombImg = loadImage("images/bom.png");
   bottom = loadImage("images/bt1.png");

   player = loadImage("images/player1.png");
   player_ani = loadAnimation("images/player1.png", "images/player2.png", "images/player3.png", "images/player4.png", "images/player5.png", "images/player6.png");
   playerImg = loadImage("images/boat1.png");

   enemy = loadImage("images/enemy1.png");
   enemy_ani = loadAnimation("images/enemy1.png", "images/enemy2.png", "images/enemy3.png", "images/enemy4.png", "images/enemy5.png", "images/enemy6.png");
   enemyImg = loadImage("images/boat2.png");

   bombBlast = loadSound("Sounds/bombBlast.mp3");
   backgroundmus = loadSound("Sounds/background.mp3");
}

function setup(){
  createCanvas(displayWidth, displayHeight);
  engine = Engine.create();
  world = engine.world;

  bombGroup_player = new Group();
  bombGroup_enemy = new Group();
  platform = new Ground(displayWidth/2, displayHeight/2 + 170, displayWidth, 20);

  ship_player = createSprite(displayWidth/2- 500, displayHeight/2 + 80, 50, 50);
  ship_player.addImage("plry", playerImg);
  ship_player.scale = 0.2;

  ship_enemy = createSprite(displayWidth/2+ 500, displayHeight/2 + 80, 0,0);
  ship_enemy.addImage("eniy", enemyImg);
  ship_enemy.scale = 0.2;

  cannon1 = createSprite(ship_player.x + 50 , ship_player.y+50 , 50, 50);
  cannon1.addAnimation("plr", player);
  cannon1.addAnimation("explode1", player_ani);

  cannon2 = createSprite(ship_enemy.x - 50, ship_enemy.y + 50, 50, 50);
  cannon2.addImage("emy", enemy);
  cannon2.addAnimation("explode2", enemy_ani);

  bottom_player = createSprite(displayWidth/2 - 500 , displayHeight/2 + 150, 20, 20);
  bottom_player.addImage("down", bottom);
  bottom_player.scale = 0.2; 
  
  bottom_enemy = createSprite(displayWidth/2 + 500 , displayHeight/2 + 150, 20, 20);
  bottom_enemy.addImage("down", bottom);
  bottom_enemy.scale = 0.2; 
}

function draw(){
    background("lightBlue");
    image(seaImg, 0, 0, width, height);
    
    Engine.update(engine);
 
    backgroundmus.play();
    cannon1.x = ship_player.x + 50;
    cannon1.y = ship_player.y + 50;

    if(keyWentDown(32)){
        cannon1.changeAnimation("explode1", player_ani); 
        cannonBalls_player = createSprite(cannon1.x + 50, cannon1.y, 20, 20);
        cannonBalls_player.addImage("bom", bombImg);
        cannonBalls_player.velocityX = 8;
        //cannonBalls_player.velocityY = -8;
        cannonBalls_player.scale = 0.3;
        bombGroup_player.add(cannonBalls_player);
        bombBlast.play();
    }
    else{
        cannon1.changeAnimation("plr",player)
    }
    for (var i = 0; i < bombGroup_player.length; i++) {
        if (bombGroup_player.get(i).isTouching(ship_enemy)) {
          bombGroup_player.get(i).destroy();
          score+=10;
        }
    }

    if(frameCount%100 === 0){
        cannon2.changeAnimation("explode2", enemy_ani); 
        cannonBalls_enemy = createSprite(cannon1.x + 50, cannon1.y, 20, 20);
        cannonBalls_enemy.addImage("bom", bombImg);
        cannonBalls_enemy.velocityX = -8;
        cannonBalls_enemy.scale = 0.3;
        bombGroup_enemy.add(cannonBalls_enemy);
        bombBlast.play();
    }
    else{
        cannon2.changeAnimation("emy",enemy)
    }
    for (var i = 0; i < bombGroup_enemy.length; i++) {
        if (bombGroup_enemy.get(i).isTouching(ship_player)) {
          bombGroup_enemy.get(i).destroy();
          score-=10;
        }
    }

    if(keyDown(RIGHT_ARROW) && ship_player.x<displayWidth/2){
        ship_player.x += 5;
        bottom_player.x += 5;
    }
    if(keyDown(LEFT_ARROW) && ship_player.x>0){
        ship_player.x -= 5;
        bottom_player.x -= 5;
    }
   
   // holder.display();
    platform.display();    
    drawSprites();
    textSize(20);
    fill("purple")
    text("Score: " + score, displayWidth/2 + 400, displayHeight/16);
}
