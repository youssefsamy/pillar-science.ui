<template>
    <button @click.prevent="onClick" class="button is-circle is-large is-primary" :class="{'is-text': isText}">
        <fa-icon v-if="!isText" icon="arrow-left" />
        <span v-else>{{ $t('backButton.actions.back.label') }}</span>
    </button>
</template>

<script>
  export default {
    name: 'BackButton',
    props: {
      confirm: {
        type: Function,
        default: () => Promise.resolve(true)
      },
      isText: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      async onClick () {
        if (await this.confirm()) {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped>

</style>