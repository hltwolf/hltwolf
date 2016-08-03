define(function (require) {
  var actions = require('game-actions');

  class WoozyWolf {
    constructor()
    {
      this.letterId = 'L'; // lone wolf
      this.displayLetter = '@'; // board display
      this.displayLetterColor = '#111'; // letter color for display
      this.displayBackgroundColor = '#eee'; // letter color for display

      this.context = {lastMove: null}; // used to remember last move
    }

    // incapable of walking in a straight line, dumb to surroundings
    move(surroundings) {

      let calcNextMove = function () { return actions.moves[Math.round(Math.random() * actions.moves.length)]; }
      let nextMove = calcNextMove();

      while(nextMove == this.context.lastMove) nextMove = calcNextMove();

      this.context.lastMove = nextMove;
      return nextMove;
    }

    // wolf is about to lose consciousness
    attack() {
      return "FEINT";
    }
  }

  return WoozyWolf;
});
