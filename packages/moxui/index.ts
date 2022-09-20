import installer from "./defaults";

export * from "@moxui/components";
export * from "@moxui/plugins";
export * from "@moxui/hooks";
export * from "./make-installer";

export const install = installer.install;
export const version = installer.version;
export default installer;
