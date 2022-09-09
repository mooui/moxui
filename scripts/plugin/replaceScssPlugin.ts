import type { Plugin } from "rollup";

function replaceScssPlugin(): Plugin {
  function replaceScss(str: string) {
    str = str.replace(/import\s+(['"])[^'"]+\.scss\1/g, (s) =>
      s.replace(".scss", ".css")
    );
    str = str.replace(/require\((['"])[^'"]+\.scss\1\)/g, (s) =>
      s.replace(".scss", ".css")
    );
    return str;
  }

  return {
    name: "replace-scss-plugin",
    generateBundle(config, bundle: any) {
      //这里可以获取打包后的文件目录以及代码code
      const keys = Object.keys(bundle);

      for (const key of keys) {
        const bundler = bundle[key];
        if (bundler.code) {
          bundler.code = replaceScss(bundler.code);
        } else if (typeof bundler.source === "string") {
          bundler.source = replaceScss(bundler.source);
        }
      }
    },
  };
}

export default replaceScssPlugin;
