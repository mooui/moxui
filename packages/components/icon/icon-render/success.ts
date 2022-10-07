import { h, ref } from "vue";
import { IconOptions } from "../types";

function renderSuccessIcon(baseClass: string, options: IconOptions) {
  const animate = ref(options.animate);
  return () =>
    h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 400 400",
        width: options.size,
        height: options.size,
        class: [baseClass + "__success", { animate: animate.value }],
      },
      [
        h("circle", {
          class: baseClass + "__circle",
          fill: "none",
          key: "success-circle",
          transform: "rotate(-90 200 200)",
          stroke: options.color,
          "stroke-width": 24,
          cx: 200,
          cy: 200,
          r: 188,
          "stroke-linecap": "round",
        }),
        h("polyline", {
          class: baseClass + "__tick",
          fill: "none",
          stroke: options.color,
          "stroke-width": 28,
          key: "success-line",
          points: "100,200 170,275 300,150",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          onAnimationend: () => {
            animate.value = false;
          },
        }),
      ]
    );
}

export { renderSuccessIcon };
