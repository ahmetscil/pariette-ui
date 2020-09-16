<template>
  <div class="asc__su-mailform">
    <b-row>
      <b-col cols="12">
        <b-form-group :label="$t('form.name')">
          <b-form-input
            v-model="form.name"
            required
            :placeholder="$t('form.name')"
          />
        </b-form-group>
        <b-form-group :label="$t('form.email')">
          <b-form-input
            v-model="form.email"
            type="email"
            required
            :placeholder="$t('form.email')"
          />
        </b-form-group>
        <b-form-group :label="$t('form.phone')">
          <b-form-input
            v-model="form.phone"
            type="tel"
            required
            :placeholder="$t('form.phone')"
          />
        </b-form-group>
        <b-form-group>
          <b-form-checkbox-group v-model="isChecked">
            <b-form-checkbox value="1">
              {{ $t('form.kvkk') }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <div class="float-right">
          <b-button id="loginButton" type="button" variant="default" @click="onSubmit">
            <span id="loginLoaderText">
              {{ $t('form.submitreq') }}
            </span>
            <b-spinner id="loginLoader" style="display: none; text-align: center" label="Spinning" />
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        phone: '',
        subject: 'Fiyat Bilgisi'
      },
      isChecked: false
    }
  },
  computed: mapState(['settings', 'navigation', 'authUser']),
  mounted () {
  },
  methods: {
    onSubmit () {
      const user = {
        email: this.form.email,
        name: this.form.name,
        phone: this.form.phone,
        kvkk: this.isChecked[0],
        api_token: 0,
        company: 1,
        level: 0,
        status: 9,
        infomail: this.settings.email,
        customer: '113VP3nHVC34ZrizRsF7TDmQlwJ3DwitIqLwzWhKr7m3NE8wVxGMsdC8CizAmKIq',
        subject: this.form.subject
      }
      this.$store.dispatch('emailList', user)
    }
  }
}
</script>
<style lang="sass">
  .asc__su-mailform
    position: relative
    background: #000
    color: #fff
    border-radius: 10px
    padding: 20px
    font-size: 14px
    font-style: italic
    font-family: 'Raleway', sans-serif
    & button
      font-size: 14px
      font-style: italic
      font-family: 'Raleway', sans-serif
      background: #ffffff
      color: #000
    & input
      &::-webkit-input-placeholder
        font-size: 13px
        color: #999
      &::-moz-placeholder
        font-size: 13px
        color: #999
      &:-ms-input-placeholder
        font-size: 13px
        color: #999
      &::-webkit-input-placeholder
        color: #999
        font-size: 13px
      &::placeholder
        color: #999
        font-size: 13px
</style>
