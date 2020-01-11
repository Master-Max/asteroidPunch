class Player {
  constructor(data){
    this.name = data.name;
    this.health = data.health;
    this.score = data.score;

    this.x = data.x;
    this.y = data.y;
    this.lVelocity = data.lv;
    this.vx = 0.0;
    this.vy = 0.0;
    this.rad = data.r; // Rotation
    this.aVelocity = data.av;
    this.turnL = false;
    this.turnR = false;

    this.burning = false;

    this.alive = true;

    this.color = "white";

    this.h = data.h;
    this.w = data.w;
  }

  turnLeft(b){
    this.turnL = b;
  }

  turnRight(b){
    this.turnR = b;
  }

  burnEngine(b){
    this.burning = b;
  }

  update(delta){
    // The Bounding Box
    if(this.x > this.w){
      this.x = 0;
    }
    if(this.y > this.h){
      this.y = 0;
    }
    if(this.y < 0){
      this.y = this.h;
    }
    if(this.x < 0){
      this.x = this.w;
    }


    if(this.turnR){
      this.rad += this.aVelocity * delta;
    }
    else if(this.turnL){
      this.rad -= this.aVelocity * delta;
    }

    let slowdown = true;

    if(this.burning){
      this.vy -= (this.lVelocity * delta) * Math.cos(this.rad);
      this.vx += (this.lVelocity * delta) * Math.sin(this.rad);
    }
    else if(slowdown){ // Slowdown Feature, eventually the craft stops
      if(this.vx != 0){
        if(this.vx > 0){
          this.vx -= (this.vx * 0.001) * delta;
        }
        else if(this.vx < 0){
          this.vx -= (this.vx * 0.001) * delta;
        }
      }
      if(this.vy != 0){
        if(this.vy > 0){
          this.vy -= (this.vy * 0.001) * delta;
        }
        else if(this.vy < 0){
          this.vy -= (this.vy * 0.001) * delta;
        }
      }
    }

    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }

  draw(ctx, interp){
    ctx.strokeStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);

    ctx.beginPath();
    //Left Side
    ctx.moveTo(0, -15);
    ctx.lineTo(-8, 5);
    ctx.stroke();

    //Right Side
    ctx.moveTo(0, -15);
    ctx.lineTo(8, 5);
    ctx.stroke();

    //Bottom
    ctx.moveTo(-8, 5);
    ctx.lineTo(8, 5);
    ctx.stroke();

    //Left Fin
    ctx.moveTo(-8, 5);
    ctx.lineTo(-10, 10);
    ctx.stroke();

    //Right Fin
    ctx.moveTo(8, 5);
    ctx.lineTo(10, 10);
    ctx.stroke();

    //Exhaust
    if(this.burning){
      ctx.moveTo(-4, 5);
      ctx.lineTo(0, 15);
      ctx.stroke();

      ctx.moveTo(4, 5);
      ctx.lineTo(0, 15);
      ctx.stroke();
    }

    ctx.restore();
  }
}


  // draw(ctx, interp){
  //   //ctx.fillStyle = this.color;
  //   ctx.strokeStyle = this.color;
  //   ctx.beginPath();
  //   //Left Side
  //   ctx.moveTo(this.x, this.y - 15);
  //   ctx.lineTo(this.x - 8, this.y + 5);
  //   ctx.stroke();
  //
  //   //Right Side
  //   ctx.moveTo(this.x, this.y - 15);
  //   ctx.lineTo(this.x + 8, this.y + 5);
  //   ctx.stroke();
  //
  //   //Bottom0.7
  //   ctx.moveTo(this.x - 8, this.y + 5);
  //   ctx.lineTo(this.x + 8, this.y + 5);
  //   ctx.stroke();
  //this.x
  //   //Left Finthis.y
  //   ctx.moveTo(this.x - 8, this.y + 5);
  //   ctx.lineTo(this.x -10, this.y + 10);
  //   ctx.stroke();
  //
  //   //Right Fin
  //   ctx.moveTo(this.x + 8, this.y + 5);
  //   ctx.lineTo(this.x + 10, this.y + 10);
  //   ctx.stroke();
  // }
