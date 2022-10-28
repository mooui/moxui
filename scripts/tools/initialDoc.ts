/**
 * 新增组件文档, 完成如下工作
 *    /docs:
 *        配置.vitepress/config.ts
 *        在对应文件(components|hooks|plugins)下新增NAME/index.md模板
 *
 *    /docs-preview:
 *        router/index.ts 添加路由
 *        pages/index.vue 添加链接
 *        pages/(components|hooks|plugins)下新增NAME/index.vue模板
 */
import shelljs from "shelljs";
import colors from "colors";
import { kebabCase } from "./utils";

// 获取文件夹 components|hooks|plugins
function getCmpFolder(name: string) {
  const arr = ["components", "hooks", "plugins"];
  let res = "";
  for (const folder of arr) {
    if (folder === "hooks") {
      if (shelljs.test("-f", `packages/${folder}.ts`)) {
        res = folder;
        break;
      }
    } else {
      if (shelljs.test("-d", `packages/${folder}`)) {
        res = folder;
        break;
      }
    }
  }
  return res;
}

// 配置.vitepress/config.ts
function configVitepress(name: string, folder: string) {}

// 入口文件
function main() {
  let cmpName = process.argv[2];
  let cmpChineseName = process.argv[2] || "";
  if (!cmpName) {
    console.warn(
      colors.yellow(`Missing item name value, use cmd-line like `) +
        colors.red("pnpm addDoc count-down")
    );
    process.exit(0);
  }
  cmpName = kebabCase(cmpName);
  const folder = getCmpFolder(cmpName);
  if (!folder) {
    console.warn(
      colors.yellow(
        `Invalid item name: ${cmpName}, please check it before rerun the cmd.`
      )
    );
    process.exit(0);
  }
}
main();
