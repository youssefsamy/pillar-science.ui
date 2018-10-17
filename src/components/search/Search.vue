<template>
    <b-field>
        <b-autocomplete
                id="navSearch"
                ref="input"
                rounded
                v-model="searchQuery"
                icon="magnify"
                :data="data"
                :placeholder="$t('search.messages.searchEverywhere')"
                :open-on-focus="false"
                :loading="isFetching"
                :clear-on-select="true"
                @input="getAsyncData"
                @select="handleSelect">
            <template slot="empty">{{ $t('search.messages.noResults') }}</template>
            <template slot-scope="props">
                <dataset-result-type v-if="props.option.type === 'Dataset'" :result="props.option.resource" />
                <protocol-result-type v-else-if="props.option.type === 'Protocol'" :result="props.option.resource" />
                <link-result-type v-else-if="props.option.type === 'Link'" :result="props.option.resource" />
                <span v-else>{{ $t('search.messages.unknownResource') }}</span>
            </template>
        </b-autocomplete>
    </b-field>
</template>

<script>
  import debounce from 'lodash/debounce'
  import DatasetResultType from './resultTypes/DatasetResultType'
  import ProtocolResultType from './resultTypes/ProtocolResultType'
  import LinkResultType from './resultTypes/LinkResultType'

  export default {
    name: 'Search',
    components: {
      DatasetResultType,
      ProtocolResultType,
      LinkResultType
    },
    data () {
      return {
        data: [],
        searchQuery: '',
        isFetching: false
      }
    },
    beforeRouteUpdate () {
      this.data = []
      this.searchQuery = ''
      this.isFetching = false
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      },
      getAsyncData: debounce(async function () {
        if (!this.searchQuery) {
          return
        }

        this.isFetching = true

        const response = await this.$api.search(this.searchQuery, 3)

        this.data = []
        response.data.forEach(item => this.data.push(item))

        if (this.data.length > 0) {
          this.data.push({
            type: 'Link',
            resource: {
              to: {
                name: 'search',
                params: {
                  query: this.searchQuery
                }
              }
            }
          })
        }

        this.isFetching = false
      }, process.env.DEFAULT_DEBOUNCE),
      handleSelect (option) {
        switch (option.type) {
          case 'Dataset':
            this.$router.push({name: 'dataset', params: {id: option.resource.id}})
            break
          case 'Protocol':
            this.$router.push({name: 'protocol', params: {protocol_id: option.resource.id}})
            break
          case 'Link':
            this.$router.push(option.resource.to)
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>