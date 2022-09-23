import {
  h,
  defineComponent,
  computed,
  ref,
  reactive,
  nextTick,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { debounce } from "lodash";
import { pxToVw, realSize } from "@moxui/utils/utils";

import { marqueeProps } from "./types";

export default defineComponent({
  name: "MoMarquee",
  props: marqueeProps,
  emits: ["scrollEnd"], // 一轮滚动结束
  setup(props, { emit, slots, attrs }) {
    const data = reactive({
      marqueeSize: 0, // 容器宽/高  根据props.direction
      contentSize: 0, // 滚动内容宽/高
      duration: 0, // 滚动时长
      // 总滚动距离
      distance: 0, // 滚动距离
      // 已向左/上移动距离
      moved: 0,
      // 复制一份内容  实现无缝滚动
      copyHtml: "",
      // 强制滚动? scrollBehavior = scroll 且 内容不够
      needForceScroll: false,
    });
    let stepTimer: ReturnType<typeof setTimeout>;

    const speed = computed(() => {
      return realSize(props.speed);
    });
    const stepDistance = computed(() => {
      if (props.stepDistance === "auto") {
        return data.marqueeSize;
      } else {
        return realSize(props.stepDistance);
      }
    });
    const marquee = ref<HTMLDivElement>();
    const content = ref<HTMLDivElement>();
    const list = ref<HTMLDivElement>();

    // #region styles
    const marqueeStyle = computed(() => {
      return {
        width: pxToVw(props.width),
        height: pxToVw(props.height),
      };
    });
    const contentStyle = computed(() => {
      let res: any = {
        "transition-duration": `${data.duration}s`,
        "transition-timing-function":
          props.scroll === "step" ? "ease-in-out" : "linear",
      };
      if (props.direction === "top") {
        res["transform"] = `translateY(-${data.distance}px)`;
        res["flex-direction"] = "column";
      } else {
        res["transform"] = `translateX(-${data.distance}px)`;
        res["flex-wrap"] = "nowrap";
        res["align-items"] = "center";
        res["height"] = "100%";
      }
      if (data.needForceScroll) {
        props.direction === "top"
          ? (res.height = "100%")
          : (res.width = "100%");
      }
      return res;
    });

    const listStyle = computed(() => {
      let res: any = {};
      if (data.needForceScroll) {
        if (props.direction === "top") {
          res["min-height"] = "100%";
        } else {
          res["min-width"] = "100%";
        }
      }
      return res;
    });
    // #endregion

    // 初始化
    const init = debounce(() => {
      stepTimer && clearTimeout(stepTimer);
      data.needForceScroll = false;
      data.copyHtml = "";
      if (props.scrollBehavior === "none") {
        reset();
        return;
      }
      nextTick(() => {
        const rect1 = marquee.value!.getBoundingClientRect();
        const rect2 = list.value!.getBoundingClientRect();
        const attr = props.direction === "top" ? "height" : "width";
        data.marqueeSize = rect1[attr];
        data.contentSize = rect2[attr];
        data.moved = rect1[props.direction] - rect2[props.direction];
        if (data.contentSize <= data.marqueeSize) {
          if (data.contentSize === 0 || props.scrollBehavior === "auto") {
            reset();
            return;
          } else {
            data.needForceScroll = true;
            data.contentSize = data.marqueeSize;
          }
        }
        data.copyHtml = list.value!.innerHTML;
        if (props.scroll === "step") {
          stepScroll(true);
        } else {
          initScroll();
        }
      });
    });

    // 开始滚动
    function initScroll() {
      if (
        data.moved >= data.contentSize ||
        (data.moved && props.refreshBehavior === "restart")
      ) {
        transitionEnd();
      } else {
        data.distance = data.contentSize;
        data.duration = (data.distance - data.moved) / speed.value;
      }
    }
    // step滚动
    function stepScroll(isRefresh = false) {
      /**
       * step滚动 reset时机判断
       *  1.滚动到底  -  长度可能不精确, 允许一定误差量
       *  2.内容更新, 且设置 refreshBehavior = "restart"
       */
      if (
        data.distance > data.contentSize - 2 ||
        (isRefresh && props.refreshBehavior === "restart")
      ) {
        reset();
        waiDOMRefresh(() => {
          stepScroll();
          emit("scrollEnd");
        });
      } else {
        clearTimeout(stepTimer);
        stepTimer = setTimeout(() => {
          data.distance += stepDistance.value;
          data.duration = stepDistance.value / speed.value;
        }, props.interval);
      }
    }
    // 一轮滚动结束 启动下一轮
    function transitionEnd() {
      if (props.scroll === "step") {
        stepScroll();
      } else {
        reset();
        // 延时, 等待DOM状态更新
        waiDOMRefresh(() => {
          initScroll();
          emit("scrollEnd");
        });
      }
    }

    // 重置
    function reset() {
      data.duration = 0;
      data.moved = 0;
      data.distance = 0;
    }
    // 等待DOM更新
    function waiDOMRefresh(callback: Function) {
      requestAnimationFrame(() => {
        setTimeout(callback);
      });
    }

    // #region 初始化时机
    // slots 改变
    let observer: MutationObserver;
    onMounted(() => {
      init();
      observer = new MutationObserver(init);
      observer.observe(list.value!, {
        childList: true,
        subtree: true,
      });
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
    });

    // props 改变
    watch(props, () => {
      init();
    });
    // #endregion

    // render
    const baseClass = "mo-marquee";
    return () => {
      return h(
        "div",
        {
          class: baseClass,
          style: marqueeStyle.value,
          ref: marquee,
          ...attrs,
        },
        h(
          "div",
          {
            class: baseClass + "__content",
            style: contentStyle.value,
            ref: content,
            onTransitionend: () => {
              transitionEnd();
            },
          },
          [
            h(
              "div",
              {
                class: baseClass + `__${props.direction}-list`,
                style: listStyle.value,
                ref: list,
              },
              slots.default ? slots.default() : void 0
            ),
            h("div", {
              class: baseClass + `__${props.direction}-list`,
              style: listStyle.value,
              innerHTML: data.copyHtml,
            }),
          ]
        )
      );
    };
  },
});
