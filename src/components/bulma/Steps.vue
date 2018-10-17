<template>
    <ul class="steps">
        <li v-for="(step, index) in steps" class="steps-segment" :class="{'is-active': isActive(index)}">
            <component :is="(step.link) ? 'a' : 'span'" :href="(step.link) ? step.link : false" class="has-text-dark">
                <span class="steps-marker">
                    <span class="icon" v-if="step.icon">
                        <i :class="step.icon"></i>
                    </span>
                </span>
                <div class="steps-content" v-if="step.title">
                    <p class="heading">{{ step.title }}</p>
                </div>
            </component>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'Steps',
    props: {
      active: Number,
      steps: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      isActive (step) {
        return this.active === step
      }
    }
  }
</script>

<style scoped>

</style>