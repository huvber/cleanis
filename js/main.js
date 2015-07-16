var game = new Game(10);
var html = new Interface(50,game);

game.initialize();
game.genGarbage(5);
game.pushBucket(selectPossiblePiece());
game.pushBucket(selectPossiblePiece());
game.pushBucket(selectPossiblePiece());
html.drawMatrix();
html.drawBucket();

function selectPossiblePiece(){
  var possible = [];
  for(var i in pieces){
    if(game.possiblePiece(pieces[i]))
      possible.push(i);
  }
  if(possible.length === 0) gameOver();
  return pieces[possible[Math.floor(Math.random() * possible.length)]];
}
function gameOver(){
  alert('Game Over');
  window.location.reload();
}
function turn(x,y,piece){
  var p = pickRandomPiece();
  game.setPiece(x,y,p);
  html.drawMatrix(game);
}
