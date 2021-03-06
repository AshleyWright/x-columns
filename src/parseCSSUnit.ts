export type CSSUnit = "Hz" | "Q" | "ch" | "cm" | "deg" | "dpcm" | "dpi" | "dppx" | "em" | "ex" | "fr" | "grad" | "in" | "kHz" | "mm" | "ms" | "number" | "pc" | "percent" | "pt" | "px" | "rad" | "rem" | "s" | "turn" | "vh" | "vmax" | "vmin" | "vw";

export interface CSSUnitValue {
  value: number;
  unit: CSSUnit;
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
export function parseCSSUnit(str: { toString(): string }): CSSUnitValue {
  const result = /^([+-]?\d*.?\d*)\s*(%|Hz|Q|ch|cm|deg|dpcm|dpi|dppx|em|ex|fr|grad|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vw|)$/
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
    return { value: parseFloat(result[1]), unit: result[2] as CSSUnit };
  }
  throw new Error(`Unrecognised CSS Value: ${str}`);
}
