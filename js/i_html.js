var dragData = {};
var Interface = function(block_size,game){
  this.bsize = block_size === undefined ? 50 : block_size;
  this.game = game;
  this.dragData;
  var that = this;
  interact('.grid').dropzone({
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
    // listen for drop related events:
    ondragenter: function (e) { },
    ondragleave: function (e) { },
    ondrop: function (e) {
      var origin = dragData.coords;
      var piece = dragData.piece;
      var destination = { x : e.dragEvent.clientX, y: e.dragEvent.clientY };
      console.log(destination);
      destination.x = Math.floor(destination.x / that.bsize);
      destination.y = Math.floor(destination.y / that.bsize);
      var x = parseInt(destination.x) - (parseInt(origin.x - 1));
      var y = parseInt(destination.y) - (parseInt(origin.y - 1));
      console.log(destination);
      console.log({px: origin.x, py: origin.y});
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
    },
  });
  /*j('.grid').bind('ondrop',function(e){
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
  });*/
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
      element.innerHTML = x + '-' + y;
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
        j(element).bind('onmousedown',function(e){
          dragData.coords = { x:this.dataset.x, y:this.dataset.y};
        });
        j(newp).append(element);
      }
    }
  }
  newp.id = 'p'+Math.floor(Math.random()*1000);
  interact('#'+newp.id).draggable({
    onstart: function(e){
      console.log(e);
      var localx = Math.floor(e.layerX / _bsize);
      var localy = Math.floor(e.layerY / _bsize);
      //dragData.coords = { x: localx, y:localy};
      dragData.piece = piece;
    },
    onmove: dragMoveListener,
  });

  /*j(newp).bind('ondragstart',function(e){
    var localx = Math.floor(e.layerX / _bsize);
    var localy = Math.floor(e.layerY / _bsize);
    console.log();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('coords', localx + ' - ' +localy);
    e.dataTransfer.setData('piece',JSON.stringify(piece));

  });
  j(newp).bind('ondragend',function(e){
    that.drawBucket();
  });*/
  return newp;
};
function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
