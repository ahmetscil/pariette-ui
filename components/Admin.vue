<template>
  <div class="asc__su-iframe">
    <iframe ref="iframe" class="asc__su-iframe-box" :src="src" @load="onIframeLoaded" />
    <div id="__layout" />
  </div>
</template>
<script>
export default {
  transition: 'pageAnimate',
  data () {
    return {
      src: 'http://localhost:8080/Auth/Login'
    }
  },
  destroyed () {
    document.body.style.overflow = 'scroll'
  },
  methods: {
    onIframeLoaded () {
      document.body.style.overflow = 'hidden'
    }
  }
}
</script>
<style lang="sass">
  .asc__su-iframe
    .asc__su-iframe-box
      border: none
      width: 90vw
      height: calc(90vh - 60px)
      background: #fff
</style>
