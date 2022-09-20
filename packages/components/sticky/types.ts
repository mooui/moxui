import type { ExtractPropTypes } from "vue";

export const stickyProps = {
  offsetTop: {
    type: [Number, String],
    default: 0,
  },
  height: [Number, String],
  zIndex: {
    type: Number,
    default: 99,
  },
};

export type StickyProps = ExtractPropTypes<typeof stickyProps>;
