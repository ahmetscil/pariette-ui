<template>
  <div id="app">
    <ParietteBar />
    <Header />
    <div class="asc__su-fixed-right">
      <div class="asc__su-fixed-right-text">
        <nuxt-link :to="{name: 'url', params: { url: 'fiyat-listesi'}}">
          {{ $t('form.contactForm') }}
        </nuxt-link>
      </div>
      <div class="asc__su-fixed-right-img">
        <a target="_blank" href="https://wa.me/+905415966667">
          <img src="../static/whatsapp.svg">
        </a>
      </div>
      <div class="asc__su-fixed-right-img">
        <a target="_blank" href="https://instagram.com/istasyonyurtlari">
          <img src="../static/instagram.svg">
        </a>
      </div>
    </div>
    <div class="asc__su-site__start">
      <nuxt />
    </div>
    <Footer />
    <Modal v-if="modalShow">
      <!-- <Admin /> -->
      <Login />
    </Modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Login from '@/components/Login'
import Modal from '@/components/Modal'
import ParietteBar from '@/components/ParietteBar'
export default {
  components: {
    Header,
    Footer,
    Login,
    Modal,
    ParietteBar
  },
  computed: mapState(['modalShow'])
}
</script>
<style lang="sass">
  *
    outline: none !important
  .form-control
    &:focus
      // box-shadow: 0 0 0 0.2rem rgba(232, 232, 232, 0.25)
      box-shadow: none !important
  body
    font-family: 'Open Sans', sans-serif;
    background: #fbf9f6
    color: #3B3635
  .hasError
    & label
      color: red
    & input, select, textarea
      border-bottom: 1px red solid !important
      background-color: red !important
      color: #fff !important
  a
    &:hover
      text-decoration: none !important
  .form-group--error
    color: #ff0000
    & legend
      color: #ff0000 !important
    .form-control,
    .vs__dropdown-toggle
      border-bottom: 1px #ff0000 solid !important
      background: #ff000005 !important
  .activeNavigationMainMenu
    color: #E86950 !important
  .vgt-table
    font-size: 12px !important
    & thead
      & th
        background: #fff !important
        color: #E86950 !important
    & tbody
      & tr
        background: #f1f1f1
        &:nth-child(2n+1)
          background: #f9f9f9
  .pageLoader
    width: 100%
    height: 100%
    position: fixed
    top: 0px
    left: 0px
    z-index: 99999999
    background: #ffffff url('https://s3.eu-west-2.amazonaws.com/boltcdn/img/loadingImg.svg') no-repeat center center
  .asc__su-content__loader__mini
    position: absolute
    // display: none
    width: 100%
    height: 100%
    z-index: 999
    background-image: url('https://s3.eu-west-2.amazonaws.com/boltcdn/img/miniloader.svg')
    background-position: 50% 50%
    background-repeat: no-repeat
    top: 0
    left: 0
  .asc__su-css__backbutton
    background: #fff
    color: #E86950
    border: none
    width: 45px
    height: 45px
    display: block
    text-align: center
    line-height: 45px
    &:hover
      color: darken(#E86950, 20%)
  .asc__su-site__start
    min-height: 100vh
    padding-top: 130px
    padding-bottom: 200px
    @media (max-width: 667px)
      padding-top: 0
  .asc__su-fixed-right
    position: fixed
    right: -130px
    top: 50%
    transform: rotate(-90deg)
    box-shadow: 0px 0px 20px #000
    height: 50px
    width: 310px
    padding: 0
    background: #fff
    border-radius: 5px 0 0 5px
    z-index: 9999
    @media (max-width: 667px)
      transform: rotate(0deg)
      top: inherit
      bottom: 0
      right: 0
      left: 0
      width: 100%
    .asc__su-fixed-right-img
      height: 50px
      width: 50px
      display: inline-block
      text-align: center
      line-height: 50px
      & img
        width: 30px
    .asc__su-fixed-right-text
      width: 200px
      float: left
      color: #333
      display: inline-block
      font-size: 20px
      line-height: 50px
      font-family: Raleway
      font-weight: 700
      @media (max-width: 667px)
        width: calc(100% - 110px)
      & a
        display: block
        text-align: center
        width: 100%
        line-height: 50px
        color: #000
  .asc__su-general__page
    padding-top: 1rem
    padding-bottom: 60px
    & p
      font-family: 'Montserrat', sans-serif !important
      & a
        color: #000
        text-decoration: underline
    & li
      list-style: none
      position: relative
      margin-bottom: 6px
      font-size: 14px
      &:before
        border-bottom: 2px #E86950 solid
        width: 15px
        height: 1px
        content: ""
        position: absolute
        left: -25px
        top: 10px
      & ul
        margin-top: 6px
        margin-bottom: 16px
        padding-left: 16px
        & li
          list-style: none
          position: relative
          &:before
            border: .5px #E86950 solid
            width: 10px
            height: 10px
            border-radius: 10px
            content: ""
            position: absolute
            left: -15px
            top: 5px

    .btn-border
      border: 1px #E86950 solid
      color: #333
      border-radius: 0px
      background: #fff
      transition: .3s
      &:hover
        background: #f2f2f240
        transition: .3s
    .btn-border-xs
      font-size: 12px
    .btn-hover-arrow
      font-size: 10px
      color: #333
      font-weight: bolder
      &::after
        content: "\2192"
        margin-left: 3px
        transition: 0.3s
      &:hover
        color: #000
        &::after
          margin-left: 6px
          transition: 0.3s
    & h1
      font-size: 50px
      color: #E86950
    & h2
      font-size: 38px
      color: #E86950
    & h3
      font-size: 28px
      color: #E86950
    & h4
      font-size: 23px
      color: #E86950
    & h5
      font-size: 21px
      color: #E86950
    & h6
      font-size: 16px
    & p
      font-size: 14px
  .asc__su-sidebar__box
    background: #fff
  .asc__su-sidebar__bannerbox
    width: 100%
    max-height: 218px
    background: #fff
    margin-bottom: 1rem
    .asc__su-sitebar__imgbanner
      width: 100%
      overflow: hidden
      & img
        width: 100%
    @media (max-width: 990px)
      width: 50%
      margin: 0 auto 1rem auto
      display: inline-block
      height: auto
      .asc__su-sitebar__imgbanner
        height: inherit
    @media (max-width: 5750px)
      width: 100%
      margin: 0 auto 1rem auto
      display: block
      height: auto
      max-height: inherit
  .asc__su-sidebar__bannerArea
    padding-left: 3rem
    @media (max-width: 990px)
      padding-left: 15px
  .pageAnimate-enter-active
    opacity: 1
    animation: pulsein 0.8s ease-in
  .pageAnimate-leave-active
    opacity: 1
    animation: pulseout 0.2s ease-in

  @keyframes pulseout
    0%
      transform: scale3d(1, 1, 1)
      opacity: 1
    100%
      transform: scale3d(1.05, 1.05, 1.05)
      opacity: 0
  @keyframes pulsein
    0%
      opacity: 0
      transform: scale3d(1.05, 1.05, 1.05)
    100%
      opacity: 1
      transform: scale3d(1, 1, 1)
  .asc__su-w100
    width: 100%
  .asc__su-w75
    width: 75%
  .asc__su-w50
    width: 50%
  .asc__su-w25
    width: 25%
  .asc__su-h100vh
    height: 100vh
  .asc__su-h75vh
    height: 75vh
  .asc__su-h50vh
    height: 50vh
  .asc__su-h25vh
    height: 25vh
  .asc__su-h25vh-noimg
    height: 25vh
    background: #fff !important
    color: #000 !important
  .asc__su-DataBox
    position: relative
    box-sizing: border-box
  .asc__su-carousel
    box-sizing: border-box
    position: relative
</style>
