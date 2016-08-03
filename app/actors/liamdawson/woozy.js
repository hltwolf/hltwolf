define(function (require) {
  var actions = require('game-actions');

  class WoozyWolf {
    constructor()
    {
      this.letterId = 'L'; // lone wolf
      this.displayLetter = '@'; // board display
      this.displayLetterColor = '#111'; // letter color for display
      this.displayBackgroundColor = '#eee'; // letter color for display

      this.context = {lastMove: [null, null]}; // used to remember last move
    }

    // incapable of walking in a straight line, dumb to surroundings
    move(surroundings) {
      var validMoves = actions.moves
      .concat([[0,0]])
      .filter(m => m[0] !== this.context.lastMove[0] &&
        m[1] !== this.context.lastMove[1]);

      this.context.lastMove = _.sample(validMoves);
      return this.context.lastMove;
    }

    // wolf is about to lose consciousness
    attack() {
      return "FEINT";
    }
  }

  return WoozyWolf;
});
