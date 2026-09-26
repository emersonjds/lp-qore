const FORMULA_TRIGGER = /^[=+\-@\t\r]/;

export const toSpreadsheetSafe = (value: string): string => (FORMULA_TRIGGER.test(value) ? `'${value}` : value);
