import { withInstall } from "@moxui/utils/withInstall";
import svga from "./svga";

export type { SvgaProps, SvgaInstance } from "./types";
export const MoSvga = withInstall(svga);
