import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import replaceScssPlugin from "./scripts/plugin/replaceScssPlugin";

import {
  moveMoxuiFileOut,
  getDependencies,
  generatePackageJson,
  copyMoxuiFiles,
} from "./scripts/build/buildHelpers";
import buildScss from "./scripts/build/buildScss";
const restoreMoxui = moveMoxuiFileOut();

const dependencyInfo = getDependencies();

export default defineConfig({
  assetsInclude: ["**/*.svga"],
  build: {
    target: "modules",
    //打包文件目录
    outDir: "dist",
    //压缩
    minify: false,
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      // 依赖不打包进代码
      // scss 另行处理
      external: [...dependencyInfo.allDependencies, /\.scss$/],
      input: "packages/index.ts",
      output: [
        {
          format: "es",
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].js",
          // 保留目录结构
          preserveModules: true,
          // 打包目录
          dir: resolve(__dirname, "./dist/moxui/es"),
          preserveModulesRoot: resolve(__dirname, "./packages"),
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          exports: "named",
          // 保留目录结构
          preserveModules: true,
          // 打包目录
          dir: resolve(__dirname, "./dist/moxui/lib"),
          preserveModulesRoot: resolve(__dirname, "./packages"),
        },
      ],
    },
    lib: {
      entry: "packages/index.ts",
      name: "moxui",
    },
  },
  plugins: [
    vue(),
    // 生成ts声明文件
    dts({
      entryRoot: resolve(__dirname, "./packages"),
      outputDir: [
        resolve(__dirname, "./dist/moxui/es"),
        resolve(__dirname, "./dist/moxui/lib"),
      ],
      exclude: [
        "types/*.d.ts",
        "docs/**",
        "docs-preview/**",
        "play/**",
        "node_modules/**",
      ],
      // 替换掉类型定义中的@moxui路径
      beforeWriteFile(filePath: string, content: string) {
        if (content.indexOf("@moxui/") !== -1) {
          let length = 0;
          const arr = filePath.split("\\");
          for (let i = arr.length - 2; i >= 0; i--) {
            if (arr[i] !== "es" && arr[i] !== "lib") {
              length++;
            } else {
              break;
            }
          }
          const replacer = new Array(length).fill("../").join("") || "./";
          return {
            filePath,
            content: content.replace(/@moxui\//g, replacer),
          };
        }
      },
      afterBuild() {
        // 构建scss
        buildScss();
        // 生成package.json
        generatePackageJson(dependencyInfo);
        // 删除从moxui移到packages的文件
        restoreMoxui();
        copyMoxuiFiles();
      },
    }),
    // 替换scss引入
    replaceScssPlugin(),
  ],
});
