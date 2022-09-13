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

export { pxToVw };
