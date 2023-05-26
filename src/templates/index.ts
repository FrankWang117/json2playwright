import { createRequestTest } from "./request";

export function createTest(config: any, index: number) {
  if (config.testConfig.loadedFlag === "waitForUrl") {
    return createRequestTest(config, index);
  } else {
    return "";
  }
}
