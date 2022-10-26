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

function copyMoxuiFiles() {
  const source = "packages/moxui/";
  const dist = "dist/moxui/";
  const res: string[] = [];
  shelljs.ls("-L", source).forEach((file) => {
    if (
      shelljs.test("-f", source + file) &&
      !/\.(t|j)s$/.test(file) &&
      !/package.*\.json$/.test(file)
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

export {
  moveMoxuiFileOut,
  getDependencies,
  copyMoxuiFiles,
  generatePackageJson,
};
