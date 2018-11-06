
var circleRadius = 2;
/*
var cross = {

    //vel: random(255),
    x: 60,
    y: 20,
    width: 60,
    speed: 0.5,
    height: 20,
    velocity: createVector(random())

    //velocity: 1,
};

var circle = {
    circleDistance : 2,
    circleCenter: cross.velocity.clone().normalize()* 2,
};

var displacement = createVector(0, -1) * circleRadius;

setAngle(displacement, wanderAngle);
 */


function setup() {
    createCanvas(800,800);

    var cr = new Cross(30,40);


}

function draw() {
  background(100,100,100);


  cr.update();
  cr.display();


    move();
    display();

}

function randomizeSpeed(){
    cross.speed = random(-1,1);
}

function display(){
    fill(255,255,255);
    noStroke();
    rect(cross.x, cross.y, cross.height,cross.width);
    rect(cross.x - cross.height, cross.y + cross.width/3, cross.width,cross.height);
}

function move(){
    //var velocity = cross.velocity+cross.speed;

    cross.x = cross.x + cross.speed;
    randomizeSpeed();
    cross.y = cross.y + cross.speed;
}