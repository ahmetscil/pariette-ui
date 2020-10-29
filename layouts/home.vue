<template>
  <div id="app">
    <ParietteBar />
    <Header />
    <div class="asc__su-fixed-right">
      <div class="asc__su-fixed-right-text">
        <nuxt-link :to="{name: 'url', params: { url: 'fiyat-listesi'}}">
          {{ $t('form.contactForm') }}
        </nuxt-link>
      </div>
      <div class="asc__su-fixed-right-img">
        <a target="_blank" href="https://wa.me/+905415966667">
          <img src="../static/whatsapp.svg">
        </a>
      </div>
      <div class="asc__su-fixed-right-img">
        <a target="_blank" href="https://instagram.com/istasyonyurtlari">
          <img src="../static/instagram.svg">
        </a>
      </div>
    </div>
    <div class="asc__su-home__start">
      <nuxt />
    </div>
    <Footer />
    <Modal v-if="modalShow">
      <!-- <Admin /> -->
      <Login />
    </Modal>
    <Popup v-if="popupShow">
      <img class="asc__su-popup-fullbanner" src="~/static/esenyurt.png">
    </Popup>
    <div v-if="errorState">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Login from '@/components/Login'
import Modal from '@/components/Modal'
import Popup from '@/components/Popup'
import ParietteBar from '@/components/ParietteBar'
export default {
  components: {
    Header,
    Footer,
    Login,
    Modal,
    Popup,
    ParietteBar
  },
  computed: mapState(['modalShow', 'popupShow', 'errorState', 'errorMessage'])
}
</script>
<style lang="sass">
  .asc__su-home__start
    min-height: 100vh
    padding-top: 150px
</style>
