<template>
  <div id="app">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <transition>
      <router-view @changeBreadText="changeBreadText"></router-view>
    </transition>
    <nav-footer></nav-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBread from "@/components/NavBread.vue";

@Component({
  components: {
    NavHeader,
    NavFooter,
    NavBread
  }
})
export default class Cart extends Vue {
  public breadText: string = "";

  public changeBreadText(text: string): void {
    this.breadText = text;
  }
}
</script>

// <style lang="scss" scoped>
// .v-enter,
// .v-leave-to {
//   position: absolute;
//   opacity: 0;
// }
// .v-enter-active,
// .v-leave-active {
//   transition: opacity 0.3s;
// }
//
</style>
