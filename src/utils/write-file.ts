import { join } from "path";
import * as fs from "fs/promises";
import chalk from "chalk";

export const writeResourceFile = async (
  path: string,
  className: string,
  fileContent: string
) => {
  const filePath = join(path, `${className}.java`);

  await fs.mkdir(path, { recursive: true });
  await fs.writeFile(filePath, fileContent);

  console.log(`${chalk.green("CREATE")} ${filePath}`);
};
