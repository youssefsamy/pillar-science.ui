<template>
    <admin-layout>
        <section class="box">
            <h1 class="title">{{ $t('admin.usersCreate.title') }}</h1>

            <b-field :label="$t('admin.usersCreate.form.name.label')" :message="bMessage($v.form.name, {field: $t('admin.usersCreate.form.name.validation.field')})" :type="bType($v.form.name.$error)">
                <b-input name="name" v-model="form.name" :type="bType($v.form.name.$error)" />
            </b-field>

            <b-field :label="$t('admin.usersCreate.form.email.label')" :message="bMessage($v.form.email, {field: $t('admin.usersCreate.form.email.validation.field')})" :type="bType($v.form.email.$error)">
                <b-input name="email" v-model="form.email" @blur="$v.form.email.$touch()" />
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
                    <button id="createUser" :class="{'is-loading': loading}" class="button is-primary" @click="handleCreate">{{ $t('admin.usersCreate.form.create') }}</button>
                </div>
                <div class="control">
                    <router-link :to="{name: 'admin_users'}" class="button is-text">{{ $t('admin.usersCreate.form.cancel') }}</router-link>
                </div>
            </div>
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

  export default {
    name: 'UsersCreate',
    components: {
      AdminLayout
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        permissions: [],
        teams: [],
        loading: false,
        textFilterTeams: '',
        form: {
          id: null,
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

      response = await this.$api.user(this.$route.params.id)

      const user = UserEntity.single(response.data)

      this.form = {
        name: user.name,
        email: user.email,
        permissions: user.permissions,
        teamsAdmin: user.adminTeams.map(t => t.id),
        teams: user.teams.map(t => t.id)
      }
    },
    methods: {
      async handleCreate () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.loading = true

        const form = {
          ...this.form
        }

        form.teamsAdmin = form.teamsAdmin.map(team => team.id)
        form.teams = form.teams.map(team => team.id)

        try {
          await this.$api.userUpdate(this.$route.params.id, form)
        } catch (error) {
          const helper = new ErrorHelper(error)

          this.$toast.open({
            message: helper.any(['email', 'name'])
          })
        }

        this.loading = false

        this.$toast.open({
          message: `${this.$t('admin.usersCreate.form.toastr.invitationSent')} ${this.form.name}`
        })

        this.$router.push({name: 'admin_users'})
      }
    },
    computed: {
      /**
       * Match the autocomplete and that is not already selected
       */
      filteredTeams () {
        return this.teams
          .filter(team => team.name.toLowerCase().indexOf(this.textFilterTeams.toLowerCase()) >= 0)
          .filter(team => !this.form.teams.map(t => t.id).includes(team.id) && !this.form.teamsAdmin.map(t => t.id).includes(team.id))
      }
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