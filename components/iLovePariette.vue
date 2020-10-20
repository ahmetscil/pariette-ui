<template>
  <div class="iLovePariette">
    <div v-if="layout.headerW != 'none'" :class="layout.headerW + ' ' + layout.headerH" class="asc__su-carousel">
      <b-form-group :class="{ 'form-group--error': $v.form.title.$error }" class="iLovePariette-slider-fixedtext">
        <b-form-input
          v-model.trim="$v.form.title.$model"
          :placeholder="$t('form.titleHere')"
          type="text"
          @keyup="url_slug(form.title)"
        />
      </b-form-group>
      <div class="asc__su-carousel-slider">
        <div
          :class="layout.headerW + ' ' + layout.headerH"
          class="asc__su-carousel-slider-item"
          :style="{ backgroundImage: 'url(' + form.cover + ')' }"
        />
      </div>
    </div>
    <div :class="layout.content">
      <b-row class="mt-5">
        <b-col>
          <b-form-group :class="{ 'form-group--error': $v.form.content.$error }">
            <editor
              v-model.trim="$v.form.content.$model"
              class="iLovePariette-textarea"
              :placeholder="$t('form.contentHere')"
              api-key="ra1mj2b13m99vwp7i0yes9oa4ij0jmymbsrkp0esmg7b40zu"
              :inline="true"
              :init="tynmceOpt"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="iLovePariette-panel">
        <b-col cols="12" lg="9">
          <b-form-group :class="{ 'form-group--error': $v.form.keys.$error }">
            <b-form-tags
              v-model.trim="$v.form.keys.$model"
              v-b-tooltip.hover.left
              :title="$t('pariette.keyInfo')"
              placeholder="keys"
              separator=" ,;"
              remove-on-delete
              type="text"
              tag-variant="primary"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="3">
          <b-form-group :class="{ 'form-group--error': $v.form.slug.$error }">
            <b-form-input v-model.trim="$v.form.slug.$model" v-b-tooltip.hover.left placeholder="slug" type="text" :title="$t('pariette.slugInfo')" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="iLovePariette-panel">
        <b-col cols="2">
          <b-form-group :label="$t('form.contentLang')" :class="{ 'form-group--error': $v.form.lang.$error }">
            <b-form-select v-model.trim="$v.form.lang.$model" placeholder="lang" :options="options" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('form.contentOptions')">
            <b-form-checkbox v-model="form.hot" inline name="check-button" switch :class="{ 'form-group--error': $v.form.hot.$error }">
              hot
            </b-form-checkbox>
            <b-form-checkbox v-model="form.spot" inline name="check-button" switch :class="{ 'form-group--error': $v.form.spot.$error }">
              spot
            </b-form-checkbox>
            <b-form-checkbox v-model="form.slider" inline name="check-button" switch :class="{ 'form-group--error': $v.form.slider.$error }">
              slider
            </b-form-checkbox>
            <b-form-checkbox v-model="form.comment" inline name="check-button" switch :class="{ 'form-group--error': $v.form.comment.$error }">
              comment
            </b-form-checkbox>
            <b-form-checkbox v-model="form.api" inline name="check-button" switch :class="{ 'form-group--error': $v.form.api.$error }">
              api
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <!--<b-row>
        <b-col>
          <MapBox v-if="row.map" :getdata="table.content.filter(l => l.lang === settings.lang)" />
          <Gallery v-if="row.gallery" :gallery="row.gallery ? JSON.parse(row.gallery) : null" :filters="row.filter ? JSON.parse(row.filter) : null" />
        </b-col>
      </b-row>-->
      <b-row class="iLovePariette-panel">
        <b-col cols="12" lg="3">
          <b-tabs>
            <b-tab :title="$t('upload')">
              <dropzone
                id="dropzone"
                ref="uploadFile"
                :options="dropzoneOptions"
                @vdropzone-file-added="onFileAdded"
                @vdropzone-error="showError"
                @vdropzone-success="showSuccess"
                @vdropzone-complete="showComplete"
                @vdropzone-sending="sendingEvent"
              />
            </b-tab>
          </b-tabs>
        </b-col>
        <b-col cols="12" lg="9">
          <b-tabs>
            <!-- <b-tab :title="$t('upload')" :active="isUpload">
            </b-tab> -->
            <b-tab :title="$t('select')" :active="isSelect">
              <b-row class="iLovePariette-gallery-operation">
                <b-col v-for="(img,i) in galleryRows" :id="'cover'+i" :key="i" cols="3" class="iLovePariette-gallery-operation-list">
                  <figure>
                    <img :title="img.title" :src="cdnImgUrl + img.store + img.photo">
                    <div class="iLovePariette-gallery-operation-list-buttons">
                      <b-button v-b-tooltip.hover.right :title="$t('form.addGallery')" variant="warning" size="sm" @click="addGallery(img)">
                        <i class="far fa-images" />
                      </b-button>
                      <b-button v-b-tooltip.hover.right :title="$t('form.setCover')" variant="success" size="sm" @click="setCover(cdnImgUrl + img.store + img.photo,'cover'+i)">
                        <i class="far fa-image" />
                      </b-button>
                    </div>
                  </figure>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('gallery')">
              <b-row>
                <b-col v-for="(img,i) in galleryRows" :id="'cover'+i" :key="i" cols="3" class="iLovePariette-gallery-list">
                  <figure>
                    <img :title="img.title" :src="cdnImgUrl + img.store + img.photo" @click="setCover(cdnImgUrl + img.store + img.photo,'cover'+i)">
                  </figure>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row class="iLovePariette-panel">
        <b-col cols="12" class="iLovePariette-panel-buttons">
          <nuxt-link :to="{name: 'index'}" class="iLovePariette-panel-buttons-cancel">
            <i class="fas fa-times" /> {{ $t('form.btncancel') }}
          </nuxt-link>
          <b-button type="button" class="iLovePariette-panel-buttons-publish" @click="submitForm(1)">
            <i class="fas fa-check" /> {{ $t('form.btnpublish') }}
          </b-button>
          <b-button type="button" size="sm" class="iLovePariette-panel-buttons-save" @click="submitForm(2)">
            <i class="fas fa-save" /> {{ $t('form.btnsave') }}
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      sliderAnimation: 'asc__su-carousel-slider-animation asc__su-carousel-slider-animation-up',
      selectedGallery: [],
      isUpload: false,
      isSelect: true,
      options: [
        { value: 'tr_TR', text: 'Türkçe' },
        { value: 'en_EN', text: 'English' }
      ],
      dropzoneOptions: {
        url: 'http://127.0.0.1:8000/api/upload/storage',
        thumbnailHeight: 70,
        maxFilesize: 10,
        addRemoveLinks: true,
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt fa-2x d-block"></i> <h4><b>UPLOAD</b></h4>',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token
        },
        paramName: 'uploadFile'
      },
      form: {
        web: null,
        lang: null,
        type: this.$route.query.operation,
        user: null,
        title: null,
        keys: null,
        slug: null,
        content: null,
        cover: null,
        status: 2,
        hot: false,
        spot: false,
        slider: false,
        comment: false,
        api: false,
        gallery: []
      }
    }
  },
  computed: {
    ...mapState(['isSaved', 'cdnImgUrl', 'layout', 'pariette', 'token', 'authUser', 'tynmceOpt', 'galleryRows', 'settings'])
  },
  mounted () {
    this.getLayout()
    this.getGall(null)
  },
  created () {
    if (this.isSaved === false) {
      setTimeout(() => {
        this.autoSave(3)
      }, 60000)
    }
  },
  methods: {
    getGall (e) {
      this.$store.dispatch('getGallery', {
        canvas: e
      })
    },
    getLayout () {
      this.$store.dispatch('getLayout', {
        where: 'content'
      })
    },
    submitForm (e) {
      if (this.$v.form.$invalid) {
        alert('validate')
      } else {
        this.form.status = e
        this.create()
      }
    },
    sliderTranslate () {
      this.sliderAnimation = 'asc__su-carousel-slider-animation'
    },
    sliderTranslated () {
      this.sliderAnimation = 'asc__su-carousel-slider-animation asc__su-carousel-slider-animation-up'
    },
    url_slug (s) {
      this.form.slug = s
    },
    // photos
    setCover (e, id) {
      this.form.cover = e
    },
    addGallery (e) {
      const ad = { title: e.title, order: e.order, photo: e.photo, store: e.store }
      this.selectedGallery.push(ad)
      this.form.gallery = this.selectedGallery
      console.log(this.selectedGallery)
    },
    // upload
    sendingEvent (file, xhr, formData) {
      formData.append('siteToken', this.token)
    },
    onFileAdded (e) {
      // console.log(e)
    },
    showComplete (e) {
      // console.log(e)
    },
    showSuccess (file, response) {
      this.$refs.uploadFile.removeAllFiles()
      this.getGall(null)
      // this.uploadedImages.push(JSON.parse(file.xhr.response))
      this.isUpload = false
      this.isSelect = true
    },
    showError (file, message, xhr) {
      // console.log(file)
      // console.log(message)
      // console.log(xhr)
    },
    // upload
    async autoSave (e) {
      this.form.status = 3
      const data = {
        api: 'canvas',
        form: {
          web: this.token,
          lang: this.form.lang ? this.form.lang : this.settings.lang,
          type: this.form.type,
          user: this.authUser.access_token,
          title: this.form.title,
          keys: this.form.keys,
          slug: this.form.slug,
          content: this.form.content,
          cover: this.form.cover,
          status: this.form.status,
          hot: this.form.hot,
          spot: this.form.spot,
          slider: this.form.slider,
          comment: this.form.comment,
          api: this.form.api,
          token: this.token
        }
      }
      try {
        await this.$store.dispatch('autoSaveData', data)
      } catch (e) {
        console.log(e)
      }
    },
    async create () {
      const data = {
        api: 'canvas',
        form: {
          web: this.token,
          lang: this.form.lang,
          type: this.form.type,
          user: this.authUser.access_token,
          title: this.form.title,
          keys: this.form.keys,
          slug: this.form.slug,
          content: this.form.content,
          cover: this.form.cover,
          status: this.form.status,
          hot: this.form.hot,
          spot: this.form.spot,
          slider: this.form.slider,
          comment: this.form.comment,
          api: this.form.api,
          token: this.token
        }
      }
      try {
        await this.$store.dispatch('createData', data)
      } catch (e) {
        console.log(JSON.stringify(e))
      }
    }
  },
  validations: {
    form: {
      lang: {
        required
      },
      title: {
        required
      },
      content: {
        required
      },
      keys: {
        required
      },
      slug: {
        required
      },
      hot: {
        required
      },
      spot: {
        required
      },
      slider: {
        required
      },
      comment: {
        required
      },
      api: {
        required
      }
    }
  }
}
</script>
<style lang="sass">
  .iLovePariette
    & input
      background: none !important
      border: none
      border-radius: 0
      border-bottom: 1px #000 solid
      &:focus
        box-shadow: none
    & legend
      font-size: 14px
      font-weight: bold
      color: #000
      font-style: italic
      letter-spacing: -0.3px
    .iLovePariette-header
      width: 100%
      height: 70vh
      background: #000
    .mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before
      font-size: 30px
      color: #999
      font-style: italic
      letter-spacing: -1px
    .iLovePariette-panel
      background: #fff
      padding-top: 10px
      padding-bottom: 10px
      margin-top: 1rem
      border-radius: 5px
      .iLovePariette-panel-buttons
        .iLovePariette-panel-buttons-cancel
          line-height: 30px
          border-radius: 0px !important
          border: none
          color: #000
        .iLovePariette-panel-buttons-save
          float: right
          border-radius: 0px !important
          background: #ff8807
          border: none
          margin-right: 15px
        .iLovePariette-panel-buttons-publish
          float: right
          border-radius: 0px !important
          background: #e86950
          border: none
    .iLovePariette-textarea
      min-height: 200px
      border-bottom: 3px #fff solid
      border-radius: 3px
    .iLovePariette-gallery-operation
      .iLovePariette-gallery-operation-list
        position: relative
        & figure
          width: 100%
          height: 120px
          overflow: hidden
          position: relative
          & img
            width: 100%
          .iLovePariette-gallery-operation-list-buttons
            position: absolute
            top: 2px
            left: 2px
            width: 34px
            & button
              width: 34px
              margin-bottom: 2px
    .iLovePariette-gallery-list
      position: relative
      & figure
        width: 100%
        height: 120px
        overflow: hidden
        position: relative
        & img
          width: 100%
          cursor: move
    .iLovePariette-slider-fixedtext
      position: absolute
      top: 35%
      left: 0
      right: 0
      margin: auto
      z-index: 9
      text-align: center
      & input
        color: #ffffff
        font-size: 5em
        text-shadow: 0 0 65px #000
        letter-spacing: -1px
        font-style: italic
        text-align: center
        font-weight: 900
        font-family: 'Raleway', sans-serif
        border: none !important
        @media (max-width: 667px)
          font-size: 3em
    .asc__su-pageWithImages-img
      & img
        max-width: 100%
</style>
