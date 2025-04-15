export const keycode = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };

/**
 *
 * @param {string} direction
 */
export function newdirection(direction) {
  switch (direction) {
    case keycode.up:
      return keycode.right;
    case keycode.right:
      return keycode.down;
    case keycode.down:
      return keycode.left;
    case keycode.left:
      return keycode.up;
  }
}