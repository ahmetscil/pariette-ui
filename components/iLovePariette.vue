<template>
  <div class="iLovePariette">
    <div v-if="layout.headerW != 'none'" :class="layout.headerW + ' ' + layout.headerH" class="asc__su-carousel">
      <b-form-group :class="{ 'iLovePariette-formgroup--error': $v.form.title.$error }" class="iLovePariette-slider-fixedtext">
        <b-form-input
          v-model.trim="$v.form.title.$model"
          :placeholder="$t('pariette.titleHere')"
          type="text"
          autocomplete="off"
          autofocus="true"
          @keyup="disabledInput === false ? url_slug(form.title) : ''"
        />
      </b-form-group>
      <b-form-group :class="{ 'iLovePariette-formgroup--error': $v.form.slug.$error }" class="iLovePariette-slider-fixedslug">
        <b-form-input
          v-model.trim="$v.form.slug.$model"
          v-b-tooltip.hover.bottom
          :disabled="disabledInput"
          :placeholder="$t('pariette.slug')"
          type="text"
          :title="$t('pariette.slugInfo')"
        />
      </b-form-group>
      <div class="asc__su-carousel-slider">
        <div
          :class="layout.headerW + ' ' + layout.headerH"
          class="asc__su-carousel-slider-item"
          :style="{ backgroundImage: 'url(' + cdnImgUrl + form.cover + ')' }"
        />
      </div>
    </div>

    <div :class="layout.content">
      <b-row class="iLovePariette-panel-nobg">
        <b-col>
          <b-form-group :class="{ 'iLovePariette-formgroup--error': $v.form.content.$error }">
            <editor
              v-model.trim="$v.form.content.$model"
              class="iLovePariette-textarea"
              :placeholder="$t('pariette.contentHere')"
              api-key="ra1mj2b13m99vwp7i0yes9oa4ij0jmymbsrkp0esmg7b40zu"
              :inline="true"
              :init="tynmceOpt"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="iLovePariette-panel">
        <b-col cols="12" lg="3">
          <b-tabs>
            <b-tab :title="$t('pariette.upload')">
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
            <b-tab :title="$t('pariette.select')" :active="isSelect">
              <b-row class="iLovePariette-gallery-operation">
                <b-col v-for="(img,i) in galleryRows" :id="'cover'+i" :key="i" cols="3" class="iLovePariette-gallery-operation-list">
                  <figure>
                    <img :title="img.title" :src="cdnImgUrl + img.photo">
                    <div class="iLovePariette-gallery-operation-list-bg" :style="{ backgroundImage: 'url(' + cdnImgUrl + img.store + img.photo + ')' }" />
                    <div class="iLovePariette-gallery-operation-list-buttons">
                      <b-button
                        :id="'popover' + i"
                        variant="warning"
                        size="sm"
                      >
                        <i class="fas fa-grip-horizontal" />
                      </b-button>
                      <b-button v-b-tooltip.hover.right :title="$t('pariette.addCarousel')" variant="warning" size="sm" @click="addCarousel(img)">
                        <i class="far fa-images" />
                      </b-button>
                      <b-button v-b-tooltip.hover.right :title="$t('pariette.setCover')" variant="success" size="sm" @click="setCover(img.photo,'cover'+i)">
                        <i class="far fa-image" />
                      </b-button>
                    </div>
                  </figure>
                  <b-popover :target="'popover' + i" triggers="hover">
                    <b-form-group :label="$t('pariette.gallTitle')">
                      <b-form-input v-model="galleryTitle" autocomplete="off" size="sm" type="text" />
                    </b-form-group>
                    <b-form-group :label="$t('pariette.gallFilter')">
                      <b-form-input v-model="galleryFilter" autocomplete="off" type="text" />
                    </b-form-group>
                    <b-form-group>
                      <b-button :disabled="galleryTitle ? false : true" variant="success" size="sm" block @click="addGallery(img.photo)">
                        {{ $t('pariette.addGallery') }}
                      </b-button>
                    </b-form-group>
                  </b-popover>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('pariette.carousel')">
              <b-row class="iLovePariette-gallery-operation">
                <b-col v-for="(img,i) in selectedCarousel" :id="'cover'+i" :key="i" cols="3" class="iLovePariette-gallery-operation-list">
                  <figure>
                    <img :title="img.title" :src="cdnImgUrl + img.photo" style="cursor: default">
                    <div class="iLovePariette-gallery-operation-list-buttons">
                      <b-button v-b-tooltip.hover.right :title="$t('pariette.removeCarousel')" variant="danger" size="sm" @click="removeCarousel(i)">
                        <i class="fas fa-trash-alt" />
                      </b-button>
                    </div>
                  </figure>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('pariette.gallery')">
              <b-row class="iLovePariette-gallery-operation">
                {{ selectedGallery }}
                <b-col v-for="(img,i) in selectedGallery" :id="'cover'+i" :key="i" cols="3" class="iLovePariette-gallery-operation-list">
                  <figure>
                    <img :title="img.title" :src="cdnImgUrl + img.name">
                    <div class="iLovePariette-gallery-operation-list-buttons">
                      <b-button v-b-tooltip.hover.right :title="$t('pariette.removeGallery')" variant="danger" size="sm" @click="removeGallery(i)">
                        <i class="fas fa-trash-alt" />
                      </b-button>
                    </div>
                  </figure>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row class="iLovePariette-panel">
        <b-col v-if="setting && setting === 'dynamic'" cols="12">
          <b-form-group>
            <b-form-tags v-model="selectedCatList" no-outer-focus>
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <b-row>
                  <b-col cols="2">
                    <b-dropdown variant="light" no-outer-focus block>
                      <template #button-content>
                        {{ $t('pariette.selectCats') }}
                      </template>
                      <b-dropdown-item-button
                        v-for="option in cats"
                        :key="option"
                        @click="catSelected({ option, addTag })"
                      >
                        {{ option.title }}
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </b-col>
                  <b-col>
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                      <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag
                          :title="tag"
                          :disabled="disabled"
                          variant="dark"
                          @remove="removeTag(tag)"
                        >
                          {{ tag }}
                        </b-form-tag>
                      </li>
                    </ul>
                  </b-col>
                </b-row>
              </template>
            </b-form-tags>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group :class="{ 'iLovePariette-formgroup--error': $v.form.keys.$error }">
            <b-form-tags
              v-model.trim="form.keys"
              v-b-tooltip.hover.left
              separator=" ,;"
              remove-on-delete
              type="text"
              tag-variant="dark"
              :placeholder="$t('pariette.setTags')"
            />
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-form-group :class="{ 'iLovePariette-formgroup--error': $v.form.lang.$error }" class="123">
            <b-dropdown v-model.trim="$v.form.lang.$model" variant="light" no-outer-focus block>
              <template #button-content>
                {{ selectedLang }}
              </template>
              <b-dropdown-item-button
                v-for="option in langOpt"
                :key="option"
                @click="langSelected(option)"
              >
                {{ option.text }}
              </b-dropdown-item-button>
            </b-dropdown>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-checkbox v-model="form.hot" inline name="check-button" switch>
              {{ $t('pariette.formhot') }}
            </b-form-checkbox>
            <b-form-checkbox v-model="form.spot" inline name="check-button" switch>
              {{ $t('pariette.formspot') }}
            </b-form-checkbox>
            <b-form-checkbox v-model="form.slider" inline name="check-button" switch>
              {{ $t('pariette.formslider') }}
            </b-form-checkbox>
            <b-form-checkbox v-model="form.comment" inline name="check-button" switch>
              {{ $t('pariette.formcomment') }}
            </b-form-checkbox>
            <b-form-checkbox v-model="form.api" inline name="check-button" switch>
              {{ $t('pariette.formapi') }}
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
        <b-col cols="12" class="iLovePariette-panel-buttons">
          <nuxt-link :to="{name: 'index'}" class="iLovePariette-panel-buttons-cancel">
            <i class="fas fa-times" /> {{ $t('pariette.btncancel') }}
          </nuxt-link>
          <b-button v-if="operation" type="button" class="iLovePariette-panel-buttons-publish" @click="updateForm(1, contentId)">
            <i class="fas fa-check" /> {{ $t('pariette.btnupdate') }}
          </b-button>
          <b-button v-else type="button" class="iLovePariette-panel-buttons-publish" @click="submitForm(1)">
            <i class="fas fa-check" /> {{ $t('pariette.btnpublish') }}
          </b-button>
          <b-button v-if="operation" type="button" size="sm" class="iLovePariette-panel-buttons-save" @click="updateForm(2, contentId)">
            <i class="fas fa-save" /> {{ $t('pariette.btnchange') }}
          </b-button>
          <b-button v-else type="button" size="sm" class="iLovePariette-panel-buttons-save" @click="submitForm(2)">
            <i class="fas fa-save" /> {{ $t('pariette.btnsave') }}
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import axios from '../plugins/axios'
export default {
  data () {
    return {
      disabledInput: false,
      galleryTitle: null,
      galleryFilter: null,
      contentType: null,
      contentId: null,
      sliderAnimation: 'asc__su-carousel-slider-animation asc__su-carousel-slider-animation-up',
      selectedGallery: [],
      selectedGalleryFilter: [],
      selectedCarousel: [],
      isUpload: false,
      addGall: true,
      isSelect: true,
      operation: this.$route.query.operation ? this.$route.query.operation : null,
      setting: this.$route.query.type,
      selectedCatList: [],
      selectedLang: this.$t('pariette.contentLang'),
      langOpt: [
        { value: 'tr_TR', text: 'Türkçe' },
        { value: 'en_EN', text: 'English' }
      ],
      // gerçek kategoriler listelenecek.
      catlist: ['list', 'of', 'options'],
      dropzoneOptions: {
        // this.pariette çalışmıyor burada...
        url: 'http://127.0.0.1:8000/api/upload/storage',
        thumbnailHeight: 40,
        maxFilesize: 10,
        addRemoveLinks: true,
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt fa-2x d-block"></i> <h4><b>UPLOAD</b></h4>',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token
        },
        paramName: 'uploadFile'
      },
      tynmceOpt: {
        directionality: 'ltr',
        // this.settings.lang çalıştırılacak!
        language: 'tr',
        plugins: [
          'image imagetools',
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste imagetools wordcount searchreplace',
          'autolink autoresize emoticons code media table'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify',
        toolbar2: 'searchreplace paste pastetex | link image media | emoticons code | bullist numlist outdent indent | table tabledelete',
        content_style: 'body { }'
      },
      form: {
        web: null,
        lang: null,
        type: this.$route.query.operation,
        user: null,
        title: null,
        cats: [],
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
        gallery: [],
        filter: [],
        carousel: []
      }
    }
  },
  computed: {
    ...mapState(['cdnImgUrl', 'layout', 'pariette', 'token', 'authUser', 'cats', 'galleryRows', 'settings'])
  },
  mounted () {
    if (this.$route.query.type) {
      this.contentType = this.$route.query.type
    } else {
      this.getCanvas(this.$route.query.content)
    }
    this.operation = this.$route.query.operation ? this.$route.query.operation : null
    this.getLayout()
    this.getCats(null)
    this.getGall(null)
  },
  methods: {
    catSelected ({ option, addTag }) {
      const selectedCats = this.form.cats
      const selectedCatTitle = this.selectedCatList
      selectedCats.push(option.id)
      selectedCatTitle.push(option.title)
      this.selectedCatList = selectedCatTitle
      this.form.cats = selectedCats
    },
    langSelected (e) {
      this.form.lang = e.value
      this.selectedLang = e.text
    },
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
    getCats (e) {
      this.$store.dispatch('getCats', {
        params: e
      })
    },
    gallTitle (e) {
      this.galleryTitle = e
      console.log(e)
    },
    sliderTranslate () {
      this.sliderAnimation = 'asc__su-carousel-slider-animation'
    },
    sliderTranslated () {
      this.sliderAnimation = 'asc__su-carousel-slider-animation asc__su-carousel-slider-animation-up'
    },
    url_slug (s) {
      if (s) {
        this.form.slug = s.toLowerCase()
      }
    },
    // photos
    setCover (e, id) {
      this.form.cover = e
    },
    addGallery (e) {
      const id = 0
      const photos = {
        name: e,
        alt: this.galleryTitle,
        filter: this.galleryFilter,
        id: id + 1
      }
      this.selectedGallery.push(photos)
      this.form.gallery = this.selectedGallery
      this.galleryTitle = null
      this.galleryFilter = null
    },
    addFilter (e) {
      const filters = [
        { filter: e.filter, label: e.label }
      ]
      this.selectedGalleryFilter.push(filters)
      this.form.filter = this.selectedGalleryFilter
    },
    addCarousel (e) {
      const ad = { title: e.title, order: e.order, photo: e.photo, store: e.store }
      this.selectedCarousel.push(ad)
      this.form.carousel = this.selectedCarousel
    },
    removeGallery (e) {
      this.selectedGallery.splice(e, 1)
      this.form.gallery = this.selectedGallery
    },
    removeCarousel (e) {
      this.selectedCarousel.splice(e, 1)
      this.form.carousel = this.selectedCarousel
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
    // create
    submitForm (e) {
      if (this.$v.form.$invalid) {
        this.$store.commit('SEND_ERROR', this.$t('pariette.validationError'))
      } else {
        this.$store.commit('SEND_PROGRESSING', this.$t('pariette.progressing'))
        this.form.status = e
        this.create()
      }
    },
    async create () {
      const data = {
        api: 'canvas',
        form: {
          web: this.token,
          lang: this.form.lang,
          type: this.form.type,
          display: 'web',
          user: this.authUser.access_token,
          title: this.form.title,
          cats: this.form.cats,
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
          gallery: this.form.gallery,
          filter: this.form.filter,
          carousel: this.form.carousel,
          token: this.token
        }
      }
      console.log(data)

      await this.$store.dispatch('createData', data)
    },
    // update
    updateForm (e, i) {
      if (this.$v.form.$invalid) {
        this.$store.commit('SEND_ERROR', this.$t('pariette.validationError'))
      } else {
        this.$store.commit('SEND_PROGRESSING', this.$t('pariette.progressing'))
        this.update(e, i)
      }
    },
    async update (e, i) {
      /*
        e === 1 ? var olan kaydı günceller.
        e === 2 ? var olan kayıt pasif olur, yenisi üretilir.
      */
      const data = {
        api: 'canvas-content',
        id: i,
        form: {
          operation: e,
          web: this.token,
          lang: this.form.lang,
          type: this.form.type,
          display: 'web',
          user: this.authUser.access_token,
          title: this.form.title,
          cats: this.form.cats,
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
          gallery: this.form.gallery,
          filter: this.form.filter,
          carousel: this.form.carousel,
          token: this.token
        }
      }
      console.log(data)

      await this.$store.dispatch('updateData', data)
    },
    async getCanvas (e) {
      const row = await axios.get(`${this.pariette}${this.token}/canvas?url=${e}`)
      const carousel = await axios.get(`${this.pariette}${this.token}/carousel?display=web&slug=${e}`)
      const canvas = row.data.data[0]
      const content = row.data.data[0].content.filter(l => l.lang === this.settings.lang)[0]
      this.form.canvas = content.canvas
      this.form.content = content.content
      this.form.cover = content.cover
      this.form.filter = content.filter
      this.form.gallery = content.gallery
      this.selectedGallery = this.form.gallery
      this.contentId = content.id
      this.form.keys = content.keys
      this.form.order = content.order
      this.form.status = content.status
      this.form.title = content.title
      this.form.slug = canvas.slug
      this.disabledInput = true
      this.form.cats = canvas.cats
      this.form.hot = canvas.hot
      this.form.spot = canvas.spot
      this.form.slider = canvas.slider
      this.form.comment = canvas.comment
      this.form.api = canvas.api
      this.form.carousel = carousel.data[0].slider
      this.selectedCarousel = this.form.carousel
    }
  },
  validations () {
    return {
      form: {
        keys: {
          required
        },
        lang: {
          required
        },
        title: {
          required
        },
        content: {
          required
        },
        slug: {
          required
        }
      }
    }
  }
}
</script>
<style lang="sass">
  .iLovePariette
    // component style
    .mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before
      font-size: 30px
      color: #999
      font-style: italic
      letter-spacing: -1px
    .form-control
      border-radius: 0px
      border: 1px #e7695038 solid
      &:focus
        box-shadow: none
    .custom-select
      border-radius: 0px
      border: 1px #e7695038 solid
      &:focus
        box-shadow: none
    .custom-switch
      padding-top: .5em
    & input
      background: none !important
      border: none
      border-radius: 0
      border-bottom: 1px #000 solid
      &:focus
        box-shadow: none
    & legend
      font-size: 14px
      color: #fff
      width: fit-content
      padding-left: 3px
      padding-right: 3px
      padding-top: 4px
      padding-bottom: 0px
      border-top-right-radius: 3px
      background: #e76950
      letter-spacing: -0.3px
      margin-bottom: 0px
    .tab-content
      padding: 5px
      border: 1px #e86950 solid
      min-height: 200px
    .vue-dropzone
      border: none !important
    .dropzone
      min-height: 290px
      padding: 0px
      .dz-message
        color: #e86950
        margin: 0
        padding-top: 100px
        padding-bottom: 0
        padding-left: 0
        padding-right: 0
      .dz-error-message
        display: none !important
      .dz-remove
        margin: 0 30px
        left: 0
        right: 0
    .nav-tabs
      border: none
      .nav-link
        border-radius: 0px !important
        background: #ff8807 !important
        border: none !important
        color: #fff !important
      .nav-link.active
        border-radius: 0px !important
        background: #e86950 !important
        border: none !important
        color: #fff !important
    // pariette style
    .iLovePariette-formgroup--error
      border: 1px red solid !important
    .iLovePariette-header
      width: 100%
      height: 70vh
      background: #000
    .iLovePariette-panel-nobg
      padding-top: 20px
      padding-bottom: 20px
      margin-top: 1rem
      border-radius: 5px
    .iLovePariette-panel
      background: #fff
      padding-top: 20px
      padding-bottom: 20px
      margin-top: 1rem
      border-radius: 5px
      transition: .3s
      &:hover
        transition: .3s
        box-shadow: 0 0 20px #e7695070
      .iLovePariette-panel-buttons
        .iLovePariette-panel-buttons-cancel
          border: 1px #000 solid
          line-height: 30px
          border-radius: 2px !important
          padding: 5px 10px
          color: #000
        .iLovePariette-panel-buttons-save
          float: right
          border-radius: 0px !important
          background: #ff8807
          border: none
          margin-right: 15px
          &:hover
            background: darken(#ff8807, 10)
        .iLovePariette-panel-buttons-publish
          float: right
          border-radius: 0px !important
          background: #e86950
          border: none
          &:hover
            background: darken(#e86950, 10)
    .iLovePariette-textarea
      min-height: 290px
      border-bottom: 1px #e76950 solid
    .iLovePariette-gallery-operation
      max-height: 290px
      overflow: auto
      .iLovePariette-gallery-operation-list
        position: relative
        & figure
          width: 100%
          height: 120px
          overflow: hidden
          position: relative
          border-radius: 10px
          box-shadow: 0 0 10px #e7695030
          .iLovePariette-gallery-operation-list-bg
            position: absolute
            width: 100%
            height: 100%
            left: 0
            top: 0
            z-index: 0
            filter: blur(8px)
            -webkit-filter: blur(8px)
            background-position: center
            background-repeat: no-repeat
            background-size: 200%
          & img
            width: 100%
            cursor: move
            position: absolute
            z-index: 1
            filter: grayscale(60%)
            &:hover
              filter: grayscale(0)
          .iLovePariette-gallery-operation-list-buttons
            position: absolute
            z-index: 3
            top: 2px
            left: -50px
            width: 34px
            transition: .3s
            & button
              width: 34px
              margin-bottom: 2px
          &:hover
            .iLovePariette-gallery-operation-list-buttons
              left: 2px
              transition: .3s
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
        border: none !important
        position: relative
        @media (max-width: 667px)
          font-size: 3em
    .iLovePariette-slider-fixedslug
      position: absolute
      top: calc(35% + 10em)
      left: 0
      right: 0
      margin: auto
      z-index: 9
      text-align: center
      & input
        color: #ffffff
        font-size: 2em
        text-shadow: 0 0 65px #000
        letter-spacing: -1px
        text-align: center
        border: none !important
    .asc__su-pageWithImages-img
      & img
        max-width: 100%
  .iLovePariette-toast
    .toasted
      border-radius: 10px
      font-size: 20px
</style>
