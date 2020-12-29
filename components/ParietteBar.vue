<template>
  <div v-if="authUser">
    <div v-b-toggle.parietteSideBar class="asc__su-parietteAdmin-open">
      <i
        v-b-tooltip.hover.left
        class="fas fa-bars"
        :title="$t('pariette.showPariette')"
      />
    </div>
    <b-sidebar
      id="parietteSideBar"
      title="iLovePariette"
      aria-labelledby="sidebar-no-header-title"
      right
      shadow
      :visible="showPariette"
    >
      <b-row class="asc__su-parietteAdmin">
        <b-col cols="12">
          <div class="accordion" role="tablist">
            <h3 v-if="$route.params.url">
              UPDATE
            </h3>
            <b-card v-if="$route.params.url" no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block class="asc__su-parietteAdmin-nav-title" @click="updateThis()">
                  Update This Content
                </b-button>
              </b-card-header>
            </b-card>
            <h3>NEW CONTENT</h3>
            <b-card v-for="(nav, idx) in navigation" :key="'navc' + idx" no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button v-b-toggle="'accordion-' + idx" block class="asc__su-parietteAdmin-nav-title">
                  {{ nav.title.trim() }}
                </b-button>
              </b-card-header>
              <b-collapse :id="'accordion-' + idx" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <ul v-if="nav.sub.length >= 1" class="asc__su-parietteAdmin-nav">
                    <li
                      v-for="(sub, idy) in nav.sub"
                      :key="'sub' + idy"
                      @click="createNew('url', 'canvas', sub.type, sub.operation)"
                    >
                      {{ sub.title }}
                    </li>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-sidebar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      navigation: [
        {
          title: 'Content',
          sub: [
            { title: 'Dinamik', operation: 'content', type: 'dynamic' },
            { title: 'Statik', operation: 'content', type: 'static' },
            { title: 'Banner', operation: 'content', type: 'banner' },
            { title: 'Mesaj', operation: 'content', type: 'message' },
            { title: 'Navigasyon', operation: 'content', type: 'navigation' }
          ]
        },
        {
          title: 'Design',
          sub: [
            { title: 'PopUp', operation: 'content' },
            { title: 'Header', operation: 'content' },
            { title: 'Footer', operation: 'content' },
            { title: 'Sidebar', operation: 'content' },
            { title: 'Slider', operation: 'content' }
          ]
        },
        {
          title: 'Admin',
          sub: [
            { title: 'Kullanıcılar', operation: 'content' },
            { title: 'İletişim', operation: 'content' }
          ]
        }
      ]
    }
  },
  computed: mapState(['settings', 'authUser', 'showPariette', 'token', 'authUser']),
  mounted () {
    this.$store.commit('CONTROL_USER')
  },
  methods: {
    async createNew (n, p, o, t) {
      const autosave = 'autosave' + Math.floor(Math.random() * 10000000000)
      const data = {
        isauto: 1,
        api: 'canvas',
        name: n,
        params: p,
        operation: o,
        type: t,
        form: {
          lang: this.settings.lang,
          web: this.token,
          type: t,
          user: this.authUser.access_token,
          title: autosave,
          slug: autosave,
          status: 4, // autosave
          token: this.token
        }
      }
      await this.$store.dispatch('createData', data)
    },
    updateThis () {
      this.$store.commit('PARIETTE', true)
      this.$router.push({ name: 'url', params: { url: 'canvas' }, query: { content: this.$route.params.url, operation: 'update' } })
    }
  }
}
</script>
<style lang="sass">
  .asc__su-parietteAdmin-open
    position: fixed
    top: 0px
    right: 0px
    z-index: 100
    width: 30px
    height: 30px
    line-height: 30px
    border-bottom-left-radius: 3px
    background: #000
    color: #fff
    text-align: center
  .asc__su-parietteAdmin
    font-family: 'Raleway', sans-serif
    will-change: transform
    transition: transform 250ms linear
    .asc__su-parietteAdmin-nav-title
      border: none
      background: #000
      color: #fff
    .asc__su-parietteAdmin-nav
      padding: 0
      margin-bottom: 0px
      list-style: none
      font-size: 16px
      letter-spacing: -0.1px
      line-height: 30px
      & li
        display: block
        position: relative
        letter-spacing: -0.3px
        padding: 5px 15px
        .nuxt-link-exact-active
          border-bottom: 3px #000 solid
        & a
          padding: 15px 0
          border-bottom: 3px transparent solid
          margin-right: 20px
          font-weight: 500
          display: block
          color: #000
          & i
            font-size: 10px
        &:first-child
          & a
            padding-left: 0px
        &:last-child
          border-right: none
          margin-right: 0px
          & a
            margin-right: 0px
        & ul
          list-style: none
          position: absolute
          z-index: 999
          width: 200px
          display: none
          border: 1px #ddd solid
          padding: 10px
          margin-top: 0px
          left: -50px
          &:after,
          &:before
            content: ''
            display: block
            position: absolute
            left: 100%
            border-style: solid
          &:after
            width: 20px
            left: 40%
            top: -20px
            border-color: transparent transparent #fff transparent
            border-width: 10px
          &:before
            width: 20px
            left: calc(40% - 1px)
            top: -22px
            border-color: transparent transparent #ddd transparent
            border-width: 11px
          & li
            text-align: center
            display: block
            color: #fff
            width: 100%
            padding: 0
            transition: 0.3s
            font-weight: 500
            border-right: none
            border-bottom: 1px #ddd solid
            line-height: 40px
            margin-bottom: 0px
            &:last-child
              border-bottom: none
            & a
              margin-right: 0px
              color: #fff
              padding: 0px
              display: block
        &:hover
          & ul
            display: block
            & li
              & a
                &:hover
    .asc__su-parietteAdmin-hamburger
      line-height: 40px
      width: 40px
      text-align: center
      float: right
</style>
