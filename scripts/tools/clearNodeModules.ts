import shelljs from "shelljs";

function getPackages() {
  const lines = shelljs
    .cat("pnpm-workspace.yaml")
    .split("\n")
    .filter((line) => !/^\s*$/.test(line))
    .map((line) => line.replace(/(^\s+)|(\s+$)/g, ""));

  let flag = false;
  const packages: string[] = [];
  for (const line of lines) {
    if (!flag) {
      if (/^packages:$/.test(line)) {
        flag = true;
      }
    } else {
      if (/^-/.test(line)) {
        let str = line.replace(/^-\s*/, "");
        str = str.replace(/(^['"])|(['"]$)/g, "");
        packages.push(str + "/");
      } else {
        break;
      }
    }
  }
  packages.push("");
  return packages;
}

function clearNodeModules(packages: string[]) {
  shelljs.rm(
    "-rf",
    packages.map((pkg) => pkg + "node_modules")
  );
}

const packages = getPackages();
clearNodeModules(packages);
