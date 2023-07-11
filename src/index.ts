#! /usr/bin/env node

import { Command } from "commander";
import { jsonCreator } from "./creator/creator-file";
import { parseConfig } from "./json-parse";
import { logResult } from "./log-result";

const figlet = require("figlet");
const program = new Command();

console.log(figlet.textSync("PinCe"));

program
  // 版本信息
  .version("0.0.1", "-v, --version")
  .description("An ambitious test package for UI test.")
  .requiredOption("-c, --config <source>", "config file path")
  .option("-o, --output <path>", "set the path of the generated test file")
  .parse(process.argv);

const options = program.opts();

if (options.config) {
  const configFilePath =
    typeof options.config === "string" ? options.config : __dirname;
  try {
    const allConfig = parseConfig(configFilePath, options);
    const outputDir = allConfig.outputDir;
    const logs: string[] = [];

    allConfig.urlConfigs.forEach((config, index) => {
      const log = jsonCreator(config, { outputDir, index });
      logs.push(log);
    });
    logResult(logs);
  } catch (error) {
    console.error("Error occurred while reading the directory!", error);
  }
}

function showHelp() {
  // 参数不对时，显示 help
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}
