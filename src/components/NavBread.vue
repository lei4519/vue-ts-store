<template>
  <div>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <router-link to="/">Home</router-link>
          <span>{{ $store.state.breadText }}</span>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class NavBread extends Vue {}
</script>
