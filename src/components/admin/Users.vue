<template>
    <admin-layout>
        <section class="box">
            <h1 class="title">{{ $t('admin.users.title') }}</h1>

            <p v-if="users.length === 0">{{ $t('admin.users.table.empty') }}</p>

            <b-table v-if="users.length > 0" id="adminUsersTable" :loading="loading" :data="users">
                <template slot-scope="props">
                    <b-table-column label="ID" numeric>
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column :label="$t('admin.users.table.name.label')">
                        <router-link :to="{name: 'admin_users_edit', params: { id: props.row.id} }">{{ props.row.name }}</router-link>
                    </b-table-column>

                    <b-table-column :label="$t('admin.users.table.email.label')">
                        {{ props.row.email }}
                    </b-table-column>

                    <b-table-column :label="$t('admin.users.table.permissions.label')">
                        <b-tag v-if="props.row.permissions.length > 0" v-for="permission in props.row.permissions" :key="permission">{{ $t(`permissions.${permission}`) }}</b-tag>
                        <p v-if="props.row.permissions.length === 0" class="has-text-grey-light">{{ $t('admin.users.table.permissions.empty') }}</p>
                    </b-table-column>

                    <b-table-column :label="$t('admin.users.table.teams.label')">
                        <span v-if="props.row.teams">{{ props.row.teams.length }}</span>
                        <span v-if="!props.row.teams">0</span>
                    </b-table-column>

                    <b-table-column :label="$t('admin.users.table.createdAt.label')">
                        {{ props.row.created_at | moment_ll }}
                    </b-table-column>
                </template>
            </b-table>
            <br>
            <router-link :to="{name: 'admin_users_create'}" class="button">{{ $t('admin.users.actions.create') }}</router-link>
        </section>
    </admin-layout>
</template>

<script>
  import AdminLayout from '@/components/layouts/Admin'
  import UserEntity from '@/entities/user'

  export default {
    name: 'AdminUsers',
    components: {
      AdminLayout
    },
    data () {
      return {
        loading: false,
        users: []
      }
    },
    async mounted () {
      this.loading = true
      const {data} = await this.$api.users()
      this.users = UserEntity.collection(data)
      this.loading = false
    }
  }
</script>

<style scoped>

</style>