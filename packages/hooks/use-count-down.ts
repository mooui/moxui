import { onActivated, onBeforeUnmount, onDeactivated, reactive } from "vue";

type EventType = "update" | "end";
/**
 * 倒计时  亦可用作定时更新
 * 如 useCountDown(Infinity,5,true).on('update',fn) 每5秒执行1次 fn
 * @param time number 秒值
 * @param interval number(1)  倒计时更新间隔 - 秒值, 如 1 - 每秒更新 60 - 每分更新
 * @param autoStart boolean(false) 自动开始
 * @param rounded boolean(true)  是否取整, 如 interval = 5, 逢 5 10 15 ... 更新
 */
function useCountDown(
  time: number = 0,
  interval: number = 1,
  autoStart: boolean = false,
  rounded: boolean = true
) {
  const current = reactive({
    total: 0,
    days: 0,
    hours: 0,
    totalHours: 0,
    minutes: 0,
    seconds: 0,
  });
  let isCounting = false;
  let shouldRestart = false;
  let countTimer: ReturnType<typeof setTimeout>;
  const callbacks: Map<EventType, Set<() => void>> = new Map();

  function on(type: EventType, callback: () => void) {
    let cbs = callbacks.get(type);
    if (!cbs) {
      callbacks.set(type, (cbs = new Set()));
    }
    cbs.add(callback);
  }
  function off(type: EventType, callback: () => void): void;
  function off(callback: () => void): void;
  function off(type: EventType): void;
  function off(): void;
  function off(a?: any, b?: any): void {
    if (typeof a === "undefined") {
      stop();
      callbacks.clear();
    } else if (typeof a === "function") {
      callbacks.forEach((cbs) => {
        cbs.delete(a);
      });
    } else {
      const cbs = callbacks.get(a);
      if (cbs) {
        if (b) {
          cbs.delete(b);
        } else {
          cbs.clear();
        }
      }
    }
  }
  function trigger(type: EventType) {
    const cbs = callbacks.get(type);
    if (cbs) {
      cbs.forEach((cb) => cb());
    }
  }
  // 记录和本地时间戳差值  防止setTimeout不准
  let dateDiff: number = 0;
  function initCurrent(time: number, init: boolean = false) {
    if (time === Infinity) {
      current.total = time;
      return;
    }
    if (init) {
      dateDiff = time + Math.round(Date.now() / 1000);
    } else {
      time = Math.max(dateDiff - Math.round(Date.now() / 1000), 0);
    }
    current.total = time;
    current.days = Math.floor(time / (24 * 60 * 60));
    current.totalHours = Math.floor(time / (60 * 60));
    time %= 24 * 60 * 60;
    current.hours = Math.floor(time / (60 * 60));
    time %= 60 * 60;
    current.minutes = Math.floor(time / 60);
    current.seconds = time % 60;
  }

  function start() {
    countTimer && clearTimeout(countTimer);
    initCurrent(current.total, true);
    if (current.total > 0) {
      isCounting = true;
      shouldRestart = false;
      countDown();
    } else {
      trigger("end");
    }
  }
  function countDown() {
    countTimer && clearTimeout(countTimer);
    const intv = rounded ? current.total % interval || interval : interval;
    countTimer = setTimeout(() => {
      trigger("update");
      if (current.total !== Infinity) {
        if (current.seconds >= intv) {
          current.total -= intv;
          current.seconds -= intv;
        } else {
          initCurrent(current.total - intv);
        }
      }
      if (current.total > 0) {
        countDown();
      } else {
        isCounting = false;
        trigger("end");
      }
    }, intv * 1000);
  }
  function stop() {
    countTimer && clearTimeout(countTimer);
    isCounting = false;
  }

  function reset(time: number = 0, startCount: boolean = true, intv?: number) {
    countTimer && clearTimeout(countTimer);
    if (intv) interval = intv;
    initCurrent(time, true);
    if (startCount) {
      start();
    }
  }

  initCurrent(time, true);
  if (autoStart) {
    start();
  }

  onActivated(() => {
    if (shouldRestart) {
      start();
    }
  });
  onDeactivated(() => {
    if (isCounting) {
      shouldRestart = true;
      stop();
    }
  });
  onBeforeUnmount(() => {
    off();
  });
  return {
    current,
    start,
    stop,
    reset,
    on,
    off,
  };
}

export { useCountDown };
