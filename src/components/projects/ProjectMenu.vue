<template>
    <div class="tile is-ancestor">
        <div class="tile is-child is-2">
            <aside class="menu box">
                <p class="menu-label">
                    {{ $t('projectMenu.menu.general.label') }}
                </p>
                <ul class="menu-list">
                    <li>
                        <router-link :to="{name: 'project_overview', params: {id: project.id} }" :class="{'is-active': isActive('project_overview')}">
                            {{ $t('projectMenu.menu.general.overview.label') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'project_data', params: {id: project.id} }" :class="{'is-active': isActive('project_data')}">
                            {{ $t('projectMenu.menu.general.data.label') }}
                        </router-link>
                    </li>
                </ul>
                <template v-if="settingsGroup">
                    <p class="menu-label">
                        {{ $t('projectMenu.menu.settings.label') }}
                    </p>
                    <ul class="menu-list">
                        <li>
                            <router-link :to="{name: 'project_sharing', params: {id: project.id} }" :class="{'is-active': isActive('project_sharing')}">
                                {{ $t('projectMenu.menu.settings.sharing.label') }}
                            </router-link>
                        </li>
                        <li v-if="canViewSettings">
                            <router-link :to="{name: 'project_settings', params: {id: project.id} }" :class="{'is-active': isActive('project_settings')}">
                                {{ $t('projectMenu.menu.settings.settings.label') }}
                            </router-link>
                        </li>
                    </ul>
                </template>
            </aside>
        </div>
        <slot />
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'ProjectMenu',
    methods: {
      isActive (item) {
        return this.$route.name === item
      }
    },
    computed: {
      ...mapGetters({
        project: 'project/project',
        canViewSharing: 'project/canViewSharing',
        canViewSettings: 'project/canViewSettings'
      }),
      settingsGroup () {
        return this.canViewSharing || this.canViewSettings
      }
    }
  }
</script>

<style scoped>
    aside {
        width: 100%;
    }

    .tile {
        padding: 10px;
    }
</style>