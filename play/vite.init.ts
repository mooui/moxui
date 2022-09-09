import shelljs from "shelljs";

const app = "src/App.vue";
const example = "app.example.vue";

if (!shelljs.test("-f", app)) {
  shelljs.cp("-f", example, app);
}
