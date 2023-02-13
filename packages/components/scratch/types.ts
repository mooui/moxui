import type { ExtractPropTypes, PropType } from "vue";

export const scratchProps = {
  /** 是否绝对定位, default: false */
  absolute: {
    type: Boolean,
    default: false,
  },
  /** 刮开半径 */
  radius: {
    type: Number,
    default: 8,
  },
  scratchAble: {
    type: Boolean,
    default: false,
  },
  /** 样式 */
  styles: {
    type: Object,
    default() {
      return {
        width: "100%",
        height: "100%",
      };
    },
  },
  /** 颜色/图片 */
  background: {
    type: String,
    default: "#ccc",
  },
  /** 刮开多少算刮完, 百分比值, default: 80 */
  finishPercent: {
    type: Number,
    default: 80,
  },
  /**
   * 有效刮奖区域, 以该区域内刮开比例判断是否finish
   * 定义类似padding, 上右下左
   */
  areaPadding: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
  },
  /** 触发finish后自动清空 */
  autoClear: {
    type: Boolean,
    default: true,
  },
  /** 涂层上的文字 */
  text: String,
  /** 涂层上的文字样式 */
  textStyle: {
    type: Object as PropType<{
      color?: string;
      fontSize?: number | string;
      fontWeight?: number | string;
      fontFamily?: string;
    }>,
    default() {
      return {};
    },
  },
};

export type ScratchInstance = {
  reset: () => {};
  clear: () => {};
};

export type ScratchProps = ExtractPropTypes<typeof scratchProps>;
