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

Game.prototype.genGarbage = function(){
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
  var hlines = [];
  var vlines =[];
  for(var i=0; i<this.size; i++){
    var full = true;
    for(var k=0; k<this.size && full; k++){
      var element = this.matrix[k][i];
      if(this.matrix[i][k] === 0) full = false;
    }
    if(full){
      hlines.push(i);
    }
  }
  for(var i=0; i<this.size; i++){
    var full = true;
    for(var k=0; k<this.size && full; k++){
      var element = this.matrix[k][i];
      if(this.matrix[k][i] === 0) full = false;

    }

    if(full){
      vlines.push(i);
    }
  }
  if(hlines.length > 0 || vlines.length > 0){
    for (i in hlines){
      for(var k=0; k<this.size; k++)
        this.matrix[hlines[i]][k] = 0;
    }
    for (i in vlines){
      for(var k=0; k<this.size; k++)
        this.matrix[k][vlines[i]] = 0;
    }
  } else {
    this.genGarbage();
  }
};
Game.prototype.possiblePiece = function(piece){
  for(var i =0 ; i < this.size; i++)
    for(var k = 0; i <this.size; i++){
      if(this.checkPiece(k,i,piece)) return true;
    }
  return false;
};
Game.prototype.checkPiece = function(xc,yc,piece){
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
  return ret;
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
