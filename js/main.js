var game = new Game(10);
var html = new Interface(50);
game.initialize();
game.genGarbage(5);
html.drawMatrix(game);

function test(x,y){
  var p = pickRandomPiece();
  game.setPiece(x,y,p);
  html.drawMatrix(game);
}
