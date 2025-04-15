import { keycode, newdirection } from "./value_default.js";
import { Player } from "./player.js";
import { WALL_SIZE } from "./wall.js";
export class Enemy extends Player {
  /**
    *
    * @param {import('./javascript.js').Game} game
    */
  constructor(game) {
    /**
     * @type {HTMLImageElement}
     */
    super(game);
    this.type = "enemy";
    this.maxSpeed = 2;
    let x = Math.random();
    if (x < 0.5) x = 0;
    else x = this.game.width - this.width;
    this.x = x;
    this.y = 0;
  }

  update() {

    if (this.direction === (keycode.left)) {
      this.speedX = -this.maxSpeed;
    }
    else if (this.direction === (keycode.right)) {
      this.speedX = this.maxSpeed;
    }
    else this.speedX = 0;

    if (this.direction === (keycode.up)) {
      this.speedY = -this.maxSpeed;
    }
    else if (this.direction === (keycode.down)) {
      this.speedY = this.maxSpeed;
    }
    else this.speedY = 0;

    let x = this.x + this.speedX;
    if (x >= 0 && x < this.game.width - this.width) {
      this.x = x;
    } else this.direction = newdirection(this.direction);
    let y = this.y + this.speedY;
    if (y >= 0 && y < this.game.height - this.height) {
      this.y = y;
    } else this.direction = newdirection(this.direction);
    this.updateImagTank(this.direction);

  }
  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   *
   * @param {string} key
   */
  updateImagTank(key) {
    this.image = document.getElementById('tank_1_enemy_' + key);
  }

  updateMove(code) {
    this.direction = code;
  }

  rollBackMove() {
    switch (this.direction) {
      case keycode.up:
        this.direction = keycode.down;
        break;

      case keycode.right:
        this.direction = keycode.left;
        break;
      case keycode.down:
        this.direction = keycode.up;
        break;
      case keycode.left:
        this.direction = keycode.right;
        break;
    }
  }
}


export class EnemyTank1 extends Enemy {
  constructor(game) {
    super(game);
    this.lives = 1;
    // this.maxSpeed = 6;

  }
  updateImagTank(key) {
    this.image = document.getElementById('tank_1_enemy_' + key);
  }
}

export class EnemyTank2 extends Enemy {
  constructor(game) {
    super(game);
    this.lives = 2;
    // this.maxSpeed = 5;

  }
  updateImagTank(key) {
    this.image = document.getElementById('tank_2_enemy_' + key);
  }
}

export class EnemyTank3 extends Enemy {
  constructor(game) {
    super(game);
    this.lives = 3;
    // this.maxSpeed = 4;

  }
  updateImagTank(key) {
    this.image = document.getElementById('tank_3_enemy_' + key);
  }
}

export class EnemyTank4 extends Enemy {
  constructor(game) {
    super(game);
    this.lives = 4;
    // this.maxSpeed = 3;
  }
  updateImagTank(key) {
    this.image = document.getElementById('tank_4_enemy_' + key);
  }
}