export function createRequestTest(config: any, index: number) {
  // 按照模板生成新文件内容
  const fileContent = `
import { expect, Page, test } from '@playwright/test';

const urlTitle = '${config.title}';
const TemplateIndex = ${index};
const url = '${config.url}';

// should remove only
test.describe.serial.only(\`urls - \${urlTitle}\`, () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(url);
        await page.waitForURL(url);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test(\`ui looks good\`, async ({}) => {
        // output path
        const path = \`./newest-snapshot-for-e2e/\${url}-\${TemplateIndex}.png\`;
        // config.pageSize
        const fullPageSize = {
            width: ${config.pageSize.width},
            height: ${config.pageSize.height}
        };
        // const originalSize = page.viewportSize();
        await page.setViewportSize(fullPageSize);
        // #head is config.selector
        const fullPageScreenshot = await page.locator('${config.selector}').screenshot({
            path
        });
        // await page.setViewportSize(originalSize);
        const eleBuffer = fullPageScreenshot;
        expect(eleBuffer).toMatchSnapshot(\`\${url}-\${TemplateIndex}.png\`);
    });
});
`;
  return fileContent;
}
