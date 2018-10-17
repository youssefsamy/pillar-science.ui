<template>
    <div class="box has-background-light">
        <info-tab :dataset="datasetExtra" @clear-selection="$emit('clear-selection')" />
        <metadata-tab :dataset="dataset" :metadata="metadata" @add="addMetadata" @remove="removeMetadata" />
        <protocols-tab :protocols="protocols" :dataset="dataset" @created="addProtocol" @remove="removeProtocol" @attach="handleAttach" />
    </div>
</template>

<script>
  import infoTab from '@/components/datasets/datasetSidePanelTabs/InfoTab'
  import protocolsTab from '@/components/datasets/datasetSidePanelTabs/ProtocolsTab'
  import metadataTab from '@/components/datasets/datasetSidePanelTabs/MetadataTab'

  export default {
    name: 'DatasetSidePanel',
    components: {
      infoTab,
      protocolsTab,
      metadataTab
    },
    props: {
      dataset: {
        type: Object
      }
    },
    data () {
      return {
        extra: {
          current_version: null
        },
        ancestors: []
      }
    },
    mounted () {
      this.loadProtocols(this.dataset)
    },
    methods: {
      addMetadata (metadata) {
        this.ancestors.find(d => d.order === this.ancestors.length - 1)
          .metadata
          .push(metadata)

        this.$emit('metadata-add', metadata)
      },
      addProtocol (protocol) {
        this.ancestors.find(d => d.order === this.ancestors.length - 1)
          .protocols
          .push(protocol)

        this.$emit('protocol-add', protocol)
      },
      async loadProtocols (dataset) {
        let response = await this.$api.dataset(dataset.id)

        this.extra.current_version = response.data.current_version

        response = await this.$api.datasetAncestors(dataset.id)

        this.ancestors = response.data
      },
      removeMetadata ({metadatum, index}) {
        this.metadata.splice(index, 1)

        this.$emit('metadata-remove', metadatum)
      },
      removeProtocol ({row: {protocol}, index}) {
        this.protocols.splice(index, 1)

        this.$emit('protocol-remove', protocol)
      },
      handleAttach (protocol) {
        this.addProtocol(protocol)
      }
    },
    computed: {
      protocolsMetadata () {
        const protocols = []
        const metadata = []

        this.ancestors.reverse().forEach(dataset => {
          dataset.protocols.forEach(protocol => {
            if (protocols.every(p => p.id !== protocol.id)) {
              protocols.push({
                dataset,
                protocol
              })
            }
          });

          (dataset.metadata || []).forEach(metadatum => {
            metadata.push({
              dataset,
              metadatum
            })
          })
        })

        return {
          protocols,
          metadata
        }
      },
      protocols () {
        return this.protocolsMetadata.protocols
      },
      metadata () {
        return this.protocolsMetadata.metadata
      },
      datasetExtra () {
        return Object.assign({}, this.dataset, this.extra)
      }
    },
    watch: {
      dataset: function (newDataset, oldDataset) {
        this.loadProtocols(newDataset)
      }
    }
  }
</script>

<style scoped>

</style>