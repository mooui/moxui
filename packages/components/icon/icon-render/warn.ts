import { h, ref } from "vue";
import { IconOptions } from "../types";

function renderWarnIcon(baseClass: string, options: IconOptions) {
  const animate = ref(options.animate);
  return () =>
    h(
      "svg",
      {
        viewBox: "0 0 400 400",
        width: options.size,
        height: options.size,
        class: [baseClass + "__warn", { animate: animate.value }],
      },
      [
        h("circle", {
          class: baseClass + "__circle",
          key: "warn-circle",
          fill: "none",
          transform: "rotate(-90 200 200)",
          stroke: options.color,
          "stroke-width": 24,
          cx: 200,
          cy: 200,
          r: 188,
          "stroke-linecap": "round",
        }),
        h("polyline", {
          class: baseClass + "__bar",
          fill: "none",
          stroke: options.color,
          key: "warn-line",
          "stroke-width": 24,
          points: "200,100 200,240",
          "stroke-linecap": "round",
        }),
        h("circle", {
          class: baseClass + "__dot",
          fill: options.color,
          cx: 200,
          cy: 298,
          r: 18,
          onAnimationend: () => {
            animate.value = false;
          },
        }),
      ]
    );
}

export { renderWarnIcon };
