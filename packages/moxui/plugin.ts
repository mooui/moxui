import type { Plugin } from "vue";
import { Loading } from "@moxui/plugins/loading";
import { Toast } from "@moxui/plugins/toast";
import { Dialog } from "@moxui/plugins/dialog";

export default [Loading, Toast, Dialog] as Plugin[];
