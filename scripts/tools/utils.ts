// 大驼峰
function camelCase(str: string) {
  return str.replace(/(^[a-z])|((_|-)[a-z])/g, (s) =>
    s.slice(-1).toUpperCase()
  );
}

// 小驼峰
function smallCamelCase(str: string) {
  return str
    .replace(/(_|-)[a-z]/g, (s) => s.slice(-1).toUpperCase())
    .replace(/^[A-Z]/, (s) => s.toLowerCase());
}

// 下划线
function underScoreCase(str: string) {
  return smallCamelCase(str).replace(/[A-Z]/, (s) => `_${s.toLowerCase()}`);
}

// 短横线
function kebabCase(str: string) {
  return smallCamelCase(str).replace(/[A-Z]/, (s) => `-${s.toLowerCase()}`);
}
export { camelCase, smallCamelCase, underScoreCase, kebabCase };
