<template>
    <div>
        <b-loading :active="loading" />
        <app-navbar />
        <slot name="breadcrumb"></slot>
        <main :class="cssclasses">
            <slot v-if="!loading" />
        </main>
        <div class="dial">
            <slot name="dial-left" />
        </div>
    </div>
</template>

<script>
  import auth from '@/services/auth'
  import AppNavbar from '@/components/navbars/AppNavbar'
  import {mapGetters} from 'vuex'
  import Search from '@/components/search/Search'

  export default {
    name: 'AppLayout',
    components: {
      AppNavbar,
      Search
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      cssclasses: {
        type: String,
        default: 'container'
      }
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
        padding-left: 10px;
        padding-right: 10px;
    }

    .dial {
        position: fixed;
        left: 45px;
        bottom: 45px;
    }
</style>