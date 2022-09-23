import {
  h,
  defineComponent,
  ref,
  computed,
  Teleport,
  Transition,
  watch,
  onMounted,
  onActivated,
  onDeactivated,
  CSSProperties,
  Fragment,
  withDirectives,
  vShow,
} from "vue";
import { callInterceptor, getGlobalZIndex, pxToVw } from "@moxui/utils";
import { useLockScroll } from "@moxui/hooks";

import { popupProps } from "./types";

export default defineComponent({
  name: "MoPopup",
  props: popupProps,
  emits: ["update:show", "close", "closed", "open", "opened"],
  setup(props, { emit, slots, attrs }) {
    const zIndex = ref(1);
    let opened = false;
    let shouldReopen = false;
    let inited = false;

    const popupRef = ref<HTMLDivElement>();

    useLockScroll(popupRef, () => props.show && props.lockScroll);

    const transitionName = computed(() => {
      if (props.animation) {
        return props.animation;
      } else {
        if (props.position === "center") {
          return "fade";
        } else {
          if (/:/.test(props.position)) {
            return props.position.replace(/:.*$/, "") + "-full";
          } else {
            return props.position;
          }
        }
      }
    });
    // 动画时长
    const duration = computed(() => {
      return typeof props.duration !== "undefined"
        ? +props.duration / 1000 + "s"
        : void 0;
    });
    const popupStyle = computed(() => {
      const res: CSSProperties = {};
      const pos = props.position;
      if (pos === "center") {
        res.left = "50%";
        res.top = "50%";
        res.transform = "translate(-50%,-50%)";
      } else {
        const val = pxToVw(pos.split(":")[1] || 0);
        if (/^top/.test(pos)) {
          res.top = val;
          res.left = "50%";
          res.transform = "translateX(-50%)";
        } else if (/^right/.test(pos)) {
          res.right = val;
          res.top = "50%";
          res.transform = "translateY(-50%)";
        } else if (/^bottom/.test(pos)) {
          res.bottom = val;
          res.left = "50%";
          res.transform = "translateX(-50%)";
        } else if (/^left/.test(pos)) {
          res.left = val;
          res.top = "50%";
          res.transform = "translateY(-50%)";
        }
      }
      // 非靠边移动 增加200ms
      if (duration.value) {
        if (/-full/.test(transitionName.value)) {
          res.transitionDuration = (Number(props.duration) + 200) / 1000 + "s";
        } else {
          res.transitionDuration = duration.value;
        }
      }
      return res;
    });

    function open() {
      inited = true;
      if (!opened) {
        opened = true;

        zIndex.value =
          props.zIndex !== undefined ? +props.zIndex : getGlobalZIndex();

        emit("open");
      }
    }
    function close() {
      callInterceptor(props.beforeClose, {
        done: () => {
          opened = false;
          emit("close");
          emit("update:show", false);
        },
      });
    }

    function onClickMask() {
      if (props.maskClickClose) {
        close();
      }
    }

    onMounted(() => {
      if (props.show) {
        open();
      }
    });
    onActivated(() => {
      if (shouldReopen) {
        emit("update:show", true);
        shouldReopen = false;
      }
    });

    onDeactivated(() => {
      // teleported popup should be closed when deactivated
      if (props.show && props.teleport) {
        close();
        shouldReopen = true;
      }
    });

    watch(
      () => props.show,
      (show) => {
        if (show && !opened) {
          open();
        }

        if (!show && opened) {
          opened = false;
          emit("close");
        }
      }
    );

    // render
    const baseClass = "mo-popup";
    return () => {
      return h(
        props.teleport ? (Teleport as any) : (Fragment as any),
        {
          to: props.teleport,
        },
        [
          h(
            Transition,
            {
              name: "mo-fade",
            },
            () => {
              return inited
                ? withDirectives(
                    h("div", {
                      class: baseClass + "__mask",
                      style: {
                        background: props.maskBackground,
                        zIndex: zIndex.value,
                        transitionDuration: duration.value,
                      },
                      onClick: onClickMask,
                    }),
                    [[vShow, props.show]]
                  )
                : void 0;
            }
          ),
          h(
            Transition,
            {
              name: "mo-" + transitionName.value,
              onAfterEnter: () => {
                emit("opened");
              },
              onAfterLeave: () => {
                emit("closed");
              },
            },
            () => {
              return inited
                ? withDirectives(
                    h(
                      "div",
                      {
                        class: baseClass,
                        ref: popupRef,
                        style: {
                          zIndex: zIndex.value,
                          ...popupStyle.value,
                        },
                        ...attrs,
                      },
                      slots.default?.()
                    ),
                    [[vShow, props.show]]
                  )
                : void 0;
            }
          ),
        ]
      );
    };
  },
});
