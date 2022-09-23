import { withInstall } from "@moxui/utils/withInstall";
import smsCode from "./sms-code";

export type { SmsCodeProps } from "./types";
export const MoSmsCode = withInstall(smsCode);
