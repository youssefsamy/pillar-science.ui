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
                        <b-field  :message="bMessage($v.form.password, {field: $t('resetpassword.form.password.validation.field')})" :type="bType($v.form.password.$error)">
                          <b-input :placeholder="$t('resetpassword.form.password.label')" name="password" type="password" v-model="form.password" @blur="$v.form.password.$touch()" @keyup.enter.native="handleSubmit" />
                        </b-field>

                        <b-field  :message="bMessage($v.form.password_confirmation, {field: $t('resetpassword.form.password_confirmation.validation.field')})" :type="bType($v.form.password_confirmation.$error)">
                          <b-input :placeholder="$t('resetpassword.form.password_confirmation.label')" name="confirmPassword" type="password" v-model="form.password_confirmation" @blur="$v.form.password_confirmation.$touch()" @keyup.enter.native="handleSubmit" />
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
import {required} from 'vuelidate/lib/validators'
import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'

export default {
  name: 'ResetPassword',
  components: {
    ResetPasswordLayout
  },
  mixins: [BuefyVuelidateMixin],
  data () {
    return {
      token: '',
      loading: false,
      success: true,
      form: {
        password: null,
        password_confirmation: null,
        token: ''
      }
    }
  },
  mounted () {
    this.form.token = this.$route.params.token
    console.log(this.form.token)
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

      const success = await auth.resetPassword(this.form)

      this.loading = false

      if (success) {
        this.$router.push({name: 'projects'})
        return
      }

      this.$toast.open({
        message: this.$t('resetpassword.form.toastr.resetFailed'),
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
        password: {
          required
        },
        password_confirmation: {
          required
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
