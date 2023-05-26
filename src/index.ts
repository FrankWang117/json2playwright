#! /usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import { createTest } from "./templates";
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

async function listDirContents(filePath: string, outputPath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const contentObj = JSON.parse(content);
    const urlConfigs = contentObj.urls;

    (urlConfigs as any[]).forEach((config, index) => {
      const fileContent = createTest(config, index);
      const buildOutputPath = `${outputPath}/pince-${index}.spec.ts`;
      const dir = buildOutputPath.split(`pince-${index}.spec.ts`)[0];

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(buildOutputPath, fileContent);
    });
  } catch (error) {
    console.error("Error occurred while reading the directory!", error);
  }
}

if (options.config) {
  const filePath =
    typeof options.config === "string" ? options.config : __dirname;
  const outputPath =
    typeof options.output === "string" ? options.output : `./tests/urls`;
  listDirContents(filePath, outputPath);
}
