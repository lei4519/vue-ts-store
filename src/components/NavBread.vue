<template>
    <div>
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">Home</a>
                    <slot name="bread"></slot>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class NavBread extends Vue {
  }
</script>
