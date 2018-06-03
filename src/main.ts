import { parseCSSUnit, CSSUnitValue } from "./parseCSSUnit";
import { throttle } from "./utils";

const xColumned = new WeakSet<Element>();

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
export function xColumns(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;
  const styleMap = getComputedStyle(element);
  let columnWidth: CSSUnitValue;
  try {
    columnWidth = parseCSSUnit(styleMap.getPropertyValue("column-width"));
  } catch (e) {
    console.warn(
      `[x-columns] Element ${element} does not have a column layout.`
    );
    return false;
  }

  const sizeMarker = document.createElement("span");
  element.appendChild(sizeMarker);
  const columnGap = parseCSSUnit(styleMap.getPropertyValue("column-gap"));
  const px2remRatio =
    1 /
    parseCSSUnit(
      getComputedStyle(document.documentElement).getPropertyValue("font-size")
    ).value;
  const columnSize = columnWidth.value + columnGap.value;
  const writingMode = styleMap.getPropertyValue("writing-mode");

  if (~["tb", "tb-rl", "vertical-rl", "vertical-lr"].indexOf(writingMode)) {
    // Invert resizing in case of vertical writing mode.
    element.style.height = "max-content";
    const sizeMarkerPos =
      sizeMarker.getBoundingClientRect().top -
      element.getBoundingClientRect().top;
    const elementHeight =
      Math.floor(sizeMarkerPos / columnSize + 1) * columnSize;
    element.style.height = `${elementHeight * px2remRatio}rem`;
  } else {
    element.style.width = "max-content";
    const sizeMarkerPos =
      sizeMarker.getBoundingClientRect().left -
      element.getBoundingClientRect().left;
    const elementWidth =
      Math.floor(sizeMarkerPos / columnSize + 1) * columnSize;
    element.style.width = `${elementWidth * px2remRatio}rem`;
  }
  xColumned.add(element);

  element.removeChild(sizeMarker);
  return true;
}

/**
 * Sets all elements with css custom property `--x-columns`
 * equal to `auto` to be resized by x-columns.
 * 
 * Removes x-column sizing is `--x-columns` has been set to
 * `none`.
 *
 * @export
 */
export function xColumnsAll() {
  Array.from(document.querySelectorAll("*"))
    .forEach(el => {
      if (!(el instanceof HTMLElement)) return false;
      const styleMap = getComputedStyle(el);
      if (styleMap.getPropertyValue("--x-columns") == "auto") return xColumns(el);
      if (xColumned.has(el)) {
        const writingMode = styleMap.getPropertyValue("writing-mode");
        if (~["tb", "tb-rl", "vertical-rl", "vertical-lr"].indexOf(writingMode))
          el.style.removeProperty('height');
        else
          el.style.removeProperty('width');
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    (CSS as any).registerProperty({
        name: "--x-columns",
        syntax: "auto | none",
        initialValue: "none",
        inherits: false
    });
    window.addEventListener('resize', throttle(xColumnsAll, 100));
    xColumnsAll();
});