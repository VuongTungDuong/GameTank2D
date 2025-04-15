export const WALL_SIZE = 55;

export class Wall {
  /**
   *
   * @param {import('./javascript.js').Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    this.game = game;
    this.width = WALL_SIZE;
    this.height = WALL_SIZE;
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.type = 'wall';
    this.makerdelete = false;
    this.image = document.getElementById('wall_1');
  }

  update() {
    switch (this.lives) {
      case 3:
        this.image = document.getElementById('wall_1');
        break;
      case 2:
        this.image = document.getElementById('wall_2');
        break;
      default:
        this.image = document.getElementById('wall_3');
        break;

    }

  }
  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {

    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}