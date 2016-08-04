define(function (require) {
  let actions = require('game-actions');
  let utils = require('app-utils');

  class ShadyWolf {
    constructor()
    {
      this.letterId = 'L'; // lone wolf
      this.displayLetter = '_'; // board display
    }

    // always moves next to a tree, if it can
    move(mapHelper) {
      let isTree = obj => obj && obj.displayLetter === '¥';
      let emptyIndexes = [];
      for(let i = 0; i < actions.moves.length; i++) {
        if(!mapHelper.getAtOffset(actions.moves[i])) {
          emptyIndexes.push(i);
        }
      }

      let treesSurrounding = {};
      treesSurrounding[actions.moves.length] = mapHelper.surroundingsAtOffset([0,0]).filter(isTree).length;
      emptyIndexes.forEach(i => {
        treesSurrounding[i] == mapHelper.surroundingsAtOffset(actions.moves[i]).filter(isTree).length;
      });

      if(!Object.keys(treesSurrounding).map(k => treesSurrounding[k]).some(n => n > 0)) {
        // no trees in sight, wander randomly
        return actions.moves[_.sample(emptyIndexes)];
      } else {
        // trees in sight, do your thing
        let pairs = Object.keys(treesSurrounding).map(k => [k, treesSurrounding[k]]);
        pairs = _.orderBy(pairs, [1], ["desc"]);
        // randomly choose from most efficient
        let index = _.sample(pairs.filter(pair => pair[1] === pairs[0][1]).map(pair => pair[0]));

        return actions.moves.concat([0, 0])[index];
      }
    }

    // try to be smart about combat
    attack(combatant) {
      switch(combatant.displayLetter) {
        case "_": return actions.attacks[0]; // let fate decide
        case "¥": return actions.attacks[0]; // suspicious...
        case "σ": return actions.attacks[1];
        case "@": return actions.attacks[3];
        case "Σ":
        default: return actions.attacks[_.sample([1,2,3])];
      }
    }
  }

  return ShadyWolf;
});
