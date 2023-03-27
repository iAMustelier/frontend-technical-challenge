// Description: Utility functions for objects

/**
 * Returns a typed array of keys of an object
 * @param obj The object to get the keys from
 * @returns An array of keys
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = keys(obj); // keys: ('a' | 'b' | 'c')[]
 *
 */
export const keys = <T extends Record<string, any>>(obj: T): (keyof T)[] => {
    return Object.keys(obj) as Array<keyof T>;
};
