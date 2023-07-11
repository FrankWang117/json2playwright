import fs from "fs";
import { createTest } from "../templates";
import { FileConfigInfo } from "../types";

export function jsonCreator(
  config: FileConfigInfo,
  options: { outputDir: string; index: number }
) {
  const isSkip = config.skip;
  const fileName = config.title;
  if (isSkip === true) {
    return `⚪️ ${fileName}.spec.ts 跳过创建`;
  }
  const fileContent = createTest(config, options.index);
  const buildOutputPath = `${options.outputDir}/${fileName}.spec.ts`;
  const dir = buildOutputPath.split(`${fileName}.spec.ts`)[0];

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(buildOutputPath, fileContent);
  return `🌟 ${fileName}.spec.ts 创建成功`;
}
