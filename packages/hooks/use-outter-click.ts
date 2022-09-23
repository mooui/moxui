import { onBeforeUnmount, onMounted, type Ref } from "vue";
import { isDescendant } from "@moxui/utils/dom";

function useOutterClick(
  root: Ref<HTMLElement | undefined | null>,
  handler: () => void
) {
  const documentClickHandler = (ev: MouseEvent) => {
    if (root.value) {
      if (!isDescendant(root.value, ev.target as Element)) {
        handler();
      }
    }
  };

  onMounted(() => {
    document.addEventListener("click", documentClickHandler);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("click", documentClickHandler);
  });
}

export { useOutterClick };
