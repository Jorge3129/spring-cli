import * as fs from "fs/promises";
import { join } from "path";
import { Maybe } from "purify-ts";

export interface ProjectMetadata {
  name: string;
  group: string;
}

export const parseProject = async (
  currentDir: string
): Promise<ProjectMetadata> => {
  const name = await parseName(currentDir),
    group = await parseGroup(currentDir);

  return { name, group };
};

export const parseGroup = async (currentDir: string): Promise<string> => {
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
};

export const parseName = async (currentDir: string): Promise<string> => {
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
};
