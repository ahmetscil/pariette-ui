<template>
  <div class="asc__su-DataBox">
    <template v-if="!showAdmin">
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
    <template v-else>
      <iLovePariette />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
import ContentBox from '@/components/ContentBox'
import Carousel from '@/components/Carousel'
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
  computed: mapState(['layout', 'pariette', 'token', 'showAdmin']),
  mounted () {
    if (this.$route.params.url === 'canvas') {
      this.$store.commit('PARIETTE', true)
    } else {
      this.$store.commit('PARIETTE', false)
      this.asyncData(1)
    }
  },
  methods: {
    async asyncData (status) {
      const carouselDesktopData = await axios.get(`${this.pariette}${this.token}/carousel?display=web&slug=${this.$route.params.url}`)
      const carouselMobileData = await axios.get(`${this.pariette}${this.token}/carousel?display=mobile&slug=${this.$route.params.url}`)
      this.desktopSliders = carouselDesktopData.data
      this.mobileSliders = carouselMobileData.data

      const canvasData = await axios.get(`${this.pariette}${this.token}/canvas?url=${this.$route.params.url}&status=${status}`)
      if (canvasData.data.length >= 1) {
        this.canvas = canvasData.data
        this.getLayout(this.canvas[0].type)
        this.pageTitle = this.canvas[0].title
      } else {
        this.$router.push({ name: 'index' })
      }
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
