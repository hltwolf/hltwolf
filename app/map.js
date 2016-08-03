define(function (require) {
  let actors = require('actors/index');
  let actions = require('game-actions');
  let MapHelper = require('map-helper');
  let utils = require('app-utils');

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

    moduloPoint(q, r) {
      let newR = utils.numWrap(r, 0, this.height - 1);
      let qRange = this.qRangeForR(newR);

      let newQ = utils.numWrap(q, qRange[0], qRange[1] + 1);

      return [newQ, newR];
    }

    addOffset(original, update) {
      return [original[0] + update[0], original[1] + update[1]];
    }

    moduloOffset(original, update) {
      var updated = this.addOffset(original, update);
      return this.moduloPoint(updated[0], updated[1]);
    }

    static pairToROTPair(q, r) {
      var x = Math.floor(q * 2 + r);
      var y = r;

      return [x, y];
    }

    tick() {
      let moves = this.declareMoves();
      this.resolveCombat(moves);
    }

    declareMoves() {
      let moves = {};
      let DEBUG_trees = [];
      this.walkPoints((q, r) => {
        var obj = this.getPoint(q, r);
        if(obj) {
          if(obj.constructor.name === 'Tree') DEBUG_trees.push(true);
          this.setPoint(q, r, null);

          let move = [0,0];

          try {
            move = obj.move(new MapHelper(this, q, r));
            move = (actions.isValidMove(move)) ? move : [0,0];
          } catch(ex) {
            move = [0,0];
          }

          let target = this.moduloOffset([q,r], move);

          moves[target] = moves[target] || [];
          moves[target].push({from: [q,r], to: target, obj});
        }
      });
      return moves;
    }

    resolveCombat(moves) {
      Object.keys(moves).forEach(key => {
        let contenders = moves[key];
        // TRIAL BY COMBAT!
        while(contenders.length > 1) {
          contenders = _.shuffle(contenders);

          let choiceA = 0;
          let choiceB = 0;

          try {
            choiceA = actions.attacks.indexOf(contenders[0].obj.attack());
            if(choiceA < 1) choiceA = 0;
          } catch(ex) {
            choiceA = 0;
          }

          try {
            choiceB = actions.attacks.indexOf(contenders[1].obj.attack());
            if(choiceB < 1) choiceB = 0;
          } catch(ex) {
            choiceB = 0;
          }

          let loserIndex = null;

          if(choiceA === choiceB) loserIndex = _.sample([0,1]);
          else if(choiceA === 0) loserIndex = 0
          else if(choiceB === 0) loserIndex = 1
          else {
            switch(choiceA) {
              case 1: {
                loserIndex = (choiceB === 3) ? 0 : 1;
                break;
              }
              case 2: {
                loserIndex = (choiceB === 1) ? 0 : 1;
                break;
              }
              case 3: {
                loserIndex = (choiceB === 2) ? 0 : 1;
                break;
              }
              default: {
                debugger;
                break;
              }
            }
          }

          contenders.splice(loserIndex, 1);
        }

        this.setPoint(contenders[0].to[0], contenders[0].to[1], contenders[0].obj);
      });
    }

  };

  return Map;
});
