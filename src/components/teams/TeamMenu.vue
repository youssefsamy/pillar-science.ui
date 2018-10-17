<template>
    <div class="tile is-ancestor">
        <div class="tile is-child is-2">
            <aside class="menu">
                <p class="menu-label">
                    {{ $t('teamMenu.menu.general.label') }}
                </p>
                <ul class="menu-list">
                    <li>
                        <router-link :to="{name: 'team_computers', params: {id: team.id} }" :class="{'is-active': isActive('devices')}">
                            {{ $t('teamMenu.menu.general.devices.label') }}
                        </router-link>
                    </li>
                </ul>
            </aside>
        </div>
        <div class="tile is-child is-10">
            <article>
                <slot />
            </article>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'TeamMenu',
    props: {
      team: Object
    },
    methods: {
      isActive (item) {
        return this.$route.name === item
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