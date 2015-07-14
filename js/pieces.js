var pieces = {
  /*
  ** ooo
  ** o+o
  ** ooo
  */
  point : {
    matrix: [[0,0,0],[0,1,0],[0,0,0]],
    point: 1,
    name: 'point'
  },
  /*
  ** ++o
  ** +oo
  ** ooo
  */
  ltlel: {
    matrix: [[1,1,0],[1,0,0],[0,0,0]],
    point: 3,
    name: 'little top left L'
  },
  /*
  ** o++
  ** oo+
  ** ooo
  */
  ltrel: {
    matrix: [[0,1,1],[0,0,1],[0,0,0]],
    point: 3,
    name: 'little top right L'
  },
  /*
  ** ooo
  ** +oo
  ** ++o
  */
  lblel: {
    matrix: [[0,0,0],[1,0,0],[1,1,0]],
    point: 3,
    name: 'little bottom left L'
  },
  /*
  ** ooo
  ** oo+
  ** o++
  */
  lbrel: {
    matrix: [[0,0,0],[0,0,1],[0,1,1]],
    point: 3,
    name: 'little bottom right L'
  },
  /*
  ** +++
  ** +oo
  ** +oo
  */
  btlel: {
    matrix: [[1,1,1],[1,0,0],[1,0,0]],
    point: 5,
    name: 'big top left L'
  },
  /*
  ** +++
  ** oo+
  ** oo+
  */
  btrel: {
    matrix: [[1,1,1],[0,0,1],[0,0,1]],
    point: 5,
    name: 'bit top right L'
  },
  /*
  ** +oo
  ** +oo
  ** +++
  */
  bblel: {
    matrix: [[1,0,0],[1,0,0],[1,1,1]],
    point: 5,
    name: 'big bottom left L'
  },
  /*
  ** oo+
  ** oo+
  ** +++
  */
  bbrel: {
    matrix: [[0,0,1],[0,0,1],[1,1,1]],
    point: 5,
    name: 'big bottom right L'
  },
  /*
  ** o+o
  ** o+o
  ** o+o
  */
  vline: {
    matrix: [[0,1,0],[0,1,0],[0,1,0]],
    point: 3,
    name: 'vertical line'
  },
  /*
  ** ooo
  ** +++
  ** ooo
  */
  hline: {
    matrix: [[0,0,0],[1,1,1],[0,0,0]],
    point: 3,
    name: 'horizontal line'
  },
  /*
  ** ++o
  ** ++o
  ** ooo
  */
  lcube: {
    matrix: [[1,1,0],[1,1,0],[0,0,0]],
    point: 4,
    name: 'little cube'
  },
  /*
  ** +++
  ** +++
  ** +++
  */
  bcube: {
    matrix: [[1,1,1],[1,1,1],[1,1,1]],
    point: 9,
    name: 'big cube'
  },

};
var pickRandomPiece = function(){
  var keys = Object.keys(pieces);
  return pieces[keys[ keys.length * Math.random() << 0]];
};
