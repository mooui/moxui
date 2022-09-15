import type { ExtractPropTypes, PropType, TeleportProps } from "vue";
import type { Interceptor } from "@moxui/utils";

type AnimationType =
  | "fade"
  | "zoom"
  | "zoom-fade"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-full"
  | "right-full"
  | "bottom-full"
  | "left-full";

export const popupProps = {
  show: {
    type: Boolean,
    default: false,
  },
  zIndex: [Number, String],
  maskClickClose: Boolean,
  /**
   * 支持格式
   *  center top right bottom left
   *  top:200(等同top:200px) right:10vw left:50px  其他方向可以类推
   */
  position: {
    type: String,
    default: "center",
    validator(value: string) {
      return /^((center)|(((top)|(left)|(bottom)|(right))(:\d+(\.\d+)?((vw)|(px))?)?))$/.test(
        value
      );
    },
  },
  animation: String as PropType<AnimationType>,
  duration: Number,
  beforeClose: Function as PropType<Interceptor>,
  teleport: [Object, String] as PropType<TeleportProps["to"]>,
  lockScroll: {
    type: Boolean,
    default: true,
  },
  maskBackground: {
    type: String,
    default: "rgba(0,0,0,.4)",
  },
};

export type PopupProps = ExtractPropTypes<typeof popupProps>;
