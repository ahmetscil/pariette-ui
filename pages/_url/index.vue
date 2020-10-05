<template>
  <div class="asc__su-DataBox">
    <template v-if="showAdmin">
      <iLovePariette />
    </template>
    <template v-else>
      <Carousel
        v-if="layout.headerW != 'd-none'"
        :getdata="desktopSliders"
        :pagetitle="canvas"
        :showtitle="false"
        :where="'content'"
        class="d-none d-md-block"
      />
      <Carousel
        v-if="layout.headerW != 'd-none'"
        :getdata="mobileSliders"
        :pagetitle="canvas"
        :showtitle="false"
        :where="'content'"
        class="d-block d-md-none"
      />
      <div :class="layout.content">
        {{ layout }}
        <b-row>
          <b-col v-if="layout.sidebar === 'left'" cols="12" lg="4">
            <Sidebar :getdata="canvas" />
          </b-col>
          <b-col cols="12" :lg="layout.sidebar === 'none' ? 12 : 8">
            <ContentBox :getdata="canvas" />
          </b-col>
          <b-col v-if="layout.sidebar === 'right'" cols="12" lg="4">
            <Sidebar :getdata="canvas" />
          </b-col>
        </b-row>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
import Carousel from '@/components/Carousel'
import ContentBox from '@/components/ContentBox'
import Sidebar from '@/components/Sidebar'
import iLovePariette from '@/components/iLovePariette'
export default {
  transition: 'pageAnimate',
  layout: 'default',
  components: {
    iLovePariette,
    Carousel,
    ContentBox,
    Sidebar
  },
  data () {
    return {
      info: [],
      canvas: [],
      sliders: [],
      desktopSliders: [],
      mobileSliders: [],
      routeparam: null,
      pageTitle: ''
    }
  },
  computed: mapState(['cdnImgUrl', 'settings', 'layout', 'pariette', 'token', 'showAdmin']),
  mounted () {
    if (this.$route.params.url === 'canvas') {
      this.$store.commit('PARIETTE', true)
    } else {
      this.$store.commit('PARIETTE', false)
      this.asyncData()
    }
  },
  methods: {
    async asyncData () {
      const carouselDesktopData = await axios.get(`${this.pariette}${this.token}/carousel?display=web&slug=${this.$route.params.url}`)
      const carouselMobileData = await axios.get(`${this.pariette}${this.token}/carousel?display=mobile&slug=${this.$route.params.url}`)
      const canvasData = await axios.get(`${this.pariette}${this.token}/canvas?url=${this.$route.params.url}`)
      if (canvasData.data.data.length >= 1) {
        this.canvas = canvasData.data.data
      } else {
        this.$router.push({ name: 'index' })
      }
      this.getLayout(canvasData.data.data[0].type)
      this.desktopSliders = carouselDesktopData.data
      this.mobileSliders = carouselMobileData.data
      this.pageTitle = canvasData.data.data[0].title
    },
    getLayout (e) {
      this.$store.dispatch('getLayout', {
        where: e
      })
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
<style lang="sass">
</style>
