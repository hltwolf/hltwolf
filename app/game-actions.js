define(function (require) {
  return {
    moves: [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]],
    // 1 beats 2, 2 beats 3, 3 beats 1
    attacks: ["FREEZE", "FEINT", "CHARGE", "SWIPE"]
  }
});
