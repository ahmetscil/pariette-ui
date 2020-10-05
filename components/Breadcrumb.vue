<template>
  <ul class="asc__su-Breadcrumb">
    <li>
      <nuxt-link :to="{ name: 'index' }">
        home
      </nuxt-link>
    </li>
    <li v-for="(table, i) in getdata" :key="i">
      <div v-for="(row, x) in table.content" :key="'n' + x">
        <nuxt-link v-if="settings.lang === row.lang" :to="{ name: 'url-sub', params: { url: $route.params.url, sub: table.slug } }">
          {{ row.title }}
        </nuxt-link>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    getdata: {
      type: Array,
      default: null
    }
  },
  computed: mapState(['settings'])
}
</script>
<style lang="sass">
  .asc__su-Breadcrumb
    padding: 0
    list-style: none
    & li
      display: inline-block
      margin-right: 30px
</style>
