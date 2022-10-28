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

// 格式化数字
function formatNum(num: number, shouldPadStart = true) {
  return shouldPadStart && num < 10 ? "0" + num : "" + num;
}

// 以元素实际尺寸获取设计尺寸(750px设计稿)
function designSize(size: number | string, designWidth = 750) {
  if (typeof size === "number" || /\d+(px)?$/.test(size)) {
    return Math.round((parseFloat("" + size) / clientWidth) * designWidth);
  } else if (/vw$/.test(size)) {
    size = parseFloat(size);
    return Math.round((size * designWidth) / 100);
  } else {
    return 0;
  }
}
let gloalZIndex = 2000;
function getGlobalZIndex() {
  return gloalZIndex++;
}
function setGlobalZIndex(index: number) {
  gloalZIndex = index;
}

export {
  pxToVw,
  realSize,
  designSize,
  clientWidth,
  getGlobalZIndex,
  setGlobalZIndex,
  formatNum,
};
