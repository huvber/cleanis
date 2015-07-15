var game = new Game(10);
var html = new Interface(50,game);

game.initialize();
game.genGarbage(5);
game.pushBucket(pickRandomPiece());
game.pushBucket(pickRandomPiece());

html.drawMatrix();
html.drawBucket();


function turn(x,y,piece){
  var p = pickRandomPiece();
  game.setPiece(x,y,p);
  html.drawMatrix(game);
}
