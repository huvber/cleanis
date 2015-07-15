var Interface = function(block_size,game){
  this.bsize = block_size === undefined ? 50 : block_size;
  this.game = game;
  var that = this;

  j('.grid').bind('ondrop',function(e){
    var origin = e.dataTransfer.getData('coords').split(' - ');
    var piece = JSON.parse(e.dataTransfer.getData('piece'));
    var destination = e.target.dataset;
    var x = parseInt(destination.x) - (parseInt(origin[0]) - 1);
    var y = parseInt(destination.y) - (parseInt(origin[1])- 1);
    console.log(destination);
    console.log({px: origin[0], py: origin[1]});
    console.log({x: x, y: y});
    if(game.setPiece(x,y,piece)){
      game.popBucket();
      game.pushBucket(pickRandomPiece());
      that.drawMatrix();
      that.drawBucket();
      that.updateScore();
    } else{
      that.drawBucket();
    }
  }).bind('ondragover',function(ev){
    ev.preventDefault();
  });
  this.eDrag = undefined;
};
Interface.prototype.updateScore = function(){
  j('.score').get('span').text(game.score);
};

Interface.prototype.drawMatrix = function(){
    var grid = j('.grid');
    var block = j('#modelb');
    var space = j('#models');
    var garbage = j('#modelg');
    var game = this.game;
    grid.text = "";
    var _bsize = this.bsize;
    game.traverse(function(x,y,value,matrix){
      var top = x * _bsize;
      var left = y * _bsize;
      var element;
      switch(value){
        case 0: element = space.clone(); break;
        case 1: element = block.clone(); break;
        case 2: element = garbage.clone(); break;
      }
      element.id = '';
      element.dataset.x = y;
      element.dataset.y = x;
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      grid.append(element);

    });
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
  var transp = j('#modelt');
  var block = j('#modelb');
  var _bsize = this.bsize;
  var that = this;
  for(var i in piece.matrix){
    for(var k in piece.matrix[i]){
      var top = i * _bsize;
      var left = k * _bsize;
      var element;
      if(piece.matrix[i][k]!==0){
        element = block.clone();
        //element = transp.clone();
        element.id = '';
        element.style.left = left + 'px';
        element.style.top = top + 'px';
        element.dataset.x = k;
        element.dataset.y = i;
        j(newp).append(element);
      }
    }
  }
  newp.id = '';
  j(newp).bind('ondragstart',function(e){
    var localx = Math.floor(e.layerX / _bsize);
    var localy = Math.floor(e.layerY / _bsize);
    console.log();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('coords', localx + ' - ' +localy);
    e.dataTransfer.setData('piece',JSON.stringify(piece));

  });
  j(newp).bind('ondragend',function(e){
    that.drawBucket();
  });
  return newp;
};
