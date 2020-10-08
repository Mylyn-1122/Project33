const Engine = Matter.Engine;
const  World = Matter.World;
const  Events = Matter.Events;
const  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var particle = null;
var count = 0;

var gameState = "play";

function setup() {
  createCanvas(800, 800);
  background(0);
  engine = Engine.create();
  world = engine.world;


  
  
 

  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

   

    
}
 


function draw() {
  background("black");
  Engine.update(engine);
 
  fill(255)
  stroke(20)
  text("SCORE : " + score, 740, 40);
  text(mouseX + "," + mouseY, mouseX, mouseY)
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

 //console.log(particle);
   
     if(particle === null && gameState!== "end"){
     
     mousePressed();
 
    }
  
   
   if (particle !== null){
     particle.display();
     if(particle.body.position.y>750){
       if(particle.body.position.x < 300){
         score = score + 500;
         
         if(count >=5){
           gameState = "end"
         }
         else if (particle.body.position.x > 301 && particle.body.position.y < 600){
          score = score + 100;
          
          if(count >=5){
            gameState = "end"
          }
        }
           else if (particle.body.position.x > 600){
            score = score + 300;
            
            if(count >=5){
              gameState = "end"
            }
          }
       }
       particle = null

     }
   }

   console.log(count)
  //for (var j = 0; j < particles.length; j++) {
  // 
  //   particles[j].display();
  // }

   if (count === 5 && particle === null){
     gameState = "end"
   }

   if (gameState === "end"){
     textSize(50)
     text("GAME OVER", 415, 458)
   }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}

function mousePressed(){
  if (count < 6){
    count++;
    particle = new Particle(mouseX, 10, 10, 10)
  }
}