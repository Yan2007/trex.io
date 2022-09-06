let snd
var PLAY = 1;
var END = 0;
var gameStade = PLAY;
var trex,trex_img,ground,ground_img,ground2,nuvem_img,cacto_img,cacto_img2,cacto_img3,cacto_img4,cacto_img5,cacto_img6,trexCol;
var die
var jump
var point
var placar = 0;
//Variaveis de Grupos
var gruNuvens, gruCactos
var gameover,restart,gameover_img,restart_img

//Carregamento dos Arquivos
function preload(){
    trex_img = loadAnimation("trex1.png","trex3.png","trex4.png");
    trexCol = loadAnimation("trex_collided.png")
    ground_img = loadImage("ground2.png");
    nuvem_img = loadImage("cloud.png");
    cacto_img = loadImage("obstacle1.png");
    cacto_img2 = loadImage("obstacle2.png");
    cacto_img3 = loadImage("obstacle3.png");
    cacto_img4 = loadImage("obstacle4.png");
    cacto_img5 = loadImage("obstacle5.png");
    cacto_img6 = loadImage("obstacle6.png");
    soundFormats("mp3")
    jump =loadSound("jump.mp3")
    die =loadSound("die.mp3")
    point =loadSound("checkpoint.mp3")
    gameover_img = loadImage("gameOver.png")
    restart_img = loadImage("restart.png")
}
//Criador de objetos e Propriedades
function setup(){
    //Fundo
    createCanvas(windowWidth,windowHeight)
    //Trex
    trex = createSprite(50,height-170,30,70);
    trex.addAnimation("correndo",trex_img);
    trex.addAnimation("game over",trexCol);
    trex.scale = 0.5;
    //Chão Visivel
    ground = createSprite(300,height-100,600,10);
    ground.addImage(ground_img);
    //Chão Invisivel
    ground2 = createSprite(300,height-70,600,10);
    ground2.visible = false;

    //Grupos
    gruCactos = new Group()
    gruNuvens = new Group()

    //trex.debug = true;
    trex.setCollider("circle",0,0,50)

    gameover = createSprite(width/2,height/2);
    gameover.addImage(gameover_img);
    gameover.scale = 0.5
    gameover.visible = false;
    restart = createSprite(width/2,height/2+100);
    restart.addImage(restart_img);
    restart.scale = 0.3
    restart.visible = false;
    //velocidades
    //obstacle.velocityX = -(6 + point/100);
    //ground.velocityX = - (4 + 3*point/100);
}
function draw(){
    background("white") 
    textSize(18);
    text("Placar:"+placar,500,60);
    
    if(gameStade == PLAY){
        //Pontos
        placar = placar + Math.round(frameRate()/60);
        if(placar > 0  && placar%100 === 0){
            point.play();
        }
        //Pulo 
        if(keyDown("space") && trex.y > height-130){
         trex.velocityY = -10;    
         jump.play();   
        } 
        //gravidade
        trex.velocityY = trex.velocityY + 0.5; 
        
        //Velocidade
        ground.velocityX = -5;
        ground.x = ground.width/2;

        gnuvems();
        gcactos();
        
        if(trex.isTouching(gruCactos)){
            gameStade = END;
            die.play();


        }
    }else if (gameStade == END){
        ground.velocityX=0;
        gruCactos.setVelocityXEach(0);
        gruNuvens.setVelocityXEach(0);
        gruNuvens.setLifetimeEach(-1);
        gruCactos.setLifetimeEach(-1);
        trex.changeAnimation("game over",trexCol);
        trex.velocityY = 0;
        gameover.visible = true;
        restart.visible = true;
        
        //pulinho na morte
        //if(gruCactos.isTouching(trex)){
        //    trex.velocityY = -12
        //    jumpSound.play();
        //}
    }
 
//fundo loop
if (ground.x<0) {
    ground.x = ground.width/2;    
}
//Colisão Com o Chão Invisivel
trex.collide(ground2);

if(mousePressedOver(restart)){
    reset();

}

drawSprites();
//console.log("posição trex:"trex.y)

}
function gnuvems(){
    if(frameCount%60 === 0){
        var nuvem = createSprite(600,100,40,10)
        nuvem.velocityX = -2,5;
        //Math Aredonda/Round Aredonda Normal/Floor Aredonda Para Menos
        nuvem.y = Math.round(random(20,70))
        nuvem.addImage(nuvem_img);
        nuvem.scale = 0.5;
        nuvem.lifetime = 300;

        trex.depth = trex.depth+1;
        nuvem.depth = trex.depth;

        gruNuvens.add(nuvem);
    }
}
function gcactos(){
    if(frameCount%60 === 0){
        var cacto = createSprite(600,height-100,10,50)
        cacto.scale = 0.6
        cacto.velocityX = -5;

        var num = Math.round(random(1,6));
        switch(num){
            case 1:cacto.addImage(cacto_img);
                break;
            case 2:cacto.addImage(cacto_img2);
                break;
            case 3:cacto.addImage(cacto_img3);
                break;
            case 4:cacto.addImage(cacto_img4);
                break;
            case 5:cacto.addImage(cacto_img5);
                break;
            case 6:cacto.addImage(cacto_img6);
                break;
            default:break
        }
        console.log(num)
        cacto.lifetime = 150;
        cacto.depth = trex.depth;
        gruCactos.add(cacto)
    }
}
function reset(){
    gameStade = PLAY
    gameover.visible = false;
    restart.visible = false;
    trex.changeAnimation("correndo",trex_img);
    gruCactos.destroyEach();
    gruNuvens.destroyEach();
    placar = 0;
}