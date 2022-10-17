import type { ExtractPropTypes, PropType } from "vue";

export interface Column {
  text: string | number;
  active?: boolean;
  children?: Column[];
}
export enum PickerType {
  SINGLE = 0,
  MULTIPLE = 1,
  CASCADER = 2,
}
export const pickerProps = {
  // 是否显示toolbar
  toolbar: Object as PropType<{
    title: string;
    cancelText?: string;
    confirmText?: string;
  }>,
  defaultIndex: {
    type: Number,
    default: 0,
  },
  itemHeight: {
    type: [Number, String],
    default: 98,
  },
  columns: {
    type: Array as PropType<
      Array<
        | string
        | number
        | { values: Array<string | number>; defaultIndex: number }
        | Column
      >
    >,
    required: true as const,
  },
  visibleCount: {
    type: Number,
    default: 5,
  },
  inertialDuration: {
    type: Number,
    default: 1000,
  },
};

export const pickerListProps = {
  columns: {
    type: Array as PropType<Array<string | number>>,
    required: true as const,
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  // 选项高度, 真实高度
  itemHeight: {
    type: Number,
    required: true as const,
  },
  visibleCount: {
    type: Number,
    required: true as const,
  },
  inertialDuration: {
    type: Number,
    required: true as const,
  },
};

export type PickerProps = ExtractPropTypes<typeof pickerProps>;
