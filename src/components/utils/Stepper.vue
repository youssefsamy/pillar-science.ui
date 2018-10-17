<template>
    <div>
        <button id="stepper-back-btn" v-if="!isMin" class="button is-text" @click="decrement">{{ textBack }} <i v-if="iconBack" :class="iconBack"></i></button>
        <button id="stepper-continue-btn" v-if="!isMax" class="button is-primary is-pulled-right" :disabled="!isNextEnabled" @click="increment">{{ textContinue }} <i v-if="iconContinue" :class="iconContinue"></i></button>
        <button id="stepper-complete-btn" v-if="isMax" class="button is-primary is-pulled-right" @click="$emit('complete')">{{ textComplete}} <i v-if="iconComplete" :class="iconComplete"></i></button>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'Stepper',
    props: {
      elements: {
        type: Array,
        default: () => []
      },
      value: Number,
      context: {
        type: Vue
      },
      textBack: {
        type: String,
        default: 'Back'
      },
      iconBack: {
        type: String
      },
      textContinue: {
        type: String,
        default: 'Continue'
      },
      iconContinue: {
        type: String,
        default: 'mdi mdi-arrow-right-thick'
      },
      textComplete: {
        type: String,
        default: 'Complete'
      },
      iconComplete: {
        type: String
      }
    },
    mounted () {
      if (this.isMax) {
        this.$emit('input', this.elements.length - 1)
      }
    },
    methods: {
      decrement () {
        if (!this.isMin) {
          this.$emit('input', this.value - 1)
        }
      },
      increment () {
        if (!this.isMax) {
          this.$emit('input', this.value + 1)
        }
      }
    },
    computed: {
      isMax () {
        return this.value >= this.elements.length - 1
      },
      isMin () {
        return this.value <= 0
      },
      isNextEnabled () {
        const next = this.elements[this.value].next || null

        if (!next) {
          return true
        }

        return next(this.$parent.$refs.stepContent)
      }
    }
  }
</script>

<style scoped>

</style>