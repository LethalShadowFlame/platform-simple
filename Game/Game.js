var Game = {};
Game.Canvas = document.getElementById("Game");
const ctx = Game.Canvas.getContext("2d");
Game.Canvas.width = window.innerWidth;
Game.Canvas.height = window.innerHeight;
function touching(obj1,obj2) {
  if ((obj1.x < obj2.x + obj2.width) && 
      (obj1.x + obj1.width > obj2.x) &&
      (obj1.y < obj2.y + obj2.height) &&
      (obj1.y + obj1.height > obj2.y)) {
    return true;
  }
  return false;
};
var Player = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  speed: 4,
  yvel: 0,
  headbump: false,
  Touching: {
    checkAll: function() {
      for (let i of Game.Objects) {
        if (touching(Player, i) == true) {
          return true;
        }
      }
      return false;
    }
  },
  moveCollision: function(amount,x) {
    let at = (amount/Math.abs(amount));
    let i;
    if (!(at == NaN)) {
      for (i = 0; i < Math.abs(amount); i++) {
        this[BoolToNumber[BoolToNumber[x]]] += at;
        if (this.Touching.checkAll()) { 
          this[BoolToNumber[BoolToNumber[x]]] -= at;
          if ((at < 0) && (x == false)) {
            this.yvel = -1;
            return false;
          }
          return true;
        };
      };
      return false;
    }
  },
  render: function() {
    ctx.fillRect(this.x - Camera.x, this.y - Camera.y, this.width,this.height);
    let KEYX = (BoolToNumber.Or(Keys["d"], Keys["ArrowRight"])- BoolToNumber.Or(Keys["a"], Keys["ArrowLeft"]));
    let KEYY = (BoolToNumber.Or(Keys["s"], Keys["ArrowDown"]) - BoolToNumber.Or(Keys["w"], Keys["ArrowUp"]));
    if (Math.abs(KEYX) == 1) {
      this.moveCollision(KEYX * this.speed, true);
    }
    if (Game.State.jump) {
      if (this.moveCollision(this.yvel, false)) {
        this.yvel = 0;
        if ((KEYY == -1) && (this.headbump == false)) {
          this.yvel -= 15;
        };
      } else {
        if (this.yvel < 26) {
          this.yvel += 1
        }
      };
    } else {
      this.moveCollision(KEYY * this.speed, false);
    };
    Camera.update();
  }
}
var Camera = {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  update: function() {
    // Follow the player
    this.x = Player.x - (Game.Canvas.width/2);
    this.y = Player.y - (Game.Canvas.height/2);
  }
};
var BoolToNumber = {
  true: 1,
  false: 0,
  Or: function(condition1,condition2) {
    if (condition1 || condition2) {
      return 1;
    }
    return 0;
  },
  1: "x",
  0: "y"
}
var Keys = {
  a: 0,
  d: 0,
  w: 0,
  s: 0,
  ArrowLeft: 0,
  ArrowRight: 0,
  ArrowUp: 0,
  ArrowDown: 0
};
Game.State = {
  jump: true,
}
Game.Objects = [
  {
    x: -250,
    y: 205,
    width: 50,
    height: 660,
  },
  {
    x: -50,
    y: 205,
    width: 40,
    height: 400,
  },
  {
    x: -200,
    y: 765,
    width: 570,
    height: 100,
  },
  {
    x: 500,
    y: 685,
    width: 200,
    height: 400,
  },
  {
    x: 820,
    y: 665,
    width: 100,
    height: 50,
  },
  {
    x: 860,
    y: 900,
    width: 650,
    height: 50,
  },
  {
    x: 1500,
    y: 1100,
    width: 650,
    height: 50,
  },
  {
    x: 2300,
    y: 1090,
    width: 100,
    height: 100,
  },
];

Game.Objects.render = function() {
  for (var obj of this) {
    if (touching(obj, Camera)) {
      ctx.fillRect(obj.x - Camera.x, obj.y - Camera.y, obj.width,obj.height);
    }
  };
}
//Listeners
document.addEventListener("keydown", (event) => {
  if (!(Keys[event.key] == undefined)) {
    Keys[event.key] = 1;
  };
});
document.addEventListener("keyup", (event) => {
  if (!(Keys[event.key] == undefined)) {
    Keys[event.key] = 0;
  };
});
document.addEventListener("resize", () => {
  Game.Canvas.width = window.innerWidth;
  Game.Canvas.height = window.innerHeight;
  Game.Camera.width = window.innerWidth;
  Game.Camera.height = window.innerHeight;
});
document.onclick = () => {
  //Find Distance to player and update keys properly
  //Plans for mobile
};
//Gameloop
function Frame() {
  ctx.clearRect(0, 0, Game.Canvas.width, Game.Canvas.height);
  ctx.fillStyle = "blue";
  Player.render();
  ctx.fillStyle = "black";
  Game.Objects.render();
  requestAnimationFrame(Frame);
};

Frame()