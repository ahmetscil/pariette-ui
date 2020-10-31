<template>
  <div class="asc__su-admin-modal-login">
    <div class="asc__modal-body">
      <div class="asc__modal-close" @click="closeModal()">
        <i class="fas fa-times-circle" />
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    closeModal () {
      this.$store.commit('modal', false)
    }
  }
}
</script>
<style lang="sass">
  .asc__su-admin-modal-login
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 999999
    background: rgba(0,0,0,0.9)
    color: #fff
    .asc__modal-body
      position: relative
      top: 0
      left: 0
      right: 0
      margin: 10% auto
      max-width: 520px
      .asc__modal-close
        position: absolute
        top: -22px
        right: -22px
        width: 19px
        height: 19px
        text-align: center
        background: #fff
        border-radius: 50%
        color: #000
        font-size: 20px
        line-height: 20px
        cursor: pointer
</style>
