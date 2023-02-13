/**
 * packages/moxui/package.json version 更改
 * packages/moxui/version.ts version 更改
 *
 * pnpm build
 *
 * pnpm release --access public
 */

import shelljs from "shelljs";
import { version } from "packages/moxui/version";

// 版本变更  maj mid mini 依次对应 1.0.0 的数字
// maj 首位+1 后两位置0
// mid 中位+1 后位置0
// mini 末位+1
function getNewVersion(version: string) {
  const versionChanges = ["maj", "mid", "mini"];
  let versionChange = "mini";
  if (
    process.argv[2] &&
    versionChanges.indexOf(process.argv[2].toLowerCase()) !== -1
  ) {
    versionChange = process.argv[2].toLowerCase();
  }
  let newVersion = "";
  switch (versionChange) {
    case "mini":
      newVersion = version.replace(/\.\d+$/, (s) => {
        return s.slice(0, 1) + (Number(s.slice(1)) + 1);
      });
      break;
    case "mid":
      newVersion = version
        .replace(/\.\d+\./, (s) => {
          return s.slice(0, 1) + (Number(s.slice(1, -1)) + 1) + s.slice(-1);
        })
        .replace(/\d+$/, "0");
      break;
    case "maj":
      newVersion = parseInt(version) + 1 + ".0.0";
      break;
  }

  return newVersion;
}

function upgradeVersion(version: string) {
  // packages/moxui/version.ts
  shelljs.sed(
    "-i",
    /export\s+const\s+version.*/,
    `export const version = "${version}";`,
    "packages/moxui/version.ts"
  );

  // packages/moxui/package.json packages/moxui/package.prod.json
  shelljs.sed("-i", /"version":.*/, `"version": "${version}",`, [
    "packages/moxui/package.json",
    "packages/moxui/package.prod.json",
  ]);
}

function release(newVersion: string) {
  // shelljs.exec("pnpm build");
  shelljs.cd("dist/moxui");
  shelljs.exec("pnpm publish --access public --no-git-check");

  shelljs.cd("../../docs-preview");
  shelljs.exec("pnpm upgrade moxui");

  shelljs.cd("../");
  shelljs.exec("git add .");
  shelljs.exec(`git commit -m "moxui: release ${newVersion}"`);
  shelljs.exec(`git push`);
}

const newVersion = getNewVersion(version);
upgradeVersion(newVersion);
release(newVersion);
