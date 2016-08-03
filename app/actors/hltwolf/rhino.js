define(function (require) {
  var actions = require('game-actions');

  class Rhino {
    constructor()
    {
      this.letterId = 'B'; // builtin
      this.displayLetter = 'σ'; // board display
      this.displayLetterColor = '#fff'; // letter color for display
      this.displayBackgroundColor = '#000'; // letter color for display
      this.direction = _.sample(actions.moves);
    }

    // CHARGE!!!
    move(mapHelper) {
      return this.direction;
    }

    // CHARGE!!!
    attack(combatant) {
      return "CHARGE";
    }
  }

  return Rhino;
});
