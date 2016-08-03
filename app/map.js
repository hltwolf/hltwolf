define(function (require) {
  let actors = require('actors/index');

  class Map {
    constructor(width, height) {
      this.width = width;
      this.height = height;

      this.mapArr = new Array(height);
      for(let i=0;i<height;i++) {
        this.mapArr[i] = [];
      }

      this.walkPoints((q, r) => this.setPoint(q, r, null));

      this.seed(actors.builtins.concat(actors.loneWolves));
    }

    draw(display) {
      this.walkPoints((q,r) => {
        let point = Map.pairToROTPair(q, r);
        let val = (this.getPoint(q, r) || {displayLetter: "", displayLetterColor: "#000", displayBackgroundColor: "#fff"});
        display.draw(point[0], point[1], val.displayLetter, val.displayLetterColor, val.displayBackgroundColor);
      });
    }

    getPoint(q, r){
      return this.mapArr[r][q];
    }

    setPoint(q, r, val){
      this.mapArr[r][q] = val;
    }

    walkPoints(action) {
      let rRange = [0, this.height];

      for(let r = rRange[0]; r < rRange[1]; r++) {
        var qRange = this.qRangeForR(r);
        for(let q = qRange[0]; q < qRange[1]; q++) {
          action(q, r);
        }
      }
    }

    tick() {
      this.walkPoints((q, r) => {
        let val = this.getPoint(q, r);
        if(val) {
          let movement = val.move();

          // TODO: move including map wrapping

          // TODO: combat if target square is occupied
        }
      })
    }

    seed(classes) {
      let classCount = classes.length;
      let spacesToFill = Math.floor(this.width * this.height * 0.25);
      let spacesPerClass = Math.floor(spacesToFill / classCount);

      for(let i=0; i < classCount; i++) {
        for(let j=0; j < spacesPerClass; j++) {
          let point = this.randomPoint();
          while(this.getPoint(point[0], point[1]) != null) point = this.randomPoint();
          this.setPoint(point[0], point[1], new classes[i]);
        }
      }
    }

    qRangeForR(r) {
      let reduction = Math.floor(r / 2);
      return [-reduction, -reduction + this.width]
    }

    randomPoint() {
      let r = Math.floor(Math.random() * this.height);

      let qs = [];
      let qRange = this.qRangeForR(r);

      for(let q = qRange[0]; q < qRange[1]; q++) {
        qs.push(q);
      }

      return [qs[Math.floor(Math.random()*qs.length)], r];
    }

    static pairToROTPair(q, r) {
      var x = Math.floor(q * 2 + r);
      var y = r;

      return [x, y];
    }
  };

  return Map;
});
