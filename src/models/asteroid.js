

class Asteroid {
  constructor(data){
    this.health = data.health;
    this.radius = this.health * 15;
    this.x = data.x;
    this.y = data.y;
    this.vx = data.vx;
    this.vy = data.vy;

    this.verts = data.verts;

    this.color = "white";

    this.h = data.h;
    this.w = data.w;

    this.hit = false;
  }

  hitFace(foo){
    //console.log("HIT FACE")
    //this.hit = true;
    if(foo){
      this.color = "red";
    }else{
      this.color = "white";
    }

    // if(this.health - 1 > 0){
    //   makeTmpAsteroid({health:this.health / 2, child:true, x:this.x, y:this.y});
    //   makeTmpAsteroid({health:this.health / 2, child:true, x:this.x, y:this.y});
    // }
  }

  // OLD HIT FACE
  // hitFace(){
  //   console.log("HIT FACE")
  //   this.hit = true;
  //   this.color = "red";
  //   if(this.health - 1 > 0){
  //     makeTmpAsteroid({health:this.health / 2, child:true, x:this.x, y:this.y});
  //     makeTmpAsteroid({health:this.health / 2, child:true, x:this.x, y:this.y});
  //   }
  // }

  getCurrentVerts(){
    let currentVertsX = [];
    let currentVertsY = [];
    for(let i = 0; i < this.verts[0].length; i++){
      currentVertsX.push((this.verts[0][i] * this.health) + this.x);
      currentVertsY.push(-1 * (this.verts[1][i]  * this.health) + this.y);
    }
    let currentVerts = [currentVertsX, currentVertsY];
    return(currentVerts);
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
    ctx.fillStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.arc(0,0,this.radius,0,2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.scale(this.health,this.health);
    ctx.lineWidth = 1.0 / this.health;
    for(let i = 0; i < this.verts[0].length - 1; i++){
      ctx.moveTo(this.verts[0][i], this.verts[1][i] * -1);
      ctx.lineTo(this.verts[0][i+1], this.verts[1][i+1] * -1);
      ctx.stroke();
    }

    ctx.restore();

    // OLD DRAW INSTRUCTIONS
    // ctx.strokeStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.x,this.y,this.health * 15, 0, 2 * Math.PI);
    // ctx.stroke();
  }
}












//
