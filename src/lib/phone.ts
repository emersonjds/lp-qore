const extractDigits = (value: string): string => value.replace(/\D/g, "");

export const formatBrazilianPhone = (value: string): string => {
  const digits = extractDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`;

  const splitAt = digits.length === 11 ? 7 : 6;
  return `(${areaCode}) ${digits.slice(2, splitAt)}-${digits.slice(splitAt)}`;
};

export const isValidBrazilianPhone = (value: string): boolean => {
  const digits = extractDigits(value);
  if (digits.length !== 10 && digits.length !== 11) return false;
  if (digits[0] === "0" || digits[1] === "0") return false;
  return digits.length === 10 || digits[2] === "9";
};
