

class Asteroid {
  constructor(data){
    this.health = data.health;
    this.radius = this.health * 15;
    this.x = data.x;
    this.y = data.y;
    this.vx = data.vx;
    this.vy = data.vy;

    this.color = "white";

    this.h = data.h;
    this.w = data.w;

    this.hit = false;
  }

  hitFace(){
    console.log("HIT FACE")
    this.hit = true;
    this.color = "red";
    if(this.health - 1 > 0){
      makeTmpAsteroid({health:this.health / 2, child:true, x:this.x, y:this.y});
      makeTmpAsteroid({health:this.health / 2, child:true, x:this.x, y:this.y});
    }
  }

  update(delta){
    if(this.hit){

      removeFromAsteroidQueue(this);
      removeFromRenderQueue(this);
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

    this.x += this.vx * delta;
    this.y += this.vy * delta;


  }

  draw(ctx, interp){
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.health * 15, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
