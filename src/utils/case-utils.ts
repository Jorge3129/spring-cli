export const parseKebabCase = (str: string): string[] => {
  return str.split("-").map((word) => word.toLowerCase());
};

export const toPascalCase = (words: string[]): string => {
  return words
    .map((word) => word.at(0)?.toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

export const toKebabCase = (words: string[]): string => {
  return words.map((word) => word.toLowerCase()).join("-");
};

export const toUnderScoreCase = (words: string[]) => {
  return words.map((word) => word.toLowerCase()).join("_");
};
