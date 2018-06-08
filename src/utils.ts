/**
 * Wraps a function, `callback` so that it cannot be called
 * more frequently than once every {limit}ms.
 *
 * @export
 * @param {Function} callback
 * @param {number} limit
 * @returns
 */
export function throttle(callback : Function, limit : number) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  }
}

export const css = String.raw;