import { keycode, newdirection } from "./value_default.js";
import { Player, Shoot } from "./player.js";
import { EnemyTank1, EnemyTank2, EnemyTank3, EnemyTank4 } from "./enemy.js";
import { Wall, WALL_SIZE } from "./wall.js";
// canvans
/**
 * @type {HTMLCanvasElement}
 */
const canvasid = document.getElementById('canvasid');
const ctx = canvasid.getContext("2d");
canvasid.width = 500;//window.innerWidth;
canvasid.height = 500;//window.innerHeight;



class InputHandler {
  /**
   *
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', e => {
      if ((e.key === keycode.up || e.key === keycode.down || e.key === keycode.left || e.key === keycode.right) && (this.game.keys.indexOf(e.key) === -1)) {
        this.game.keys.push(e.key);
      }
      if (e.key === 'd') this.game.debug = !this.game.debug;

      if (this.game.player.makerdelete && e.key === 'r') {
        this.game.init();
      }
    });

    window.addEventListener('keyup', e => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
      if (e.key === ' ') {
        this.game.player.shoot();
      }
    });

  }
}




// new game
export class Game {
  /**
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new InputHandler(this);
    this.init();
  }
  init() {
    this.walls = [];
    this.keys = [];
    this.player = new Player(this);
    this.enemys = [];
    this.shoots = [];
    this.debug = false;
    //  enemy
    this.maxEnemy = 3;
    this.timeAddEnemey = 0;
    this.maxTimeAdd = 0;
    // shoot enemy
    this.timeShoot = 0;
    this.shootInterval = 3000000;
    // mover enemy

    this.timeMover = 0;
    this.moverInterval = 2000;
    this.addWall();
    for (let i = 0; i < this.maxEnemy; i++)
      this.addEnemy();
  }
  /**
   *
   * @param {number} deltaTime
   */
  update(deltaTime) {

    this.shoots.forEach(shoot => {

      // kiem tra vien dan cua nguoi cho khi ban vao xe tabg
      this.enemys.forEach(enemy => {
        if (this.checkCollision(enemy, shoot)) {
          enemy.lives--;
          if (enemy.lives <= 0)
            enemy.makerdelete = true;
          shoot.makerdelete = true;
        }
      });
      // kem tra dan voi dan
      this.shoots.forEach(shoott => {
        if (this.checkCollision(shoot, shoott)) {
          shoot.makerdelete = true;
          shoot.makerdelete = true;
        }
      });
      // kiem tra dan voi play
      // if (this.checkCollision(this.player, shoot)) {
      //   shoot.makerdelete = true;
      //   this.player.makerdelete = true;
      // }

      this.walls.forEach(wall => {
        if (this.checkCollision(wall, shoot)) {
          wall.lives--;
          wall.update();
          if (wall.lives <= 0) {
            wall.makerdelete = true;
          }
          shoot.makerdelete = true;
        }
      });
    });
    if (this.player.makerdelete) {
      return;
    }

    this.player.update();

    this.enemys.forEach(enemy => {


      this.walls.forEach(wall => {
        if (this.checkCollision(wall, enemy)) {
          let d = enemy.direction;
          enemy.rollBackMove();
          enemy.update();
          // enemy.update();
          enemy.updateMove(newdirection(d));

        }
      });
      enemy.update();



      if (this.timeShoot > this.shootInterval) {
        enemy.shoot();
        this.timeShoot = 0;
      } else this.timeShoot += deltaTime;
      if (this.timeMover > this.moverInterval) {
        let rd = Math.random();
        let code = keycode.up;
        if (rd < 0.25) code = keycode.up;
        else if (rd < 0.5) code = keycode.down;
        else if (rd < 0.75) code = keycode.left;
        else code = keycode.right;
        enemy.updateMove(code);
        this.timeMover = 0;
      } else this.timeMover += deltaTime;


    });
    this.shoots.forEach(shoot => {
      shoot.update();
    });


    this.walls = this.walls.filter(wall => !wall.makerdelete);
    this.enemys = this.enemys.filter(enemy => !enemy.makerdelete);
    this.shoots = this.shoots.filter(shoot => !shoot.makerdelete);


    // if (this.timeAddEnemey > this.maxTimeAdd) {
    //   this.timeAddEnemey = 0;
    //   this.addEnemy();
    // } else this.timeAddEnemey += deltaTime;

  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    if (this.player.makerdelete || this.enemys.length == 0) {
      let msg1 = '';
      let msg2 = 'Press Key R new game!!!';
      if (this.player.makerdelete) {
        msg1 = "Gamer Over!!";
      }
      if (0 == this.enemys.length) {
        msg1 = 'You Win';
        this.player.makerdelete = true;
      }
      context.font = '30px  Helvetica';
      context.fillText(msg1, this.width * 0.3 + 60, this.height * 0.5);
      context.fillText(msg2, this.width * 0.3, this.height * 0.5 + 40);
    }
    this.player.draw(context);
    this.walls.forEach(wall => wall.draw(context));
    this.enemys.forEach(enemy => enemy.draw(context));
    this.shoots.forEach(shoot => shoot.draw(context));

  }

  addEnemy() {
    if (this.enemys.length < this.maxEnemy) {
      let rd = Math.random();

      if (rd < 0.25)
        this.enemys.push(new EnemyTank1(this));

      else if (rd < 0.5)
        this.enemys.push(new EnemyTank2(this));

      else if (rd < 0.75)
        this.enemys.push(new EnemyTank3(this));
      else
        this.enemys.push(new EnemyTank4(this));

    }
  }

  addWall() {

    let row = Math.floor(this.width / (WALL_SIZE));
    let col = Math.floor(this.height / (WALL_SIZE));

    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        if (Math.random() <= 0.3) {
          this.walls.push(new Wall(this, x * WALL_SIZE, y * WALL_SIZE));
        }
      }
    }

    console.log(this.walls.length);
  }
  /**
   *
   * @param {Enemy | Player} rect1
   * @param {Shoot} rect2
   */
  checkCollision(rect1, rect2) {
    // return false;
    if (rect1.type === rect2.type) return false;
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.width &&
      rect1.height + rect1.y > rect2.y
    );
  }



}


const game = new Game(canvasid.width, canvasid.height);
window.game = game;
let lastTime = 0;

/**
 *
 * @param {number} timeStamp
 */
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, canvasid.width, canvasid.height);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(animate);
}

animate(0);