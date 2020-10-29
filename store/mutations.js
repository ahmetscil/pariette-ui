/* eslint-disable no-unreachable */
import i18n from '../plugins/i18n'
export default {
  increment (state) {
    state.counter++
  },
  loadLimit (state, payload) {
    state.end = payload
  },
  SEND_SUCCESS (state, payload) {
    this.$toast.success(payload)
  },
  SEND_PROGRESSING (payload) {
    this.$toast.info(payload)
  },
  SEND_ERROR (payload) {
    this.$toast.error(payload)
  },
  LOCATION_HREF (payload) {
    this.$router.push({ name: payload })
  },
  SET_LANG (state, payload) {
    i18n.locale = state.settings.lang
    if (payload) {
      state.settings.lang = payload
      i18n.locale = payload
    }
  },
  SET_CONSOLE (payload) {
    console.log(payload)
  },
  PARIETTE (state, payload) {
    state.showAdmin = payload
  },
  PAGE_LOCATION (payload) {
    this.app.router.push({ name: 'index' })
  },
  SET_USER (user) {
    localStorage.setItem('user', JSON.stringify(user))
    this.commit('CONTROL_USER')
    this.commit('modal', false)
  },
  SET_COMPLETE (payload) {
    this.$toast.success('pariette.createOk')
    this.commit('DELETE_ERROR_MESSAGES')
  },
  SET_UPDATE_OK (payload) {
    this.app.router.push({ name: 'index' })
    console.log(payload)
  },
  SET_ERROR (state, payload) {
    // this.app.router.push({ name: 'index' })
    const statusText = '<b>' + payload.status + '</b> ' + payload.statusText
    state.errorMessage = statusText
    state.errorState = true
    this.$toast.error(state.errorMessage)
    switch (payload.status) {
      case 200:
        console.log(payload)
        break
      case 401:
        console.log(payload)
        break
      case 403:
        console.log(payload)
        break
      case 404:
        console.log(payload)
        break
      case 422:
        // eslint-disable-next-line no-case-declarations
        let errmsg = ''
        Object.keys(payload.data.errors).forEach(function (key) {
          errmsg += payload.data.errors[key]
        })
        state.validationErrors = errmsg
        this.$toast.error(state.validationErrors)
        break
      case 500:
        console.log(payload)
        break
      default:
        console.log(payload)
        break
    }
  },
  DELETE_ERROR_MESSAGES (state) {
    state.validationErrors = null
    state.errorMessage = null
    state.errorState = false
  },
  CONTROL_USER (state) {
    state.authUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  },
  thisLayout (state, payload) {
    state.layout = payload
  },
  keyData (state, payload) {
    state.keyData = payload
  },
  pageSet (state, payload) {
    state.page = payload
  },
  catsSet (state, payload) {
    state.cats = payload
  },
  blogsSet (state, payload) {
    state.blogs = payload
  },
  navigationSet (state, payload) {
    state.navigation = payload
  },
  navigationFooterSet (state, payload) {
    state.navigationFooter = payload
  },
  gallerySet (state, payload) {
    state.galleryRows = payload
  },
  settingsSet (state, payload) {
    state.settings = payload
  },
  bannersSet (state, payload) {
    state.banners = payload
  },
  bannerkeySet (state, payload) {
    state.bannerkey = payload
  },
  bannerurlSet (state, payload) {
    state.bannerurl = payload
  },
  bannerhomepageSet (state, payload) {
    state.bannerhomepage = payload
  },
  bannerallpagesSet (state, payload) {
    state.bannerallpages = payload
  },
  bannerallcatsSet (state, payload) {
    state.bannerallcats = payload
  },
  bannerallblogsSet (state, payload) {
    state.bannerallblogs = payload
  },
  bannerallnewsSet (state, payload) {
    state.bannerallnews = payload
  },
  modal (state, payload) {
    state.modalShow = payload
  },
  popup (state, payload) {
    state.popupShow = payload
  }
}
