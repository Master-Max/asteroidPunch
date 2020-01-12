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

    this.radius = 15;
    this.hit = false;

    this.fuseLit = false;
    this.shotAway = false;
    this.lockGun = false;

    this.power = 0.3;
    this.ammo = 5;
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

  litFuse(b){
    this.fuseLit = true;
  }

  reload(){
    console.log('reload');
    this.fuseLit = false;
    this.shotAway = false;
  }

  addAmmo(){
    this.ammo++;
  }

  checkHit(){
    for(let i = 0; i < asteroidQueue.length; i++){
      let D2 = (this.x - asteroidQueue[i].x) ** 2 + (this.y - asteroidQueue[i].y) ** 2;
      if(D2 < (this.radius + asteroidQueue[i].radius) ** 2){
        this.hit = true;
        //this.color = "red";
        asteroidQueue[i].hitFace(); // = true;
      } else {
        //this.color = "white";
      }
    }
  }

  fireShot(){
    let cos = Math.cos(this.rad);
    let sin = Math.sin(this.rad);

    let x = this.x + (15 * sin);
    let y = this.y - (15 * cos);

    let vy = -this.power * cos;
    let vx = this.power * sin;
    const data = {name:"shot", x:x, y:y, vx:vx, vy:vy, h:this.h, w:this.w};
    if(!this.lockGun){
      makeTmpShot(data);
    }
  }

  update(delta){
    // The Bounding Box
    this.checkHit();

    if(this.hit){
      this.health--;
      if(this.health <= 0){
        this.color = "red";
        this.lockGun = true;
      }
      this.hit = false;
    }

    if(this.fuseLit && !this.shotAway){
      if(this.ammo > 0){
        this.ammo --;
        this.fuseLit = false;
        this.shotAway = true;
        this.fireShot();
      }
    }

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
    ctx.fillStyle = this.color;
    ctx.font = "20px Arial";
    ctx.fillText(this.health, 50, 50);

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
