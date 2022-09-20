import type { Plugin } from "vue";
import { MoSvga } from "@moxui/components/svga";
import { MoMarquee } from "@moxui/components/marquee";
import { MoPopup } from "@moxui/components/popup";
import { MoButton } from "@moxui/components/button";
import { MoSticky } from "@moxui/components/sticky";
import { MoSmsCode } from "@moxui/components/sms-code";

export default [MoSvga, MoMarquee, MoPopup, MoButton, MoSticky, MoSmsCode] as Plugin[];
