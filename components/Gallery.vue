<template>
  <div class="asc__su-Lightbox">
    <div class="asc__su-Lightbox-filters">
      <b-button
        v-for="(f, i) in filters"
        :key="i"
        class="asc__su-Lightbox-filters-btn"
        variant="default"
        @click="updateFilter(f.filter)"
      >
        {{ f.label }}
      </b-button>
    </div>
    <transition-group name="thumbnailfade" tag="div" class="asc__su-Lightbox-gallery">
      <div
        v-for="thumb in filteredImages"
        :key="thumb.id"
        :title="thumb.alt"
        :alt="thumb.alt"
        class="asc__su-Lightbox-gallery-img"
        @click="showLightbox(thumb.name)"
      >
        <img
          :src="cdnImgUrl + thumb.name"
        >
      </div>
    </transition-group>

    <lightbox
      id="mylightbox"
      ref="lightbox"
      :images="filteredImages"
      :directory="cdnImgUrl"
      :filter="galleryFilter"
      :timeout-duration="5000"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    gallery: {
      type: Array,
      default: null
    },
    filters: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      galleryFilter: ''
    }
  },
  computed: {
    filteredImages () {
      if (this.galleryFilter === '') {
        return this.gallery
      } else {
        return this.gallery.filter(image => image.filter === this.galleryFilter)
      }
    },
    ...mapState(['cdnImgUrl', 'settings'])
  },
  methods: {
    showLightbox (imageName) {
      this.$refs.lightbox.show(imageName)
    },
    updateFilter (filterName) {
      this.galleryFilter = filterName
    }
  }
}
</script>
<style lang="sass">
  .thumbnailfade-enter-active,
  .thumbnailfade-leave-active
    transition: opacity .1s
  .thumbnailfade-enter,
  .thumbnailfade-leave-active
    transition: opacity .1s
  .asc__su-Lightbox
    position: relative
    margin-top: 100px
    .asc__su-Lightbox-filters
      padding: 5px 10px
      width: 100%
      text-align: center
      .asc__su-Lightbox-filters-btn
        background: transparent
        border: 1px #000 dashed
        border-radius: 0px
        padding-right: 20px
        padding-left: 20px
        margin-right: 15px
        &:hover
          transition: .3s
          background: #000
          color: #fff
        &:focus
          background: #000
          color: #fff
          transition: .3s
      @media (max-width: 1440px)
        .asc__su-Lightbox-filters-btn
          padding-right: 10px
          padding-left: 10px
          margin-left: 5px
          margin-right: 5px
      @media (max-width: 990px)
        text-align: left
        .asc__su-Lightbox-filters-btn
          padding-right: 10px
          padding-left: 10px
          margin-left: 5px
          margin-right: 5px
          margin-bottom: 10px
    .asc__su-Lightbox-gallery
      position: relative
      display: block
      .asc__su-Lightbox-gallery-img
        cursor: pointer
        width: calc((100% / 5) - 10px)
        float: left
        margin: 5px
        height: 120px
        overflow: hidden
        & img
          width: 90%
          margin: 5%
          transition: .2s
          opacity: .8
          background: #000
        &:hover
          & img
            width: 100%
            transition: .2s
            opacity: 1
            background: #000
            margin: 0
        @media (max-width: 768px)
          width: calc((100% / 2) - 10px)

</style>
