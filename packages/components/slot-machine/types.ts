import type { ExtractPropTypes, PropType } from "vue";

export const slotMachineProps = {
  /** 0-文字 1-图片 */
  type: {
    type: Number as PropType<0 | 1>,
    default: 0,
  },
  /** 滚动的物品 */
  items: {
    type: Array as PropType<string[]>,
    default() {
      return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    },
  },
  /** 列数 */
  cols: {
    type: Number,
    default: 3,
  },
  /** 滚动行数  默认 Math.round(items.length * 1.6) */
  rows: Number,
  /** 摇奖结果 */
  result: Array as PropType<number[]>,
  /** 初始状态默认显示元素 */
  default: Array as PropType<number[]>,
  width: {
    type: [Number, String],
    default: "100%",
  },
  height: {
    type: [Number, String],
    default: "100%",
  },
  animationDuration: {
    type: Number,
    default: 2,
  },
  /** 元素样式 */
  itemStyle: [String, Object],
};

export type SlotMachineInstance = {
  /**
   * 重置
   * @param toDefault 重置回默认初始位置(默认true) false则重置,并保留当前滚动结果
   * @returns Promise
   */
  reset: (toDefault?: boolean) => Promise<any>;
  /**
   * 滚动老虎机
   * @param numbers 滚动后的结果, props.result 和 numbers 必须传一个, numbers优先级更高
   * @returns Promise
   */
  scroll: (numbers?: number[]) => Promise<any>;
};

export type SlotMachineProps = ExtractPropTypes<typeof slotMachineProps>;
