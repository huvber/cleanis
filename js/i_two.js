var dragData = {};
var Interface = function(block_size,game){
  this.bsize = block_size === undefined ? 50 : block_size;
  this.game = game;

};
Interface.prototype.updateScore = function(){
  j('.score').get('span').text(game.score);
};

Interface.prototype.drawMatrix = function(){
  var grid = j('.grid');
  var two = new Two({
    width:this.bsize * 10,
    height: this.bsize * 10
  }).appendTo(grid.e());
  var game = this.game;
  var _bsize = this.bsize;
  game.traverse(function(x,y,value,matrix){
    var cx = x*_bsize + _bsize/2;
    var cy = y*_bsize + _bsize/2;
    var rect = two.makeRectangle(cx,cy,_bsize,_bsize);
    rect.linewidth = 1;
    rect.stroke = '#ccc';
    switch(value){
      case 0: rect.fill = '#fff'; break;
      case 1: rect.fill = '#ccf'; break;
      case 2: rect.fill = '#ddd'; break;
    }
  });
  two.update();
};
Interface.prototype.drawBucket = function(){
  var bucket = j('.bucket');
  var game = this.game;
  bucket.text('');
  for(var p in game.bucket){
    var tmp = this.drawPiece(game.bucket[p]);
    bucket.append(tmp);
  }
};

Interface.prototype.drawPiece = function(piece){
  var newp = j('#modelp').clone();
  var two = new Two({
    width:this.bsize * 3,
    height: this.bsize * 3
  }).appendTo(newp);
  newp.id='';
  var _bsize = this.bsize;
  var that = this;
  for(var i in piece.matrix){
    for(var k in piece.matrix[i]){
      if(piece.matrix[i][k]!==0){
        var cx = k*_bsize + _bsize/2;
        var cy = i*_bsize + _bsize/2;
        var rect = two.makeRectangle(cx,cy,_bsize,_bsize);
        rect.linewidth = 1;
        rect.stroke = '#ccc';
        rect.fill = '#ccf';
      }
    }
  }
  two.update();
  return newp;
};
