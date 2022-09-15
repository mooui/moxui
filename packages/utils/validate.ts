const isFunction = (val: unknown): val is Function => typeof val === "function";

const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);

const isDate = (val: unknown): val is Date =>
  Object.prototype.toString.call(val) === "[object Date]" &&
  !Number.isNaN((val as Date).getTime());

export { isObject, isFunction, isPromise, isDate };
