/**
 * An array of numbers representing months from January (1) to December (12).
 */
export const MONTHS = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
];

/**
 * An array of years starting from 2015 to 2025 (inclusive).
 */
export const YEARS = Array.from(
    { length: (2025 - 2015) + 1 },
    (_, index) => 2015 + index
);
