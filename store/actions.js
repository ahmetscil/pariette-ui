import axios from '../plugins/axios'
export default {
  async getLayout ({ state }, data) {
    const layout = await axios.get(`${state.pariette}${state.token}/layout?where=${data.where}`)
    this.commit('thisLayout', layout.data)
  },
  async getKeys ({ state }, data) {
    const keywords = await axios.get(`${state.pariette}${state.token}/canvas?key=${data.where}`)
    this.commit('keyData', keywords.data)
  },

  async getPage ({ state }, data) {
    const pageRows = await axios.get(`${state.pariette}${state.token}/canvas?url=${data.url}`)
    this.commit('pageSet', pageRows.data.data)
  },
  async getBlogs ({ state }, data) {
    const blogRows = await axios.get(`${state.pariette}${state.token}/canvas?key=${data.url}`)
    this.commit('blogsSet', blogRows.data.data)
  },
  async getNavigation ({ state }) {
    const rowsnavigation = await axios.get(`${state.pariette}${state.token}/navigation?slug=top-navigation`)
    this.commit('navigationSet', rowsnavigation.data)
  },
  async getFooter ({ state }) {
    const rowsnavigationFooter = await axios.get(`${state.pariette}${state.token}/navigation?slug=footer-navigation`)
    this.commit('navigationFooterSet', rowsnavigationFooter.data)
  },
  async getGallery ({ state }, data) {
    const galleryRows = await axios.get(`${state.pariette}${state.token}/gallery${data.canvas ? '?canvas=' + data.canvas : '?'}`)
    this.commit('gallerySet', galleryRows.data)
  },
  async login ({ state, commit }, data) {
    try {
      const user = await axios.post(`${state.pariette}auth/login`, data)
      commit('SET_USER', user.data)
      commit('LOCATION_HREF', 'admin')
    } catch (error) {
      alert(error)
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async emailList ({ state, commit }, data) {
    commit('SEND_SUCCESS', this.app.i18n.t('message.sending'))
    document.getElementById('loginButton').disabled = true
    document.getElementById('loginLoaderText').style.display = 'none'
    document.getElementById('loginLoader').style.display = 'block'
    try {
      const user = await axios.post(`${state.pariette}auth/emaillist`, data)
      commit('SET_USER', user.data)
      commit('SEND_SUCCESS', this.app.i18n.t('message.success'))
      commit('PAGE_LOCATION', 'index')
      document.getElementById('loginButton').disabled = false
      document.getElementById('loginLoaderText').style.display = 'block'
      document.getElementById('loginLoader').style.display = 'none'
    } catch (error) {
      commit('SEND_ERROR', this.app.i18n.t('message.error'))
      commit('SET_CONSOLE', error)
      document.getElementById('loginButton').disabled = false
      document.getElementById('loginLoaderText').style.display = 'block'
      document.getElementById('loginLoader').style.display = 'none'
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async autoSaveData ({ state, commit }, data) {
    try {
      const content = await axios.post(`${state.pariette}${data.api}`, data.form, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.authUser.access_token
        }
      })
      const savedCanvas = {
        canvas: content,
        saved: true
      }
      commit('SET_AUTOSAVE', savedCanvas)
    } catch (error) {
      console.log(error)
      // commit('SET_ERROR', error)
      // if (error.response && error.response.status === 401) {
      //   throw new Error('Bad credentials')
      // }
      // throw error
    }
  },
  async createData ({ state, commit }, data) {
    try {
      const content = await axios.post(`${state.pariette}${data.api}`, data.form, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.authUser.access_token
        }
      })
      commit('SET_UPDATE_OK', content.data.data.title)
    } catch (error) {
      commit('SET_ERROR', error)
      // if (error.response && error.response.status === 401) {
      //   throw new Error('Bad credentials')
      // }
      // throw error
    }
  },
  async updateData ({ state, commit }, data) {
    try {
      const content = await axios.put(`${state.pariette}${data.api}/${data.id}`, data.form, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.authUser.access_token
        }
      })
      commit('SET_UPDATE_OK', content.data.data.title)
    } catch (error) {
      commit('SET_ERROR', error)
      // if (error.response && error.response.status === 401) {
      //   throw new Error('Bad credentials')
      // }
      // throw error
    }
  }
}
