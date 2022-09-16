import type { ComponentPublicInstance, ExtractPropTypes, PropType } from "vue";

export interface IconProp {
  src?: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
}
export const toastProps = {
  show: Boolean,
  message: {
    type: [String, Number],
    default: "",
  },
  zIndex: Number,
  transitionDuration: Number,
  type: String as PropType<"loading" | "success" | "warn" | "error">,
  /**
   * 图片链接及宽高参数
   *   优先级高于type
   *   链接可使用type, 用于指定默认图标大小
   */
  icon: [String, Object] as PropType<string | IconProp>,
  // 仅当type 或 icon 存在时 生效
  iconPosition: {
    type: String as PropType<"inline" | "center">,
    default: "center",
  },
};

export interface TypedToastOptions {
  message: string | number;
  show?: boolean;
  duration?: number;
  transitionDuration?: number;
  zIndex?: number;
}
export interface ToastOptions extends TypedToastOptions {
  type?: "loading" | "success" | "warn" | "error";
  icon?: string | IconProp;
  iconPosition?: "inline" | "center";
}

export type ToastInstance = ComponentPublicInstance<
  { message: string | number },
  {
    close: () => void;
    open: (props: Record<string, any>) => void;
  }
>;

export type ToastProps = ExtractPropTypes<typeof toastProps>;
