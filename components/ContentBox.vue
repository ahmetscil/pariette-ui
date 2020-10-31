<template>
  <div class="asc__su-ContentBox">
    <b-row v-for="(table, i) in getdata" :key="i">
      <b-col v-for="(row, x) in table.content.filter(l => l.lang === settings.lang)" :key="'cnt' + x" cols="12" :md="table.type === 'contentWithForm' ? '8' : '12'">
        <div v-html="row.content" />
        <MapBox v-if="row.map" :getdata="table.content.filter(l => l.lang === settings.lang)" />
        <Gallery v-if="row.gallery" :gallery="row.gallery ? JSON.parse(row.gallery) : null" :filters="row.filter ? JSON.parse(row.filter) : null" />
      </b-col>
      <b-col v-if="table.type === 'contentWithForm'" cols="12" md="4">
        <MailForm v-if="table.type === 'contentWithForm'" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MailForm from './MailForm'
import MapBox from './MapBox'
import Gallery from './Gallery'
export default {
  components: {
    MailForm,
    Gallery,
    MapBox
  },
  props: {
    getdata: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: mapState(['settings'])
}
</script>
<style lang="sass">
  .asc__su-ContentBox
    padding-top: 100px
    @media (max-width: 667px)
      padding-top: 150px
  .asc__su-iconbox
    color: #353535
    text-align: center
    transition: .3s
    height: 220px
    border: 1px transparent solid
    & i
      width: 50%
    & h3
      font-size: 20px
      height: 50px
      vertical-align: middle
    & p
      font-size: 14px
    &:hover
      border: 1px #ffffff dashed
      transition: .1s
      color: #ffffff
      background: #000000
  .asc__su-pageWithImages
    .asc__su-pageWithImages-img
      border-radius: 5px
      box-shadow: 0 0 100px #00000070
      overflow: hidden
      transform: skewX(-4deg)
      transition: .3s
      &:hover
        transition: .3s
        transform: skewX(0deg)
      & img
        width: 100%
    .row
      margin-bottom: 10rem
      @media (max-width: 990px)
        margin-bottom: 5rem
    .asc__su-pageWithImages-text
      padding-top: 2.5rem
      @media (max-width: 1440px)
        padding-top: 0
      @media (max-width: 990px)
        padding-top: 2.5rem
      & h3
        color: #000
        font-size: 2em
        letter-spacing: -1px
        font-weight: 900
        font-style: italic
        font-family: 'Raleway', sans-serif
  .asc__su-pageSimple
    .asc__su-pageSimple-text
      & h3
        color: #000
        font-size: 2em
        letter-spacing: -1px
        font-weight: 900
        font-style: italic
        font-family: 'Raleway', sans-serif
</style>
