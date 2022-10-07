import { h } from "vue";
import { IconOptions } from "../types";

function renderLoadingIcon(baseClass: string, options: IconOptions) {
  return () =>
    h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 400 400",
        width: options.size,
        height: options.size,
        class: [baseClass + "__loading", { animate: options.animate }],
      },
      h("circle", {
        class: baseClass + "__loading-circle",
        fill: "none",
        stroke: options.color,
        "stroke-width": 24,
        cx: 200,
        cy: 200,
        r: 188,
      })
    );
}

export { renderLoadingIcon };
