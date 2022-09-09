/**
 * 删除某组件相关
 */
import shelljs from "shelljs";
import colors from "colors";

import { camelCase, smallCamelCase, kebabCase } from "./utils";

// 删除components/${name}文件夹
function removeComponentFolder(name: string) {
  shelljs.rm("-rf", `packages/components/${name}`);
}

// 删除 packages/components/index.ts中导出
function removeComponentImport(name: string) {
  shelljs.sed(
    "-i",
    new RegExp(`export.*\\./${name.replace("-", "\\-")}['"];?\\s*`),
    "",
    "packages/components/index.ts"
  );
}

// 在packages/moxui/components.ts中添加引入和导出
function removeMoxuiImport(name: string) {
  const file = "packages/moxui/component.ts";
  shelljs.sed(
    "-i",
    new RegExp(
      `import.*@moxui/components/${name.replace("-", "\\-")}['"];?\\s*`
    ),
    "",
    file
  );
  // 不考虑第一个组件情形
  shelljs.sed("-i", new RegExp(`,\\s*Mo${camelCase(name)}`), "", file);
}

// start
const cmpNames = process.argv.slice(2);

if (!cmpNames.length) {
  console.warn(
    colors.yellow(`Missing component name value, use cmd-line like `) +
      colors.red("pnpm rmCmp button")
  );
}
cmpNames.forEach((name) => {
  // 强制转为短横线命名
  name = kebabCase(name);
  if (!shelljs.test("-d", `packages/components/${name}`)) {
    return;
  }
  removeComponentFolder(name);
  removeComponentImport(name);
  removeMoxuiImport(name);
});
