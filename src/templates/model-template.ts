import { ResourceMetadata } from "../types/resource-metadata";
import { ProjectMetadata } from "../utils/parse-project";

export interface ModelMetadata {
  fileContent: string;
  modelImport: string;
}

export const createModelMetadata = (
  resource: ResourceMetadata,
  projectMetadata: ProjectMetadata
): ModelMetadata => {
  const packagePrefix = `${projectMetadata.group}.${projectMetadata.name}`;

  const resourceName = resource.pascalCase,
    packageName = resource.underscoreCase,
    fullPackageName = `${packagePrefix}.${packageName}.model`,
    modelImport = `${fullPackageName}.${resourceName}`;

  const fileContent = modelTemplate(resourceName, fullPackageName);

  return {
    fileContent,
    modelImport,
  };
};

const modelTemplate = (
  resourceName: string,
  fullPackageName: string
): string => {
  return `package ${fullPackageName};

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity()
public class ${resourceName} {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
}
  `;
};
