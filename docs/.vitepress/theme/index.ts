import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue';
import "./custom.scss";

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: MyLayout
}
