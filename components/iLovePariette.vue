<template>
  <div class="asc__su-iLovepariette">
    <!--<Carousel
      v-if="layout.headerW != 'd-none'"
      :getdata="'desktopSliders'"
      :pagetitle="'canvas'"
      :showtitle="false"
      :where="'content'"
      class="d-block"
    />-->
    <div class="w-100">
      CAROUSEL
    </div>
    <div :class="layout.content">
      <b-row>
        <b-col cols="12">
          <div class="asc__su-ContentBox">
            <b-row>
              <b-col cols="12">
                <b-form-group label="title" :class="{ 'form-group--error': $v.form.title.$error }">
                  <b-form-input v-model.trim="$v.form.title.$model" type="text" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group :class="{ 'form-group--error': $v.form.content.$error }">
                  <editor
                    v-model.trim="$v.form.content.$model"
                    api-key="ra1mj2b13m99vwp7i0yes9oa4ij0jmymbsrkp0esmg7b40zu"
                    :inline="false"
                    :init="tynmceOpt"
                  />
                </b-form-group>
                <!--<MapBox v-if="row.map" :getdata="table.content.filter(l => l.lang === settings.lang)" />
                <Gallery v-if="row.gallery" :gallery="row.gallery ? JSON.parse(row.gallery) : null" :filters="row.filter ? JSON.parse(row.filter) : null" />-->
              </b-col>
              <b-col cols="12">
                <b-form-group label="keys" :class="{ 'form-group--error': $v.form.keys.$error }">
                  <b-form-input v-model.trim="$v.form.keys.$model" type="text" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="slug" :class="{ 'form-group--error': $v.form.slug.$error }">
                  <b-form-input v-model.trim="$v.form.slug.$model" type="text" />
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-sidebar title="Operations" aria-labelledby="sidebar-no-header-title" shadow :visible="sidebarVisible">
      <b-row>
        <b-col cols="11" class="mx-auto">
          <b-form-group label="lang" :class="{ 'form-group--error': $v.form.lang.$error }">
            <b-form-select v-model.trim="$v.form.lang.$model" :options="options" />
          </b-form-group>
          <b-form-group label="status">
            <b-form-input v-model="form.status" type="text" />
          </b-form-group>
          <b-form-checkbox v-model="form.hot" name="check-button" switch :class="{ 'form-group--error': $v.form.hot.$error }">
            hot: {{ form.hot }}
          </b-form-checkbox>
          <b-form-checkbox v-model="form.spot" name="check-button" switch :class="{ 'form-group--error': $v.form.spot.$error }">
            spot: {{ form.spot }}
          </b-form-checkbox>
          <b-form-checkbox v-model="form.slider" name="check-button" switch :class="{ 'form-group--error': $v.form.slider.$error }">
            slider: {{ form.slider }}
          </b-form-checkbox>
          <b-form-checkbox v-model="form.comment" name="check-button" switch :class="{ 'form-group--error': $v.form.comment.$error }">
            comment: {{ form.comment }}
          </b-form-checkbox>
          <b-form-checkbox v-model="form.api" name="check-button" switch :class="{ 'form-group--error': $v.form.api.$error }">
            api: {{ form.api }}
          </b-form-checkbox>
          <hr>
          <b-tabs>
            <b-tab :title="$t('form.uploadPhoto')" active>
              <b-form-group :label="$t('Brand.logo')">
                <vue-dropzone
                  id="dropzone"
                  ref="uploadFile"
                  :options="upload"
                  @vdropzone-success="showSuccess"
                  @vdropzone-error="showError"
                  @vdropzone-sending="sendingEvent"
                />
              </b-form-group>
            </b-tab>
            <b-tab :title="$t('form.selectCover')">
              <div class="asc__updatePage-cover-scroll">
                <figure v-for="(img,i) in uploadedImages" :id="'cover'+i" :key="i">
                  <img :src="img.url" @click="setCover(img.path,'cover'+i)">
                </figure>
              </div>
            </b-tab>
          </b-tabs>
          <hr>
          <b-button type="button" variant="success" @click="submitForm()">
            submit
          </b-button>
        </b-col>
      </b-row>
    </b-sidebar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      formError: '',
      sidebarVisible: true,
      options: [
        { value: 'tr_TR', text: 'Türkçe' },
        { value: 'en_EN', text: 'English' }
      ],
      uploadedImages: [],
      dropzoneOptions: {
        url: `${this.pariette}storage`,
        thumbnailHeight: 100,
        maxFilesize: 10,
        addRemoveLinks: true,
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt d-block"></i> <b>UPLOAD</b>',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
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
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        cover: null,
        status: 2,
        hot: false,
        spot: false,
        slider: false,
        comment: false,
        api: false
      }
    }
  },
  computed: mapState(['layout', 'pariette', 'token', 'authUser', 'tynmceOpt', 'pariette']),
  mounted () {
    this.getLayout()
  },
  methods: {
    getLayout () {
      this.$store.dispatch('getLayout', {
        where: 'content'
      })
    },
    submitForm () {
      if (this.$v.form.$invalid) {
        alert('validate')
      } else {
        this.create()
      }
    },
    setCover (e, id) {
      this.form.cover = e
      console.log(this.form.cover)
    },
    showSuccess (file, response) {
      // this.$store.commit('setLoader', false)
      // this.errorMsg = response.message
      this.$refs.uploadFile.removeAllFiles()
      console.log(response.errors)
      if (response.errors) {
        this.errors = response.errors
      }
    },
    showError (file, message, xhr) {
      // this.$store.commit('setLoader', false)
      // this.pincodes(this.form.pin, 1)
      console.log(file)
      console.log(message)
      console.log(xhr)
    },
    submitPins () {
      this.$store.commit('setLoader', true)
      this.$refs.uploadFile.processQueue()
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
          cover: this.form.cover, // 'nullable',
          status: this.form.status, // 'required',
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
        console.log(e)
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
</style>
