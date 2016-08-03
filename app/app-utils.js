define(function (require) {
  let result = {};

  result.numWrap = (num, min, max) => (num < min) ? max + (num + 1 - min) : (num > max) ? min + (num - 1 - max) : num;

  return result;
});
