export function logResult(logs: string[]) {
  console.log(`共处理 ${logs.length} 个文件${logs.length ? "：" : "。"}`);
  logs
    .filter((item) => item.includes("🌟"))
    .forEach((item) => {
      console.log(item);
    });
  logs
    .filter((item) => item.includes("⚪️"))
    .forEach((item) => {
      console.log(item);
    });
}
