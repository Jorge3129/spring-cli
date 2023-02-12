import { join } from "path";
import loggerService from "./services/logger.service";
import projectParser from "./services/project-parser.service";
import { controllerTemplate } from "./templates/controller-template";
import { dtoTemplate } from "./templates/dto-template";
import { modelTemplate } from "./templates/model-template";
import { repoTemplate } from "./templates/repository-template";
import { serviceImplTemplate } from "./templates/service-impl-template";
import { serviceInterfaceTemplate } from "./templates/service-interface-template";
import { parseResource } from "./types/resource-metadata";
import { writeResourceFile } from "./utils/write-file";

export const run = async (
  resourceName: string,
  options: Record<string, any>
) => {
  try {
    const currentDir = process.cwd();
    const projectMetadata = await projectParser.parseProject(currentDir);

    const resourceNames = parseResource(resourceName);

    loggerService.warn(`Creating resource ${resourceName}...`);

    const packageName = `${resourceNames.underscoreCase}s`;

    const absPath = join(
      currentDir,
      "src/main/java",
      projectMetadata.group,
      projectMetadata.name,
      packageName
    );

    const nestedPackage = [
      projectMetadata.group,
      projectMetadata.name,
      packageName,
    ];

    const modelClassName = resourceNames.pascalCase,
      modelPackage = [...nestedPackage, "model"].join("."),
      modelFileContent = modelTemplate(modelClassName, modelPackage),
      modelPath = join(absPath, "model"),
      modelImport = `${modelPackage}.${modelClassName}`;

    const repoClassName = `${resourceNames.pascalCase}Repository`,
      repoPackage = [...nestedPackage, "repo"].join("."),
      repoFileContent = repoTemplate({
        fullPackageName: repoPackage,
        repoClassName,
        modelImport,
        modelClassName,
      }),
      repoPath = join(absPath, "repo"),
      repoImport = `${repoPackage}.${repoClassName}`;

    const dtoClassName = `Create${resourceNames.pascalCase}Dto`,
      dtoPackage = [...nestedPackage, "dto"].join("."),
      dtoFileContent = dtoTemplate(dtoClassName, dtoPackage),
      dtoPath = join(absPath, "dto"),
      dtoImport = `${dtoPackage}.${dtoClassName}`;

    const serviceInterfaceName = `${resourceNames.pascalCase}Service`,
      servicePackage = [...nestedPackage, "service"].join("."),
      serviceInterfaceFileContent = serviceInterfaceTemplate({
        fullPackageName: servicePackage,
        serviceInterfaceName,
        dtoClassName,
        dtoImport,
        modelImport,
        modelClassName,
      }),
      servicePath = join(absPath, "service"),
      serviceInterfaceImport = `${servicePackage}.${serviceInterfaceName}`;

    const serviceImplName = `${serviceInterfaceName}Impl`,
      serviceImplFileContent = serviceImplTemplate({
        fullPackageName: servicePackage,
        serviceInterfaceName,
        serviceImplName,
        dtoClassName,
        dtoImport,
        modelClassName,
        modelImport,
        repoClassName,
        repoImport,
      });

    const controllerClassName = `${resourceNames.pascalCase}Controller`,
      controllerPackage = [...nestedPackage, "controller"].join("."),
      controllerFileContent = controllerTemplate({
        route: resourceNames.kebabCase,
        controllerClassName,
        fullPackageName: controllerPackage,
        serviceInterfaceName,
        serviceInterfaceImport,
        dtoClassName,
        dtoImport,
        modelImport,
        modelClassName,
      }),
      controllerPath = join(absPath, "controller");

    await writeResourceFile(modelPath, modelClassName, modelFileContent);
    await writeResourceFile(repoPath, repoClassName, repoFileContent);
    await writeResourceFile(dtoPath, dtoClassName, dtoFileContent);
    await writeResourceFile(
      servicePath,
      serviceInterfaceName,
      serviceInterfaceFileContent
    );
    await writeResourceFile(
      servicePath,
      serviceImplName,
      serviceImplFileContent
    );
    await writeResourceFile(
      controllerPath,
      controllerClassName,
      controllerFileContent
    );
  } catch (e) {
    loggerService.error((e as any).message);
  }
};
