<template>
    <login-layout>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <b-field :label="$t('login.form.email.label')" :message="bMessage($v.form.email, {field: $t('login.form.email.validation.field')})" :type="bType($v.form.email.$error)">
                    <b-input name="email" v-model="form.email" @blur="$v.form.email.$touch()" @keyup.enter.native="handleLogin" />
                </b-field>
                <b-field :label="$t('login.form.password.label')" :message="bMessage($v.form.password, {field: $t('login.form.password.validation.field')})" :type="bType($v.form.password.$error)">
                    <b-input name="password" type="password" v-model="form.password" @blur="$v.form.password.$touch()" @keyup.enter.native="handleLogin" />
                </b-field>

                <label class="hasAccount">{{$t('login.form.haveAccount')}} <router-link :to="{name: 'register'}">{{$t('login.form.signup')}}</router-link></label>

                <button class="button is-primary" :class="{'is-loading': loading}" @click="handleLogin">{{ $t('login.form.actions.login') }}</button>
            </div>
        </div>
    </login-layout>
</template>

<script>
    import auth from '@/services/auth'
    import {mapGetters} from 'vuex'
    import LoginLayout from '@/components/layouts/Login'
    import {required, email} from 'vuelidate/lib/validators'
    import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'

    export default {
      name: 'Login',
      components: {
        LoginLayout
      },
      mixins: [BuefyVuelidateMixin],
      data () {
        return {
          loading: false,
          success: true,
          form: {
            email: null,
            password: null
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

          const success = await auth.login(this.form)

          this.loading = false

          if (success) {
            this.$router.push({name: 'projects'})
            return
          }

          this.$toast.open({
            message: this.$t('login.form.toastr.loginFailed'),
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
            },
            password: {
              required
            }
          }
        }
      }
    }
</script>

<style scoped>
  .hasAccount {
    display: block;
    margin-bottom: 10px;
  }
</style>