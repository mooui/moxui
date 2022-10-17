import { ref, h, defineComponent, computed, watch } from "vue";

import { realSize } from "@moxui/utils";

import PickerList from "./picker-list";
import "./style";
import { Column, pickerProps, PickerType } from "./types";

export default defineComponent({
  name: "MoPicker",
  props: pickerProps,
  emits: ["cancel", "confirm", "change"],
  setup(props, { emit, expose, attrs }) {
    const type = computed(() => {
      const item = props.columns[0];
      if (typeof item === "string" || typeof item === "number") {
        return PickerType.SINGLE;
      } else if ("values" in item) {
        return PickerType.MULTIPLE;
      } else {
        return PickerType.CASCADER;
      }
    });

    // 深度 (列数)
    const deep = computed(() => {
      switch (type.value) {
        case PickerType.SINGLE:
          return 1;
        case PickerType.MULTIPLE:
          return props.columns.length;
        case PickerType.CASCADER:
          let index = 1;
          let item: Column | undefined = props.columns[0] as Column;
          while ((item = item.children?.[0])) {
            index++;
          }
          return index;
      }
    });

    const currentIndexes = ref<number[]>(new Array(deep.value).fill(0));

    function initCurrentIndexes() {
      switch (type.value) {
        case PickerType.SINGLE:
          currentIndexes.value[0] = props.defaultIndex;
          break;
        case PickerType.MULTIPLE:
          props.columns.forEach((item, index) => {
            currentIndexes.value[index] = (item as any).defaultIndex;
          });
          break;
        case PickerType.CASCADER:
          let columns: Column[] = props.columns as Column[],
            index = 0;
          while (columns) {
            let flag = false;
            for (let i = 0; i < columns.length; i++) {
              if (columns[i].active) {
                columns = columns[i].children!;
                currentIndexes.value[index] = i;
                flag = true;
                break;
              }
            }
            if (!flag) {
              break;
            }
          }
          break;
      }
    }

    const normaliseColumns = computed<
      Array<{
        values: Array<string | number>;
        defaultIndex: number;
      }>
    >(() => {
      switch (type.value) {
        case PickerType.SINGLE:
          return [
            {
              values: props.columns as Array<string | number>,
              defaultIndex: props.defaultIndex,
            },
          ];
        case PickerType.MULTIPLE:
          return props.columns as Array<{
            values: Array<string | number>;
            defaultIndex: number;
          }>;
        case PickerType.CASCADER:
          const res = [];
          let columns = props.columns as Array<Column>,
            idx = 0;
          while (columns) {
            res.push({
              values: columns.map((c) => c.text),
              defaultIndex: currentIndexes.value[idx],
            });
            columns = columns[currentIndexes.value[idx]]?.children!;
            idx++;
          }
          return res;
      }
    });
    // 初始化下标
    initCurrentIndexes();

    // 选项高度
    const itemRealHeight = computed(() => {
      return Math.round(realSize(props.itemHeight));
    });

    watch(
      () => props.defaultIndex,
      () => {
        if (type.value === PickerType.SINGLE) {
          initCurrentIndexes();
        }
      }
    );
    watch(
      () => props.columns,
      () => {
        if (type.value !== PickerType.SINGLE) {
          initCurrentIndexes();
        }
      }
    );
    // render
    const baseClass = "mo-picker";

    function emitEvent(type: "cancel" | "confirm" | "change") {
      const values =
        currentIndexes.value.length === 1
          ? currentIndexes.value[0]
          : currentIndexes.value.slice();
      emit(type, values);
    }

    // 标题栏
    function renderToolbar() {
      return props.toolbar
        ? h(
            "div",
            {
              class: baseClass + "__toolbar",
            },
            [
              h(
                "a",
                {
                  href: "javascript:void(0);",
                  class: [
                    baseClass + "__toolbar-button",
                    baseClass + "__toolbar-button-cancel",
                  ],
                  onClick: () => {
                    emitEvent("cancel");
                  },
                },
                props.toolbar.cancelText || "取消"
              ),
              h(
                "h3",
                {
                  href: "javascript:void(0);",
                  class: baseClass + "__toolbar-title",
                },
                props.toolbar.title
              ),
              h(
                "a",
                {
                  href: "javascript:void(0);",
                  class: [
                    baseClass + "__toolbar-button",
                    baseClass + "__toolbar-button-confirm",
                  ],
                  onClick: () => {
                    emitEvent("confirm");
                  },
                },
                props.toolbar.cancelText || "确定"
              ),
            ]
          )
        : null;
    }

    // 选项表
    function renderPickerList() {
      return normaliseColumns.value.map((column, index) => {
        return h(PickerList, {
          columns: column.values,
          currentIndex: currentIndexes.value[index],
          itemHeight: itemRealHeight.value,
          visibleCount: props.visibleCount,
          inertialDuration: props.inertialDuration,
          "onUpdate:currentIndex": (idx: number) => {
            currentIndexes.value[index] = idx;
            if (type.value === PickerType.CASCADER) {
              for (let i = index + 1; i < currentIndexes.value.length; i++) {
                currentIndexes.value[i] = 0;
              }
            }
          },
          onChange: () => {
            emitEvent("change");
          },
        });
      });
    }

    return () => {
      return h(
        "div",
        {
          class: baseClass,
          ...attrs,
        },
        [
          renderToolbar(),
          h(
            "div",
            {
              class: baseClass + "__content",
            },
            renderPickerList()
          ),
        ]
      );
    };
  },
});
