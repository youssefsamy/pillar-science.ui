<template>
    <article class="media" >
        <figure class="media-left has-text-vertically-centered" style="padding-right: 10px">
            <fa-icon :icon="icon" :class="barColor" size="lg" />
        </figure>
        <div class="media-content has-text-vertically-centered">
            <div class="content">
                <p>
                    <strong>{{ file.file.name }}</strong> <small>{{ file.file.size | humanFileSize }}</small>
                    <i v-if="file.status === 'uploading'">(uploading...)</i>
                </p>
                <progress v-if="file.status === 'uploading'" class="progress" :class="barColor" :value="file.progress" max="100">{{ file.progress }}%</progress>
            </div>
        </div>
        <div class="media-right has-text-vertically-centered" style="padding-right: 10px">
            <button v-if="file.status === 'pending'" class="delete" @click="$emit('remove', file, index)"></button>
        </div>
    </article>
</template>

<script>
  import {humanFileSize} from '@/services/fileService'
  import resolver from '@/services/mimeTypeResolver'

  export default {
    name: 'FilePreview',
    props: {
      file: Object,
      index: Number
    },
    computed: {
      barColor () {
        return this.file.status === 'done' ? 'has-text-success' : 'has-text-primary'
      },
      icon () {
        return resolver.getIconForMimeType(this.file.file.mimeType)
      }
    },
    filters: {
      humanFileSize
    }
  }
</script>

<style scoped>

</style>