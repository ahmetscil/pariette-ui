<template>
  <div :class="layout.content" class="asc__su-DataBox">
    <div v-for="(table, homeindexParent) in getdata" :key="'home-parent-' + homeindexParent">
      <div v-for="(row, homeindexSub) in table.content" :key="'home-sub-' + homeindexSub">
        <div v-if="row.lang === settings.lang" v-html="row.content" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  props: {
    getdata: {
      type: Array,
      default: null
    },
    getlayout: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: mapState(['cdnImgUrl', 'settings', 'layout']),
  head () {
    return {
      title: this.settings.title,
      titleTemplate: '%s | ' + this.settings.desc,
      meta: [
        { hid: 'description', name: 'description', content: this.settings.desc },
        { hid: 'keywords', name: 'keywords', content: this.settings.keywords },
        {
          property: 'og:title',
          content: this.settings.title,
          template: chunk => `${chunk} | ${this.settings.desc}`,
          vmid: 'og:title'
        }, {
          property: 'og:description',
          content: this.settings.desc
        }, {
          property: 'og:image',
          content: this.settings.url + this.settings.logo
        }, {
          property: 'og:url',
          content: this.settings.url
        }
      ]
    }
  }
}
</script>
<style lang="sass">
</style>
