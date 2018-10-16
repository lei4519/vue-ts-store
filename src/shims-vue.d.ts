declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-infinite-scroll' {
  interface Vue {
    infiniteScroll: any;
  }
}
