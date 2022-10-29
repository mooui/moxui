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
import { kebabCase, camelCase, smallCamelCase } from "./utils";

// 获取文件夹 components|hooks|plugins
function getCmpFolder(name: string) {
  const arr = ["components", "hooks", "plugins"];
  let res = "";
  for (const folder of arr) {
    if (folder === "hooks") {
      if (shelljs.test("-f", `packages/${folder}/${name}.ts`)) {
        res = folder;
        break;
      }
    } else {
      if (shelljs.test("-d", `packages/${folder}/${name}`)) {
        res = folder;
        break;
      }
    }
  }
  return res;
}

let INDICATOR = "";
let DIRECTION = -1;
function getIndicator(name: string, folder: string, fileContent: string) {
  if (!INDICATOR) {
    const existNames = fileContent
      .match(new RegExp(`/${folder}/([a-z-]+)/`, "g"))!
      .map((str) => {
        return str.slice(folder.length + 2, -1);
      });

    let indicator = existNames[existNames.length - 1]; // 待插入位置的相对元素
    let direction = 1; // 1 后插 -1 前插
    for (const ename of existNames) {
      if (name < ename) {
        indicator = ename;
        direction = -1;
        break;
      }
    }
    INDICATOR = indicator;
    DIRECTION = direction;
  }

  return {
    indicator: INDICATOR,
    direction: DIRECTION, // -1前插 1 后插
  };
}

// 配置.vitepress/config.ts
function configVitepress(name: string, folder: string, cname: string) {
  const file = "docs/.vitepress/config.ts";
  // 读取文件内容
  const config = shelljs.cat(file).toString();
  const configArr = config.split("\n");
  // 待插入代码
  const code = [
    `        {`,
    `          text: "${camelCase(name)} ${cname}",`,
    `          link: "/${folder}/${name}/"`,
    `        },`,
  ];

  const { indicator, direction } = getIndicator(name, folder, config);
  for (const [index, value] of configArr.entries()) {
    // 找到位置 插入
    if (value.indexOf(`/${folder}/${indicator}/`) !== -1) {
      if (direction === -1) {
        // 前插
        configArr.splice(index - 2, 0, ...code);
      } else {
        // 后插
        configArr.splice(index + 2, 0, ...code);
      }
      break;
    }
  }
  new shelljs.ShellString(configArr).to(file);
}

// 新增NAME/index.md模板
function initialMd(name: string, folder: string, cname: string) {
  const fpath = `docs/${folder}/${name}`;
  const file = fpath + "/index.md";
  const templatePath = "scripts/tools/templates/index.md";
  shelljs.mkdir(fpath);
  shelljs.touch(file);
  const ImportName =
    folder === "components"
      ? "Mo" + camelCase(name)
      : folder === "hooks"
      ? smallCamelCase(name)
      : camelCase(name);
  new shelljs.ShellString(
    shelljs
      .cat(templatePath)
      .toString()
      .replace(/{CamelCaseName}/g, camelCase(name))
      .replace(/{ChineseName}/g, cname)
      .replace(/{ImportName}/g, ImportName)
  ).to(file);
}

/**
 * docs/preview/router/index.ts 添加路由
 *    import 语句
 *    path 配置
 */
function configRouter(name: string, folder: string, cname: string) {
  const file = "docs-preview/router/index.ts";
  const router = shelljs.cat(file).toString();
  const routerArr = router.split("\n");
  const importCode = [
    `const ${camelCase(
      name
    )} = () => import("../pages/${folder}/${name}/index.vue");`,
  ];
  const pathCode = [
    `    {`,
    `      path: "/${folder}/${name}",`,
    `      name: "${name}",`,
    `      component: ${camelCase(name)},`,
    `    },`,
  ];
  const { indicator, direction } = getIndicator(name, folder, router);
  for (const [index, value] of routerArr.entries()) {
    if (value.indexOf(`/${folder}/${indicator}/index.vue`) !== -1) {
      if (direction === -1) {
        // 原 import 可能有两行
        if (/^const/.test(value)) {
          routerArr.splice(index, 0, ...importCode);
        } else {
          routerArr.splice(index - 1, 0, ...importCode);
        }
      } else {
        routerArr.splice(index + 1, 0, ...importCode);
      }
      break;
    }
  }
  for (const [index, value] of routerArr.entries()) {
    if (value.indexOf(`/${folder}/${indicator}",`) !== -1) {
      if (direction === -1) {
        routerArr.splice(index - 1, 0, ...pathCode);
      } else {
        routerArr.splice(index + 2, 0, ...pathCode);
      }
      break;
    }
  }
  new shelljs.ShellString(routerArr).to(file);
}

// docs-preview/pages/index.vue 添加链接
function configLink(name: string, folder: string, cname: string) {
  const file = "docs-preview/pages/index.vue";
  const entrance = shelljs.cat(file).toString();
  const entranceArr = entrance.split("\n");

  const code = [
    `        <router-link to="/${folder}/${name}" class="item">${camelCase(
      name
    )} ${cname}</router-link>`,
  ];
  const { indicator, direction } = getIndicator(name, folder, entrance);

  for (const [index, value] of entranceArr.entries()) {
    if (value.indexOf(`/${folder}/${indicator}`) !== -1) {
      if (direction === -1) {
        if (/^\s*<router-link/.test(value)) {
          entranceArr.splice(index, 0, ...code);
        } else {
          entranceArr.splice(index - 1, 0, ...code);
        }
      } else {
        if (/\/router\-link>/.test(value)) {
          entranceArr.splice(index + 1, 0, ...code);
        } else {
          entranceArr.splice(index + 3, 0, ...code);
        }
      }
      break;
    }
  }
  new shelljs.ShellString(entranceArr).to(file);
}

// 添加index.vue
function initialVue(name: string, folder: string, cname: string) {
  const fpath = `docs-preview/pages/${folder}/${name}`;
  const file = fpath + "/index.vue";
  const templatePath = "scripts/tools/templates/indexVue.txt";
  const ImportName =
    folder === "components"
      ? "Mo" + camelCase(name)
      : folder === "hooks"
      ? smallCamelCase(name)
      : camelCase(name);
  // 模板替换 {name} {ImportName} {BIGNAME}

  const template = shelljs
    .cat(templatePath)
    .toString()
    .replace(/{name}/g, name)
    .replace(/{ImportName}/g, ImportName)
    .replace(/{BIGNAME}/g, camelCase(name).toUpperCase());

  shelljs.mkdir(fpath);
  shelljs.touch(file);
  new shelljs.ShellString(template).to(file);
}

// 入口文件
function main() {
  let cmpName = process.argv[2];
  let cmpChineseName = process.argv[3] || "";
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
  if (
    shelljs.test("-d", `docs/${folder}/${cmpName}`) ||
    shelljs.test("-d", `docs-preview/pages/${folder}/${cmpName}`)
  ) {
    console.warn(
      colors.yellow(
        `${folder}/${cmpName} already exist, please remove related files & retry`
      )
    );
    process.exit(0);
  }
  configVitepress(cmpName, folder, cmpChineseName);
  initialMd(cmpName, folder, cmpChineseName);
  configRouter(cmpName, folder, cmpChineseName);
  configLink(cmpName, folder, cmpChineseName);
  initialVue(cmpName, folder, cmpChineseName);
}
main();
