import { withInstall } from "@moxui/utils";
import smsCode from "./sms-code";

export type { SmsCodeProps } from "./types";
export const MoSmsCode = withInstall(smsCode);
