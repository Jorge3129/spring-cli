export const repoTemplate = (params: {
  fullPackageName: string;
  repoClassName: string;
  modelClassName: string;
  modelImport: string;
}): string => {
  const { fullPackageName, repoClassName, modelClassName, modelImport } =
    params;

  return `package ${fullPackageName};

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ${modelImport};

@Repository
public interface ${repoClassName} extends JpaRepository<${modelClassName}, Long> {
}
`;
};
