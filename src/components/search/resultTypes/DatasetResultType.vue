<template>
    <div class="media">
        <div class="media-left">
            <fa-icon icon="folder" class="icon" size="lg" />
        </div>
        <div class="media-content">
            <h2 v-if="links"><router-link :to="{name: 'dataset', params: {id: result.id}}">{{ result.name }}</router-link></h2>
            <h2 v-else>{{ result.name }}</h2>
            <small>
                {{ $t('datasetResultType.messages.updated') }} <b>{{ result.updated_at | since }}</b>
            </small>
        </div>
    </div>
</template>

<script>
  import {filters} from '@/plugins/moment'

  export default {
    name: 'DatasetResultType',
    props: {
      result: Object,
      links: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      dateFormat: filters.moment_ll,
      since: filters.moment_from
    }
  }
</script>

<style scoped>

</style>