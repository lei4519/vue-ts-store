<template>
    <div>
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">Home</a>
                    <span>{{ breadText }}</span>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component
  export default class NavBread extends Vue {
    @Prop() public breadText!: string
  }
</script>
