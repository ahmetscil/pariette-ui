<template>
  <div :class="headerClass">
    <b-container class="d-none d-lg-block">
      <b-row>
        <b-col cols="10" class="asc__su-header-top">
          <div class="asc__su-header-logo">
            <nuxt-link :to="{name: 'index'}">
              <img class="asc__su-header-show-headerLight" src="../static/logo-white.svg" :alt="settings.title" :title="settings.title">
              <img class="asc__su-header-show-headerDark" src="../static/logo-black.svg" :alt="settings.title" :title="settings.title">
            </nuxt-link>
          </div>
          <div class="asc__su-header-nav">
            <div class="asc__su-header-nav__head">
              <i class="fas fa-envelope" /> <a :href="'mailto:' + settings.email">{{ settings.email }}</a>
              <i class="fas fa-phone-alt" /> <a :href="'tel:' + settings.tel1">{{ settings.tel1Title }}</a> / <a :href="'tel:' + settings.tel2">{{ settings.tel2Title }}</a>
            </div>
            <ul v-for="(n, id) in navigation" :key="id" class="asc__su-header-nav__list">
              <li v-for="(nav, idx) in n.navs.filter(l => l.lang == settings.lang)" :key="'nav' + idx" class="">
                <nuxt-link v-if="nav.route" :to="{name: nav.route, params: {url: nav.url}}">
                  {{ nav.title.trim() }}<i v-if="nav.length >= 1" class="fas fa-chevron-down" style="margin-left: .5em" />
                </nuxt-link>
                <span v-else>
                  {{ nav.title.trim() }}<i v-if="nav.length >= 1" class="fas fa-chevron-down" style="margin-left: .5em" />
                </span>
                <ul v-if="nav.sub.length >= 1" class="shadow-sm">
                  <li v-for="(sub, idy) in nav.sub.filter(l => l.lang === settings.lang)" :key="'sub' + idy">
                    <nuxt-link :to="{name: sub.route, params: {url: sub.url}}">
                      {{ sub.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </b-col>
        <b-col cols="2" class="asc__su-header-operations">
          <div class="asc__su-header-lang" @click="setLang('tr_TR')">
            <img src="../static/tr.svg">
          </div>
          <div class="asc__su-header-lang" @click="setLang('en_EN')">
            <img src="../static/en.svg">
          </div>
          <!--<b-dropdown variant="default" no-caret>
            <template v-slot:button-content>
              <i class="fas fa-bars" />
            </template>
            <b-dropdown-item v-if="!authUser" @click="loginModal(true)">
              {{ $t('home.login') }}
            </b-dropdown-item>
            <b-dropdown-item v-else @click="routerPush('admin-create')">
              {{ $t('home.create') }}
            </b-dropdown-item>
          </b-dropdown>-->
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="d-block d-lg-none">
      <div class="asc__su-header-mobile">
        <b-row>
          <b-col cols="10">
            <nuxt-link :to="{name: 'index'}">
              <img class="asc__su-header-show-headerDark" src="../static/logo-black.svg" :alt="settings.title" :title="settings.title">
              <img class="asc__su-header-show-headerLight" src="../static/logo-white.svg" :alt="settings.title" :title="settings.title">
            </nuxt-link>
          </b-col>
          <b-col cols="2">
            <div :class="hamburgerMenu">
              <div id="hamburger" :class="hamburger" @click="hamburgerClick()">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </b-col>
        </b-row>
        <div class="asc__su-header-mobile-nav">
          <ul v-for="(n, id) in navigation" :key="id" class="asc__su-header-mobile-nav__list">
            <li v-for="(nav, idx) in n.navs.filter(l => l.lang == settings.lang)" :key="'nav' + idx" class="">
              <nuxt-link v-if="nav.route" :to="{name: nav.route, params: {url: nav.url}}" @click.native="hamburgerClick()">
                {{ nav.title.trim() }}<i v-if="nav.length >= 1" class="fas fa-chevron-down" style="margin-left: .5em" />
              </nuxt-link>
              <span v-else>
                {{ nav.title.trim() }}<i v-if="nav.length >= 1" class="fas fa-chevron-down" style="margin-left: .5em" />
              </span>
              <ul v-if="nav.sub.length >= 1" class="shadow-sm">
                <li v-for="(sub, idy) in nav.sub.filter(l => l.lang === settings.lang)" :key="'sub' + idy">
                  <nuxt-link :to="{name: sub.route, params: {url: sub.url}}" @click.native="hamburgerClick()">
                    {{ sub.title }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import { TweenMax } from 'gsap'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      hamburger: '',
      hamburgerMenu: 'asc__su-header-hamburgerButton',
      headerClass: 'asc__su-header',
      limitPosition: 50,
      scrolled: false,
      lastPosition: 0
    }
  },
  computed: mapState(['settings', 'navigation', 'authUser']),
  mounted () {
    this.$store.commit('CONTROL_USER')
    this.headerInfo()
    this.headerClass = 'asc__su-header'
    document.body.style.overflow = 'inherit'
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    loginModal (e) {
      this.$store.commit('modal', e)
    },
    headerInfo () {
      if (process.client) {
        window.addEventListener('scroll', this.handleScroll)
      }
      this.$store.dispatch('getNavigation')
    },
    routerPush (e) {
      this.$router.push({ name: e })
    },
    setLang (e) {
      this.$store.commit('SET_LANG', e)
    },
    handleScroll () {
      if (this.lastPosition < window.scrollY && this.limitPosition < window.scrollY) {
        this.scrolled = true
        this.headerClass = 'asc__su-header asc__su-header-headerLight asc__su-header--unpinned'
      }
      if (this.lastPosition > window.scrollY && this.lastPosition <= this.limitPosition) {
        this.headerClass = 'asc__su-header asc__su-header-headerLight asc__su-header--pinned'
      }
      if (this.lastPosition > window.scrollY && this.lastPosition >= this.limitPosition) {
        this.scrolled = false
        this.headerClass = 'asc__su-header asc__su-header-headerDark asc__su-header--pinned'
      }
      this.lastPosition = window.scrollY
    },
    hamburgerClick () {
      const menu = document.getElementsByClassName('asc__su-header-mobile-nav')
      if (this.hamburger === '') {
        TweenMax.to(menu, 0.5, { top: '130px', transformOrigin: '50% 50%' })
        this.hamburger = 'open'
        this.hamburgerMenu = 'asc__su-header-hamburgerButton asc__su-header-openHamburgerButton'
        document.body.style.overflow = 'hidden'
      } else {
        TweenMax.to(menu, 0.3, { top: '150vh', transformOrigin: '50% 50%' })
        this.hamburger = ''
        this.hamburgerMenu = 'asc__su-header-hamburgerButton'
        document.body.style.overflow = 'inherit'
      }
    }
  }
}
</script>
<style lang="sass">
  .asc__su-header
    top: 0px
    width: 100%
    height: 130px
    position: fixed
    z-index: 9999
    color: #333
    padding: 0
    font-family: 'Raleway', sans-serif
    will-change: transform
    transition: transform 250ms linear
    width: 100%
    & a
      color: #333
    .asc__su-header-top
      height: 130px
      margin-top: 10px
      background: transparent
      .asc__su-header-show-headerLight
        display: inline-block
      .asc__su-header-show-headerDark
        display: none
      .asc__su-header-logo
        float: left
        .asc__su-header-show-headerLight
          display: inline-block
        .asc__su-header-show-headerDark
          display: none
        & a
          text-align: center
          width: 110px
          height: 110px
          border-radius: 110px
          background: #000
          display: block
          & img
            margin-top: 5px
            height: 100px
      .asc__su-header-nav
        float: left
        margin-left: 20px
        margin-top: 20px
        .asc__su-header-nav__head
          width: 100%
          font-size: 14px
        .asc__su-header-nav__list
          padding: 0
          margin-bottom: 0px
          list-style: none
          font-size: 16px
          letter-spacing: -0.1px
          & li
            display: inline-block
            color: #3b3e41
            position: relative
            letter-spacing: -0.3px
            .nuxt-link-exact-active
              border-bottom: 3px #000 solid
            & span
              cursor: pointer
              padding: 15px 0
              border-bottom: 3px transparent solid
              margin-right: 20px
              font-weight: 500
              color: #3b3e41
              display: block
              & i
                font-size: 10px
            & a
              padding: 15px 0
              border-bottom: 3px transparent solid
              margin-right: 20px
              font-weight: 500
              color: #3b3e41
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
              background: #fff
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
                color: #323232
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
                  color: #3b3e41
                  padding: 0px
                  display: block
            &:hover
              & ul
                display: block
                & li
                  & a
                    color: #3b3e41 !important
                    &:hover
                      color: #e86751 !important
    .asc__su-header-operations
      text-align: right
      margin-top: 62px
      height: 32px
      .asc__su-header-lang
        width: 32px
        cursor: pointer
        display: inline-block
        & img
          width: 100%
      .dropdown-item
        font-size: 12px
        line-height: 20px
        padding: 10px 15px
    .asc__su-header-hamburgerButton
      height: 70px
      padding-left: 15px
      padding-right: 15px
      padding-top: 15px
      padding-bottom: 15px
      margin-top: 30px
      @media (max-width: 668px)
        padding-left: 0
        padding-right: 0
        padding-top: 15px
        padding-bottom: 15px
      #hamburger
        position: relative
        -webkit-transform: rotate(0deg)
        -moz-transform: rotate(0deg)
        -o-transform: rotate(0deg)
        transform: rotate(0deg)
        -webkit-transition: .5s ease-in-out
        -moz-transition: .5s ease-in-out
        -o-transition: .5s ease-in-out
        transition: .5s ease-in-out
        cursor: pointer
        width: 30px
        height: 50px
        margin: auto
        & span
          display: block
          position: absolute
          height: 3px
          width: 100%
          background: #ffffff
          box-shadow: 0 0 0 1px #000
          border-radius: 3px
          opacity: 1
          left: 0
          -webkit-transform: rotate(0deg)
          -moz-transform: rotate(0deg)
          -o-transform: rotate(0deg)
          transform: rotate(0deg)
          -webkit-transition: .25s ease-in-out
          -moz-transition: .25s ease-in-out
          -o-transition: .25s ease-in-out
          transition: .25s ease-in-out
          &:nth-child(1)
            top: 10px
          &:nth-child(2)
            top: 18px
          &:nth-child(3)
            top: 18px
          &:nth-child(4)
            top: 26px
    .asc__su-header-openHamburgerButton
      #hamburger span
        background: #333
        &:nth-child(1)
          top: 18px
          width: 0%
          left: 50%
        &:nth-child(2)
          transform: rotate(45deg)
        &:nth-child(3)
          transform: rotate(-45deg)
        &:nth-child(4)
          top: 18px
          width: 0%
          left: 50%
  .asc__su-header-openMobileNav
    left: 0px
    transition: 0.3s
  .asc__su-header-mobile-nav
    position: fixed
    left: 0
    top: 150vh
    z-index: 9998
    padding: 50px 0 150px
    width: 100vw
    height: 100vh
    overflow-y: auto
    background: rgba(0,0,0,.94)
    color: #fff
    .asc__su-header-mobile-nav__list
      padding: 0 5% 35vh 5%
      margin-bottom: 0px
      list-style: none
      font-size: 16px
      letter-spacing: -0.1px
      text-align: center
      & li
        display: block
        text-align: center
        color: #fff
        position: relative
        letter-spacing: -0.3px
        font-weight: bold
        border-bottom: 1px #323232 solid
        padding: 15px 10px
        & a
          display: block
          font-weight: 500
          color: #fff
        & ul
          list-style: none
          padding: 10px 5%
          margin-top: 0px
          & li
            display: block
            color: #323232
            border-bottom: none
            width: 100%
            padding: 0
            transition: 0.3s
            font-weight: 500
            line-height: 40px
            margin-bottom: 0px
            & a
              color: #fff
              display: block
  .asc__su-header-headerDark
    transition: 0.2s
    background: rgba(0,0,0,.9)
    color: #d8d8d8 !important
    & a
      color: #d8d8d8 !important
    .asc__su-header-top
      .asc__su-header-nav
        .asc__su-header-nav__list
          & li
            & span
              color: #ffffff !important

    .asc__su-header-show-headerLight
      display: none !important
    .asc__su-header-show-headerDark
      display: inline-block !important
    .asc__su-header-logo
      & a
        background: #fff !important
        display: block !important
  .asc__su-header-headerLight
    transition: 0.2s
    background: transparent
    .asc__su-header-show-headerLight
      display: inline-block
    .asc__su-header-show-headerDark
      display: none
  .asc__su-header--pinned
    transform: translateY(0%)
  .asc__su-header--unpinned
    transform: translateY(-120%)
  .asc__su-header-mobile
    .asc__su-header-show-headerLight
      display: none
    .asc__su-header-show-headerDark
      display: inline-block
      width: 120px
      margin: 5px
      background: #ffffff
      border-radius: 120px
      padding: 2px
    #hamburger
      margin-right: 10px
</style>
