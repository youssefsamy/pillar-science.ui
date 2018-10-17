<template>
    <div>
        <b-loading id="appLoading" :active="!user" />
        <admin-navbar />
        <main class="container">
            <slot />
        </main>
    </div>
</template>

<script>
  import auth from '@/services/auth'
  import AdminNavbar from '@/components/navbars/AdminNavbar'
  import {mapGetters} from 'vuex'

  export default {
    name: 'AdminLayout',
    components: {
      AdminNavbar
    },
    mounted () {
      auth.refreshUser()
    },
    computed: mapGetters({
      user: 'user/user'
    })
  }
</script>

<style lang="scss">
    main.container {
        margin-top: 40px;
    }
</style>