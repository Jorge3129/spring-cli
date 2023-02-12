export const serviceImplTemplate = (params: {
  fullPackageName: string;
  serviceInterfaceName: string;
  serviceImplName: string;
  repoClassName: string;
  repoImport: string;
  modelClassName: string;
  modelImport: string;
  dtoClassName: string;
  dtoImport: string;
}): string => {
  const {
    fullPackageName,
    serviceInterfaceName: serviceInterface,
    serviceImplName: serviceClassName,
    repoClassName,
    repoImport,
    dtoClassName,
    dtoImport,
    modelClassName,
    modelImport,
  } = params;

  const repoFieldName = "repo";

  return `package ${fullPackageName};

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ${dtoImport};
import ${modelImport};
import ${repoImport};

@Service
public class ${serviceClassName} implements ${serviceInterface} {

  @Autowired
  private ${repoClassName} ${repoFieldName};

  @Override
  public ${modelClassName} create(${dtoClassName} dto) {
  return this.${repoFieldName}.save(
    ${modelClassName}.builder().build()
  );
  }
}
`;
};
