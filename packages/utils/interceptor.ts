import { isPromise } from "./validate";

export type Interceptor = (
  ...args: any[]
) => Promise<boolean | undefined> | boolean | undefined | void;

// 明确return false 才拦截
export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
  }: {
    args?: unknown[];
    done: () => void;
    canceled?: () => void;
  }
) {
  if (interceptor) {
    const returnVal = interceptor.apply(null, args);

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (typeof value !== "boolean" || value) {
            done();
          } else if (canceled) {
            canceled();
          }
        })
        .catch(() => {});
    } else if (typeof returnVal !== "boolean" || returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}
