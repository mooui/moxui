import type { ExtractPropTypes } from "vue";

export const loadingProps = {
  show: Boolean,
  onClosed: Function,
  backgroundColor: {
    type: String,
    default: "rgba(0,0,0,.4)",
  },
  zIndex: Number,
};

export interface LoadingOptions {
  show?: boolean;
  duration?: number;
  backgroundColor?: string;
  zIndex?: number;
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
