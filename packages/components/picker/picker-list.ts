import { ref, h, defineComponent, computed } from "vue";
import { useTouch } from "@moxui/hooks";

import { pickerListProps } from "./types";
import { preventDefault } from "@moxui/utils";

const DEFAULT_DURATION = 200;

// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `INERTIAL_TIME` 且 move
// 距离大于 `INERTIAL_DISTANCE` 时，执行惯性滑动
const INERTIAL_TIME = 300;
const INERTIAL_DISTANCE = 15;

export default defineComponent({
  name: "MoPickerList",
  props: pickerListProps,
  emits: ["update:currentIndex", "change"],
  setup(props, { emit, expose, attrs }) {
    let changed = false;
    // #region 触摸滚动
    let startOffset: number;
    let touchStartTime: number;
    const duration = ref(0);
    const list = ref<HTMLDivElement>();
    const touch = useTouch();
    function getIndex(offset: number) {
      let index = Math.round(offset / props.itemHeight);
      if (index < 0) index = 0;
      if (index >= props.columns.length) index = props.columns.length - 1;
      return index;
    }
    const onTouchStart = (event: TouchEvent) => {
      touch.start(event);
      startOffset = top.value;
      touchStartTime = Date.now();
    };
    const onTouchMove = (event: TouchEvent) => {
      preventDefault(event);
      if (touch.startX.value || touch.startY.value) {
        touch.move(event);

        const now = Date.now();
        if (now - touchStartTime > INERTIAL_TIME) {
          touchStartTime = now;
          startOffset = top.value;
        }
      }
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (touch.startX.value || touch.startY.value) {
        // 惯性滑动
        const now = Date.now();
        const dt = now - touchStartTime;
        const distance = top.value - startOffset;
        if (dt <= INERTIAL_TIME && Math.abs(distance) >= INERTIAL_DISTANCE) {
          inertialScroll(distance, dt);
        } else {
          let index = getIndex(top.value);
          if (index !== props.currentIndex) {
            emit("update:currentIndex", index);
            changed = true;
          }
          duration.value = DEFAULT_DURATION;
        }
        touch.reset();
      }
    };
    const inertialScroll = (distance: number, dt: number) => {
      const speed = Math.abs(distance / dt);
      distance = top.value + (speed / 0.003) * (distance < 0 ? -1 : 1);
      let index = getIndex(distance);
      if (index !== props.currentIndex) {
        emit("update:currentIndex", index);
        changed = true;
      }
      duration.value = props.inertialDuration;
    };
    // #endregion

    // 上部留空数量
    const topPaddingCount = computed(() => {
      return Math.ceil(props.visibleCount / 2) - 1;
    });

    // 向上移动距离
    const top = computed(() => {
      return Math.min(
        Math.max(
          props.itemHeight * props.currentIndex - touch.deltaY.value,
          -props.itemHeight
        ),
        props.columns.length * props.itemHeight
      );
    });
    // render
    const baseClass = "mo-picker-list";
    return () => {
      return h(
        "div",
        {
          class: baseClass + "__win-wrapper",
          ref: list,
          style: {
            height: props.visibleCount * props.itemHeight + "px",
          },
          onTouchstartPassive: onTouchStart,
          onTouchmove: onTouchMove,
          onTouchend: onTouchEnd,
          onTouchcancel: onTouchEnd,
          ...attrs,
        },
        [
          h("div", {
            class: [baseClass + "__mask", baseClass + "__mask-top"],
            style: {
              height: topPaddingCount.value * props.itemHeight + "px",
            },
          }),
          h(
            "div",
            {
              class: baseClass + "__win",
              style: { height: props.itemHeight + "px" },
            },
            h(
              "div",
              {
                class: baseClass + "__list",
                style: {
                  transform: `translateY(${-top.value}px)`,
                  transitionDuration: `${duration.value}ms`,
                  transitionProperty: duration.value ? "all" : "transform",
                },
                onTransitionend: () => {
                  duration.value = 0;
                  if (changed) {
                    emit("change", props.currentIndex);
                    changed = false;
                  }
                },
              },
              props.columns.map((item, index) => {
                return h(
                  "div",
                  {
                    class: [
                      baseClass + "__item",
                      {
                        [`${baseClass}__item-active`]:
                          index === props.currentIndex,
                      },
                    ],
                    style: { height: props.itemHeight + "px" },
                    onClick: () => {
                      if (index !== props.currentIndex) {
                        emit("update:currentIndex", index);
                        changed = true;
                        duration.value = DEFAULT_DURATION;
                      }
                    },
                  },
                  item
                );
              })
            )
          ),
          h("div", {
            class: [baseClass + "__mask", baseClass + "__mask-bottom"],
            style: {
              height:
                (props.visibleCount - 1 - topPaddingCount.value) *
                  props.itemHeight +
                "px",
            },
          }),
        ]
      );
    };
  },
});
