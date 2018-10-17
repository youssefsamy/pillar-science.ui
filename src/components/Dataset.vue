<template>
    <app-layout :loading="loading">
        <template slot="breadcrumb">
            <breadcrumb>
                <template v-if="dataset">
                    <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.datasets.label') }}</a></li>
                    <li class="is-active"><a href="#">{{ dataset.name }}</a></li>
                </template>
            </breadcrumb>
        </template>

        <dataset-renderer v-if="dataset" :dataset="dataset" @add-version="addVersion" />

        <div slot="dial-left">
            <back-button />
        </div>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import DatasetRenderer from '@/components/datasets/DatasetRenderer'
  import Breadcrumb from '@/components/utils/Breadcrumb'
  import BackButton from '@/components/utils/BackButton'

  export default {
    components: {
      AppLayout,
      DatasetRenderer,
      Breadcrumb,
      BackButton
    },
    data () {
      return {
        dataset: null,
        loading: false
      }
    },
    async mounted () {
      this.loadDataset(this.$route.params.id)
    },
    methods: {
      async loadDataset (id) {
        const response = await this.$api.dataset(id)

        this.dataset = response.data
      },
      addVersion (version) {
        this.dataset.versions.unshift(version)
        this.dataset.current_version = version

        // const id = this.dataset.id
        // this.loading = true
        // this.dataset = null
        // console.log('null')
        //
        // this.$nextTick(async function () {
        //   console.log('loading')
        //   await this.loadDataset(id)
        //   console.log('done')
        // })
        //
        // console.log('await over')
        //
        // this.loading = false
      }
    }
  }
</script>

<style>

</style>