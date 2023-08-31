var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back;
var birdFlying;
var bgImg;
var player1 , player2;
var player1Img , player2Img;
var wood , stone , woodImg , stoneImg;
var flag , flagImg;
var invisibleGround;
var player1jumpImg;
var button , buttonImg;
var gameOver , gameOverImg , gameOverSound , checkPointSound , jumpSound , bgSound  ;

var woods = [];
var stoneG = [];

var life = 500;
var score = 0;

var life1 = 500;
var score1 = 0;

function preload() {
    //birdFlying = loadAnimation( "./assets/bird3.png" ,
               // "./assets/bird4.png" , "./assets/bird5.png" , "./assets/bird6.png");
    bgImg = loadImage("./assets/mbg.gif");
    player1Img = loadImage("./assets/cycle1.png");
    player2Img = loadImage("./assets/cycle2.png");
    woodImg = loadImage("./assets/wood.png");
    stoneImg = loadImage("./assets/stone.png");
    flagImg = loadImage("./assets/finish.png");
    buttonImg = loadImage("./assets/reset1.png");
    gameOverImg = loadImage("./assets/gameOver.png");

    gameOverSound = loadSound("mixkit-sad-game-over-trombone-471.wav");
    jumpSound = loadSound("jump.mp3");
    checkPointSound = loadSound("checkpoint.mp3");
   // Sound.loadSound(""); 
}

function setup() {
    createCanvas(1200 , 600);
  
    back = createSprite(width/2 , height/2 );
    back.addImage(bgImg);
    back.scale = 3;
    back.velocityX = -5;

    player1 = createSprite(500 , 380 ,100 , 100);
    player1.addImage("run" , player1Img);
    player1.setCollider("rectangle",0,0,270,player1.height);
    player1.debug = false;
    
    player2 = createSprite(400 , 410 ,100 , 100);
    player2.addImage(player2Img);
    player2.setCollider("rectangle",0,0,400,player2.height);
    player2.debug = false;

    invisibleGround = createSprite(600,550,900,20);
    invisibleGround.visible = false;

    button = createSprite(600 , 370);
    button.addImage(buttonImg);
    button.scale = 0.3;
    button.visible = false;

    gameOver = createSprite(600,300);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
}

function draw() {
    background("lightgreen");

    //console.log(mouseX);
    //console.log(mouseY);

    player1.collide(invisibleGround);
    player2.collide(invisibleGround);

    if (gameState === PLAY) 
    {
      createWood();
      createStone();
      createFinishline();

      if (frameCount >= 50 && frameCount <= 100) {
        fill("black");
        text("PRESS SPACE TO JUMP" , 600 , 200);
      }

      if (back.x < 520){
        back.x = 650;
      }

      //back.visible = true;

      gameOver.visible = false;

      score = score + Math.round(getFrameRate()/50);
      score1 = score1 + Math.round(getFrameRate()/60);

      if(score>0 && score%100 === 0){
        checkPointSound.play() 
     }

      if (keyDown("space")) 
      {
        player1.velocityY = -7;
        jumpSound.play();
      }

      player1.velocityY = player1.velocityY + 0.8;

      for (let i = 0; i < woods.length; i++) {
        if (player1.isTouching(woods[i]))
        {
          if (life > 0) {
            life =  life - 125;
          }

          woods[i].destroy()
        }

        if(woods[i].isTouching(player2))
      {
        player2.velocityY = -10;
        jumpSound.play();    
      }
    }

    for (let z = 0; z < stoneG.length; z++) {
      if (player1.isTouching(stoneG[z]))
        {
          if (life > 0) {
            life =  life - 125;
          }

          stoneG[z].destroy()
        }

        if(stoneG[z].isTouching(player2))
      {
        player2.velocityY = -10;
        jumpSound.play();    
      }
    }
      player2.velocityY = player2.velocityY + 0.8;

      if (life === 0)
      {
        gameState = END; 
        gameOverSound.play()
      }
    }
    
    if (gameState === END) {
      //woods.destroyEach();
      //  stoneG.destroyEach();

      player2.visible = false;
      player1.visible = false;;

      back.velocityX = 0;
      //gameOver();

      button.visible = true;
      gameOver.visible = true;

      /*if (mousePressedOver(confirmButtonText)) {
        console.log("do nothing")    
       }*/
    
    }

    if (mousePressedOver(button)) {
      reset();
    }
  
    fill("black"); 
    text(`Score:${score}`, 895, 70);
    text("Life: " +life , 895 , 90);

    text(" Player2 ", 195 , 50);
    text(" Player1 ", 895 , 50);

    text("Score: " +score1 , 195 , 70);
    text("Life: " +life1 , 195 , 90);
          
    drawSprites();
}

function reset()
{
  gameState = PLAY;

  score = 0;
  score1 = 0;

  life = 500;
  life1 = 500;

  button.visible = false;
  gameOver.visible = false;

  player1.visible = true;
  player2.visible = true; 

  back.velocityX = -5;
  if (back.x < 520){
   back.x = 650;
  }

}

function createWood() {
    if (frameCount % 120 === 0) {
      wood = createSprite(1220 , Math.round(random(500 , 518)));
      wood.velocityX = -(6 + score/100);
      wood.addImage(woodImg);
      wood.scale = 0.3;
      //wood.lifetime = 500;
      wood.setCollider("rectangle",0,0,400,wood.height);
      wood.debug = false;

      woods.push(wood);
    }
  }

  function createStone() {
    if (frameCount % 270 === 0) {
      stone = createSprite(1220 , Math.round(random(500 , 518)));
      stone.velocityX = -(6 + score/100);
      stone.addImage(stoneImg);
      stone.scale = 0.3;
     // stone.lifetime = 500;
     stone.setCollider("rectangle",0,0,400,stone.height);
     stone.debug = false;

     stoneG.push(stone);
    }
  }

  function createFinishline() {
    if (frameCount === 5000 ) {
      flag = createSprite(1220 , 509);
      flag.addImage(flagImg);
      flag.scale = 0.5;
      flag.velocityX = -5;
    }
  }

  /*function gameOver() 
 {
    swal(
   {
      title: `Game Over`,
      text: "Sorry, you lost the race ",
      imageUrl:
              "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
    Swal.fire("try again").then(() => {
      reset();
    });
  }*/

  function showRank() {
    swal({
      title: `Awesome!`,
      text: "You reached the finish line successfully",
      imageUrl:
        "./assets/winner.jpg",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
