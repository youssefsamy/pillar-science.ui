<template>
    <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'admin_home'}">
                    <img src="@/assets/logo-full-white.png" alt="Pillar Science Logo">
                </router-link>

                <div class="navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div v-if="user" class="navbar-menu">
                <div class="navbar-end">
                    <b-dropdown v-if="hasDesktopClientManagementPermission">
                        <a class="navbar-item" slot="trigger">
                            <span>{{ $t('adminNavbar.actions.desktopClient.label') }}</span>
                            <b-icon icon="menu-down" />
                        </a>

                        <b-dropdown-item @click="$router.push({name: 'admin_desktop_client_releases'})">
                            <fa-icon icon="desktop" size="lg" />
                            <span>{{ $t('adminNavbar.actions.desktopClient.releases.label') }}</span>
                        </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown v-if="hasUserTeamManagementPermission">
                        <a class="navbar-item" slot="trigger">
                            <span>{{ $t('adminNavbar.actions.management.label') }}</span>
                            <fa-icon icon="caret-down" />
                        </a>

                        <b-dropdown-item @click="$router.push({name: 'admin_users'})">
                            <b-icon icon="account"></b-icon>
                            {{ $t('adminNavbar.actions.management.children.users') }}
                        </b-dropdown-item>

                        <b-dropdown-item @click="$router.push({name: 'admin_teams'})">
                            <b-icon icon="account-multiple"></b-icon>
                            {{ $t('adminNavbar.actions.management.children.teams') }}
                        </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown position="is-bottom-left">
                        <a class="navbar-item" slot="trigger">
                            <span>{{ user.name }}</span>
                            <b-icon icon="menu-down"></b-icon>
                        </a>

                        <b-dropdown-item custom>
                            <b>{{ user.name }}</b>
                        </b-dropdown-item>
                        <hr class="dropdown-divider">

                        <template v-if="true">
                            <b-dropdown-item @click="$router.push({name: 'projects'})">
                                <b-icon icon="settings"></b-icon>
                                {{ $t('adminNavbar.actions.main.back') }}
                            </b-dropdown-item>

                            <hr class="dropdown-divider">
                        </template>

                        <b-dropdown-item value="logout" @click="handleLogout">
                            <b-icon icon="logout"></b-icon>
                            {{ $t('adminNavbar.actions.main.logout') }}
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

  export default {
    name: 'AdminNavbar',
    methods: {
      handleLogout () {
        auth.logout()
      }
    },
    computed: mapGetters({
      user: 'user/user',
      hasDesktopClientManagementPermission: 'user/hasDesktopClientManagementPermission',
      hasUserTeamManagementPermission: 'user/hasUserTeamManagementPermission'
    })
  }
</script>

<style scoped>
    .navbar-item img {
        max-height: 2.75rem;
    }
</style>