<template>
    <app-layout :loading="isLoading" :cssclasses="'container-fluid'">
        <template slot="breadcrumb">
            <breadcrumb>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.label') }}</a></li>
                <li><router-link :to="{name: 'projects'}">{{ $t('breadcrumb.home.projects.label') }}</router-link></li>
                <li class="is-active"><a href="#" aria-current="page">{{ (project||{}).name }}</a></li>
            </breadcrumb>
        </template>

        <router-view @update="handleUpdate" />
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import formMixin from '@/mixins/formMixin'
  import {mapActions, mapGetters} from 'vuex'
  import Helper from '@/services/errorHelper'
  import Breadcrumb from '@/components/utils/Breadcrumb'

  export default {
    name: 'Project',
    components: {
      AppLayout,
      Breadcrumb
    },
    mixins: [formMixin],
    data () {
      return {
        resource: 'projects'
      }
    },
    async mounted () {
      try {
        const response = await this.$api.userProject(this.user.id, this.resourceId)

        this.setProject(response.data)
      } catch (e) {
        const helper = new Helper(e)

        helper.updatePageStatusCode()
      }
    },
    methods: {
      ...mapActions({
        setLoading: 'app/setLoading',
        setProject: 'project/setProject'
      }),
      handleUpdate (project) {
        this.setProject({...this.project, ...project})
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/user',
        project: 'project/project'
      }),
      isLoading () {
        return this.project === null
      }
    }
  }
</script>

<style scoped>

</style>