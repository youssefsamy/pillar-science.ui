<template>
    <app-layout>
        <template slot="breadcrumb">
            <breadcrumb>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.label') }}</a></li>
                <li><router-link :to="{name: 'projects'}">{{ $t('breadcrumb.home.projects.label') }}</router-link></li>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.home.projects.create.label') }}</a></li>
            </breadcrumb>
        </template>
        <section class="box">
            <wizard test-id="project-create-wizard" :steps="steps" @complete="onComplete"></wizard>
        </section>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import Wizard from '@/components/utils/Wizard'
  import InformationStep from '@/components/projects/ProjectInformationStep'
  import ConfirmationStep from '@/components/projects/ProjectConfirmationStep'
  import StepInterface from '@/components/utils/StepInterface'
  import { createHelpers } from 'vuex-map-fields'
  import Breadcrumb from '@/components/utils/Breadcrumb'

  const { mapFields } = createHelpers({
    getterType: 'projectWizard/getField',
    mutationType: 'projectWizard/updateField'
  })

  export default {
    name: 'ProjectCreateWizard',
    components: {
      AppLayout,
      Wizard,
      InformationStep,
      ConfirmationStep,
      Breadcrumb
    },
    data () {
      return {
        steps: StepInterface.collection([
          {
            name: 'information',
            title: this.$t('projectCreateWizard.steps.information.title'),
            icon: 'mdi mdi-information-variant',
            component: InformationStep,
            next (vm) {
              if (!vm.name || !vm.team) {
                return false
              }

              return true
            }
          }, {
            name: 'confirmation',
            title: this.$t('projectCreateWizard.steps.confirmation.title'),
            icon: 'mdi mdi-check',
            component: ConfirmationStep
          }
        ])
      }
    },
    computed: {
      ...mapFields({
        name: 'name',
        team: 'team'
      })
    },
    methods: {
      async onComplete () {
        await this.$api.teamProjectCreate(this.team.id, {
          name: this.name
        })

        this.$toast.open({
          message: 'Project created',
          type: 'is-success',
          position: 'is-bottom'
        })

        this.name = null
        this.team = null

        this.$router.push({name: 'projects'})
      }
    }
  }
</script>

<style scoped>

</style>