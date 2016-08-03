define(function (require) {
  const WIDTH = 50;
  const HEIGHT = 50;

  let Map = require('map');

  let o = {width:WIDTH*2, height:HEIGHT, layout:"hex", bg: "#000", fg:"#000", spacing: 1.25, transpose:false};
  let display = new ROT.Display(o);
  document.body.appendChild(display.getContainer());

  let map = new Map(WIDTH, HEIGHT);
  map.draw(display);

  window.actors = require('actors/index');

  document.body.addEventListener('keydown', function (e) {
      map.tick();
  });
});
