export const controllerTemplate = (params: {
  controllerClassName: string;
  route: string;
  fullPackageName: string;
  serviceInterfaceName: string;
  serviceInterfaceImport: string;
  modelClassName: string;
  modelImport: string;
  dtoClassName: string;
  dtoImport: string;
}): string => {
  const {
    fullPackageName,
    route,
    controllerClassName,
    serviceInterfaceName,
    serviceInterfaceImport,
    dtoClassName,
    dtoImport,
    modelClassName,
    modelImport,
  } = params;

  const serviceFieldName = "service";

  return `package ${fullPackageName};

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ${dtoImport};
import ${modelImport};
import ${serviceInterfaceImport};

@RestController
@RequestMapping("${route}")
public class ${controllerClassName} {

  @Autowired
  private ${serviceInterfaceName} ${serviceFieldName};

  @PostMapping
  public ${modelClassName} create(
    @Valid
    @RequestBody
    ${dtoClassName} dto
  ) {
    return this.${serviceFieldName}.create(dto);
  }
}
`;
};
