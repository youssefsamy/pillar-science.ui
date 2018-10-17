<template>
    <aside class="menu">
        <template v-for="c in categories">
            <p class="menu-label">
                {{ c.label }}
            </p>
            <ul class="menu-list">
                <li v-for="link in c.links"><router-link :class="{'is-active': link.to.name === $route.name}" :to="link.to">{{ link.label }}</router-link></li>
            </ul>
        </template>
    </aside>
</template>

<script>
  export default {
    name: 'HelpMenu',
    computed: {
      categories () {
        return [
          {
            label: this.$t('help.categories.general.label'),
            links: [{
              label: this.$t('help.categories.general.items.gettingStarted.label'),
              to: {name: 'help_getting_started'}
            }]
          }, {
            label: this.$t('help.categories.metadata.label'),
            links: [{
              label: this.$t('help.categories.metadata.items.metadata.label'),
              to: {name: 'help_metadata'}
            }]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>