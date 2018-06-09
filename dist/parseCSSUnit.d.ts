export declare type CSSUnit = "Hz" | "Q" | "ch" | "cm" | "deg" | "dpcm" | "dpi" | "dppx" | "em" | "ex" | "fr" | "grad" | "in" | "kHz" | "mm" | "ms" | "number" | "pc" | "percent" | "pt" | "px" | "rad" | "rem" | "s" | "turn" | "vh" | "vmax" | "vmin" | "vw";
export interface CSSUnitValue {
    value: number;
    unit: CSSUnit;
}
export declare function parseCSSUnit(str: {
    toString(): string;
}): CSSUnitValue;
