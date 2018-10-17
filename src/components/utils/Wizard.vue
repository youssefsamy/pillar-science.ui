<template>
    <div>
        <steps :steps="steps" :active="step" class="is-centered has-content-centered">
        </steps>

        <component ref="stepContent" :is="steps[step].component"></component>

        <br>
        <stepper v-model="step"
                 :context="$refs.stepContent"
                 :elements="steps"
                 @complete="onComplete"
                 :text-back="$t('utils.stepper.back')"
                 :text-continue="$t('utils.stepper.continue')"
                 :text-complete="$t('utils.stepper.complete')">
        </stepper>
        <br>
    </div>
</template>

<script>
  import Steps from '@/components/bulma/Steps'
  import Stepper from '@/components/utils/Stepper'

  export default {
    components: {
      Steps,
      Stepper
    },
    props: {
      steps: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        step: 0
      }
    },
    methods: {
      onComplete () {
        this.$emit('complete')
      }
    }
  }
</script>

<style>

</style>