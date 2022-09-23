import sass from "sass";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import PostcssPxToViewport from "postcss-px-to-viewport-8-plugin";
import shelljs from "shelljs";

/**
 * 复制style文件夹
 * 将index.ts 转换成index.js 并将其中的.scss 转换成.css
 * @param stylePaths
 */
function copyStyleFiles(stylePaths: string[]) {
  stylePaths.forEach((dir) => {
    const sourceDir = `packages/${dir}/`;
    //lib文件目录
    const targetLib = `dist/moxui/lib/${dir}/`;
    //es文件目录
    const targetEs = `dist/moxui/es/${dir}/`;
    shelljs.cp("-rf", sourceDir, targetEs.replace(/style\/$/, ""));
    shelljs.cp("-rf", sourceDir, targetLib.replace(/style\/$/, ""));

    // 转换index.ts
    [targetEs, targetLib].forEach((d) => {
      shelljs
        .ls("-R", d)
        .filter((file) => /index\.ts$/.test(file))
        .map((file) => {
          shelljs.sed("-i", /\.scss/, ".css", d + file);
          shelljs.mv("-f", d + file, d + file.replace(/\.ts/, ".js"));
        });

      shelljs
        .ls("-R", d)
        .filter((file) => /\.scss$/.test(file))
        .map((file) => {
          scssToCss(d + file);
        });
    });
  });
}

async function scssToCss(filePath: string) {
  const postcssProcessor = postcss([
    autoprefixer({
      overrideBrowserslist: ["defaults", "not IE 11"],
    }),
    PostcssPxToViewport({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 4, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore", ".hairlines"], // 使用大写PX可以避免转换，指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: true, // 允许在媒体查询中转换`px`
    }),
  ]);

  const newFilePath = filePath.replace(/\.scss/, ".css");
  shelljs.touch(newFilePath);
  const scssCode = shelljs.cat(filePath).toString();
  const code = sass.compileString(scssCode);
  // postcss 处理
  const css = await postcssProcessor
    .process(code.css, { from: filePath })
    .then((res) => {
      return res.css;
    });
  new shelljs.ShellString(css).to(newFilePath);
}
// 打包scss
//  1 找到所有style文件夹,复制过去
//  2 编译style文件夹内的scss
function buildScss() {
  const postcssProcessor = postcss([
    autoprefixer({
      overrideBrowserslist: ["defaults", "not IE 11"],
    }),
    PostcssPxToViewport({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 4, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore", ".hairlines"], // 使用大写PX可以避免转换，指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: true, // 允许在媒体查询中转换`px`
    }),
  ]);

  // 找到所有style文件夹
  const stylePaths = shelljs
    .ls("-R", "packages")
    .filter((dir) => /style$/.test(dir));
  copyStyleFiles(stylePaths);
}

export default buildScss;
