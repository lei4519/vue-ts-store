<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': mdShow}">
      <div class="md-modal-inner md-show">
        <div class="md-top">
          <slot name="title"></slot>
          <button class="md-close"  @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow"></div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

  @Component
  export default class Modal extends Vue {
    @Prop(Boolean) private mdShow!: boolean
    @Emit()
    private closeModal() {
      this.$emit('closeModal')
    }
  }
</script>

<style lang="scss" scoped>

</style>
