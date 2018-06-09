/**
 * Sets an element that has a `column-width` property and a
 * constrained `height` to have a width allowing for
 * sufficient columns for elements content.
 *
 * When the elements `writing-mode` is vertical, sets the
 * height under a constrained `width`.
 *
 * @export
 * @param {Element} element
 * @returns {boolean} false if called on an element without
 *                    columns.
 */
export declare function xColumns(element: Element): boolean;
/**
 * Sets all elements with css custom property `--x-columns`
 * equal to `auto` to be resized by x-columns.
 *
 * Removes x-column sizing is `--x-columns` has been set to
 * `none`.
 *
 * @export
 */
export declare function xColumnsAll(): void;
