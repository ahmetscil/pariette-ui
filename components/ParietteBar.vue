<template>
  <div v-if="authUser">
    <div class="asc__su-parietteAdmin-open" @click="showParietteBar">
      <i class="fas fa-bars" />
    </div>
    <b-sidebar title="iLovePariette" aria-labelledby="sidebar-no-header-title" right shadow :visible="showPariette">
      <b-row>
        <b-col>
          <ul class="asc__su-parietteAdmin-nav">
            <li v-for="(nav, idx) in navigation" :key="'nav' + idx" class="">
              {{ nav.title.trim() }} <i v-if="nav.sub.length >= 1" class="fas fa-chevron-down" style="margin-left: .5em" />
              <ul v-if="nav.sub.length >= 1" class="shadow-sm">
                <li v-for="(sub, idy) in nav.sub" :key="'sub' + idy">
                  <nuxt-link :to="{name: 'url', params: {url: 'canvas'}, query: { 'operation': sub.operation }}">
                    {{ sub.title }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
          <div class="asc__su-parietteAdmin-hamburger">
            <i class="fas fa-chevron-circle-up" />
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
      showPariette: true,
      navigation: [
        {
          title: 'Pariette',
          sub: []
        },
        {
          title: 'Content',
          sub: [
            {
              title: 'Dinamik',
              operation: 'content'
            },
            { title: 'Statik', operation: 'content' },
            { title: 'Banner', operation: 'content' },
            { title: 'Mesaj', operation: 'content' },
            { title: 'Navigasyon', operation: 'content' }
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
  computed: mapState(['settings', 'authUser']),
  mounted () {
    this.$store.commit('CONTROL_USER')
  },
  methods: {
    showParietteBar () {
      this.showPariette = true
    }
  }
}
</script>
<style lang="sass">
  .asc__su-parietteAdmin-open
    position: fixed
    top: 200px
    right: 30px
    z-index: 99
  .asc__su-parietteAdmin
    top: 0px
    right: 0
    left: 0
    margin: auto
    position: fixed
    z-index: 9999
    color: #fff
    padding: 0
    font-family: 'Raleway', sans-serif
    will-change: transform
    transition: transform 250ms linear
    background: #000
    .asc__su-parietteAdmin-nav
      padding: 0
      margin-bottom: 0px
      list-style: none
      font-size: 16px
      letter-spacing: -0.1px
      line-height: 30px
      float: left
      & li
        display: inline-block
        color: #fff
        position: relative
        letter-spacing: -0.3px
        padding: 5px 15px
        .nuxt-link-exact-active
          border-bottom: 3px #000 solid
        & span
          cursor: pointer
          padding: 15px 0
          border-bottom: 3px transparent solid
          margin-right: 20px
          font-weight: 500
          color: #fff
          display: block
          & i
            font-size: 10px
        & a
          padding: 15px 0
          border-bottom: 3px transparent solid
          margin-right: 20px
          font-weight: 500
          color: #fff
          display: block
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
          background: #000
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
                color: #fff !important
                &:hover
                  color: #fff !important
    .asc__su-parietteAdmin-hamburger
      line-height: 40px
      width: 40px
      text-align: center
      float: right
</style>
