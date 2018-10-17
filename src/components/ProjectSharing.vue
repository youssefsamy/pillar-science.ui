<template>
    <project-menu active="settings" :project="project">
        <div class="tile is-child">
            <section v-if="canEditSharing" class="box">
                <b-field grouped>
                    <b-field>
                        <b-autocomplete
                                v-model="query"
                                :data="autocompleteUsers"
                                :placeholder="$t('projectSharing.fields.query.placeholder')"
                                field="name"
                                :loading="isFetching"
                                @input="handleFetchData"
                                @select="handleSelection"
                        />
                    </b-field>

                    <b-field>
                        <b-select v-model="form.role">
                            <option :value="role.value" v-for="role in projectRolesArray">{{ $t(role.translationKey) }}</option>
                        </b-select>
                    </b-field>

                    <b-field>
                        <button class="button is-success" :class="{'is-loading': addingUser}" :disabled="!selection" @click="handleAddUser">
                            <fa-icon icon="plus-circle" size="lg" />
                            <span>{{ $t('projectSharing.actions.add.label') }}</span>
                        </button>
                    </b-field>
                </b-field>
            </section>

            <section class="box">
                <b-table :data="users">
                    <section slot="empty">
                        {{ $t('projectSharing.messages.users.empty') }}
                    </section>
                    <template slot-scope="props">
                        <b-table-column :label="$t('projectSharing.results.fields.name.label')">
                            {{ props.row.name }}
                        </b-table-column>

                        <b-table-column :label="$t('projectSharing.results.fields.role.label')">
                            {{ $t(projectRoles.get(props.row.pivot.role).translationKey) }}
                        </b-table-column>

                        <b-table-column :label="$t('projectSharing.results.fields.shared.label')">
                            {{ props.row.pivot.created_at | humanReadable }}
                        </b-table-column>

                        <b-table-column :label="$t('projectSharing.results.fields.remove.label')">
                            <button class="button is-danger" :disabled="isDeleteDisabled(props.row)" :class="{'is-loading': deletingUser && deletingUser.id === props.row.id}" @click="handleDeleteUser(props.row)">
                                <fa-icon icon="minus-circle" size="lg" />
                                <span>{{ $t('projectSharing.results.fields.remove.label') }}</span>
                            </button>
                        </b-table-column>
                    </template>
                </b-table>
            </section>
        </div>
    </project-menu>
</template>

<script>
  import ProjectMenu from '@/components/projects/ProjectMenu'
  import projectRoles from '@/staticCollections/projectRoles'
  import {debounce} from 'lodash'
  import {filters} from '@/plugins/moment'
  import {mapGetters} from 'vuex'
  import swal from 'sweetalert2'

  export default {
    name: 'ProjectSharing',
    components: {
      ProjectMenu
    },
    data () {
      return {
        autocompleteUsers: [],
        isFetching: false,
        query: null,
        users: [],
        selection: null,
        addingUser: false,
        deletingUser: false,
        form: {
          role: null
        }
      }
    },
    async mounted () {
      this.form.role = projectRoles.get('viewer').value

      const response = await this.$api.projectUsers(this.project.id)

      this.users = response.data
    },
    methods: {
      handleFetchData: debounce(async function () {
        this.autocompleteUsers = []

        if (!this.query) {
          return
        }

        this.isFetching = true

        const response = await this.$api.searchProjectAvailableUsers(this.project.id, this.query)

        response.data.forEach(item => this.autocompleteUsers.push(item))
        this.isFetching = false
      }, 200),
      handleSelection (user) {
        this.selection = user
      },
      async handleAddUser () {
        this.addingUser = true
        const response = await this.$api.projectUsersAttach(this.project.id, this.selection.id, this.form)

        this.users.push(response.data)

        this.selection = null
        this.query = null
        this.addingUser = false
      },
      async handleDeleteUser (user) {
        this.deletingUser = user

        const confirmation = await this.confirmForSelf()

        if (!confirmation) {
          this.deletingUser = null
          return
        }

        await this.$api.projectUsersDelete(this.project.id, user.id)

        if (this.user.id === user.id) {
          this.$router.push({name: 'projects'})
        }

        const index = this.users.findIndex(u => u.id === user.id)

        this.users.splice(index, 1)

        this.deletingUser = null
      },
      async confirmForSelf () {
        if (this.deletingUser.id !== this.user.id) {
          return true
        }

        const input = await swal({
          type: 'warning',
          title: this.$t('projectSharing.swal.confirmSelf.title'),
          text: this.$t('projectSharing.swal.confirmSelf.text'),
          confirmButtonText: this.$t('projectSharing.swal.confirmSelf.confirmButtonText'),
          cancelButtonText: this.$t('projectSharing.swal.confirmSelf.cancelButtonText'),
          showCancelButton: true
        })

        return Boolean(input.value)
      },
      isDeleteDisabled (row) {
        const rowRole = projectRoles.get(row.pivot.role)

        return (!this.canEditSharing && row.id !== this.user.id) || this.role.order < rowRole.order
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/user',
        project: 'project/project',
        canViewSharing: 'project/canViewSharing',
        canEditSharing: 'project/canEditSharing'
      }),
      role () {
        return projectRoles.get(this.project.pivot.role)
      },
      projectRoles () {
        return projectRoles
      },
      projectRolesArray () {
        return projectRoles.all().filter(r => r.order <= this.role.order)
      }
    },
    filters: {
      humanReadable (d) {
        return filters.moment_from(d)
      }
    }
  }
</script>

<style scoped>

</style>