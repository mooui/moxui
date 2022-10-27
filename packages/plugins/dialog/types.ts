import { Interceptor } from "@moxui/utils/interceptor";
import type { ExtractPropTypes, PropType, CSSProperties } from "vue";

export interface DialogCloseOption {
  top?: number;
  right?: number;
  width?: number;
  height?: number;
  icon?: string;
}

export const dialogProps = {
  show: Boolean,
  title: {
    type: String,
    required: true as const,
  },
  close: [Boolean, Object] as PropType<boolean | DialogCloseOption>,
  content: String,
  btns: {
    type: Array as PropType<Array<string | { txt: string; active?: boolean }>>,
    default: ["取消", "确认"],
  },
  contentHeight: Number,
  style: Object,
};

export enum DialogActionType {
  CLOSE = 0,
  CANCEL = 1,
  CONFIRM = 2,
}
export type DialogProps = ExtractPropTypes<typeof dialogProps>;

export interface DialogOptions {
  title: string;
  content: string;
  close?: true | DialogCloseOption;
  btns?: Array<string | { txt: string; active?: boolean }>;
  contentHeight?: number;
  style?: any;
  duration?: number;
  beforeClose?: Interceptor; // 点击后触发, 明确返回 false 或 promise<false> 阻止关闭
  parent?: string | Element; // 挂载位置
}
