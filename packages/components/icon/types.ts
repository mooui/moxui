import type { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  type: {
    type: String as PropType<"success" | "error" | "warn" | "loading">,
    default: "success",
  },
  size: {
    type: [String, Number],
    default: 30,
  },
  color: {
    type: String,
    default: "#666",
  },
  animate: Boolean,
};

export interface IconOptions {
  size: string;
  color: string;
  animate: boolean;
}

export type IconProps = ExtractPropTypes<typeof iconProps>;
