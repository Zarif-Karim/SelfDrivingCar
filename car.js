class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.angle = 0;

    this.friction = 0.05;

    this.maxForwardSpeed = 3;
    this.maxReverseSpeed = -1.5;

    this.controls = new Controls();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(-this.angle);


    ctx.beginPath();
    ctx.rect(
      - this.width / 2,
      - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();

    ctx.restore();
  }

  update(){
      this.#move();
  }

  #move(){
      //using key controls increases/decreases speed
      if(this.controls.forward){
          this.speed += this.acceleration;
      } 
      if(this.controls.reverse) {
          this.speed -= this.acceleration;
      }
      
      //speed cap
      if(this.speed > this.maxForwardSpeed){
          this.speed = this.maxForwardSpeed;
      }
      if(this.speed < this.maxReverseSpeed){
          this.speed = this.maxReverseSpeed;
      }

      //friction slowdown and stop
      if(this.speed > 0) this.speed -= this.friction;
      if(this.speed < 0) this.speed += this.friction;
      if(Math.abs(this.speed) < this.friction) this.speed = 0;

      if(this.speed != 0) {
          const flip = this.speed > 0 ? 1:-1;
          if(this.controls.left) this.angle += 0.03*flip;
          if(this.controls.right) this.angle -= 0.03*flip;
      }

      //make the move
      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;

  }
}
