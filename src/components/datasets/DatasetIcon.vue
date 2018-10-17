<template>
    <fa-icon v-bind="icon" size="lg" />
</template>

<script>
  import mimeTypeResolver from '@/services/mimeTypeResolver'

  export default {
    name: 'DatasetIcon',
    props: {
      dataset: Object,
      selected: Boolean,
      readOnly: Boolean
    },
    computed: {
      icon () {
        let ret

        if (this.dataset.type === 'directory') {
          ret = {
            icon: 'folder'
          }
        } else if (this.dataset.type === 'symlink') {
          ret = {
            icon: 'folder',
            class: (this.selected) ? 'has-text-white' : 'has-text-primary'
          }
        } else {
          ret = {
            icon: mimeTypeResolver.getIconForMimeType(this.dataset.mime_type)
          }
        }

        if (this.readOnly) {
          ret.class = 'has-text-grey-light'
        }

        return ret
      }
    }
  }
</script>

<style scoped>

</style>