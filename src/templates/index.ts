import { createTestWaitForRequest } from "./wait-for-request";
import { createTestWaitForURL } from "./wait-for-url";

export function createTest(config: any, index: number): string {
  switch (config.testConfig.loadedFlag) {
    case "waitForUrl":
      return createTestWaitForURL(config, index);
    case "waitForRequest":
      return createTestWaitForRequest(config, index);
    default:
      return "";
  }
}
