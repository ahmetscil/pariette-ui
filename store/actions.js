import axios from '../plugins/axios'
export default {
  async getLayout ({ state, commit }, data) {
    try {
      const layout = await axios.get(`${state.pariette}${state.token}/layout?where=${data.where}`)
      this.commit('thisLayout', layout.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getKeys ({ state, commit }, data) {
    try {
      const keywords = await axios.get(`${state.pariette}${state.token}/canvas?key=${data.where}`)
      this.commit('keyData', keywords.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getPage ({ state, commit }, data) {
    try {
      const pageRows = await axios.get(`${state.pariette}${state.token}/canvas?url=${data.url}`)
      this.commit('pageSet', pageRows.data.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getBlogs ({ state, commit }, data) {
    try {
      const blogRows = await axios.get(`${state.pariette}${state.token}/canvas?key=${data.url}`)
      this.commit('blogsSet', blogRows.data.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getCats ({ state, commit }, data) {
    try {
      const catsRows = await axios.get(`${state.pariette}${state.token}/canvas?type=cats${data.params ? data.params : ''}`)
      this.commit('catsSet', catsRows.data.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getNavigation ({ state, commit }) {
    try {
      const rowsnavigation = await axios.get(`${state.pariette}${state.token}/navigation?slug=top-navigation`)
      this.commit('navigationSet', rowsnavigation.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getFooter ({ state, commit }) {
    try {
      const rowsnavigationFooter = await axios.get(`${state.pariette}${state.token}/navigation?slug=footer-navigation`)
      this.commit('navigationFooterSet', rowsnavigationFooter.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async getGallery ({ state, commit }, data) {
    try {
      const galleryRows = await axios.get(`${state.pariette}${state.token}/gallery${data.canvas ? '?canvas=' + data.canvas : '?'}`)
      this.commit('gallerySet', galleryRows.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async login ({ state, commit }, data) {
    try {
      const user = await axios.post(`${state.pariette}auth/login`, data)
      commit('SET_USER', user.data)
      console.log(user)
      commit('LOCATION_HREF', 'admin')
    } catch (error) {
      console.log(error)
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
      // commit('SET_USER', user.data)
      console.log(user.data)
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
      commit('SET_CONSOLE', savedCanvas)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async createData ({ state, commit }, data) {
    return await axios
      .post(`${state.pariette}${data.api}`, data.form, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.authUser.access_token
        }
      })
      .then((res) => {
        commit('SET_COMPLETE', res.data)
      })
      .catch((err) => {
        if (err.response) {
          commit('SET_ERROR', err.response)
        }
      })
  },
  async updateData ({ state, commit }, data) {
    try {
      const content = await axios.put(`${state.pariette}${data.api}/${data.id}`, data.form, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.authUser.access_token
        }
      })
      // commit('SET_UPDATE_OK', content.data.data.title)
      commit('SET_UPDATE_OK', content.data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  }
}
