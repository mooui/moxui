import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import PostcssPxToViewport from "postcss-px-to-viewport-8-plugin";

import "./vite.init";

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: [
      // {
      //   find: /^moxui$/,
      //   replacement: path.resolve('../packages/moxui', 'index.ts'),
      // }
    ],
  },
  assetsInclude: ["**/*.svga"],
  css: {
    postcss: {
      plugins: [
        PostcssPxToViewport({
          viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
          unitPrecision: 4, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: [".ignore", ".hairlines"], // 使用大写PX可以避免转换，指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: true, // 允许在媒体查询中转换`px`
        }),
      ],
    },
    // 防止 @charset 'UTF-8' 不在第一行报错
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [
        {
          libraryName: "@moxui/*",
          esModule: true,
          resolveStyle: (name) => {
            console.log(22222, name);
            return path.resolve(
              `../packages/components/${name.replace(/^mo-/, "")}/style/index`
            );
          },
        },
        {
          libraryName: "@moxui/components",
          esModule: true,
          resolveStyle: (name) => {
            console.log(333);
            return path.resolve(
              `../packages/components/${name.replace(/^mo-/, "")}/style/index`
            );
          },
        },
        {
          libraryName: "@moxui/plugins",
          esModule: true,
          resolveStyle: (name) => {
            return path.resolve(`../packages/plugins/${name}/style/index`);
          },
        },
        {
          libraryName: "@moxui/hooks",
          esModule: true,
          resolveStyle: () => {
            return path.resolve(`../packages/style/index`);
          },
        },
      ],
      libs: [
        {
          libraryName: "moxui",
          esModule: true,
          resolveStyle: (name) => {
            if (/^mo-/.test(name)) {
              return `components/${name.replace(/^mo-/, "")}/style/index`;
            } else if (["loading", "toast"].indexOf(name) !== -1) {
              return `plugins/${name}/style/index`;
            } else {
              return "style/index";
            }
          },
        },
      ],
    }),
  ],
});
