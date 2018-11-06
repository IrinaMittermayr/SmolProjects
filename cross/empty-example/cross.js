/**
 * Created by Irina on 12/09/2017.
 */

function Cross(){

    this.pos = createVector(random(0,width),random(0,height));
    //this.enemy = createVector(random(), random());
    this.target = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.wander = createVector();
    this.width = 10;
    this.height = 30;
    this.maxspeed = 10;
    this.maxforce = 0.9;

}

Cross.prototype.update = function(){

    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(20);
    //this.vel.add(this.wander);
    //this.acc.add(this.steer);
    this.acc.mult(0);


    //var wander = this.wander(this.target);
    //this.acc.add(wander);
};

Cross.prototype.watchMouse = function(){

    this.target.x = mouseX;
    this.target.y = mouseY;

    ///return createVector(mouseX, mouseY);
};

Cross.prototype.randomizeWander = function(){

    this.vel = this.vel.add( p5.Vector.random2D().limit(0.1));

};


Cross.prototype.display = function(){

    fill(250,250,250, 80);
    noStroke();

    rect(this.pos.x, this.pos.y, this.width,this.height);
    rect(this.pos.x - this.height/3, this.pos.y + this.height/3, this.height,this.width);

};


Cross.prototype.behaviors = function(){

    var seek = this.seek(this.target);
    this.applyForce(seek);

    //var flee = this.flee(this.target);
    //this.applyForce(flee);


};

Cross.prototype.applyForce = function(f){

    this.acc.add(f);
};



Cross.prototype.isOutOfCanvas = function(){
    if(this.pos.x + this.height/3*2 > window.width){
        this.vel = createVector(-1, random());
    }else if(this.pos.x - this.height/3  < 0){
        this.vel = createVector(1, random());
    }
    else if(this.pos.y+this.height > window.height){
        this.vel = createVector(random(),-1);
    }else if(this.pos.y <0){
        this.vel = createVector(random(),1);
    }
};

Cross.prototype.seek = function(target){
    var desiredVelocity = p5.Vector.sub(target, this.pos).setMag(this.maxspeed);
    return p5.Vector.sub(desiredVelocity, this.vel).limit(0.1);

};

Cross.prototype.flee = function(enemy){
    var desiredVelocity = p5.Vector.sub(this.pos, enemy);
    var magnitude = sqrt(sq(desiredVelocity.x)+ sq(desiredVelocity.y));

    if(magnitude > 300){ //determines the radius for the influence on the vehicle
        var randomFlee = p5.Vector.sub(enemy, p5.Vector.random2D()); //creates a random vector which flees from the position
        //var fleeVector = p5.Vector.sub(desiredVelocity, randomFlee);
        return randomFlee.limit(0.1);
    }

    desiredVelocity.limit(0.2);
    return p5.Vector.add(desiredVelocity, this.vel).limit(0.2);
};



//13.04.17 updated flee behaviour, still bugs haha



/*Cross.prototype.avoid = function(disturbance){

    var desiredVelocity =


};*/






