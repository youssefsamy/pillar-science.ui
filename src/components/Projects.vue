<template>
    <app-layout :loading="loading">
        <template slot="breadcrumb">
            <breadcrumb>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.label') }}</a></li>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.projects.label') }}</a></li>
            </breadcrumb>
        </template>

        <section>
            <div class="box">
                <router-link :to="{name: 'project_create_wizard'}" test-id="create-project-btn" class="button is-primary">{{ $t('projects.actions.createProject.label')}}</router-link>
            </div>
        </section>
        <br>

        <section class="box" v-if="!projects.length">
            <getting-started />
        </section>

        <section>
            <div class="tile is-ancestor" v-for="row in projectsChunked">
                <div class="tile is-parent is-4" v-for="project in row">
                    <div class="tile is-child">
                        <project-card :project="project"></project-card>
                    </div>
                </div>
            </div>
        </section>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import {mapGetters} from 'vuex'
  import ProjectCard from '@/components/projects/ProjectCard'
  import _ from 'lodash'
  import Breadcrumb from '@/components/utils/Breadcrumb'
  import GettingStarted from '@/components/help/GettingStarted'

  export default {
    name: 'Home',
    components: {
      AppLayout,
      ProjectCard,
      Breadcrumb,
      GettingStarted
    },
    data () {
      return {
        projects: [],
        loading: true
      }
    },
    async mounted () {
      const response = await this.$api.projects()

      this.projects = response.data

      this.loading = false
    },
    computed: {
      ...mapGetters({
        user: 'user/user'
      }),
      projectsChunked () {
        return _.chunk(this.projects, 3)
      }
    }
  }
</script>

<style scoped>

</style>