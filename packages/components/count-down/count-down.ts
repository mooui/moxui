import { h, defineComponent, watch, computed, onBeforeUnmount } from "vue";

import { useCountDown } from "@moxui/hooks";
import { formatNum } from "@moxui/utils/utils";

import "./style";
import { countDownProps } from "./types";

// 替换字符
const timeReplacer = "(D+|h+|m+|s+)";
export default defineComponent({
  name: "MoCountDown",
  props: countDownProps,
  emits: ["end", "time"],
  setup(props, { emit, expose, slots }) {
    let init: number = 0;
    const countDown = useCountDown(0);
    const current = countDown.current;

    countDown.on("end", () => {
      emit("end");
    });

    countDown.on("update", () => {
      if (props.timePoint) {
        const time = current.total;
        const points =
          typeof props.timePoint === "number"
            ? [props.timePoint]
            : props.timePoint;
        if (points.indexOf(time) !== -1) {
          emit("time", time);
        }
      }
    });

    const timeStr = computed(() => {
      if (!slots.default) {
        // 替换字符是否被{} 包裹
        const isWrapped = new RegExp(`\\{${timeReplacer}\\}`).test(
          props.format
        );
        // 是否有天数  若无小时数需要显示总数
        const hasDay = new RegExp(isWrapped ? "\\{D+\\}" : "D+").test(
          props.format
        );
        return props.format.replace(
          new RegExp(isWrapped ? `\\{${timeReplacer}\\}` : timeReplacer, "g"),
          (m) => {
            let res = "";
            // 去除 {}
            m = m.replace(/^{|}$/g, "");
            // 不足两位, 是否需要补0
            const shouldPadStart = m.length > 1;
            switch (m[0]) {
              case "D":
                res = formatNum(current.days, shouldPadStart);
                break;
              case "h":
                res = formatNum(
                  hasDay ? current.hours : current.totalHours,
                  shouldPadStart
                );
                break;
              case "m":
                res = formatNum(current.minutes, shouldPadStart);
                break;
              case "s":
                res = formatNum(current.seconds, shouldPadStart);
                break;
            }
            return res;
          }
        );
      } else {
        return "";
      }
    });

    watch(
      () => props.time,
      (val) => {
        init = val;
        countDown.reset(val, props.autoStart);
      },
      { immediate: true }
    );

    // 开始
    function start() {
      countDown.start();
    }
    // 暂停
    function pause() {
      countDown.stop();
    }
    // 归零
    function stop() {
      countDown.stop();
      countDown.reset(0, false);
    }
    // 重置
    function reset(time?: number) {
      if (typeof time === "undefined") time = init;
      countDown.stop();
      countDown.reset(time, false);
    }

    expose({ start, pause, stop, reset });

    // render
    const baseClass = "mo-count-down";
    return () => {
      return h(
        "div",
        {
          class: baseClass,
        },
        slots.default ? slots.default(current) : timeStr.value
      );
    };
  },
});
