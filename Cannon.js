/*class Cannon{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness:0.04,
            length: 5
        }
		//this.bodyA = body;
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    attach(body){
		this.sling.bodyA=body;
	}
    
    fly(){
        this.sling.bodyA = null;
    }

    display(){
		if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(7);
            stroke(48,22,8);
			line(pointA.x, pointA.y, pointB.x, pointB.y);
		}
    }
}*/

class Cannon {
    constructor(x, y, width, height, angle) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.angle = angle;
      this.image = loadImage("images/player1.png");
    }
    display() {
      if (keyIsDown(RIGHT_ARROW) && this.angle < 0.1) {
        this.angle += 0.01;
      }
  
      if (keyIsDown(LEFT_ARROW) && this.angle > -1.45) {
        this.angle -= 0.01;
      }
  
      //fill("#676e6a");
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      image(this.image, -10, -20, this.width, this.height);
      pop();
      //image(this.cannon_base, 70, 20, 200, 200, PI, TWO_PI);
      noFill();
    }
  }