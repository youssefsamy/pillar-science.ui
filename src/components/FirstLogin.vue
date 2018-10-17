<template>
    <login-layout>
        <template v-if="invitation">
            <h1 class="title">
                {{ $t('join.title') }}
            </h1>
            <h2 class="subtitle">
                {{ invitation.user.name }}
            </h2>

            <div class="box">
                <h2 class="subtitle">{{ $t('join.form.header') }}</h2>
                <i18n path="join.form.expiration" class="has-text-grey" tag="p">
                    <span place="expires_at">{{ invitation.expires_at | moment_from }}</span>
                </i18n>
                <br>
                <b-field id="password" :label="$t('join.form.password.label')" :message="bMessage($v.form.password, validationsMeta.form.password)" :type="bType($v.form.password.$error)">
                    <b-input name="password" type="password" v-model="form.password" @blur="$v.form.password.$touch()" />
                </b-field>

                <b-field id="passwordConfirm" :label="$t('join.form.passwordConfirm.label')" :message="bMessage($v.passwordConfirm, validationsMeta.passwordConfirm)" :type="bType($v.passwordConfirm.$error)">
                    <b-input name="passwordConfirm" type="password" v-model="passwordConfirm" @blur="$v.passwordConfirm.$touch()" />
                </b-field>

                <b-field label="Teams" v-if="invitation.user.teams.length > 0">
                    <ul>
                        <li v-for="team in teams">{{ team.name }} as {{ $t(team.pivot.roleStructure.translationKey) }}</li>
                    </ul>
                </b-field>

                <b-field>
                    <b-checkbox v-model="termsOfService">
                        <i18n path="join.form.termsOfService.label" tag="span">
                            <a href="/static/pillar-science-saas-agreement-20171016.pdf" target="_blank">{{ $t('join.form.termsOfService.link') }}</a>
                        </i18n>
                    </b-checkbox>
                </b-field>

                <b-message v-if="$v.termsOfService.$error" type="is-danger" has-icon>
                    Please indicate that you have read and agree to the Software as a Service Agreement.
                </b-message>

                <button id="submit" class="button is-primary" @click="handleSubmit">{{ $t('join.form.continue') }}</button>
            </div>
        </template>
    </login-layout>
</template>

<script>
  import auth from '@/services/auth'
  import LoginLayout from '@/components/layouts/Login'
  import ErrorHelper from '@/services/errorHelper'
  import {mapActions} from 'vuex'
  import {minLength, sameAs, required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import JoinInvitationEntity from '@/entities/joinInvitation'

  export default {
    name: 'FirstLogin',
    components: {
      LoginLayout
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        invitation: null,
        passwordConfirm: null,
        termsOfService: false,
        form: {
          password: null
        }
      }
    },
    async mounted () {
      try {
        const {data} = await this.$api.invitation(this.token)

        this.invitation = JoinInvitationEntity.single(data)
      } catch (error) {
        const helper = new ErrorHelper(error)

        helper.updatePageStatusCode()
      }
    },
    methods: {
      ...mapActions({
        setStatusNotFound: 'http/setStatusNotFound'
      }),
      async handleSubmit () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.loading = true

        try {
          await this.$api.invitationConsume(this.token, this.form)

          const credentials = {
            email: this.invitation.user.email,
            password: this.form.password
          }

          await auth.login(credentials)

          this.$router.push({name: 'projects'})
        } catch (error) {
          this.$toast.open({
            message: this.$t('join.form.validation.errors.invalidPassword'),
            type: 'is-danger',
            position: 'is-bottom'
          })
        }

        this.loading = false
      }
    },
    computed: {
      token () {
        return this.$route.params.token
      },
      teams () {
        const teams = this.invitation.user.teams

        if (!teams) {
          return []
        }

        return teams.sort((a, b) => {
          if (a.pivot.roleStructure.order < b.pivot.roleStructure.order) {
            return -1
          } else if (a.pivot.roleStructure.order > b.pivot.roleStructure.order) {
            return 1
          }

          return 0
        })
      },
      validationsMeta () {
        return {
          passwordConfirm: {
            field: this.$t('join.form.validation.passwordConfirm.field'),
            target: this.$t('join.form.validation.passwordConfirm.target')
          },
          form: {
            password: {
              field: this.$t('join.form.validation.password.field'),
              length: 8
            }
          }
        }
      }
    },
    validations () {
      return {
        passwordConfirm: {
          sameAs: sameAs(function () {
            return this.form.password
          })
        },
        termsOfService: {
          required
        },
        form: {
          password: {
            required,
            minLength: minLength(this.validationsMeta.form.password.length)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>