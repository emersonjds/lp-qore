const NUMBER_PATTERN = /(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?/;

export const formatCountFrame = (text: string, progress: number): string =>
  text.replace(NUMBER_PATTERN, (_match, integerPart: string, decimalPart: string | undefined) => {
    const decimalPlaces = decimalPart?.length ?? 0;
    const value = Number(`${integerPart.replaceAll(".", "")}.${decimalPart ?? "0"}`);
    const scale = 10 ** decimalPlaces;
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Math.round(value * progress * scale) / scale);
  });
