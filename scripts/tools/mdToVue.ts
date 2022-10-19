import fs from "fs";

function mdToView(source: string, dist: string) {
  const name = dist.slice(dist.lastIndexOf("/") + 1, dist.lastIndexOf("."));
  const file = fs.readFileSync(source);
  let setupCode = "";
  const examples = [{ title: "xxx", code: "mmm" }];

  const code = `<template>
  <div class="header">
    <div class="header-content">
      <router-link to="./" class="back"></router-link>
      <h2 class="title">${name.toUpperCase()}</h2>
    </div>
  </div>
  <div class="p-${name}">
${examples.map((ex) => {
  return `    <section class="code-section">
      <h4 class="code-title">${ex.title}</h4>
      ${ex.code}
    </section>`;
}).join(`
`)}
  </div>
</template>
<script lang="ts" setup>
${setupCode}
</script>
`;
}

export {};
