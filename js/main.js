var game = new Game(10);
var html = new Interface(50);
game.initialize();
game.genGarbage(5);
html.drawMatrix(game);
