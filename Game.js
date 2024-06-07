var Game = {};
Game.Canvas = document.getElementById("Game");
const ctx = Game.Canvas.getContext("2d");
ctx.fillStyle = "black";
Game.Canvas.width = window.innerWidth;
Game.Canvas.height = window.innerHeight;
var Player = {
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  speed: 4,
  yvel: 0,
  Touching: {
    check: function(idx) {
      let obj = Game.Objects[idx];
      if ((obj.x < Player.x + Player.w) && 
          (obj.x + obj.w > Player.x) &&
          (obj.y < Player.y + Player.h) && 
          (obj.y + obj.h > Player.y)) {
        return true;
      }
      return false;
    },
    checkAll: function() {
      for (let i=Game.Objects.length-1;i>-1;i--) {
        console.log(i);
        if (Player.Touching.check(i) == true) {
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
          return true;
        };
      };
      return false;
    }
  },
  render: function() {
    ctx.fillRect(this.x - Camera.x, this.y - Camera.y, this.w,this.h);
    let KEYX = (BoolToNumber.Or(Keys["d"], Keys["ArrowRight"])- BoolToNumber.Or(Keys["a"], Keys["ArrowLeft"]));
    let KEYY = (BoolToNumber.Or(Keys["s"], Keys["ArrowDown"]) - BoolToNumber.Or(Keys["w"], Keys["ArrowUp"]));
    if (Math.abs(KEYX) == 1) {
      this.moveCollision(KEYX * this.speed, true);
    }
    if (Game.State.jump) {
      if (this.moveCollision(this.yvel, false)) {//Condition to be added - If touching any object
        this.yvel = 0;
        if (KEYY == -1) {
          this.yvel -= 15;
        };
      } else {
        this.yvel += 1
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
  update: function() {
    // Follow the player
    //this.x = Player.x - (Game.Canvas.width/2);
    //this.y = Player.y - (Game.Canvas.height/2);
    //Restrict camera view here
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
    x: 0,
    y: 775,
    w: 400,
    h: 50,
  },
  {
    x: 500,
    y: 765,
    w: 200,
    h: 50,
  },
  {
    x: 150,
    y: 725,
    w: 50,
    h: 50,
  },
];
Game.Objects.render = function() {
  for (var obj of this) {
    ctx.fillRect(obj.x - Camera.x, obj.y - Camera.y, obj.w,obj.h);
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
});
document.onclick = () => {
  //Find Distance to player and update keys properly
  //Plans for mobile
};
//Gameloop
function Frame() {
  ctx.clearRect(0, 0, Game.Canvas.width, Game.Canvas.height);
  Player.render();
  Game.Objects.render();
  requestAnimationFrame(Frame);
};
Frame()