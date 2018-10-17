<template>
    <div class="media">
        <div class="media-left has-text-vertically-centered">
            <fa-icon icon="flask" class="icon" size="lg" />
        </div>
        <div class="media-content">
            <h2 v-if="links"><router-link :to="{name: 'protocol', params: {protocol_id: result.id}}">{{ result.name }}</router-link></h2>
            <h2 v-else>{{ result.name }}</h2>
            <small>
                {{ $t('protocolResultType.messages.updated') }} <b>{{ result.updated_at | since }}</b>
            </small>
        </div>
    </div>
</template>

<script>
  import {filters} from '@/plugins/moment'

  export default {
    name: 'ProtocolResultType',
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