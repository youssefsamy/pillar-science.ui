<template>
  <div id="app">
      <not-found v-if="isNotFound">Not found</not-found>
      <forbidden v-if="isForbidden">Forbidden</forbidden>
      <input type="hidden" id="routing" :test-route-name="$route.name" :test-route-url="pathname" />
      <router-view v-if="isOk" />
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import NotFound from '@/components/special/404'
    import Forbidden from '@/components/special/403'

    export default {
      name: 'app',
      components: {
        NotFound,
        Forbidden
      },
      computed: {
        ...mapGetters({
          isOk: 'http/isOk',
          isNotFound: 'http/isNotFound',
          isForbidden: 'http/isForbidden'
        }),
        pathname () {
          return window.location.pathname
        }
      }
    }
</script>

<style lang="scss">
    $fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
    /*@import "~@fortawesome/fontawesome-free/scss/fontawesome";*/
    @import "assets/theme";

    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";
    @import "./assets/custom";
    @import "./assets/navbar_fix";
</style>
