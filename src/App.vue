<template>
  <div id="app">
    <nav-header></nav-header>
    <nav-bread :breadText="breadText"></nav-bread>
    <router-view @changeBreadText="changeBreadText"></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'

  @Component({
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  })
  export default class Cart extends Vue {
    public breadText: string = ''
    public changeBreadText(text: string): void {
      this.breadText = text
    }
  }
</script>
