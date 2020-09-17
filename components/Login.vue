<template>
  <div class="asc__su-auth">
    <h2>
      {{ $t('auth.login') }}
    </h2>
    <b-row class="asc__su-auth-info py-3">
      <b-col cols="12" class="mt-3">
        <b-form-group :class="{ 'form-group--error': $v.form.uemail.$error }">
          <b-form-input v-model.trim="$v.form.uemail.$model" type="email" />
        </b-form-group>
        <b-form-group :class="{ 'form-group--error': $v.form.upassword.$error }">
          <b-form-input v-model.trim="$v.form.upassword.$model" type="password" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="formError" class="asc__su-auth-submit mt-5">
      {{ formError }}
    </b-row>
    <b-row class="asc__su-auth-submit mt-5">
      <b-col cols="4">
        &nbsp;
      </b-col>
      <b-col cols="8" class="text-right">
        <b-button variant="success" size="lg" type="button" @click="submit()">
          {{ $t('auth.submit') }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      formError: '',
      form: {
        uemail: '',
        upassword: ''
      }
    }
  },
  computed: mapState(['pariette', 'token', 'authUser']),
  methods: {
    submit () {
      if (this.$v.form.$invalid) {
        alert('validate')
      } else {
        this.login()
      }
    },
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.form.uemail,
          password: this.form.upassword
        })
      } catch (e) {
        this.formError = e.message
      }
    }
  },
  validations: {
    form: {
      uemail: {
        required,
        email
      },
      upassword: {
        required
      }
    }
  }
}
</script>
<style lang="sass">
</style>
