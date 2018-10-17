<template>
    <admin-layout>
        <section class="box">
            <h1 class="title">{{ $t('admin.teams.title') }}</h1>

            <b-table id="adminTeamsTable" :loading="loading" :data="teams">
                <p slot="empty">
                    {{ $t('admin.teams.table.empty') }}
                </p>
                <template slot-scope="props">
                    <b-table-column label="ID" numeric>
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column :label="$t('admin.teams.table.name.label')">
                        {{ props.row.name }}
                    </b-table-column>

                    <b-table-column :label="$t('admin.teams.table.admins.label')" numeric>
                        <span v-if="props.row.members">{{ props.row.adminUsers.length }}</span>
                        <span v-if="!props.row.members">0</span>
                    </b-table-column>

                    <b-table-column :label="$t('admin.teams.table.users.label')" numeric>
                        <span v-if="props.row.members">{{ props.row.users.length }}</span>
                        <span v-if="!props.row.members">0</span>
                    </b-table-column>

                    <b-table-column :label="$t('admin.teams.table.createdAt.label')">
                        {{ props.row.created_at | moment_ll }}
                    </b-table-column>

                    <b-table-column>
                        <a href="#" @click.prevent="handleRemove(props.row)">Remove</a>
                    </b-table-column>
                </template>
            </b-table>
            <br>
            <router-link :to="{name: 'admin_teams_create'}" class="button">{{ $t('admin.teams.actions.create') }}</router-link>
        </section>
    </admin-layout>
</template>

<script>
  import AdminLayout from '@/components/layouts/Admin'
  import TeamEntity from '@/entities/team'
  import swal from 'sweetalert2'
  import theme from '../../assets/theme.scss'

  export default {
    name: 'AdminTeams',
    components: {
      AdminLayout
    },
    data () {
      return {
        loading: false,
        teams: []
      }
    },
    async mounted () {
      this.loading = true
      const {data} = await this.$api.teamSearch()
      this.teams = TeamEntity.collection(data)

      this.loading = false
    },
    methods: {
      async handleRemove (team) {
        let response = await swal({
          title: this.$t('admin.teams.swal.remove.title'),
          text: this.$t('admin.teams.swal.remove.text', {team: team.name}),
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: this.$t('admin.teams.swal.remove.confirm'),
          cancelButtonText: this.$t('admin.teams.swal.remove.cancel'),
          confirmButtonColor: theme.danger
        })

        if (!response.value) {
          return
        }

        try {
          response = await this.$api.teamDelete(team.id)
        } catch (e) {
          await swal({
            title: this.$t('admin.teams.swal.error.title'),
            text: this.$t('admin.teams.swal.error.text', {team: team.name}),
            type: 'error'
          })

          return
        }

        this.teams.splice(this.teams.findIndex(TeamEntity.findIndex, team), 1)

        await swal({
          title: this.$t('admin.teams.swal.success.title'),
          text: this.$t('admin.teams.swal.success.text', {team: team.name}),
          type: 'success'
        })
      }
    }
  }
</script>

<style>

</style>