const CNPJ_LENGTH = 14;
const FIRST_CHECK_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const SECOND_CHECK_WEIGHTS = [6, ...FIRST_CHECK_WEIGHTS];

export const extractCnpjDigits = (value: string): string => value.replace(/\D/g, "").slice(0, CNPJ_LENGTH);

export const formatCnpj = (value: string): string => {
  const digits = extractCnpjDigits(value);
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 8), digits.slice(8, 12), digits.slice(12)];
  const [root, first, second, branch, check] = parts;
  let formatted = root;
  if (first) formatted += `.${first}`;
  if (second) formatted += `.${second}`;
  if (branch) formatted += `/${branch}`;
  if (check) formatted += `-${check}`;
  return formatted;
};

const checkDigit = (digits: string, weights: readonly number[]): number => {
  const sum = weights.reduce((total, weight, index) => total + Number(digits[index]) * weight, 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};

export const isValidCnpj = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== CNPJ_LENGTH || /^(\d)\1+$/.test(digits)) return false;
  return (
    checkDigit(digits, FIRST_CHECK_WEIGHTS) === Number(digits[12]) &&
    checkDigit(digits, SECOND_CHECK_WEIGHTS) === Number(digits[13])
  );
};
