# PinCe

An ambitious test package for UI test.

## use

first step:

`npm run build`

second step:  
`node lib/index.js -c demo-urls.config.json`
demo-urls.config.json is the urls config

## 本地发版调试

1. `npm run build`；
2. `npm i -g .` 现在全局即可使用 `pince` 来执行命令；
3. 在其他项目： `pince -c ./tests/pince.config.json`。

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
