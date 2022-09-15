import type { ExtractPropTypes } from "vue";

export const loadingProps = {
  show: Boolean,
  onClosed: Function,
  backgroundColor: {
    type: String,
    default: "rgba(0,0,0,.4)",
  },
};

export interface LoadingOptions {
  show?: boolean;
  duration?: number;
  backgroundColor?: string;
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
