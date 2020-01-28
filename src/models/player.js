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

    this.verts = data.verts;

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

    this.power = 0.7;
    this.ammo = 5;

    this.alphas = [0.01, 0.05, 0.1, 0.15, 0.2, 0.35, 0.5, 0.8, 1];
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

  getCurrentVerts(){
    let currVertsX = [];
    let currVertsY = [];

    let cosAngle = Math.cos(this.rad);
    let sinAngle = Math.sin(this.rad);

    for(let i = 0; i < this.verts[0].length; i++){

      let worldUnrotatedX = this.verts[0][i] + this.x;
      let worldUnrotatedY = this.verts[1][i] + this.y;

      let currentPointX = this.x + ((worldUnrotatedX - this.x) * cosAngle - (worldUnrotatedY - this.y) * sinAngle);
      let currentPointY = this.y + ((worldUnrotatedX - this.x) * sinAngle + (worldUnrotatedY - this.y) * cosAngle);

      currVertsX.push(currentPointX);
      currVertsY.push(currentPointY);

      // currVertsX.push(worldUnrotatedX);
      // currVertsY.push(worldUnrotatedY);
    }

    let currVerts = [currVertsX,currVertsY];
    return(currVerts);
  }

  isPointOnLine(a,b,c){
    let ABDist = Math.sqrt( (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2 );
    let ACDist = Math.sqrt( (c[0] - a[0]) ** 2 + (c[1] - a[1]) ** 2 );
    let BCDist = Math.sqrt( (c[0] - b[0]) ** 2 + (c[1] - b[1]) ** 2 );

    //console.log(`>>\nAB: ${ABDist} | AC: ${ACDist} | BC: ${BCDist} | ACB: ${ACDist + BCDist}`)

    let CDist = ACDist + BCDist;
    //console.log("A--B: " + ABDist + "\nACBC: " + CDist);
    if(ABDist == CDist){
      //console.log("HIT")
      return true;
    }else if(Math.abs(ABDist - CDist) < 1){
      //console.log("NEAR HIT: " + Math.abs(ABDist - CDist));
      return true;
    }else{
      //console.log(`AB: ${ABDist}  |  ACB: ${CDist}`)
      //console.log("MISS: " + Math.abs(ABDist - CDist));
      return false;
    }
  }

  checkLinesIntersect(p,a){
    //let parallel = false;
    //let x = 0;
    //let y = 0;

    for(let i = 0; i < a[0].length - 1; i++){

      // Debugging Code
      let tmpPoints = [];




      /////



      for(let j = 0; j < p[0].length-1; j++){
        let A1 = p[1][j+1] - p[1][0];
        let B1 = p[0][0] - p[0][j+1];
        let C1 = (A1 * p[0][0]) + (B1 * p[1][0]);

        let A2 = a[1][i+1] - a[1][i];
        let B2 = a[0][i] - a[0][i+1];
        let C2 = (A2 * a[0][i]) + (B2 * a[1][i]);

        let det = A1*B2 - A2*B1;
        if(det == 0){
          //Lines are parallel
          //parallel = true;
        } else {
          let x = Math.round((B2*C1 - B1*C2)/det);
          let y = Math.round((A1*C2 - A2*C1)/det);

          tmpPoints.push([x,y]); // Debugging Tool

          let a1X = Math.round(p[0][0]);
          let a1Y = Math.round(p[1][0]);

          let b1X = Math.round(p[0][j+1]);
          let b1Y = Math.round(p[1][j+1]);

          let a2X = Math.round(a[0][i]);
          let a2Y = Math.round(a[1][i]);

          let b2X = Math.round(a[0][i+1]);
          let b2Y = Math.round(a[1][i+1]);

          if(this.isPointOnLine( [a1X,a1Y], [b1X,b1Y], [x,y] ) && this.isPointOnLine( [a2X,a2Y], [b2X,b2Y], [x,y] )){
            console.log("COLLISION DETECTED @ (" + x + ", " + y + ")");
          }

        }
      }

      // Debugging Code Cont.

      // console.log(`For side ${i}: A(${a[0][i]}, ${a[1][i]}) --- B(${a[0][i+1]}, ${a[1][i+1]})`);
      // console.log("Tested Points: ")
      // for(let t = 0; t < p[0].length; t++){
      //   console.log(`(${p[0][t]}, ${p[1][t]})`)
      // }
      // console.log(`Intersects at points: ${tmpPoints}\n>>>>>`);



      /////

    }


  }

  newCheckHit(){
    for(let i = 0; i < asteroidQueue.length; i++){
      let D2 = (this.x - asteroidQueue[i].x) ** 2 + (this.y - asteroidQueue[i].y) ** 2;
      if(D2 < (this.radius + asteroidQueue[i].radius) ** 2){
        //this.hit = true;
        //this.color = "red";
        asteroidQueue[i].hitFace(true); // = true;

        let aVerts = asteroidQueue[i].getCurrentVerts();
        let pVerts = this.getCurrentVerts();
        this.checkLinesIntersect(pVerts, aVerts);
      } else {
        asteroidQueue[i].hitFace(false);
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
    this.newCheckHit();

    //console.log(this.getCurrentVerts());

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

      //console.log('Vx: ' + this.vx);
      //console.log('Vy: ' + this.vy);

      if(this.vx > 1){
        this.vx = 1;
      }
      if(this.vy < -1){
        this.vy = -1;
      }
      if(this.vx < -1){
        this.vx = -1;
      }
      if(this.vy > 1){
        this.vy = 1;
      }

    }
    else if(slowdown){ // Slowdown Feature, eventually the craft stops
      let slowV = 0.0005;

      if(this.vx != 0){
        if(this.vx > 0){
          this.vx -= (this.vx * slowV) * delta;
        }
        else if(this.vx < 0){
          this.vx -= (this.vx * slowV) * delta;
        }
      }
      if(this.vy != 0){
        if(this.vy > 0){
          this.vy -= (this.vy * slowV) * delta;
        }
        else if(this.vy < 0){
          this.vy -= (this.vy * slowV) * delta;
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
      let n = Math.floor(Math.random() * 8);
      //console.log(n);
      ctx.globalAlpha = this.alphas[n];
      ctx.moveTo(-4, 5);
      ctx.lineTo(0, 15);
      ctx.stroke();

      ctx.moveTo(4, 5);
      ctx.lineTo(0, 15);
      ctx.stroke();
    }

    ctx.closePath();

    ctx.restore();

    // Test Thing
    ctx.strokeStyle = 'blue';
    let tmp = this.getCurrentVerts();
    for(let i = 0; i < tmp[0].length; i++){
      ctx.beginPath();
      ctx.moveTo(tmp[0][i], tmp[1][i]);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.closePath();
    }


  }
}
