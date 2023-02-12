import { join } from "path";
import { ProjectMetadata } from "./parse-project";
import * as fs from "fs/promises";

export const writeResourceFile = async (
  currentDir: string,
  projectMetadata: ProjectMetadata,
  resourcePackage: string,
  typeSubpackage: string,
  className: string,
  fileContent: string
) => {
  const srcPath = join(
    currentDir,
    "src/main/java",
    projectMetadata.group,
    projectMetadata.name
  );

  const resourcePath = join(srcPath, resourcePackage),
    typePath = join(resourcePath, typeSubpackage),
    fileName = `${className}.java`,
    filePath = join(typePath, fileName);

  await fs.mkdir(typePath, { recursive: true });
  await fs.writeFile(filePath, fileContent);
};
