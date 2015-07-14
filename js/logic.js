var Game = function(size){
  this.size = size === undefined ? 10: size;
  this.matrix = [];
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
  for(var i=0; i<number; i++){
    var x = Math.floor(Math.random()*this.size);
    var y = Math.floor(Math.random()*this.size);
    if(this.matrix[x][y] === 0 )
      this.matrix[x][y]=2;
    else
      i--;
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
        if(piece.matrix[k][i] !== 0)
          return false;
      } else {
        if(this.matrix[yi + i][xi + k] !== 0)
          ret = false;
      }
    }
  }
  if(ret){
    for (var i = 0; i<3; i++){
      for (var k=0; k<3; k++){
        if(yi + i < 0 ||
           yi+i >= this.size ||
           xi + k < 0 ||
           xi + k >= this.size )
           continue;
          this.matrix[yi + i][xi + k] = piece.matrix[k][i];
      }
    }
  }
  return ret;
};
