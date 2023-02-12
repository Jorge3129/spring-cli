import {
  parseKebabCase,
  toPascalCase,
  toUnderScoreCase,
} from "../utils/case-utils";

export interface ResourceNamingSets {
  pascalCase: string;
  underscoreCase: string;
  kebabCase: string;
}

export const parseResource = (resourceName: string): ResourceNamingSets => {
  const resourceSplit = parseKebabCase(resourceName);

  return {
    kebabCase: resourceName,
    pascalCase: toPascalCase(resourceSplit),
    underscoreCase: toUnderScoreCase(resourceSplit),
  };
};
