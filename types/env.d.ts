import type { INSTALLED_KEY } from "@moxui/constants";

declare module "@vue/runtime-core" {
  export interface App {
    [INSTALLED_KEY]?: boolean;
  }
}

export {};
