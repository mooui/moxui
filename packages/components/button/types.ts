import { ExtractPropTypes, PropType } from "vue";

export const buttonProps = {
  type: {
    type: String as PropType<"confirm" | "cancel">,
    default: "confirm",
  },
  size: {
    type: String as PropType<"normal" | "large">,
    default: "normal",
  },
  txt: String,
  width: [String, Number],
  height: [String, Number],
  backgroundColor: String,
  color: String,
  disabled: Boolean,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
