class Asteroid {
  constructor(data){
    this.health = data.health;
    this.flavor = data.flavor;

    this.x = data.x;
    this.y = data.y;
    this.lVelocity = data.lv;
    this.vx = data.vx;
    this.vy = data.vy;

    this.rad = data.rad;

    this.color = "white";

    this.h = data.h;
    this.w = data.w;
  }

  update(delta){
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
    let xTable = [];
    let yTable = [];

    switch (this.flavor) {
      case 'Pinched':
        xTable=[ 0, 12, 12, 1, -9, -4,-14,-14,-10,  1,  7, 12, 0];
        yTable=[ 1,  3,  5, 9,  9,  5,  5, -2, -9, -6, -9, -4, 1];
        break;
      case 'Jagged':
        xTable=[ -1, -2,  2, 12, 12,  7, -4,-12, -5,-13,-10, -1];
        yTable=[  0,-10,-10, -2,  3,  8,  9,  5,  0, -2, -8,  0];
        break;
      case 'Lumpy':
        xTable=[ 0,6,12,9,13,6,-7,-11,-11,-5,0];
        yTable=[ 6,10,7,0,-7,-10,-10,-7,7,10,6];
        break;
      case 'Cobbled':
        xTable=[0,6,11,5,12,6,-2,-6,-12,-9,-11,-7,0];
        yTable=[7,10,6,4,0,-9,-6,-9,-5,0,5,10,7];
        break;
      default:

    }

    ctx.strokeStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);
    ctx.scale(4,4);

    ctx.beginPath();

    for(let i = 0; i < xTable.length - 1; i++){
      ctx.moveTo(xTable[i], (-yTable[i]));
      ctx.lineTo(xTable[i+1], -yTable[i+1]);
      ctx.stroke();
    }

    ctx.restore();

  }
}


    // ctx.beginPath();
    //
    // ctx.moveTo(0,-1);
    // ctx.lineTo(12,-3);
    // ctx.stroke();
    //
    // ctx.moveTo(12,-3);
    // ctx.lineTo(12,-5);
    // ctx.stroke();
    //
    // ctx.moveTo(12,-5);
    // ctx.lineTo(1,-9);
    // ctx.stroke();
    //
    // ctx.moveTo(1,-9);
    // ctx.lineTo(-9,-9);
    // ctx.stroke();
    //
    // ctx.moveTo(-9,-9);
    // ctx.lineTo(-4,-5);
    // ctx.stroke();
    //
    // ctx.moveTo(-4,-5);
    // ctx.lineTo(-14,-5);
    // ctx.stroke();
    //
    // ctx.moveTo(-14,-5);
    // ctx.lineTo(-14,2);
    // ctx.stroke();
    //
    // ctx.moveTo(-14,2);
    // ctx.lineTo(-10,9);
    // ctx.stroke();
    //
    // ctx.moveTo(-10,9);
    // ctx.lineTo(1,6);
    // ctx.stroke();
    //
    // ctx.moveTo(1,6);
    // ctx.lineTo(7,9);
    // ctx.stroke();
    //
    // ctx.moveTo(7,9);
    // ctx.lineTo(12,4);
    // ctx.stroke();
    //
    // ctx.moveTo(12,4);
    // ctx.lineTo(0,-1);
    // ctx.stroke();
