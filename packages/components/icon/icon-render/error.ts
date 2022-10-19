import { h, ref } from "vue";
import { IconOptions } from "../types";

function renderErrorIcon(baseClass: string, options: IconOptions) {
  const animate = ref(options.animate);
  return () =>
    h(
      "svg",
      {
        viewBox: "0 0 400 400",
        width: options.size,
        height: options.size,
        class: [baseClass, baseClass + "__error", { animate: animate.value }],
      },
      [
        h("circle", {
          class: baseClass + "__circle",
          fill: "none",
          transform: "rotate(-90 200 200)",
          stroke: options.color,
          key: "error",
          "stroke-width": 24,
          cx: 200,
          cy: 200,
          r: 188,
          "stroke-linecap": "round",
        }),
        h("polyline", {
          class: baseClass + "__cross",
          fill: "none",
          stroke: options.color,
          "stroke-width": 28,
          points: "200,200 140,140",
          "stroke-linecap": "round",
        }),
        h("polyline", {
          class: baseClass + "__cross",
          fill: "none",
          stroke: options.color,
          "stroke-width": 28,
          points: "200,200 260,260",
          "stroke-linecap": "round",
        }),
        h("polyline", {
          class: baseClass + "__cross",
          fill: "none",
          stroke: options.color,
          "stroke-width": 28,
          points: "200,200 260,140",
          "stroke-linecap": "round",
        }),
        h("polyline", {
          class: baseClass + "__cross",
          fill: "none",
          stroke: options.color,
          "stroke-width": 28,
          points: "200,200 140,260",
          "stroke-linecap": "round",
          onAnimationend: () => {
            animate.value = false;
          },
        }),
      ]
    );
}

export { renderErrorIcon };
