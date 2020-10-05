<template>
  <div :class="layout.content" class="asc__su-DataBox">
    <template v-if="showAdmin">
      <iLovePariette />
    </template>
    <template v-else>
      <Breadcrumb :getdata="info" />
      <b-row>
        <b-col v-if="layout.sidebar === 'left'" cols="12" lg="4">
          <Sidebar :getdata="canvas" />
        </b-col>
        <b-col cols="12" :lg="layout.sidebar === 'none' ? 12 : 8">
          <ListBox :getdata="canvas" />
        </b-col>
        <b-col v-if="layout.sidebar === 'right'" cols="12" lg="4">
          <Sidebar :getdata="canvas" />
        </b-col>
      </b-row>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
import Breadcrumb from '@/components/Breadcrumb'
import ListBox from '@/components/ListBox'
import Sidebar from '@/components/Sidebar'
import iLovePariette from '@/components/iLovePariette'
export default {
  transition: 'pageAnimate',
  layout: 'default',
  components: {
    iLovePariette,
    Breadcrumb,
    ListBox,
    Sidebar
  },
  data () {
    return {
      info: [],
      canvas: [],
      sliders: [],
      routeparam: null
    }
  },
  computed: mapState(['cdnImgUrl', 'settings', 'layout', 'pariette', 'token', 'showAdmin']),
  mounted () {
    this.getLayout()
    this.asyncData()
  },
  methods: {
    async asyncData () {
      const canvasInfo = await axios.get(`${this.pariette}${this.token}/canvas?type=keyword&url=${this.$route.params.sub}`)
      const canvasData = await axios.get(`${this.pariette}${this.token}/canvas?key=${this.$route.params.sub}`)
      this.info = canvasInfo.data.data
      if (canvasData.data.data.length >= 1) {
        this.canvas = canvasData.data.data
      } else {
        this.$router.push({ name: 'index' })
      }
    },
    getLayout () {
      this.$store.dispatch('getLayout', {
        where: 'list'
      })
    }
  }
}
</script>
<style lang="sass">
</style>
