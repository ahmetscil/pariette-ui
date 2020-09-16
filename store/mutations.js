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
  SEND_ERROR (state, payload) {
    this.$toast.error(payload)
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
  PAGE_LOCATION (payload) {
    this.app.router.push({ name: 'index' })
  },
  SET_USER (state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    this.commit('CONTROL_USER')
    this.commit('modal', false)
  },
  SET_UPDATE_OK (state, payload) {
    this.app.router.push({ name: 'index' })
    console.log(payload + ' güncellendi')
  },
  SET_ERROR (state, payload) {
    this.app.router.push({ name: 'index' })
    console.log(payload)
  },
  CONTROL_USER (state) {
    state.authUser = localStorage.getItem('user') ? localStorage.getItem('user') : null
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
  blogsSet (state, payload) {
    state.blogs = payload
  },
  navigationSet (state, payload) {
    state.navigation = payload
  },
  navigationFooterSet (state, payload) {
    state.navigationFooter = payload
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
