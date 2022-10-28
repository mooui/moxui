import type { ExtractPropTypes, PropType } from "vue";

export const countDownProps = {
  // 秒值
  time: {
    type: Number,
    required: true as const,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
  // D 天 h 时 m 分 s 秒
  // 若格式中本有对应字母,  需使用 {D} {hh} 等
  format: {
    type: String,
    default: "hh:mm:ss",
  },
  // 时间节点
  //    在对应的时间节点抛出time事件
  timePoint: {
    type: [Number, Array] as PropType<number | number[]>,
  },
};

export type CountDownProps = ExtractPropTypes<typeof countDownProps>;

export type CountDownInstance = {
  start: () => {};
  stop: () => {};
  pause: () => {};
  reset: (time?: number) => {};
};
