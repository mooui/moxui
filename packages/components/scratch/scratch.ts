import { h, defineComponent, computed, ref, onMounted, nextTick } from "vue";

import { pxToVw, realSize } from "@moxui/utils";
import "./style";
import { scratchProps } from "./types";

interface Point {
  x: number;
  y: number;
}

export default defineComponent({
  name: "Scratch",
  emits: ["finish"],
  props: scratchProps,
  setup(props, { slots, emit, expose }) {
    const scratchStyle = computed(() => {
      const res: any = {};
      if (props.absolute) {
        res["position"] = "absolute";
        res["top"] = 0;
        res["left"] = 0;
      } else {
        res["position"] = "relative";
      }
      for (const key in props.styles) {
        if (/^\d+/.test(props.styles[key])) {
          res[key] = pxToVw(props.styles[key]);
        } else {
          res[key] = props.styles[key];
        }
      }

      return res;
    });

    /** 有效刮奖区域 */
    const area = computed(() => {
      let res = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };
      if (
        typeof props.areaPadding === "number" ||
        props.areaPadding.length <= 1
      ) {
        const val =
          typeof props.areaPadding === "number"
            ? props.areaPadding
            : props.areaPadding[0] || 0;
        res.top = res.right = res.bottom = res.left = realSize(val);
      } else {
        res.top = realSize(props.areaPadding[0]);
        res.right = realSize(props.areaPadding[1]);
        res.bottom = realSize(props.areaPadding[2] || props.areaPadding[0]);
        res.left = realSize(props.areaPadding[3] || props.areaPadding[1]);
      }
      return res;
    });

    /** 容器 */
    const container = ref<HTMLDivElement>();
    const size = ref({ width: 0, height: 0 });
    /** 获取尺寸 */
    function getSize() {
      if (container.value) {
        const { offsetWidth: width, offsetHeight: height } = container.value;
        size.value = { width, height };
      }
    }

    const canvas = ref<HTMLCanvasElement>();
    let ctx: CanvasRenderingContext2D;
    let touchingFlag = false;

    let img: HTMLImageElement;
    let imgLoaded = false;
    function drawBg(ctx: CanvasRenderingContext2D) {
      if (/\.(png|jpe?g)$/i.test(props.background)) {
        if (!img) {
          img = document.createElement("img");
          img.src = props.background;
        }
        if (!imgLoaded) {
          return new Promise((resolve) => {
            img.onload = function () {
              imgLoaded = true;
              ctx.drawImage(img, 0, 0, size.value.width, size.value.height);
              resolve(1);
            };
            img.onerror = function () {
              resolve(0);
            };
          });
        } else {
          ctx.drawImage(img, 0, 0, size.value.width, size.value.height);
        }
      } else {
        /** 背景色 */
        ctx.fillStyle = props.background;
        ctx.fillRect(0, 0, size.value.width, size.value.height);
      }
    }

    /** 画蒙层 */
    async function drawMask() {
      if (!canvas.value) return;
      if (!ctx)
        ctx = canvas.value.getContext("2d", { willReadFrequently: true })!;
      /** 透明度 */
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      await drawBg(ctx);

      /** 绘制文本 */
      if (props.text) {
        ctx.fillStyle = props.textStyle.color || "#000000";
        const fontSize = realSize(props.textStyle.fontSize || 36);
        ctx.font =
          fontSize + "px " + (props.textStyle.fontFamily || "Microsoft Yahei");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(props.text, size.value.width / 2, size.value.height / 2);
      }
    }
    function getPoints(p1: Point, p2: Point): Point[] {
      const distance = Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
      );
      const count = Math.ceil(distance / props.radius);
      const stepX = (p2.x - p1.x) / count;
      const stepY = (p2.y - p1.y) / count;
      const res: { x: number; y: number }[] = [];
      for (let i = 0; i < count; i++) {
        res.push({
          x: p1.x + stepX * (i + 1),
          y: p1.y + stepY * (i + 1),
        });
      }
      return res;
    }
    /** 画刮开层 */
    function drawScratch(e: TouchEvent) {
      if (!canvas.value) return;
      const rect = canvas.value.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;

      if (!ctx) ctx = canvas.value.getContext("2d")!;

      ctx.globalCompositeOperation = "destination-out"; // 相交部分不显示
      ctx.beginPath(); // 开始一条路径
      ctx.fillStyle = "white"; // 白色

      let points: Point[] = [{ x, y }];
      if (lastPos) {
        points = getPoints(lastPos, { x, y });
      }
      lastPos = { x, y };
      points.forEach((point) => {
        ctx.moveTo(point.x, point.y);
        ctx.arc(point.x, point.y, props.radius, 0, 2 * Math.PI); // 画一个圆 半径为6
        ctx.fill(); // 填充
      });
    }

    /** 检测是否刮完 */
    let finished = false;
    function finishCheck() {
      lastPos = null;
      if (!canvas.value) return;
      if (!ctx)
        ctx = canvas.value.getContext("2d", { willReadFrequently: true })!;
      // 每四个点代表一个像素
      const imageData = ctx.getImageData(
        area.value.left,
        area.value.top,
        size.value.width - area.value.left - area.value.right,
        size.value.height - area.value.top - area.value.bottom
      );
      const totalPixels = imageData.data.length / 4;
      let transparentPixels = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) {
          transparentPixels++;
        }
      }
      if (transparentPixels / totalPixels >= props.finishPercent / 100) {
        emit("finish");
        if (props.autoClear) {
          clear();
        }
      }
    }

    /** 清空 */
    function clear() {
      if (!canvas.value) return;
      if (!ctx) ctx = canvas.value.getContext("2d")!;
      finished = true;
      ctx.clearRect(0, 0, size.value.width, size.value.height);
    }

    /** 重置 */
    function reset() {
      clear();
      finished = false;
      drawMask();
    }

    onMounted(() => {
      getSize();
      nextTick(() => {
        drawMask();
      });
    });

    expose({ clear, reset });

    const baseClass = "mo-scratch";
    let lastPos: Point | null = null;
    return () =>
      h(
        "div",
        {
          class: baseClass,
          ref: container,
          style: scratchStyle.value,
        },
        [
          h("canvas", {
            class: baseClass + "__canvas",
            ref: canvas,
            width: size.value.width,
            height: size.value.height,
            onTouchstart: (e: TouchEvent) => {
              if (props.scratchAble && !finished) {
                touchingFlag = true;
                e.preventDefault();
                drawScratch(e);
              }
            },
            onTouchmove: (e: TouchEvent) => {
              if (touchingFlag == true) {
                e.preventDefault();
                drawScratch(e); // 绘制
              }
            },
            onTouchend: () => {
              if (!finished) {
                touchingFlag = false;
                finishCheck();
              }
            },
          }),
          slots.default
            ? h(
                "div",
                {
                  class: baseClass + "__upper",
                },
                slots.default()
              )
            : null,
        ]
      );
  },
});
