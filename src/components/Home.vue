<template>
    <app-layout>
        <section>
            <template slot="breadcrumb">
                <breadcrumb>
                    <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.label') }}</a></li>
                </breadcrumb>
            </template>

            <router-link :to="{name: 'projects'}">Projects</router-link>

        </section>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import {mapGetters} from 'vuex'
  import ProjectCard from '@/components/projects/ProjectCard'
  import Breadcrumb from '@/components/utils/Breadcrumb'

  export default {
    name: 'Home',
    components: {
      AppLayout,
      ProjectCard,
      Breadcrumb
    },
    data () {
      return {
        projects: []
      }
    },
    async mounted () {
      const response = await this.$api.projects()

      this.projects = response.data
    },
    computed: mapGetters({
      user: 'user/user'
    })
  }
</script>

<style scoped>

</style>