import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

// 添加install
function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component((comp as any).name, comp);
  };
  return comp as SFCWithInstall<T>;
}

// px2vw
function pxToVw(
  px: string | number,
  designWidth = 750,
  unitPrecision = 4
): string {
  if (typeof px === "string") {
    // 百分号结尾 直接返回
    if (/%$/.test(px)) return px;

    if (!/^(\d+|\.\d+|\d+\.\d+)(px)?$/.test(px)) {
      console.warn(`${px} 设置不合法`);
    }
    px = parseFloat(px) || 0;
  }
  return Number(((px / designWidth) * 100).toFixed(unitPrecision)) + "vw";
}

export { withInstall, pxToVw };
