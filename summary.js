版本更新：
npm@6（2018、4.20）
1、npm init 支持自定义脚手架工具
2、增加 npm audit
3、优化缓存机制

npm5
package-lock.json(锁定版本)
npx(5.2.0)
1、node ./node_modules/.bin/webpack.js ==> npx webpack
2、一键执行远程 npm 源的二进制包： npx cowsay hello （npx 将会从 npm 源下载 cowsay 这个包（但并不安装）并执行）；
3、使用不同版本 node 执行命令 ：
npx node@4 -e "console.log(process.version)"
npx node@6 -e "console.log(process.version)"

4、一键执行 GitHub Gist ：npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32


npm3
模块扁平化（dedupe）

npm2以及之前，严格按照依赖获取
A依赖B C依赖B 则会有两个B模块


npm(6.1.0) yarn(1.7.0) pnpm(2.8.0)对比: https://github.com/pnpm/node-package-manager-benchmark




install 过程：
一、loadCurrentTree：
1、从当前路径或者全局（取决于是否全局install）读取node_modules的内容，返回格式如下：
  const CurrentTree = {
    package: '<package.json data, or an empty object>',
    package.name: 'defaults to `basename(path)`',
    children: '[ <more things like this> ]',
    parent: '<thing that has this in its children property, or null>',
    path: '<path loaded>',
    realpath: '<the real path on disk>',
    isLink: '<set if this is a Link>',
    target: '<if a Link, then this is the actual Node>',
    error: '<if set, the error we got loading/parsing the package.json>',
};
2、读取lockfile，shrinkwrap 和 lockfile 同时存在 会忽略lockfile
CurrentTree.package._shrinkwrap = 'parsed'


package-lock.json:

require: 所有依赖的包，不只是顶层

windows资源管理器能处理的最长路径长度

npm3:
如果本地 node_modules 已安装，再次执行 install 不会更新包版本, 执行 update 才会更新; 而如果本地 node_modules 为空时，执行 install/update 都会直接安装更新包;
npm update 总是会把包更新到符合 package.json 中指定的 semver 的最新版本号——本例中符合 ^1.8.0 的最新版本为 1.15.0
一旦给定 package.json, 无论后面执行 npm install 还是 update, package.json 中的 webpack 版本一直顽固地保持 一开始的 ^1.8.0 岿然不动

npm5:
无论何时执行 install, npm 都会优先按照 package-lock 中指定的版本来安装 webpack; 避免了 npm 3 表中情形 b) 的状况;
无论何时完成安装/更新, package-lock 文件总会跟着 node_modules 更新 —— (因此可以视 package-lock 文件为 node_modules 的 JSON 表述)
已安装 node_modules 后若执行 npm update，package.json 中的版本号也会随之更改为 ^1.15.0


yarn：
版本锁定、性能、缓存、重试机制
yarn无需互联网连接就能安装本地缓存的依赖项


安全性：
checksum校验，用Secure Hash Algorithm 1 (SHA-1)算法
"@babel/helper-module-imports@^7.0.0-beta.34":
  version "7.0.0-beta.51"
  resolved "http://npm.byted.org/@babel%2fhelper-module-imports/-/helper-module-imports-7.0.0-beta.51.tgz#ce00428045fbb7d5ebc0ea7bf835789f15366ab2"
  dependencies:
    "@babel/types" "7.0.0-beta.51"
    lodash "^4.17.5"

shasum helper-module-imports-7.0.0-beta.51.tgz output 一串数字 跟ce00428045fbb7d5ebc0ea7bf835789f15366ab2比较




npm5新增：
1、默认新增 package-lock.json 来记录依赖树信息，进行依赖锁定，并使用新的 shrinkwrap 格式。

2、--save 变成了默认参数，执行 install 依赖包时默认都会带上，除非加上 --no-save。

3、Git 依赖优化：支持指定 semver 版本安装；

4、含有 prepare 脚本时将安装其 devDependencies 并执行脚本。

5、使用本地目录文件作为 file 类型依赖安装时，使用创建 symlink 的方式替代原来的文件拷贝方式，提升速度。

6、脚本更改：在 npm pack, npm publish 时新增 prepack 和 postpack 脚本；

7、preinstall 脚本运行优先级提升到最前，并且可以修改 node_modules。

8、包发布将同时生成 sha512 和 sha1 校验码，下载依赖时将使用强校验算法。 重写整个缓存系统和 npm cache 系列命令。废除 --cache-min --cache-max 等命令，缓存系统将由 npm 自身维护，无需用户介入。 registry 策略调整：配置优先级高于锁文件中记录的优先级；除非使用不同 scope 的包，不再支持不同的包使用不同的 registry。
