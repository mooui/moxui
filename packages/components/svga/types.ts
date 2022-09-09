import { ExtractPropTypes } from "vue";

export const svgaProps = {
  // 绝对路径文件
  file: {
    type: String,
    required: true as const,
  },
  // 循环次数 0 - 无限循环
  loopTimes: {
    type: Number,
    default: 1,
  },
  width: {
    type: [Number, String],
    default: "100%",
  },
  height: {
    type: [Number, String],
    default: "100%",
  },
};

export type SvgaProps = ExtractPropTypes<typeof svgaProps>;
