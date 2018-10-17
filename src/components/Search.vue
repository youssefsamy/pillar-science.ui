<template>
    <app-layout>
        <template slot="breadcrumb">
            <breadcrumb>
                <template>
                    <li class="is-active"><a href="#" aria-current="page">Search</a></li>
                    <li class="is-active"><a href="#" aria-current="page">{{ $route.params.query }}</a></li>
                </template>
            </breadcrumb>
        </template>

        <section class="box">
            <p>Showing results for: <b>{{ $route.params.query }}</b></p>
        </section>

        <section class="box">
            <b-checkbox v-model="filters[cat.type]" :key="cat.type" v-for="cat in categories">{{ $t(cat.label) }}</b-checkbox>
        </section>

        <section class="box">
            <template v-for="result in resultsFiltered">
                <dataset-result-type v-if="result.type === 'Dataset'" :result="result.resource" :links="true" />
                <protocol-result-type v-else-if="result.type === 'Protocol'" :result="result.resource" :links="true" />
            </template>
        </section>

        <div slot="dial-left">
            <back-button />
        </div>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import Breadcrumb from '@/components/utils/Breadcrumb'
  import DatasetResultType from '@/components/search/resultTypes/DatasetResultType'
  import ProtocolResultType from '@/components/search/resultTypes/ProtocolResultType'
  import BackButton from '@/components/utils/BackButton'

  const categories = [{
    label: 'searchPage.categories.datasets',
    type: 'Dataset'
  }, {
    label: 'searchPage.categories.protocols',
    type: 'Protocol'
  }]

  export default {
    name: 'Search',
    components: {
      AppLayout,
      Breadcrumb,
      DatasetResultType,
      ProtocolResultType,
      BackButton
    },
    data () {
      return {
        results: [],
        filters: {}
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.load(to.params.query)
    },
    mounted () {
      this.load(this.$route.params.query)
    },
    methods: {
      async load (query) {
        const response = await this.$api.search(query)

        this.results = response.data

        categories.forEach(c => this.$set(this.filters, c.type, true))
      }
    },
    computed: {
      categories () {
        return categories
      },
      resultsFiltered () {
        const keep = []

        for (const p in this.filters) {
          if (this.filters[p]) {
            keep.push(p)
          }
        }

        return this.results.filter(result => keep.includes(result.type))
      }
    }
  }
</script>

<style scoped>

</style>