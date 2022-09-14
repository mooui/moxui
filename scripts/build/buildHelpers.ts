import sass from "sass";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import PostcssPxToViewport from "postcss-px-to-viewport-8-plugin";
import shelljs from "shelljs";

// 将mooui内容移到外间目录, 避免打包目录嵌套mooui
function moveMoxuiFileOut() {
  const source = "packages/moxui/";
  const dist = "packages/";
  const res: string[] = [];
  shelljs.ls("-L", source).forEach((file) => {
    if (
      /.(j|t)s$/.test(file) ||
      (file !== "node_modules" && shelljs.test("-d", source + file))
    ) {
      shelljs.cp("-rf", source + file, dist);
      res.push(dist + file);
    }
  });

  function restore() {
    shelljs.rm("-rf", res);
  }
  return restore;
}

function getDependencies() {
  const pkg = JSON.parse(shelljs.cat("package.json").toString());
  const res: {
    dependencies: { [k: string]: string };
    peerDependencies: { [k: string]: string };
    allDependencies: string[];
  } = { dependencies: {}, peerDependencies: {}, allDependencies: [] };
  for (const key in pkg.dependencies) {
    if (!/workspace/.test(pkg.dependencies[key])) {
      res.dependencies[key] = pkg.dependencies[key];
      res.allDependencies.push(key);
    }
  }
  for (const key in pkg.peerDependencies) {
    if (!/workspace/.test(pkg.peerDependencies[key])) {
      res.peerDependencies[key] = pkg.peerDependencies[key];
      res.allDependencies.push(key);
    }
  }
  return res;
}

function generatePackageJson(
  dependencyInfo: ReturnType<typeof getDependencies>,
  source: string = "packages/moxui/package.prod.json",
  dest: string = "dist/moxui/"
) {
  const pkg = JSON.parse(shelljs.cat(source).toString());
  pkg.dependencies = dependencyInfo.dependencies;
  pkg.peerDependencies = dependencyInfo.peerDependencies;
  if (!/package\.json$/.test(dest)) {
    dest += "/package.json";
  }
  shelljs.touch(dest);
  new shelljs.ShellString(JSON.stringify(pkg, null, 2)).to(dest);
}

function copyMoxuiFiles(){
  const source = "packages/moxui/";
  const dist = "dist/moxui/";
  const res: string[] = [];
  shelljs.ls("-L", source).forEach((file) => {
    if (
      shelljs.test("-f", source + file) && !/\.(t|j)s$/.test(file) && !/package.*\.json$/.test(file)
    ) {
      shelljs.cp("-rf", source + file, dist);
      res.push(dist + file);
    }
  });

  function restore() {
    shelljs.rm("-rf", res);
  }
  return restore;
}


// 打包scss
function buildScss(filePath: string | string[] = ["components", "plugins"]) {
  if (typeof filePath === "string") filePath = [filePath];
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

  filePath.forEach(async (fpath) => {
    const sourceDir = `packages/${fpath}/`;
    //lib文件目录
    const targetLib = `dist/moxui/lib/${fpath}/`;
    //es文件目录
    const targetEs = `dist/moxui/es/${fpath}/`;

    shelljs
      .ls("-R", sourceDir)
      .filter((file) => /\.scss$/.test(file))
      .forEach(async (file) => {
        // 直接将scss文件复制到打包后目录
        const path = file.slice(0, file.lastIndexOf("/"));
        if (!shelljs.test("-d", targetEs + path)) {
          shelljs.mkdir("-p", targetEs + path);
          shelljs.mkdir("-p", targetLib + path);
        }
        shelljs.cp("-rf", sourceDir + file, targetEs + file);
        shelljs.cp("-rf", sourceDir + file, targetLib + file);

        // 转成css
        const scssCode = await shelljs.cat(sourceDir + file).toString();
        const code = sass.compileString(scssCode);
        // postcss 处理
        const css = await postcssProcessor
          .process(code.css, { from: sourceDir + file })
          .then((res) => {
            return res.css;
          });
        const cssPath = file.replace(/\.scss$/, ".css");
        // 新建文件
        shelljs.touch(targetEs + cssPath);
        shelljs.touch(targetLib + cssPath);
        shelljs.sed("-i", /.*/, css, [targetEs + cssPath, targetLib + cssPath]);
      });
  });
}

export { moveMoxuiFileOut, getDependencies,copyMoxuiFiles, generatePackageJson, buildScss };
