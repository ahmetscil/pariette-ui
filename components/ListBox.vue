<template>
  <div class="asc__su-ListBox">
    <b-row>
      <b-col v-for="(table, i) in getdata" :key="i" cols="12">
        <nuxt-link :to="{ name: 'url', params: { url: table.slug } }" style="margin-bottom: 30px; border: 1px #000 solid; display: block">
          <h2 v-if="table.type === 'content'">
            {{ table.title }}
          </h2>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    getdata: {
      type: Array,
      default: null
    }
  }
}
</script>
<style lang="sass">
</style>
