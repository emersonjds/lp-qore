const NUMBER_PATTERN = /\d{1,3}(?:\.\d{3})+|\d+/;
const brazilianNumber = new Intl.NumberFormat("pt-BR");

export const formatCountFrame = (text: string, progress: number): string =>
  text.replace(NUMBER_PATTERN, (match) => brazilianNumber.format(Math.round(Number(match.replaceAll(".", "")) * progress)));
