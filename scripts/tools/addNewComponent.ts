/**
 * 初始化新组件, 完成以下功能(以button为例)
 * 创建文件夹 packages/components/button
 *    填充 style/index.scss  button.ts types.ts index.ts
 * 在packages/components/index.ts中添加导出
 * 在packages/moxui相关文件中添加引入和导出
 */
import shelljs from "shelljs";
import colors from "colors";

import { camelCase, smallCamelCase, kebabCase } from "./utils";

// 新建components/${name}文件夹 并填充
function initComponentFolder(name: string) {
  shelljs.mkdir(
    "-p",
    `packages/components/${name}`,
    `packages/components/${name}/style`
  );

  shelljs.touch([
    `packages/components/${name}/index.ts`,
    `packages/components/${name}/types.ts`,
    `packages/components/${name}/${name}.ts`,
    `packages/components/${name}/style/index.scss`,
  ]);

  // index.ts
  new shelljs.ShellString(
    [
      `import { withInstall } from "@moxui/utils";`,
      `import ${smallCamelCase(name)} from "./${name}";`,
      "",
      `export const Mo${camelCase(name)} = withInstall(${smallCamelCase(
        name
      )});`,
      "",
    ].join("\n")
  ).to(`packages/components/${name}/index.ts`);

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
  ).to(`packages/components/${name}/types.ts`);

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
  ).to(`packages/components/${name}/${name}.ts`);

  // index.scss
  new shelljs.ShellString([`.mo-${name} {}`, ""].join("\n")).to(
    `packages/components/${name}/style/index.scss`
  );
}

// 在packages/components/index.ts中添加导出
function initComponentImport(name: string) {
  shelljs.sed(
    "-i",
    /^\s*$/, // 末尾空行
    `export * from "./${name}";
`,
    "packages/components/index.ts"
  );
}

// 在packages/moxui/components.ts中添加引入和导出
function initMoxuiImport(name: string) {
  const file = "packages/moxui/component.ts";
  const lines = shelljs.cat(file).split("\n");
  let i = lines.length - 1;
  for (; i >= 0; i--) {
    if (/export\s+default\s+\[[^\]]+\]\s+as\s+Plugin\[\s*\]/.test(lines[i])) {
      lines[i] = lines[i].replace(/\[([^\]]+)\]/, (s: string, s1: string) => {
        return s.replace(s1, s1.replace(/,?\s*$/, `, Mo${camelCase(name)}`));
      });
    }

    if (/import.*@moxui\/components\//.test(lines[i])) {
      lines.splice(
        i + 1,
        0,
        `import { Mo${camelCase(name)} } from "@moxui/components/${name}";`
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
    colors.yellow(`Missing component name value, use cmd-line like `) +
      colors.red("pnpm initCmp button")
  );
}
cmpNames.forEach((name) => {
  // 强制转为短横线命名
  name = kebabCase(name);
  if (shelljs.test("-d", `packages/components/${name}`)) {
    console.warn(colors.yellow(`component "${name}" already exsits!`));
    return;
  }
  initComponentFolder(name);
  initComponentImport(name);
  initMoxuiImport(name);
});
