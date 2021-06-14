const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let keys = [];

const player = {
  x: 300,
  y: 250,
  width: 40,
  height: 72,
  frameX: 0,
  frameY: 0,
  speed: 7,
  moving: false
};

//sprites

const playerSprite = new Image();
playerSprite.src = "chewie.png";

const background = new Image();
background.src = "background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function(e){
  if(!keys.includes(e.code)){
    keys.push(e.code)
  }
});

window.addEventListener("keyup", function(e){
  if(keys.includes(e.code)){
    const index = keys.indexOf(e.code);
    keys.splice(index, 1)
  }
  player.moving = false;
});

function movePlayer(){
  if(keys.includes("ArrowUp") || keys.includes("KeyW")) {
    if(player.y > 90){
      player.y -= player.speed;
      player.frameY = 3;
    }
    player.moving = true;
  } else if(keys.includes("ArrowDown") || keys.includes("KeyS")){
    if(player.y < 420){
      player.y += player.speed;
      player.frameY = 0;
    }
    player.moving = true;
  } else if(keys.includes("ArrowLeft") || keys.includes("KeyA")){
    if(player.x > 100){
      player.x -= player.speed;
      player.frameY = 1;
    }
    player.moving = true;
      }else if(keys.includes("ArrowRight") || keys.includes("KeyD")){
    if(player.x < 750){
      player.x += player.speed;
      player.frameY = 2;
    }
    player.moving = true;
  }
  console.log("Held down keys: " + keys + "\n" + "Player X: " + player.x + "\n" + "Player Y: " + player.y);
}

function handlePlayerFrame(){
  if(player.frameX < 3 && player.moving){
    player.frameX++;
  }else{
    player.frameX = 0;
  }
}

//force frame rate

let fpsInterval, startTime, now, then, elapsed;

function startAnimation(fps){
  fpsInterval = 1000/fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if(elapsed > fpsInterval){
    then = now - (elapsed % fpsInterval);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    drawSprite(playerSprite,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x, player.y, player.width, player.height);

    movePlayer();
    handlePlayerFrame();
  }
}
startAnimation(16);