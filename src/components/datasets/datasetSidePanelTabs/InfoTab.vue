<template>
    <section class="box">
        <fa-icon icon="times" class="is-pulled-right is-pointer" @click="$emit('clear-selection')" />
        <h2 class="title is-4 is-marginless">{{ dataset.name }}</h2>
        <p class="has-text-grey">{{ $t('infoTab.messages.subtitle') }}</p>
        <br>
        <b-field grouped>
            <b-field v-if="originatorName" label="Last modified by" expanded>
                <p>{{ originatorName }}</p>
            </b-field>

            <b-field label="Dataset size" expanded>
                <p>{{ dataset.size | humanFileSize }}</p>
            </b-field>
        </b-field>

        <b-field grouped>
            <b-field label="Last updated" expanded>
                <p>{{ dataset.updated_at | moment_ll }}</p>
            </b-field>

            <b-field label="Created at" expanded>
                <p>{{ dataset.created_at | moment_ll }}</p>
            </b-field>
        </b-field>
    </section>
</template>

<script>
  import {filters} from '@/plugins/moment'
  import {filters as fileFilters} from '@/plugins/files'

  export default {
    name: 'infoTab',
    props: {
      dataset: Object
    },
    computed: {
      originatorName () {
        if (!this.dataset.current_version || !this.dataset.current_version.originator) {
          return null
        }

        return this.dataset.current_version.originator.name
      }
    },
    filters: {
      moment_ll: filters.moment_ll_short,
      humanFileSize: fileFilters.humanFileSize
    }
  }
</script>

<style scoped>

</style>