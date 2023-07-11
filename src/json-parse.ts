import { OptionValues } from "commander";
import fs from "fs";
import { FileConfigInfo } from "./types";

export function parseConfig(filePath: string, options: OptionValues) {
  const content = fs.readFileSync(filePath, "utf-8");
  const contentObj = JSON.parse(content);
  const urlConfigs: FileConfigInfo[] = contentObj.urls ?? [];
  const configOutputDir: string = contentObj.outputDir;

  const outputDir: string =
    typeof options.output === "string"
      ? options.output
      : configOutputDir
      ? configOutputDir
      : `./tests`;

  return {
    outputDir,
    urlConfigs,
  };
}
