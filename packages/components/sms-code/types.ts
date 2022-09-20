import type { ExtractPropTypes } from "vue";

export const smsCodeProps = {
  modelValue: {
    type: String,
    default: "",
    validator(value: any) {
      if (typeof value === "string") {
        if (!/^\d{0,6}$/.test(value)) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    },
  },
  length: {
    type: Number,
    default: 6,
  },
  title: String,
  tips: String,
};

export type SmsCodeProps = ExtractPropTypes<typeof smsCodeProps>;
