import { withInstall } from "@moxui/utils";
import countDown from "./count-down";

export type { CountDownProps, CountDownInstance } from "./types";
export const MoCountDown = withInstall(countDown);
