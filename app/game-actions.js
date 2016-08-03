define(function (require) {
  let result = {
    moves: [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]],
    // 1 beats 2, 2 beats 3, 3 beats 1
    attacks: ["FREEZE", "FEINT", "CHARGE", "SWIPE"]
  }
  result.isValidMove = move => move && move.constructor === Array &&
    move.length == 2 &&
    ((move[0] === 0 && move[1] === 0) || result.moves.some(m => m[0] === move[0] && m[1] === move[1]));

  result.isValidAttack = attack => result.attacks.indexOf(attack) > -1;

  return result;
});
