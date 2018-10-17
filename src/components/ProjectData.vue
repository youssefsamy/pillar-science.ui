<template>
    <project-menu active="settings" :project="project">
        <div class="tile is-child">
            <article class="box">
                <dataset-view v-model="selectedDataset" v-if="dataset" :dataset="dataset" :compact="selectedDataset !== null" :read-only="!canEditData" />
            </article>
        </div>
        <div class="tile is-child is-6" v-if="selectedDataset">
            <dataset-side-panel
                    :dataset="selectedDataset"
                    @clear-selection="selectedDataset = null"
                    @metadata-add="metadataAdd"
                    @metadata-remove="metadataRemove"
                    @protocol-add="protocolAdd"
                    @protocol-remove="protocolRemove"
            />
        </div>
    </project-menu>
</template>

<script>
  import ProjectMenu from '@/components/projects/ProjectMenu'
  import DatasetView from '@/components/datasets/DatasetView'
  import DatasetSidePanel from '@/components/datasets/DatasetSidePanel'
  import {mapGetters} from 'vuex'

  export default {
    name: 'ProjectData',
    components: {
      ProjectMenu,
      DatasetView,
      DatasetSidePanel
    },
    data () {
      return {
        loading: false,
        dataset: null,
        selectedDataset: null
      }
    },
    async mounted () {
      const response = await this.$api.projectDataset(this.project.id)

      this.dataset = response.data
    },
    methods: {
      metadataAdd (metadata) {
        this.selectedDataset.metadata.push(metadata)
      },
      metadataRemove (metadata) {
        const index = this.selectedDataset.metadata.findIndex(m => m.id === metadata.id)

        this.selectedDataset.metadata.splice(index, 1)
      },
      protocolAdd (protocol) {
        this.selectedDataset.protocols.push(protocol)
      },
      protocolRemove (protocol) {
        const index = this.selectedDataset.protocols.findIndex(m => m.id === protocol.id)

        this.selectedDataset.protocols.splice(index, 1)
      }
    },
    computed: {
      ...mapGetters({
        project: 'project/project',
        canEditData: 'project/canEditData'
      })
    }
  }
</script>

<style scoped>
</style>