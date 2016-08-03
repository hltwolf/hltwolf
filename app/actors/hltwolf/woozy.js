define(function (require) {
  var actions = require('game-actions');

  class WoozyWolf {
    constructor()
    {
      this.letterId = 'L'; // lone wolf
      this.displayLetter = '@'; // board display
      this.displayLetterColor = '#111'; // letter color for display
      this.displayBackgroundColor = '#eee'; // letter color for display

      this.context = {lastMove: [0, 0]}; // used to remember last move
    }

    // walks in a dodgy line
    move(mapHelper) {
      // can't turn quickly enough to go directly backwards
      let isReverse = (last, next) => last[0] === -next[0] && last[1] === -next[1];
      // but can't stay on exactly the same path either
      let isSimilar = (last, next) =>
        (last[0] === next[0] && last[1] !== next[1]) ||
        (last[0] !== next[0] && last[1] === next[1]);

      var acceptedMoves = actions.moves.filter(move =>
        isSimilar(this.context.lastMove, move) &&
        !isReverse(this.context.lastMove, move));

      this.context.lastMove = _.sample(acceptedMoves);
      return this.context.lastMove;
    }

    // wolf is about to lose consciousness
    attack() {
      return "FEINT";
    }
  }

  return WoozyWolf;
});
