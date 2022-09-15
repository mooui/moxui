import type { Plugin } from "vue";
import { MoSvga } from "@moxui/components/svga";
import { MoMarquee } from "@moxui/components/marquee";
import { MoPopup } from "@moxui/components/popup";
import { MoButton } from "@moxui/components/button";

export default [MoSvga, MoMarquee, MoPopup, MoButton] as Plugin[];
