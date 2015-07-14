var _size = 10;
var _matrix = [];
var _bsize = 50;
var traverse = function(handler){
  for(var i=0; i<_size; i++){
    for(var k=0; k<_size; k++)
      handler(i,k,_matrix[i][k],_matrix);
  }
};
var initialize = function(size){
  var grid = j('.grid');
  for(var i=0; i<_size; i++){
    _matrix[i] = [];
    for(var k=0; k<_size; k++)
    _matrix[i][k]=0;
  }
};
var drawMatrix = function(){
  var grid = j('.grid');
  var block = j('.block');
  var space = j('.space');
  traverse(function(x,y,value,matrix){
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

initialize(_size);


drawMatrix();
