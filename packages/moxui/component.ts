import type { Plugin } from "vue";
import { MoSvga } from "@moxui/components/svga";
import { MoMarquee } from "@moxui/components/marquee";
import { MoPopup } from "@moxui/components/popup";
import { MoButton } from "@moxui/components/button";
import { MoSticky } from "@moxui/components/sticky";
import { MoSmsCode } from "@moxui/components/sms-code";
import { MoIcon } from "@moxui/components/icon";
import { MoPicker } from "@moxui/components/picker";
import { MoCountDown } from "@moxui/components/count-down";
import { MoSlotMachine } from "@moxui/components/slot-machine";
import { MoScratch } from "@moxui/components/scratch";

export default [
  MoSvga,
  MoMarquee,
  MoPopup,
  MoButton,
  MoSticky,
  MoSmsCode,
  MoIcon,
  MoPicker,
  MoCountDown,
] as Plugin[];
