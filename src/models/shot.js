class Shot {
  constructor(data){
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.startX = data.x;
    this.startY = data.y;
    this.vx = data.vx;
    this.vy = data.vy;
    this.distance = 0;
    this.color = "white";

    this.h = data.h;
    this.w = data.w;

    this.radius = 1;
    this.live = true;
    this.hit = false;
  }

  checkHit(){
    for(let i = 0; i < asteroidQueue.length; i++){
      let D2 = (this.x - asteroidQueue[i].x) ** 2 + (this.y - asteroidQueue[i].y) ** 2;
      if(D2 < (this.radius + asteroidQueue[i].radius) ** 2){
        this.hit = true;
        this.color = "red";
        asteroidQueue[i].hitFace(true); // = true;
      } else {
        this.color = "white";
      }
    }
  }

  // checkDistanceTraveled(){
  //   let dt = (this.x - this.startX) ** 2 + (this.x - this.startY) ** 2
  //   return(dt);
  // }

  update(delta){
    this.checkHit();

    this.distance += delta;
    //console.log(this.distance);

    if(this.distance > 950){
      this.hit = true;
    }

    if(this.hit){
      player.addAmmo();
      removeFromShotQueue(this);
      removeFromRenderQueue(this);
    }

    if(this.x > this.w){
      this.startX -= this.x;
      this.x = 0;
    }
    if(this.y > this.h){
      this.startY -= this.y;
      this.y = 0;
    }
    if(this.y < 0){
      this.startY += this.h;
      this.y = this.h;
    }
    if(this.x < 0){
      this.startX += this.w;
      this.x = this.w;
    }

    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }

  draw(ctx, interp){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x -= this.vx * 5, this.y - this.vy * 5);
    // ctx.arc(this.x,this.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
