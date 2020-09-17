<template>
  <div class="asc__su-DataBox">
    <b-container>
      <b-row>
        <b-col v-if="!authUser" cols="6">
          <Login />
        </b-col>
        <b-col v-else cols="6">
          adminsel olaylar
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Login from '@/components/Login'
export default {
  components: {
    Login
  },
  layout: 'admin',
  computed: {
    ...mapState(['authUser'])
  },
  mounted () {
    this.$store.commit('CONTROL_USER')
  }
}
</script>
<style lang="sass">
</style>
