import loggerService from "./services/logger.service";
import projectParser from "./services/project-parser.service";
import { createModelMetadata } from "./templates/model-template";
import { createRepoMetadata } from "./templates/repository-template";
import { parseResource, ResourceMetadata } from "./types/resource-metadata";
import { writeResourceFile } from "./utils/write-file";

export const run = async (
  resourceName: string,
  options: Record<string, any>
) => {
  try {
    const currentDir = process.cwd();

    const projectMetadata = await projectParser.parseProject(currentDir);

    const resource = parseResource(resourceName);

    const model = createModelMetadata(resource, projectMetadata);

    await writeResourceFile(
      currentDir,
      projectMetadata,
      resource.underscoreCase,
      "model",
      resource.pascalCase,
      model.fileContent
    );

    const repo = createRepoMetadata(resource, projectMetadata, model);

    await writeResourceFile(
      currentDir,
      projectMetadata,
      resource.underscoreCase,
      "repo",
      repo.className,
      repo.fileContent
    );
  } catch (e) {
    loggerService.error((e as any).message);
  }
};
