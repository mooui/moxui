import { h, defineComponent, computed, ref, onMounted, watch } from "vue";

import { pxToVw, waitDOMRefresh } from "@moxui/utils";
import "./style";
import { slotMachineProps } from "./types";

export default defineComponent({
  name: "Scratch",
  emits: ["finish"],
  props: slotMachineProps,
  setup(props, { expose }) {
    // #region 样式
    /** 容器样式 */
    const style = computed(() => {
      return {
        width: pxToVw(props.width),
        height: pxToVw(props.height),
      };
    });

    /** 元素样式 */
    const itemStyle = computed(() => {
      let res: any = {};
      if (props.type === 0) {
        if (typeof props.itemStyle === "string") {
          return (
            `width:${itemSize.value.width}px;height:${itemSize.value.height}px;` +
            props.itemStyle.replace(/\d+px/g, (s) => {
              return pxToVw(s);
            })
          );
        } else {
          for (const key in props.itemStyle) {
            if (
              typeof props.itemStyle[key] === "string" &&
              /px$/.test(props.itemStyle[key])
            ) {
              res[key] = pxToVw(props.itemStyle[key]);
            } else {
              res[key] = props.itemStyle[key];
            }
          }
          res["width"] = itemSize.value.width + "px";
          res["height"] = itemSize.value.height + "px";
        }
      } else {
        res["width"] = itemSize.value.width + "px";
        res["height"] = itemSize.value.height + "px";
      }

      return res;
    });

    /** 图片样式 type===1 */
    const imgStyle = computed(() => {
      const res: any = {};
      if (props.type === 1 && props.itemStyle) {
        if (typeof props.itemStyle === "string") {
          return props.itemStyle.replace(/\d+px/g, (s) => {
            return pxToVw(s);
          });
        } else {
          for (const key in props.itemStyle) {
            if (
              typeof props.itemStyle[key] === "string" &&
              /px$/.test(props.itemStyle[key])
            ) {
              res[key] = pxToVw(props.itemStyle[key]);
            } else {
              res[key] = props.itemStyle[key];
            }
          }
        }
      }
      return res;
    });
    // #endregion

    // #region 元素大小计算
    const slotItem = ref<HTMLDivElement>();
    const itemSize = ref({ width: 0, height: 0 });
    onMounted(() => {
      itemSize.value = {
        width: slotItem.value?.offsetWidth || 0,
        height: slotItem.value?.offsetHeight || 0,
      };
    });
    // #endregion

    // #region 滚动列表
    const scrollList = ref<string[][]>([]);
    function initScrollList(useResult = false) {
      const defaultShow = useResult
        ? scrollList.value.map((a) => a[0])
        : (props.default || new Array(props.cols).fill(0)).map(
            (i) => props.items[i]
          );
      const list: string[][] = [];
      const scrollCount = props.rows || Math.round(props.items.length * 1.6);
      for (let i = 0; i < props.cols; i++) {
        list[i] = [];
        for (let j = 0; j < Math.ceil(scrollCount / props.items.length); j++) {
          list[i].splice(
            0,
            0,
            ...props.items
              .slice()
              .sort(() => Math.random() - 0.5)
              .slice(
                0,
                Math.min(
                  props.items.length,
                  scrollCount - j * props.items.length
                )
              )
          );
        }
        list[i].push(defaultShow[i]);
      }
      scrollList.value = list;
    }

    watch(
      () => props.items,
      () => {
        initScrollList();
      },
      { immediate: true }
    );
    // #endregion

    // #region 动画
    /** 添加动画类 */
    const isAmimating = ref(false);
    /** 动画是否完成 */
    let animating = false;
    let resolver: any = null;
    /** 是否滚动过1次, 存在结果 */
    let hasResult = false;
    function scroll(result?: number[]) {
      return new Promise((resolve, reject) => {
        if (animating) {
          return reject("Invalid opration while slot machine is animating.");
        }

        const arr = result || props.result || [];
        hasResult = true;
        scrollList.value = scrollList.value.map((list, index) => {
          list.splice(0, 1, props.items[arr[index]]);
          return list;
        });
        resolver = resolve;

        waitDOMRefresh(() => {
          isAmimating.value = true;
          animating = true;
        });
      });
    }
    function animationend(index: number) {
      if (index === props.cols - 1) {
        animating = false;
        if (resolver) {
          resolver(0);
          resolver = null;
        }
      }
    }

    /**
     * 重置
     *    toDefault true ? 使用默认值重置 : 使用上一次的结果重置
     */
    function reset(toDefault = true) {
      return new Promise((resolve, reject) => {
        if (animating) {
          return reject("Invalid opration while slot machine is animating.");
        }

        /** 首次无需重置 */
        if (!isAmimating.value) {
          return resolve(0);
        }

        scrollList.value = scrollList.value.map((list) => {
          list.splice(list.length - 1, 1, list[0]);
          return list;
        });
        waitDOMRefresh(() => {
          isAmimating.value = false;
          initScrollList(!toDefault && hasResult);
          resolve(0);
        });
      });
    }
    // #endregion
    expose({ reset, scroll });
    // render
    const baseClass = "mo-slot-machine";
    return () =>
      h(
        "div",
        { class: baseClass, style: style.value },
        scrollList.value.map((list, index) => {
          return h(
            "div",
            {
              class: baseClass + "__line",
              ref: index === 0 ? slotItem : undefined,
              key: index,
            },
            [
              h(
                "div",
                {
                  class: [
                    baseClass + "__list",
                    { [baseClass + "__animate"]: isAmimating.value },
                  ],
                  style: `transform:translateY(-${
                    (list.length - 1) * itemSize.value.height
                  }px);animation-duration:${
                    isAmimating ? props.animationDuration : 0
                  }s;`,
                  onAnimationend: () => {
                    animationend(index);
                  },
                  onWebkitAnimationEnd: () => {
                    animationend(index);
                  },
                },
                list.map((item, idx) => {
                  return h(
                    "div",
                    {
                      class: baseClass + "__item",
                      key: idx,
                      style: itemStyle.value,
                    },
                    props.type === 0
                      ? item
                      : [
                          h("img", {
                            src: item,
                            style: imgStyle.value,
                          }),
                        ]
                  );
                })
              ),
            ]
          );
        })
      );
  },
});
