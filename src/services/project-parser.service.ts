import * as fs from "fs/promises";
import { join } from "path";
import { Maybe } from "purify-ts";

export interface ProjectMetadata {
  name: string;
  group: string;
}

export class ProjectParserService {
  public async parseProject(currentDir: string): Promise<ProjectMetadata> {
    const name = await this.parseName(currentDir),
      group = await this.parseGroup(currentDir);

    return { name, group };
  }

  public async parseGroup(currentDir: string): Promise<string> {
    const build = await fs
      .readFile(join(currentDir, "build.gradle"), { encoding: "utf8" })
      .catch(() => {
        throw new Error("Could not find build.gradle");
      });

    if (!build) {
      throw new Error("Could not find build.gradle");
    }

    return Maybe.fromNullable(build.match(/group = '(\w+)'/))
      .chainNullable((matches) => matches[1])
      .caseOf({
        Just: (name) => name,
        Nothing: () => {
          throw new Error("Could not find project group");
        },
      });
  }

  public async parseName(currentDir: string): Promise<string> {
    const settings = await fs
      .readFile(join(currentDir, "settings.gradle"), { encoding: "utf8" })
      .catch(() => {
        throw new Error("Could not find settings.gradle");
      });

    if (!settings) {
      throw new Error("Could not find settings.gradle");
    }

    return Maybe.fromNullable(settings.match(/rootProject\.name = '(\w+)'/))
      .chainNullable((matches) => matches[1])
      .caseOf({
        Just: (name) => name,
        Nothing: () => {
          throw new Error("Could not find project name");
        },
      });
  }
}

export default new ProjectParserService();
