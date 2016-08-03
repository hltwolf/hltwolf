define(function (require) {
  var actions = require('game-actions');

  class Tree {
    constructor()
    {
      this.letterId = 'B'; // builtin
      this.displayLetter = '¥'; // board display
      this.displayLetterColor = '#1a1'; // letter color for display
      this.displayBackgroundColor = '#fff'; // letter color for display
    }

    // incapable of moving - it's a tree!
    move(introspectSurroundings) {
      return [0,0];
    }

    // trees can only really swing back and forth
    attack() {
      return "SWIPE";
    }
  }

  return Tree;
});
