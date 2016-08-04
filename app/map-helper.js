define(function (require) {
  let actions = require('game-actions');

  class MapHelper
  {
    constructor(map, q, r)
    {
      this.outerRingPoints = [
        [0, -2], [1, -2], [2, -2],
        [2, -1], [2, 0], [1, 1],
        [0, 2], [-1, 2], [-2, 2],
        [-2, 1], [-2, 0], [-1, -1]
      ];

      this.isValidOuterMove = move => move && move.constructor === Array &&
        move.length == 2 &&
        ((move[0] === 0 && move[1] === 0) || actions.moves.concat(this.outerRingPoints).some(m => m[0] === move[0] && m[1] === move[1]));

      this.surroundingsAtOffset = point => {
        if(actions.isValidMove(point)) {
          let chosenPoint = map.moduloOffset([q,r], point);
          return actions.moves.map(move => {
            let surroundingPoint = map.moduloOffset(chosenPoint, move);
            return map.getPoint(surroundingPoint[0], surroundingPoint[1]);
          });
        }
        return null;
      }

      this.getAtOffset = point => {
        if(this.isValidOuterMove(point)) {
          let newPoint = map.moduloOffset([q, r], point);
          return map.getPoint(newPoint[0], newPoint[1]);
        }
        return null;
      }
    }
  }

  return MapHelper;
});
