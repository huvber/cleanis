var Interface = function(block_size){
  this.bsize = block_size === undefined ? 50 : block_size;
};

Interface.prototype.drawMatrix = function(game){
    var grid = j('.grid');
    var block = j('#modelb');
    var space = j('#models');
    var garbage = j('#modelg');

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
      element.dataset.x = x;
      element.dataset.y = y;
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      grid.append(element);

    });
  };
Interface.prototype.drawBucket = function(){
  var bucket = j('.bucket');
};
