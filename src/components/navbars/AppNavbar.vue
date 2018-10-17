<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'projects'}">
                    <img src="@/assets/logo-full-white.png" alt="Pillar Science Logo">
                </router-link>

                <div class="navbar-burger" :class="{'is-active': toggleMenuMobile}" @click="toggleMenuMobile = !toggleMenuMobile">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div v-if="user" class="navbar-menu" :class="{'is-active': toggleMenuMobile}">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <search ref="search" />
                    </div>

                    <router-link @click.native="toggleMenuMobile = false" :to="{name: 'help_getting_started'}" class="navbar-item" :class="{'is-active': isActive('/help', $route)}">
                        <fa-icon icon="question-circle" />
                        <span>{{ $t('appNavbar.actions.gettingStarted.label') }}</span>
                    </router-link>

                    <router-link @click.native="toggleMenuMobile = false" :to="{name: 'projects'}" class="navbar-item" :class="{'is-active': isActive('/projects', $route)}">
                        <fa-icon icon="project-diagram" />
                        <span>{{ $t('appNavbar.actions.projects.label') }}</span>
                    </router-link>

                    <router-link @click.native="toggleMenuMobile = false" :to="{name: 'protocols'}" class="navbar-item" :class="{'is-active': isActive('/protocols', $route)}">
                        <fa-icon icon="flask" />
                        <span>Methods</span>
                    </router-link>

                    <b-dropdown position="is-bottom-left">
                        <a class="navbar-item" test-profile-menu slot="trigger">
                            <fa-icon icon="user" />
                            <span>{{ user.name }}</span>
                            <b-icon icon="menu-down"></b-icon>
                        </a>

                        <b-dropdown-item custom>
                            <b>{{ user.name }}</b>
                        </b-dropdown-item>
                        <hr class="dropdown-divider">

                        <template v-if="user.teams.length">
                            <b-dropdown-item v-for="team in user.teams" @click="redirectTo({name: 'team_computers', params: {id: team.id}})" :key="team.id">
                                <fa-icon icon="users" size="lg" />
                                <span>{{ team.name }}</span>
                            </b-dropdown-item>
                            <hr class="dropdown-divider">
                        </template>

                        <template v-if="hasAdminDashboardAccess">
                            <b-dropdown-item @click="redirectTo({name: 'admin_home'})">
                                <b-icon icon="settings"></b-icon>
                                <span>{{ $t('appNavbar.actions.main.admin') }}</span>
                            </b-dropdown-item>

                            <hr class="dropdown-divider">
                        </template>

                        <b-dropdown-item value="logout" test-logout @click="handleLogout">
                            <b-icon icon="logout"></b-icon>
                            {{ $t('appNavbar.actions.main.logout') }}
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import auth from '@/services/auth'
  import Search from '@/components/search/Search'

  export default {
    name: 'AppNavbar',
    components: {
      Search
    },
    data () {
      return {
        toggleMenuMobile: false
      }
    },
    methods: {
      handleLogout () {
        auth.logout()
      },
      isActive (prefix, route) {
        return route.path.startsWith(prefix)
      },
      redirectTo (to) {
        this.toggleMenuMobile = false
        this.$router.push(to)
      }
    },
    computed: mapGetters({
      user: 'user/user',
      hasAdminDashboardAccess: 'user/hasAdminDashboardAccess'
    })
  }
</script>

<style scoped>
    .navbar-item img {
        max-height: 2.75rem;
    }
</style>