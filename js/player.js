import { keycode } from "./value_default.js";

export class Shoot {
  /**
   *
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   * @param {number} direction
   * @param {string} type
   */
  constructor(game, x, y, direction, type) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed = 8;
    this.speedX = 0;
    this.speedY = 0;
    this.image = document.getElementById(`ammo_${direction}`);
    switch (direction) {
      case keycode.up:
        this.speedY = -this.speed;
        this.x = x + this.game.player.width * 0.4;
        break;

      case keycode.down:
        this.speedY = this.speed;
        this.x = x + this.game.player.width * 0.4;
        this.y = y + this.game.player.height;
        break;

      case keycode.left:
        this.speedX = -this.speed;
        this.y = y + this.game.player.height * 0.4;
        break;
      case keycode.right:
        this.speedX = this.speed;
        this.x = x + this.game.player.width;
        this.y = y + this.game.player.height * 0.4;
      default:
        break;
    }
    this.width = 10;
    this.height = 10;
    this.makerdelete = false;

  }
  update() {
    let x = this.x + this.speedX;
    let y = this.y + this.speedY;
    this.y = y;
    this.x = x;

    if ((x < 0 || x > this.game.width - this.width) ||
      (y < 0 || y > this.game.height - this.height)) this.makerdelete = true;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}


export class Player {
  /**
   *
   *  @param {import('./javascript.js').Game} game
   */
  constructor(game) {
    /**
     * @type {HTMLImageElement}
     */

    this.game = game;
    this.makerdelete = false;
    this.type = "player";
    this.width = 50;
    this.height = 50;
    this.x = this.game.width * 0.5 - this.width;
    this.y = this.game.height - this.height;
    this.maxSpeed = 3;
    this.lives = 1;
    this.speedX = 0;
    this.speedY = 0;
    // huong hien tai cua nong sung
    this.direction = Object.values(keycode)[Math.floor(Math.random() * 3)];
    this.image = document.getElementById(`tank_${this.direction}`);


  }

  update() {
    if (this.game.keys[0] === (keycode.left)) {
      this.speedX = -this.maxSpeed;
    }
    else if (this.game.keys[0] === (keycode.right)) {
      this.speedX = this.maxSpeed;
    }
    else this.speedX = 0;

    if (this.game.keys[0] === (keycode.up)) {
      this.speedY = -this.maxSpeed;
    }
    else if (this.game.keys[0] === (keycode.down)) {
      this.speedY = this.maxSpeed;
    }
    else this.speedY = 0;

    // update image tank
    if (this.game.keys.length > 0) this.direction = this.game.keys[0];
    this.updateImagTank(this.direction);


    let x = this.x + this.speedX;
    if (x >= 0 && x < this.game.width - this.width) this.x = x;
    let y = this.y + this.speedY;
    if (y >= 0 && y < this.game.height - this.height) this.y = y;

  }
  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {

    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  shoot() {
    this.game.shoots.push(new Shoot(this.game, this.x, this.y, this.direction, this.type));
  }

  /**
   *
   * @param {string} key
   */
  updateImagTank(key) {
    this.image = document.getElementById('tank_' + key);
  }

}
