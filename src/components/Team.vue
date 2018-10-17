<template>
    <app-layout :loading="isLoading">
        <template slot="breadcrumb">
            <breadcrumb>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.label') }}</a></li>
                <li class="is-active"><a href="#" aria-current="page">{{ (team||{}).name }}</a></li>
            </breadcrumb>
        </template>

        <router-view :team="team"/>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import Helper from '@/services/errorHelper'
  import Breadcrumb from '@/components/utils/Breadcrumb'

  export default {
    name: 'Team',
    components: {
      AppLayout,
      Breadcrumb
    },
    data () {
      return {
        team: null
      }
    },
    async mounted () {
      try {
        let response = await this.$api.team(this.$route.params.id)

        this.team = response.data
      } catch (e) {
        const helper = new Helper(e)

        helper.updatePageStatusCode()
      }
    },
    computed: {
      isLoading () {
        return this.team === null || this.childLoading
      }
    }
  }
</script>

<style scoped>

</style>