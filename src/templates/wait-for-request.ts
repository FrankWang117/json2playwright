import { FileConfigInfo } from "src/types";

export function createTestWaitForRequest(
  config: FileConfigInfo,
  index: number
) {
  // 按照模板生成新文件内容
  const fileContent = `
import { expect, Page, test } from '@playwright/test';

const urlTitle = '${config.title}';
const TemplateIndex = ${index};
const url = '${config.url}';
const requests = ${JSON.stringify(config.testConfig.requests)};

test.describe.serial(\`urls - \${urlTitle}\`, () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(url);
        // await page.waitForURL(url);
        await Promise.all(
            requests.map(request => {
                const reg = new RegExp(request);
                return page.waitForResponse(res => {
                    return res.status() === 200 && reg.test(res.url());
                });
            })
        );
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('ui looks good', async ({}) => {
        // output path
        const path = \`./newest-snapshot-for-e2e/\${urlTitle}-\${TemplateIndex}.png\`;
        // config.pageSize
        const fullPageSize = {
            width: ${config.pageSize.width},
            height: ${config.pageSize.height}
        };
        // const originalSize = page.viewportSize();
        await page.setViewportSize(fullPageSize);
        // #head is config.selector
        const fullPageScreenshot = await page.locator('${
          config.selector
        }').screenshot({
            path
        });
        // await page.setViewportSize(originalSize);
        const eleBuffer = fullPageScreenshot;
        expect(eleBuffer).toMatchSnapshot(\`\${urlTitle}-\${TemplateIndex}.png\`);
    });
});
`;
  return fileContent;
}
