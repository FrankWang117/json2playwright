# PinCe

通过 JSON 配置文件，快速生成 playwright 测试文件的工具。

## 使用

> 本地项目需要有 playwright 基础的配置，能够通过 npx playwright test 运行测试。

安装完成之后，使用 `pince -c ./tests/pince.config.json` 命令生成文件 (json 文件可以参考 [Demo Config](https://github.com/FrankWang117/PinCe/blob/main/demo/demo-urls.config.json))。

命令执行完毕，在命令行中看到相应输出后，即可以在相关目录看到测试文件生成，使用 `npx playwright test --update-snapshots` 生成最新的快照图片。  
然后使用 `npx playwright test` 运行测试。

如果想在此项目中测试文件的生成，拉取本项目后，运行 `npm run test` 即可在 `./demo` 目录中看到根据 `./demo/demo-urls.config.json` 文件生成的测试文件。复制到其他安装了 playwright 依赖的项目中去运行即可。

## 配置文件

```
{
  "outputDir": "", // 测试文件输出位置，使用命令 '-o' 时，使用 '-o' 的值，默认值为 'tests'
  "urls": [ // 要测试的页面的配置数组
    {
      "title": "url-test",  // 生成的配置文件名称，这样会生成 url-test.spec.ts
      "url": "https://www.baidu.com",   // 测试的 url 地址
      "testConfig": {
        "loadedFlag": "waitForUrl", // 生用的文件所使用的模版类型， waitForUrl ｜ waitForRequest
        "waitForUrl": "https://www.baidu.com"   // 当是 waitForUrl 需要配置此项，和 url 相同，支持正则。
        "requests": ["https://hector.baidu.com/static/h.gi.*"]  // 当是 waitForRequest 需要配置此项，页面会等待这些请求都返回后才获取快照。支持正则。
      },
      "pageSize": { // 页面大小，用于像素对比中的获取范围
        "width": 800,
        "height": 1000
      },
      "selector": "#head",  // 获取的页面元素用于像素对比
      "beforeTest": [], // 待定
      "skip": true  // 跳过此配置，用于已有此文件或者其他原因需要跳过配置
    }
  ]
}

```
