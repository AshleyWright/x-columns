/**
 * Wraps a function, `callback` so that it cannot be called
 * more frequently than once every {limit}ms.
 *
 * @export
 * @param {Function} callback
 * @param {number} limit
 * @returns
 */
export declare function throttle(callback: Function, limit: number): () => void;
export declare const css: (template: TemplateStringsArray, ...substitutions: any[]) => string;
