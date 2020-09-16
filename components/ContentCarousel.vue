<template>
  <div v-if="layout.headerW != 'none'" class="asc__su-carousel">
    <no-ssr>
      <carousel
        v-for="(table, i) in getdata"
        :key="i"
        :autoplay="true"
        :nav="false"
        :dots="true"
        :loop="true"
        :nav-text="[',']"
        :items="1"
        :rewind="true"
        :autoplay-hover-pause="true"
        @translate="sliderTranslate"
        @translated="sliderTranslated"
      >
        <div v-for="(row, x) in table.content.filter(l => l.lang == settings.lang)" :key="'i' + x" class="asc__su-carousel-slider">
          <div
            :class="layout.headerW + ' ' + layout.headerH"
            class="asc__su-carousel-slider-item"
            :style="{ backgroundImage: row.cover == 'nocontentphoto.jpg' ? 'url(' + cdnImgUrl + 'vtNoContentPhoto.jpg)': 'url(' + cdnImgUrl + row.cover + ')' }"
          >
            <div class="asc__su-carousel-slider-background">
              <div :class="sliderAnimation">
                <h1>
                  {{ row.title }}
                </h1>
                <div class="clearfix" />
              </div>
            </div>
          </div>
        </div>
      </carousel>
    </no-ssr>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    getdata: {
      type: Array,
      default: null
    },
    where: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sliderAnimation: 'asc__su-carousel-slider-animation asc__su-carousel-slider-animation-up'
    }
  },
  computed: mapState(['settings', 'cdnImgUrl', 'layout']),
  methods: {
    sliderTranslate () {
      this.sliderAnimation = 'asc__su-carousel-slider-animation'
    },
    sliderTranslated () {
      this.sliderAnimation = 'asc__su-carousel-slider-animation asc__su-carousel-slider-animation-up'
    }
  }
}
</script>
<style lang="sass">
  .asc__su-carousel
    position: relative
    overflow: hidden
    .asc__su-carousel-slider-animation
      position: relative
      margin-top: 250px
    .asc__su-carousel-slider-animation-up
      margin-top: 0px
      transition: 0.3s
    .asc__su-carousel-slider
      width: 100%
      background: #000
      & a
        display: block
      .asc__su-carousel-slider-item
        background-repeat: no-repeat
        background-size: cover
        background-position: top left
        opacity: 0.9
        transition: 0.3s
        width: 100%
        overflow: hidden
        position: relative
      .asc__su-carousel-slider-background
        background: linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0))
        position: absolute
        bottom: 0px
        left: 0px
        width: 100%
        height: 200px
        padding: 30px 0 0 30px
        overflow: hidden
        & h1
          font-size: 24px
          width: 70%
          color: #fff
          text-shadow: 0 0 5px #000
          font-weight: 700
          font-family: 'Tahoma', sans-serif
        & p
          width: 70%
          color: #fff
          font-weight: 300
          text-shadow: 0 0 5px #000
          font-family: 'Montserrat', sans-serif
      &:hover
        transition: 0.3s
        opacity: 1
      @media (max-width: 667px)
        height: 300px
        .asc__su-carousel-slider-background
          top: 220px
          height: 80px
          padding: 0px 5px 0 5px
          & h1
            width: 100%
            font-size: 18px
          & p
            display: none

</style>
