import { ProjectMetadata } from "../services/project-parser.service";
import { ResourceMetadata } from "../types/resource-metadata";
import { ModelMetadata } from "./model-template";

export interface RepoMetadata {
  fileContent: string;
  repoImport: string;
  className: string;
}

export const createRepoMetadata = (
  resource: ResourceMetadata,
  projectMetadata: ProjectMetadata,
  modelMetadata: ModelMetadata
): RepoMetadata => {
  const resourceName = resource.pascalCase,
    subPackageName = resource.underscoreCase,
    fullPackageName = `${projectMetadata.packagePrefix}.${subPackageName}.repo`,
    className = `${resourceName}Repository`,
    repoImport = `${fullPackageName}.${resourceName}`;

  const fileContent = repoTemplate(
    className,
    resourceName,
    fullPackageName,
    modelMetadata.modelImport
  );

  return {
    fileContent,
    repoImport,
    className,
  };
};

const repoTemplate = (
  className: string,
  resourceName: string,
  fullPackageName: string,
  modelImport: string
): string => {
  return `package ${fullPackageName};

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ${modelImport};

@Repository
public interface ${className} extends JpaRepository<${resourceName}, Long> {
}
`;
};
