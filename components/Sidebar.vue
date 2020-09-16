<template>
  <div class="asc__su-Sidebar">
    <b-row>
      <b-col cols="12">
        sidebar
      </b-col>
      <b-col cols="12">
        sidebar
      </b-col>
      <b-col cols="12">
        sidebar
      </b-col>
      <b-col cols="12">
        sidebar
      </b-col>
    </b-row>
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
    }
  },
  computed: mapState(['cdnImgUrl'])
}
</script>
<style lang="sass">
</style>
