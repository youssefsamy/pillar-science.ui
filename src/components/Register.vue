<template>
    <register-layout>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <div class="box">
                    <div class="logo-image">
                        <img src="@/assets/logo-dark-origignal.png">
                    </div>
                    <hr>
                    <div class="form">
                        <b-field  :message="bMessage($v.form.email, {field: $t('register.form.email.validation.field')})" :type="bType($v.form.email.$error)">
                          <b-input :placeholder="$t('register.form.email.label')" name="email" v-model="form.email" @blur="$v.form.email.$touch()" @keyup.enter.native="handleLogin" />
                        </b-field>

                        <b-field  :message="bMessage($v.form.password, {field: $t('register.form.password.validation.field')})" :type="bType($v.form.password.$error)">
                          <b-input :placeholder="$t('register.form.password.label')" type="password" name="password" v-model="form.password" @blur="$v.form.password.$touch()" @keyup.enter.native="handleLogin" />
                        </b-field>

                        <div class="columns">
                          <div class="column is-one-third">
                            <b-field :message="bMessage($v.form.firstName, {field: $t('register.form.firstName.validation.field')})" :type="bType($v.form.firstName.$error)">
                              <b-input :placeholder="$t('register.form.firstName.label')" name="firstName" type="text" v-model="form.firstName" @blur="$v.form.firstName.$touch()" @keyup.enter.native="handleLogin" />
                            </b-field>
                          </div>
                          <div class="column">
                            <b-field  :message="bMessage($v.form.lastName, {field: $t('register.form.lastName.validation.field')})" :type="bType($v.form.lastName.$error)">
                              <b-input :placeholder="$t('register.form.lastName.label')" name="lastname" v-model="form.lastName" @blur="$v.form.lastName.$touch()" @keyup.enter.native="handleLogin" />
                            </b-field>
                          </div>
                        </div>

                       
                        <b-field>
                          <b-input :placeholder="$t('register.form.company.label')" name="company" type="text" v-model="form.company" @keyup.enter.native="handleLogin" />
                        </b-field>

                        <b-field>
                          <b-input :placeholder="$t('register.form.phone.label')" name="phone" type="text" v-model="form.phone" @keyup.enter.native="handleLogin" />
                        </b-field>
                       
                        <button class="button is-primary is-fullwidth" :class="{'is-loading': loading}" @click="handleLogin">{{ $t('register.form.actions.register') }}</button>

                        <label class="hasAccount">{{$t('register.form.haveAccount')}} <router-link :to="{name: 'login'}">{{$t('register.form.signin')}}</router-link></label>

                        <div class="signwith">
                          <h2>{{$t('register.form.signupwith')}}</h2>
                          <div class="social">
                            <button class="button is-primary" @click="loginWithSocial('facebook')">facebook</button>
                             <button class="button is-primary" @click="loginWithSocial('google')">Google</button>
                             <button class="button is-primary" @click="loginWithSocial('linkedin')">Linkedin</button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </register-layout>
</template>

<script>
import RegisterLayout from '@/components/layouts/Register'
import auth from '@/services/auth'
import {mapGetters} from 'vuex'
import {required, email} from 'vuelidate/lib/validators'
import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
import moment from 'moment'

export default {
  name: 'Register',
  components: {
    RegisterLayout
  },
  mixins: [BuefyVuelidateMixin],
  data () {
    return {
      loading: false,
      success: true,
      form: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        company: null,
        phone: null
      }
    }
  },
  mounted () {
    if (auth.isAuthenticated() && !auth.isSessionExpired()) {
      this.$router.push({name: 'projects'})
    }
  },
  methods: {
    async handleLogin () {
      this.$v.$touch()

      if (this.$v.$error) {
        return
      }

      this.loading = true

      const success = await auth.register(this.form)

      this.loading = false

      if (success) {
        this.$router.push({name: 'projects'})
        return
      }

      this.$toast.open({
        message: this.$t('register.form.toastr.registerFailed'),
        type: 'is-danger',
        position: 'is-bottom'
      })
    },

    async loginWithSocial (social) {
      var that = this
      window.open(process.env.API_URL + '/api/auth/login/' + social, '', 'width=600, height=600')
      window.addEventListener('message', function (event) {
        try {
          let data = event.data
          if (data.type && data.type === 'social_login') {
            window.localStorage.setItem('token', data.token)
            const expiresAt = moment().add(data.expires_in, 'seconds')
            window.localStorage.setItem('expires_at', expiresAt.toISOString())
            auth.refreshUser()
            that.$router.push({name: 'projects'})
          }
        } catch (error) {
        }
      }, {
        once: true
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
        },
        password: {
          required
        },
        firstName: {
          required
        },
        lastName: {
          required
        },
        company: {},
        phone: {}
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

  .signwith {
    text-align: center;
    margin-top: 20px;
  }

  .signwith h2 {
    font-size: 30px;
  }
</style>
