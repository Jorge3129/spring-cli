export const dtoTemplate = (
  dtoClassName: string,
  fullPackageName: string
): string => {
  return `package ${fullPackageName};

import lombok.Data;

@Data
public class ${dtoClassName} {
}
`;
};
