import { ExtractPropTypes, PropType } from "vue";

export const marqueeProps = {
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  // 滚动速度 px per second
  // 以设计稿宽度750为基准
  speed: {
    type: Number,
    default: 100,
  },
  // 滚动方向
  direction: {
    type: String as PropType<"left" | "top">,
    default: "left",
  },
  // 滚动方式  平滑smooth  步跳step
  scroll: {
    type: String as PropType<"smooth" | "step">,
    default: "smooth",
  },
  /**
   * 滚动行为
   * auto 内容超出容器才滚动
   * scroll 一律滚动
   * none 一律不滚动
   */
  scrollBehavior: {
    type: String as PropType<"auto" | "scroll" | "none">,
    default: "auto",
  },
  /**
   * 内容更新时的滚动方式
   *  auto 在当前位置继续滚动  仅当已滚动距离超出现有宽度时才重置
   *  restart 重置
   */
  refreshBehavior: {
    type: String as PropType<"auto" | "restart">,
    default: "auto",
  },
  // 仅在 scrollBehavior === 'step'时生效
  interval: {
    type: Number,
    default: 2500,
  },
  /**
   * 每次step滚动距离(默认100%的宽(direction:left)/高(direction:top))
   *   仅在 scrollBehavior === 'step'时生效
   *   数值以设计稿宽度750为基准
   */
  stepDistance: {
    type: [Number, String] as PropType<number | "auto">,
    default: "auto",
  },
};

export type MarqueeProps = ExtractPropTypes<typeof marqueeProps>;
