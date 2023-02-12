#! /usr/bin/env node

import { Command } from "commander";
import { run } from "./run";

const program = new Command();

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .argument("<resource>", "resource name")
  .option("-p, --package [name]", "Package name")
  .action(run)
  .parse(process.argv);
