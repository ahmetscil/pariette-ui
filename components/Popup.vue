<template>
  <div class="asc__su-popup" @click="closePopup()">
    <div class="asc__su-popup-body">
      <div class="asc__su-popup-close" @click="closePopup()">
        <i class="fas fa-times-circle" />
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['cdnImgUrl']),
  methods: {
    closePopup () {
      this.$store.commit('popup', false)
    }
  }
}
</script>
<style lang="sass">
  .asc__su-popup
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 999999
    background: rgba(0,0,0,0.7)
    color: #fff
    cursor: pointer
    .asc__su-popup-body
      position: relative
      box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.75)
      top: 0
      left: 0
      right: 0
      margin: 10% auto
      margin-top: 10vh
      margin-left: auto
      margin-bottom: 10%
      margin-right: auto
      width: 50%
      cursor: default
      @media (max-width: 980px)
        margin-top: 20vh
        width: 70%
      @media (max-width: 660px)
        margin-top: 20vh
        width: 80%
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
    .asc__su-popup-fullbanner
      width: 100%
    .asc__su-popup-close
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
