'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

/**
 * Parses a string of a css unit value into an object with
 * properties `value` and `unit`.
 *
 * @export
 * @param {string} str
 * @returns {CSSUnitValue}
 * @throws Error when encountering an unrecognised css value
 */
function parseCSSUnit(str) {
    var result = /^([+-]?\d*.?\d*)\s*(%|Hz|Q|ch|cm|deg|dpcm|dpi|dppx|em|ex|fr|grad|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vw|)$/
        .exec(str.toString());
    if (result) {
        switch (result[2]) {
            case "%":
                result[2] = "percent";
                break;
            case "":
                result[2] = "number";
                break;
        }
        return { value: parseFloat(result[1]), unit: result[2] };
    }
    throw new Error("Unrecognised CSS Value: " + str);
}

/**
 * Wraps a function, `callback` so that it cannot be called
 * more frequently than once every {limit}ms.
 *
 * @export
 * @param {Function} callback
 * @param {number} limit
 * @returns
 */
function throttle(callback, limit) {
    var wait = false;
    return function () {
        if (!wait) {
            callback.apply(null, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    };
}
var css = String.raw;

var xColumned = new WeakSet();
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
function xColumns(element) {
    if (!(element instanceof HTMLElement))
        return false;
    var styleMap = getComputedStyle(element);
    var columnWidth;
    try {
        columnWidth = parseCSSUnit(styleMap.getPropertyValue("column-width"));
    }
    catch (e) {
        console.warn("[x-columns] Element " + element + " does not have a column layout.");
        return false;
    }
    var sizeMarker = document.createElement("span");
    element.appendChild(sizeMarker);
    var columnGap = parseCSSUnit(styleMap.getPropertyValue("column-gap"));
    var px2remRatio = 1 /
        parseCSSUnit(getComputedStyle(document.documentElement).getPropertyValue("font-size")).value;
    var columnSize = columnWidth.value + columnGap.value;
    var writingMode = styleMap.getPropertyValue("writing-mode");
    if (~["tb", "tb-rl", "vertical-rl", "vertical-lr"].indexOf(writingMode)) {
        // Invert resizing in case of vertical writing mode.
        element.style.height = "max-content";
        var sizeMarkerPos = sizeMarker.getBoundingClientRect().top -
            element.getBoundingClientRect().top;
        var elementHeight = Math.floor(sizeMarkerPos / columnSize + 1) * columnSize;
        element.style.height = elementHeight * px2remRatio + "rem";
    }
    else {
        element.style.width = "max-content";
        var sizeMarkerPos = sizeMarker.getBoundingClientRect().left -
            element.getBoundingClientRect().left;
        var elementWidth = Math.floor(sizeMarkerPos / columnSize + 1) * columnSize;
        element.style.width = elementWidth * px2remRatio + "rem";
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
function xColumnsAll() {
    Array.from(document.querySelectorAll("*"))
        .forEach(function (el) {
        if (!(el instanceof HTMLElement))
            return false;
        var styleMap = getComputedStyle(el);
        if (/^\s*auto\s*$/.test(styleMap.getPropertyValue("--x-columns")))
            return xColumns(el);
        if (xColumned.has(el)) {
            var writingMode = styleMap.getPropertyValue("writing-mode");
            if (~["tb", "tb-rl", "vertical-rl", "vertical-lr"].indexOf(writingMode))
                el.style.removeProperty("height");
            else
                el.style.removeProperty("width");
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    if (CSS && CSS.registerProperty) {
        CSS.registerProperty({
            name: "--x-columns",
            syntax: "auto | none",
            initialValue: "none",
            inherits: false
        });
    }
    else {
        var style = document.createElement("style");
        style.textContent = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["*, *::before, *::after {\n        --x-columns: none;\n      }"], ["*, *::before, *::after {\n        --x-columns: none;\n      }"])));
        document.head.appendChild(style);
    }
    window.addEventListener("resize", throttle(xColumnsAll, 100));
    xColumnsAll();
});
var templateObject_1;

exports.xColumns = xColumns;
exports.xColumnsAll = xColumnsAll;
//# sourceMappingURL=x-columns.cjs.js.map
