/**
 * 初始化新组件, 完成以下功能(以button为例)
 * 创建文件夹 packages/plugins/button
 *    填充 style/index.scss  button.ts types.ts index.ts
 * 在packages/plugins/index.ts中添加导出
 * 在packages/moxui相关文件中添加引入和导出
 */
import shelljs from "shelljs";
import colors from "colors";

import { camelCase, smallCamelCase, kebabCase } from "./utils";

// 新建plugins/${name}文件夹 并填充
function initPluginFolder(name: string) {
  shelljs.mkdir(
    "-p",
    `packages/plugins/${name}`,
    `packages/plugins/${name}/style`
  );

  shelljs.touch([
    `packages/plugins/${name}/index.ts`,
    `packages/plugins/${name}/types.ts`,
    `packages/plugins/${name}/${name}.ts`,
    `packages/plugins/${name}/style/index.scss`,
  ]);

  // index.ts
  new shelljs.ShellString(
    [
      `import ${smallCamelCase(name)} from "./${name}";`,
      "",
      `function ${camelCase(name)}() {}`,
      "",
      `${camelCase(name)}.install = (app: App) => {`,
      `  app.config.globalProperties.$${smallCamelCase(name)} = ${camelCase(
        name
      )};`,
      `};`,
      `export { ${camelCase(name)} }`,
      "",
    ].join("\n")
  ).to(`packages/plugins/${name}/index.ts`);

  // types.ts
  new shelljs.ShellString(
    [
      `import { ExtractPropTypes } from "vue";`,
      "",
      `export const ${smallCamelCase(name)}Props = {};`,
      "",
      `export type ${camelCase(
        name
      )}Props = ExtractPropTypes<typeof ${smallCamelCase(name)}Props>;`,
      "",
    ].join("\n")
  ).to(`packages/plugins/${name}/types.ts`);

  // ${name}.ts
  new shelljs.ShellString(
    [
      `import { h, defineComponent } from "vue";`,
      "",
      `import { ${smallCamelCase(name)}Props } from "./types";`,
      "",
      `import "./style/index.scss";`,
      `export default defineComponent({`,
      `  name: "Mo${camelCase(name)}",`,
      `  props: ${smallCamelCase(name)}Props,`,
      `  setup(props, { emit, expose }) {`,
      `    // render`,
      `    const baseClass = "mo-${name}";`,
      `    return () => {`,
      `      return h("div", {`,
      `        class: baseClass,`,
      `      });`,
      `    };`,
      `  },`,
      `});`,
      "",
    ].join("\n")
  ).to(`packages/plugins/${name}/${name}.ts`);

  // index.scss
  new shelljs.ShellString([`.mo-${name} {}`, ""].join("\n")).to(
    `packages/plugins/${name}/style/index.scss`
  );
}

// 在packages/plugins/index.ts中添加导出
function initPluginImport(name: string) {
  shelljs.sed(
    "-i",
    /^\s*$/, // 末尾空行
    `export * from "./${name}";
`,
    "packages/plugins/index.ts"
  );
}

// 在packages/moxui/plugins.ts中添加引入和导出
function initMoxuiImport(name: string) {
  const file = "packages/moxui/plugin.ts";
  const lines = shelljs.cat(file).split("\n");
  let i = lines.length - 1;
  for (; i >= 0; i--) {
    if (/export\s+default\s+\[[^\]]+\]\s+as\s+Plugin\[\s*\]/.test(lines[i])) {
      lines[i] = lines[i].replace(/\[([^\]]+)\]/, (s: string, s1: string) => {
        return s.replace(s1, s1.replace(/,?\s*$/, `, ${camelCase(name)}`));
      });
    }

    if (/import.*@moxui\/plugins\//.test(lines[i])) {
      lines.splice(
        i + 1,
        0,
        `import { ${camelCase(name)} } from "@moxui/plugins/${name}";`
      );
      break;
    }
  }
  new shelljs.ShellString(lines.join("\n")).to(file);
}

// start
const cmpNames = process.argv.slice(2);

if (!cmpNames.length) {
  console.warn(
    colors.yellow(`Missing plugin name value, use cmd-line like `) +
      colors.red("pnpm initPl loading")
  );
}
cmpNames.forEach((name) => {
  // 强制转为短横线命名
  name = kebabCase(name);
  if (shelljs.test("-d", `packages/plugins/${name}`)) {
    console.warn(colors.yellow(`plugin "${name}" already exsits!`));
    return;
  }
  initPluginFolder(name);
  initPluginImport(name);
  initMoxuiImport(name);
});
