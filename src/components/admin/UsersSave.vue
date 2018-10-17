<template>
    <admin-layout>
        <section class="box">
            <h1 class="title">{{ $t('admin.usersCreate.title') }}</h1>

            <b-field :label="$t('admin.usersCreate.form.name.label')" :message="bMessage($v.form.name, {field: $t('admin.usersCreate.form.name.validation.field')})" :type="bType($v.form.name.$error)">
                <b-input name="name" v-model="form.name" :type="bType($v.form.name.$error)" />
            </b-field>

            <b-field :label="$t('admin.usersCreate.form.email.label')" :message="bMessage($v.form.email, {field: $t('admin.usersCreate.form.email.validation.field')})" :type="bType($v.form.email.$error)">
                <b-input name="email" v-model="form.email" @blur="$v.form.email.$touch()" :disabled="isUpdate" />
            </b-field>

            <b-field :label="$t('admin.usersCreate.form.permissions.label')">
                <div v-if="permissions.length > 0" class="block">
                    <b-checkbox v-model="form.permissions" :key="p" :native-value="p" v-for="p in permissions">
                        {{ $t(`permissions.${p}`) }}
                    </b-checkbox>
                </div>
            </b-field>

            <b-field :label="$t('admin.usersCreate.form.teamsAdmin.label')">
                <b-taginput
                        v-model="form.teamsAdmin"
                        autocomplete
                        :data="filteredTeams"
                        field="name"
                        :placeholder="$t('admin.usersCreate.form.teamsAdmin.placeholder')"
                        icon="label"
                        @typing="text => textFilterTeams = text"
                        :allowNew="false">
                </b-taginput>
            </b-field>

            <b-field :label="$t('admin.usersCreate.form.teams.label')">
                <b-taginput
                        v-model="form.teams"
                        autocomplete
                        :data="filteredTeams"
                        field="name"
                        :placeholder="$t('admin.usersCreate.form.teams.placeholder')"
                        icon="label"
                        @typing="text => textFilterTeams = text"
                        :allowNew="false">
                </b-taginput>
            </b-field>

            <div class="field is-grouped">
                <div class="control">
                    <button id="createUser" :class="{'is-loading': loading}" class="button is-primary" @click="handleSave">{{ $t(submitText) }}</button>
                </div>
                <div class="control">
                    <router-link :to="{name: 'admin_users'}" class="button is-text">{{ $t('admin.usersCreate.form.cancel') }}</router-link>
                </div>
            </div>
        </section>

        <section class="box">
            <h1 class="title">{{ $t('admin.usersCreate.titles.pending_invitations') }}</h1>

            <b-field>
                <button class="button" :class="{'is-loading': loadingInvitationSending}" @click="sendNewInvitation">{{ $t('admin.usersCreate.actions.new_invitation.label') }}</button>
            </b-field>

            <ul>
                <li v-for="inv in invitations">{{ inv.status }} - {{ inv.created_at | moment_ll }}</li>
            </ul>
        </section>
    </admin-layout>
</template>

<script>
  import AdminLayout from '@/components/layouts/Admin'
  import {required, email} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import ErrorHelper from '@/services/errorHelper'
  import TeamEntity from '@/entities/team'
  import UserEntity from '@/entities/user'
  import formMixin from '@/mixins/formMixin'
  import {filters} from '@/plugins/moment'

  export default {
    name: 'UsersSave',
    components: {
      AdminLayout
    },
    mixins: [BuefyVuelidateMixin, formMixin],
    data () {
      return {
        resource: 'users',
        permissions: [],
        teams: [],
        loading: false,
        loadingInvitationSending: false,
        textFilterTeams: '',
        invitations: [],
        form: {
          name: null,
          email: null,
          permissions: [],
          teamsAdmin: [],
          teams: []
        }
      }
    },
    async mounted () {
      let response = await this.$api.userPermissions()

      this.permissions = response.data

      response = await this.$api.teamSearch()

      this.teams = TeamEntity.collection(response.data)

      if (this.isUpdate) {
        this.loadModel()
      }
    },
    methods: {
      async sendNewInvitation () {
        this.loadingInvitationSending = true
        await this.$api.userInvitationRenew(this.resourceId)

        this.loadingInvitationSending = false
        this.$toast.open({
          message: `${this.$t('admin.usersCreate.form.toastr.invitationSent')} ${this.form.name}`
        })
      },
      async handleSave () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.loading = true

        const form = {
          data: {
            ...this.form
          }
        }

        if (this.isUpdate) {
          delete form.data.email
        }

        form.data.teamsAdmin = form.data.teamsAdmin.map(team => team.id)
        form.data.teams = form.data.teams.map(team => team.id)

        try {
          await this.$http({...this.saveRequest, ...form})
        } catch (error) {
          const helper = new ErrorHelper(error)

          this.$toast.open({
            message: helper.any(['email', 'name'])
          })

          return
        }

        this.loading = false

        this.$toast.open({
          message: `${this.$t('admin.usersCreate.form.toastr.invitationSent')} ${this.form.name}`
        })

        this.$router.push({name: 'admin_users'})
      },
      async loadModel () {
        const response = await this.$http(this.getRequest)

        const user = UserEntity.single(response.data)

        this.invitations = response.data.invitations

        this.form = {
          name: user.name,
          email: user.email,
          permissions: user.permissions,
          teamsAdmin: user.adminTeams,
          teams: user.userTeams
        }
      }
    },
    computed: {
      /**
       * formMixin override
       */
      createUrl () {
        return '/api/auth/signup'
      },
      /**
       * Match the autocomplete and that is not already selected
       */
      filteredTeams () {
        return this.teams
          .filter(team => team.name.toLowerCase().indexOf(this.textFilterTeams.toLowerCase()) >= 0)
          .filter(team => !this.form.teams.map(t => t.id).includes(team.id) && !this.form.teamsAdmin.map(t => t.id).includes(team.id))
      }
    },
    filters: {
      moment_ll: filters.moment_ll
    },
    validations () {
      return {
        form: {
          email: {
            required,
            email
          },
          name: {
            required
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>