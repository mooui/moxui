// px2vw
function pxToVw(
  px: string | number,
  designWidth = 750,
  unitPrecision = 4
): string {
  if (typeof px === "string") {
    // 百分号结尾 直接返回
    if (/(^auto)|%$/.test(px)) return px;

    if (!/^(\d+|\.\d+|\d+\.\d+)(px)?$/.test(px)) {
      console.warn(`${px} 设置不合法`);
    }
    px = parseFloat(px) || 0;
  }
  return Number(((px / designWidth) * 100).toFixed(unitPrecision)) + "vw";
}

const clientWidth = document.body.clientWidth;

/**
 * 实际尺寸
 *   props尺寸以设计稿750px为参照
 *   根据屏幕宽度转换为相应尺寸
 * @param size number | px | vw
 */
function realSize(size: number | string, baseWidth: number = 750) {
  if (typeof size === "number" || /\d+(px)?$/.test(size)) {
    size = parseFloat("" + size);
    return (size * clientWidth) / baseWidth;
  } else if (/vw$/.test(size)) {
    size = parseFloat(size);
    return (size * clientWidth) / 100;
  } else {
    return clientWidth;
  }
}

let gloalZIndex = 2000;
function getGlobalZIndex() {
  return gloalZIndex++;
}
function setGlobalZIndex(index: number) {
  gloalZIndex = index;
}

export { pxToVw, realSize, clientWidth, getGlobalZIndex, setGlobalZIndex };
