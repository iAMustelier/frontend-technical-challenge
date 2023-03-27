import { convertHexToString, dropsToXrp } from 'xrpl';

export const dropsToXrpFormatted = (drops: number | string, precision: number = 2) => {
    const xrps = dropsToXrp(drops);
    return formatAmount(xrps, precision, 0);
};

export const formatAmount = (
    xrps: string | number,
    precision: number = 2,
    minPrecision = precision,
) => {
    const xrpsNumber = Number(xrps);
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: precision,
    });
    return formatter.format(xrpsNumber);
};

export const normalizeCurrencyCode = (currencyCode: string) => {
    return currencyCode.length === 3
        ? currencyCode
        : // remove non-alphabetic characters after converting to string
          // TODO: check if there is a library that can do this
          convertHexToString(currencyCode).replace(/[^A-z]/g, '');
};
