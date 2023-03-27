export type Nullish = null | undefined;

/**
 * Returns true when value is null or undefined
 */
export const isNullish = (val: unknown): val is Nullish => val === null || val === undefined;
