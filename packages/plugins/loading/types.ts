import type { ExtractPropTypes } from "vue";

export const loadingProps = {
  show: Boolean,
  onClosed: Function,
  width: Number,
  height: Number,
  backgroundColor: {
    type: String,
    default: "rgba(0,0,0,.4)",
  },
  zIndex: Number,
  definedContainer: Boolean,
};

export interface LoadingOptions {
  show?: boolean;
  duration?: number;
  backgroundColor?: string;
  zIndex?: number;
  container?: string | HTMLElement | null;
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>;
