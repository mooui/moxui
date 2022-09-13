/**
 * 删除某组件相关
 */
import shelljs from "shelljs";
import colors from "colors";

import { camelCase, smallCamelCase, kebabCase } from "./utils";

// 删除plugins/${name}文件夹
function removePluginFolder(name: string) {
  shelljs.rm("-rf", `packages/plugins/${name}`);
}

// 删除 packages/plugins/index.ts中导出
function removePluginImport(name: string) {
  shelljs.sed(
    "-i",
    new RegExp(`export.*\\./${name.replace("-", "\\-")}['"];?\\s*`),
    "",
    "packages/plugins/index.ts"
  );
}

// 在packages/moxui/plugins.ts中添加引入和导出
function removeMoxuiImport(name: string) {
  const file = "packages/moxui/plugin.ts";
  shelljs.sed(
    "-i",
    new RegExp(`import.*@moxui/plugins/${name.replace("-", "\\-")}['"];?\\s*`),
    "",
    file
  );
  // 不考虑第一个组件情形
  shelljs.sed("-i", new RegExp(`,\\s*${camelCase(name)}`), "", file);
}

// start
const cmpNames = process.argv.slice(2);

if (!cmpNames.length) {
  console.warn(
    colors.yellow(`Missing plugin name value, use cmd-line like `) +
      colors.red("pnpm rmCmpPl loading")
  );
}
cmpNames.forEach((name) => {
  // 强制转为短横线命名
  name = kebabCase(name);
  if (!shelljs.test("-d", `packages/plugins/${name}`)) {
    return;
  }
  removePluginFolder(name);
  removePluginImport(name);
  removeMoxuiImport(name);
});
