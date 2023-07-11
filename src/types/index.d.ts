export interface FileConfigInfo {
  title: string;
  url: string;
  testConfig: {
    loadedFlag: "waitForUrl" | "waitForRequest";
    waitForUrl: string;
  };
  pageSize: {
    width: number;
    height: number;
  };
  selector: string;
  beforeTest: [];
  skip: true;
}
