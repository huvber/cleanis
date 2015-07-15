var Game = function(size,level){
  this.size = size === undefined ? 10: size;
  this.level = level === undefined ? 1 : size;
  this.garbageForLevel = 2;
  this.matrix = [];
  this.bucket = [];
  this.score = 0;
};
Game.prototype.traverse = function(handler){
  for(var i=0; i<this.size; i++){
    for(var k=0; k<this.size; k++)
      handler(k,i, this.matrix[k][i], this.matrix);
  }
};
Game.prototype.initialize = function(){
  for(var i=0; i< this.size; i++){
    this.matrix[i] = [];
    for(var k=0; k<this.size; k++)
    this.matrix[i][k]=0;
  }
};

Game.prototype.genGarbage = function(number){
  for(var i=0; i< this.garbageForLevel*this.level; i++){
    var x = Math.floor(Math.random()*this.size);
    var y = Math.floor(Math.random()*this.size);
    if(this.matrix[x][y] === 0 )
      this.matrix[x][y]=2;
    else
      i--;
  }
};
Game.prototype.pushBucket = function(piece){
  this.bucket.push(piece);
};
Game.prototype.popBucket = function(){
  return this.bucket.shift();
};
Game.prototype.checkLine = function(){
  var hline = [];
  var vline = [];
  for(var i=0; i<this.size; i++){
    var full = true;
    for(var k=0; k<this.size; k++)
      if(this.matrix[k][i]===0){
        full=false;
        break;
      }
    if(full) hline.push(i);
  }
  for(var i=0; i<this.size; i++){
    var full = true;
    for(var k=0; k<this.size; k++)
      if(this.matrix[i][k]===0){
        full=false;
        break;
      }
    if(full) hline.push(i);
  }
  if(hline.length === 0 && vline.length === 0)
    this.genGarbage();
  else{
    for(var i in hline){
      for(var k = 0; k < this.size; k++)
        this.matrix[k][i] = 0;
    }
    for(var i in vline){
      for(var k = 0; k < this.size; k++)
        this.matrix[i][k] = 0;
    }
    this.score = 10*hline.length + 10*vline.length;
  }
};
Game.prototype.setPiece = function(xc,yc,piece){
  var xi = xc -1;
  var yi = yc -1;
  var ret = true;
  for (var i = 0; i<3; i++){
    for (var k=0; k<3; k++){
      //out of top bound
      if(yi + i < 0 ||
         yi+i >= this.size ||
         xi + k < 0 ||
         xi + k >= this.size ){
        if(piece.matrix[i][k] !== 0)
          return false;
      } else {
        if(piece.matrix[i][k] !== 0 &&
          this.matrix[yi + i][xi + k] !== 0)
          ret = false;
      }
    }
  }
  if(ret){
    for (i = 0; i<3; i++){
      for (var k=0; k<3; k++){
        if(yi + i < 0 ||
           yi+i >= this.size ||
           xi + k < 0 ||
           xi + k >= this.size ||
           piece.matrix[i][k]===0 )
           continue;
          this.matrix[yi + i][xi + k] = piece.matrix[i][k];
      }
    }
    this.score += piece.point;
    this.checkLine();
  }
  return ret;
};
