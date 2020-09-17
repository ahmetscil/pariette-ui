<template>
  <div class="asc__su-DataBox">
    <Carousel :admin="authUser" :getdata="desktopSliders" :where="'home'" class="d-none d-md-block" />
    <Carousel :admin="authUser" :getdata="mobileSliders" :where="'home'" class="d-block d-md-none" />
    <div :class="layout.content">
      <b-row>
        <b-col v-if="layout.sidebar === 'left'" cols="12" lg="4">
          <Sidebar :admin="authUser" :getdata="sliders" />
          <Sidebar :admin="authUser" :getdata="sliders" />
        </b-col>
        <b-col cols="12" :lg="layout.sidebar === 'none' ? 12 : 8">
          <HomeBox :admin="authUser" :getdata="canvas" />
        </b-col>
        <b-col v-if="layout.sidebar === 'right'" cols="12" lg="4">
          <Sidebar :admin="authUser" :getdata="canvas" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
import Carousel from '@/components/Carousel'
import HomeBox from '@/components/HomeBox'
import Sidebar from '@/components/Sidebar'
export default {
  transition: 'pageAnimate',
  layout: 'home',
  components: {
    Carousel,
    HomeBox,
    Sidebar
  },
  data () {
    return {
      info: [],
      canvas: [],
      desktopSliders: [],
      mobileSliders: [],
      routeparam: null
    }
  },
  computed: mapState(['cdnImgUrl', 'settings', 'layout', 'pariette', 'token', 'authUser']),
  mounted () {
    this.getLayout()
    this.asyncData()
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.$store.commit('CONTROL_USER')
  },
  methods: {
    async asyncData () {
      const canvasData = await axios.get(`${this.pariette}${this.token}/canvas?url=home-canvas-1`)
      const carouselDesktopData = await axios.get(`${this.pariette}${this.token}/carousel?display=web&slug=homepage`)
      const carouselMobileData = await axios.get(`${this.pariette}${this.token}/carousel?display=mobile&slug=homepage`)
      this.canvas = canvasData.data.data
      this.desktopSliders = carouselDesktopData.data
      this.mobileSliders = carouselMobileData.data
    },
    getLayout () {
      this.$store.dispatch('getLayout', {
        where: 'home'
      })
    }
  }
}
</script>
<style lang="sass">
</style>
