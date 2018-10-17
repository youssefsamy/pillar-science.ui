<template>
    <div>
        <b-field :label="$t('protocolLookup.fields.query.label')">
            <b-input v-model="searchQuery" :placeholder="$t('protocolLookup.fields.query.placeholder')" @input="handleSearch" />
        </b-field>

        <b-field :label="$t('protocolLookup.fields.results.empty')" v-if="searchInitiated">
            <b-table :data="results" :loading="isFetching">
                <section slot="empty">
                    {{ $t('protocolLookup.fields.results.empty') }}
                </section>
                <template slot-scope="props">
                    <b-table-column :label="$t('protocolLookup.fields.results.fields.name.label')">
                        <router-link :to="{name: 'protocol', params: {protocol_id: props.row.id}}">{{ props.row.name }}</router-link>
                    </b-table-column>

                    <b-table-column :label="$t('protocolLookup.fields.results.fields.attach.label')">
                        <button class="button is-success" :class="{'is-loading': attaching && attaching.id === props.row.id}" @click="handleSelect(props.row)">
                            <fa-icon icon="plus-circle" size="lg" />
                            <span>{{ $t('protocolLookup.fields.results.fields.attach.label') }}</span>
                        </button>
                    </b-table-column>
                </template>
            </b-table>
        </b-field>
    </div>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    name: 'ProtocolModal',
    props: {
      dataset: Object,
      protocols: Array,
      attaching: Object
    },
    data () {
      return {
        searchQuery: null,
        searchInitiated: false,
        results: [],
        isFetching: false
      }
    },
    methods: {
      handleSearch: debounce(async function () {
        this.isFetching = true
        const response = await this.$api.searchAvailableProtocols(this.dataset.id, this.searchQuery)
        this.results = []

        response.data.forEach(item => this.results.push(item))
        this.isFetching = false
        this.searchInitiated = true
      }, 200),
      handleSelect (item) {
        this.$emit('attach', item)
        this.handleSearch()
      }
    },
    watch: {
      protocols: function (newVal, oldVal) {
        this.handleSearch()
      }
    }
  }
</script>

<style scoped>
    .modal-card-body {
        min-height: 30vh;
    }
</style>