function stopPropagation(e: Event) {
  e.stopPropagation();
}

function preventDefault(e: Event, isStopPropagation = false) {
  if (typeof e.cancelable !== "boolean" || e.cancelable) {
    e.preventDefault();
  }

  if (isStopPropagation) {
    e.stopPropagation();
  }
}

function getScrollParent(el: HTMLElement, root?: HTMLElement) {
  const overflowScrollReg = /scroll|auto|overlay/i;
  let node: any = el;
  while (
    node &&
    node !== root &&
    node !== document.body &&
    node !== document.documentElement
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}

function isDescendant(root: Element, ele: Element) {
  let node: Element | null = ele;
  while (node && node.nodeName !== "BODY") {
    if (node === root) return true;
    node = node.parentElement;
  }
  return false;
}

export { stopPropagation, preventDefault, getScrollParent, isDescendant };
