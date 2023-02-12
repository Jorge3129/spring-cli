export const serviceInterfaceTemplate = (params: {
  fullPackageName: string;
  serviceInterfaceName: string;
  modelClassName: string;
  modelImport: string;
  dtoClassName: string;
  dtoImport: string;
}): string => {
  const {
    serviceInterfaceName,
    fullPackageName,
    modelClassName,
    dtoClassName,
    modelImport,
    dtoImport,
  } = params;

  return `package ${fullPackageName};

import ${dtoImport};
import ${modelImport};

public interface ${serviceInterfaceName} {
  ${modelClassName} create(${dtoClassName} dto);
}
`;
};
