export const modelTemplate = (
  modelClassName: string,
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
public class ${modelClassName} {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
}
`;
};
