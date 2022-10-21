import {
  h,
  defineComponent,
  ref,
  computed,
  type CSSProperties,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { throttle } from "lodash";
import { realSize } from "@moxui/utils/utils";

import "./style";
import { stickyProps } from "./types";

export default defineComponent({
  name: "MoSticky",
  props: stickyProps,
  emits: ["sticky", "unsticky"],
  setup(props, { emit, slots }) {
    const shouldSticky = ref(false);
    const sticky = ref<HTMLDivElement>();

    const top = computed(() => {
      return realSize(props.offsetTop);
    });

    const scrollHandler = throttle(() => {
      if (!sticky.value) return;
      if (sticky.value.getBoundingClientRect().top <= top.value) {
        shouldSticky.value = true;
      } else {
        shouldSticky.value = false;
      }
    }, 15);

    watch(shouldSticky, (val) => {
      if (val) {
        emit("sticky");
      } else {
        emit("unsticky");
      }
    });
    onMounted(() => {
      scrollHandler();
      // 滚动监听
      window.addEventListener("scroll", scrollHandler, { passive: true });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scrollHandler);
    });
    // #region style
    const heightStyle = computed(() => {
      const res: CSSProperties = {};
      if (props.height) {
        res.height = realSize(props.height) + "px";
      }
      return res;
    });

    const contentStyle = computed(() => {
      const res: CSSProperties = {};
      if (shouldSticky.value) {
        res.zIndex = props.zIndex;
        res.top = top.value + "px";
        res.position = "fixed";
      }
      return res;
    });
    // #endregion

    // render
    const baseClass = "mo-sticky";
    return () => {
      return h(
        "div",
        {
          class: baseClass,
          ref: sticky,
          style: {
            ...heightStyle.value,
          },
        },
        h(
          "div",
          {
            class: baseClass + "__content",
            style: {
              ...heightStyle.value,
              ...contentStyle.value,
            },
          },
          slots.default?.()
        )
      );
    };
  },
});
