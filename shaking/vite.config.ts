import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      moxui: resolve(__dirname, "../dist/moxui/es/index"),
    },
  },
  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari13"],
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载
          vue: ["vue"],
          moxui: ["moxui"],
        },
      },
    },
  },
});
