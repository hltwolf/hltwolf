define(function (require) {
  var actions = require('game-actions');
  var utils = require('app-utils');

  class Sloth {
    constructor()
    {
      this.letterId = 'B'; // builtin
      this.displayLetter = 'Σ'; // board display
      this.displayLetterColor = '#a30'; // letter color for display
      this.displayBackgroundColor = '#fff'; // letter color for display
    }

    // get out of harm's way, if necessary, don't move if not
    move(mapHelper) {
      let immediateSurroundings = mapHelper.surroundingsAtOffset([0,0]);

      if(immediateSurroundings.filter(obj => obj != null).length > 0) {
        let x = 0;
      }

      let isHarmless = obj => !obj || obj.displayLetter === '¥';
      let harmlessSurroundings = immediateSurroundings.filter(isHarmless);
      if(harmlessSurroundings.length === 6) return [0,0];

      let danger = Array(actions.moves.length);
      for(let i = 0; i < danger.length; i++) { danger[i] = 0; }

      for(let i = 0; i < danger.length; i++) {
        if(!isHarmless(immediateSurroundings[i])) {
          danger[i] += danger.length + 1;
          danger[utils.numWrap(i - 1, 0, danger.length - 1)] += 1;
          danger[utils.numWrap(i + 1, 0, danger.length - 1)] += 1;
        }
      }

      var minDanger = Math.min.apply(Math, danger);

      var goodIndex = _.sample(danger.map((val, i) => (val === minDanger) ? i : null).filter(val => val !== null));
      return actions.moves[goodIndex];
    }

    // make it up as you go along
    attack(combatant) {
      return _.sample(actions.attacks);
    }
  }

  return Sloth;
});
