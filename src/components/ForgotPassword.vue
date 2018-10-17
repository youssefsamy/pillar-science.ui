<template>
    <reset-password-layout>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <div class="box">
                    <div class="logo-image">
                        <img src="@/assets/logo-dark-origignal.png">
                    </div>
                    <hr>
                    <div class="form">
                        <b-field  :message="bMessage($v.form.email, {field: $t('resetpassword.form.email.validation.field')})" :type="bType($v.form.email.$error)">
                          <b-input :placeholder="$t('resetpassword.form.email.label')" name="email" v-model="form.email" @blur="$v.form.email.$touch()" @keyup.enter.native="handleLogin" />
                        </b-field>

                       
                        <button class="button is-primary is-fullwidth" :class="{'is-loading': loading}" @click="handleSubmit">{{ $t('resetpassword.form.submit') }}</button>

                        <router-link :to="{name: 'login'}">{{$t('resetpassword.form.backsignin')}}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </reset-password-layout>
</template>

<script>
import ResetPasswordLayout from '@/components/layouts/ResetPassword'
import auth from '@/services/auth'
import {mapGetters} from 'vuex'
import {required, email} from 'vuelidate/lib/validators'
import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'

export default {
  name: 'ForgotPassword',
  components: {
    ResetPasswordLayout
  },
  mixins: [BuefyVuelidateMixin],
  data () {
    return {
      loading: false,
      success: true,
      form: {
        email: null
      }
    }
  },
  mounted () {
    if (auth.isAuthenticated() && !auth.isSessionExpired()) {
      this.$router.push({name: 'projects'})
    }
  },
  methods: {
    async handleSubmit () {
      this.$v.$touch()

      if (this.$v.$error) {
        return
      }

      this.loading = true

      const success = await auth.forgotPassword(this.form)

      this.loading = false

      if (success) {
        this.$toast.open({
          message: 'Message successfully sent, please check your email',
          type: 'is-success',
          position: 'is-bottom'
        })

        return
      }

      this.$toast.open({
        message: this.$t('register.form.toastr.registerFailed'),
        type: 'is-danger',
        position: 'is-bottom'
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  validations () {
    return {
      form: {
        email: {
          required,
          email
        }
      }
    }
  }
}
</script>

<style>
  .form {
    
  }

  .hasAccount {
    padding-top: 10px;
    display: inline-block;
  }
</style>
