import { withInstall } from "@moxui/utils";
import slotMachine from "./slot-machine";

export type { SlotMachineProps, SlotMachineInstance } from "./types";
export const MoSlotMachine = withInstall(slotMachine);
