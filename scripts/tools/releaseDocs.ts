import shelljs from "shelljs";

// 构建
shelljs.exec(`pnpm docs:build`);

// 上传
shelljs.cd(`dist/docs`);

// 有.git
if (shelljs.test("-e", ".git")) {
  shelljs.exec(`git add .`);
  shelljs.exec(
    `git commit -m "moxui docs: release ${new Date().toISOString()}"`
  );
  shelljs.exec(`git push`);
} else {
  shelljs.exec(`git init`);
  shelljs.exec(`git remote add origin git@mooui.com:mooui/mooui.github.io.git`);
  shelljs.exec(`git add .`);
  shelljs.exec(
    `git commit -m "moxui docs: release ${new Date().toISOString()}"`
  );
  shelljs.exec(`git push -u origin master --force`);
}
