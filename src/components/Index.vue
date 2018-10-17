<template>
    <section class="hero is-primary is-fullheight">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            <img src="@/assets/logo-full-white.png" alt="Pillar Science Logo">
                        </a>
                        <span class="navbar-burger burger" :class="{'is-active': toggleMenuMobile}" @click="toggleMenuMobile = !toggleMenuMobile">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div class="navbar-menu" :class="{'is-active': toggleMenuMobile}">
                        <div class="navbar-end">
                            <router-link v-if="!isAuthenticated" :to="{name: 'login'}" class="navbar-item">{{ $t('index.login') }}</router-link>
                            <router-link v-if="!isAuthenticated" :to="{name: 'register'}" class="navbar-item">{{ $t('index.register') }}</router-link>
                            <router-link v-if="isAuthenticated" :to="{name: 'projects'}" class="navbar-item">{{ $t('index.home') }}</router-link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="hero-body">
            <div class="container has-text-centered">
                <img src="@/assets/logo-full-white.png" class="logo" :alt="$t('index.title')">
                <br><br>
                <h1 class="title">{{ $t('index.subtitle') }}</h1>
            </div>
        </div>
    </section>
</template>

<script>
  import auth from '@/services/auth'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Index',
    data () {
      return {
        toggleMenuMobile: false
      }
    },
    mounted () {
      auth.refreshUser()
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated'
      })
    }
  }
</script>

<style scoped>
    .logo {
        max-width: 60%;
    }

    .navbar-item img {
        max-height: 2.75rem;
    }
</style>