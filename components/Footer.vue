<template>
  <div class="ahm__footer">
    <b-container>
      <b-row>
        <b-col cols="12" md="3" class="asc__su-footer-stations">
          <p>
            <i class="fas fa-map-marker-alt" />
            <nuxt-link :to="{name: 'url', params: {url: 'istasyon-yurtlari-esenyurt'}}">
              İstasyon Esenyurt
            </nuxt-link>
          </p>
          <p>
            <i class="fas fa-map-marker-alt" />
            <nuxt-link :to="{name: 'url', params: {url: 'istasyon-yurtlari-merter'}}">
              İstasyon Merter
            </nuxt-link>
          </p>
          <p>
            <i class="fas fa-map-marker-alt" />
            <nuxt-link :to="{name: 'url', params: {url: 'istasyon-yurtlari-sisli'}}">
              İstasyon Şişli
            </nuxt-link>
          </p>
        </b-col>
        <b-col cols="12" md="6" class="asc__su-footer-logo">
          <nuxt-link :to="{name: 'index'}">
            <img class="asc__su-footer-show-footerDark" src="../static/logo-black.svg" :alt="settings.title" :title="settings.title">
          </nuxt-link>
        </b-col>
        <b-col cols="12" md="3" class="asc__su-footer-links">
          <p>
            <i class="fas fa-envelope" /> <a :href="'mailto:' + settings.email">{{ settings.email }}</a>
          </p>
          <p>
            <i class="fas fa-phone-alt" /> <a :href="'tel:' + settings.tel1">{{ settings.tel1Title }}</a>
          </p>
          <p>
            <i class="fas fa-phone-alt" /> <a :href="'tel:' + settings.tel2">{{ settings.tel2Title }}</a>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['settings', 'navigationFooter']),
  mounted () {
    this.$store.dispatch('getFooter')
  },
  methods: {
  }
}
</script>
<style lang="sass">
  .ahm__footer
    width: 100%
    position: relative
    background: linear-gradient(45deg, #000, #333)
    font-size: 12px
    z-index: 9
    padding: 30px 0 40px 0
    color: #f2f2f2
    @media (max-width: 667px)
      padding: 30px 0 100px 0
    .asc__su-footer-stations
      text-align: left
      margin-bottom: 0px
      margin-top: 20px
      @media (max-width: 667px)
        text-align: center
        margin-bottom: 50px
      & p
        font-size: 14px
        padding: 0px
        margin: 0px 0px 10px 0px
        & a
          color: #fff
    .asc__su-footer-links
      text-align: right
      margin-top: 20px
      @media (max-width: 667px)
        text-align: center
      & p
        font-size: 14px
        padding: 0px
        margin: 0px 0px 10px 0px
        & a
          color: #fff
    .asc__su-footer-logo
      text-align: center
      .asc__su-footer-show-footerDark
      & a
        text-align: center
        width: 110px
        height: 110px
        border-radius: 110px
        background: #fff
        display: inline-block
        & img
          margin-top: 5px
          height: 100px
</style>
