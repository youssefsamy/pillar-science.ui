<template>
    <div>
        <b-modal :active.sync="moveModal">
            <move-dataset-modal :source-dataset="value" :root-dataset="rootDataset" @close="closeMoveModal" @move="onMove" />
        </b-modal>

        <b-modal :active.sync="addDataModal">
            <add-data-modal :loaded-dataset="loadedDataset" @close="closeAddDataModal" />
        </b-modal>

        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li v-for="(dataset, key) in breadcrumb" :class="{'is-active': key === breadcrumb.length - 1}"><a href="#" @click.prevent="clickBreadcrumb(key)">{{ dataset.name }}</a></li>
            </ul>
        </nav>
        <nav class="navbar is-transparent is-bring-to-back">
            <a href="#" class="navbar-item" @click.prevent="clickBreadcrumb(0)">
                <b-tooltip :label="$t('datasetView.navbar.home.label')">
                    <fa-icon icon="home" size="lg" :class="canGoHome | type" />
                </b-tooltip>
            </a>
            <a href="#" class="navbar-item" @click.prevent="oneLevelUp">
                <b-tooltip :label="$t('datasetView.navbar.parent.label')">
                    <fa-icon icon="level-up-alt" size="lg" :class="canGoParent | type" />
                </b-tooltip>
            </a>
            <a href="#" class="navbar-item" @click.prevent="createDir">
                <b-tooltip :label="$t('datasetView.navbar.create.label')">
                    <fa-icon icon="folder" size="lg" :class="canCreateDir | type" />
                </b-tooltip>
            </a>
            <a href="#" class="navbar-item" @click.prevent="displayAddDataModal">
                <b-tooltip :label="$t('datasetView.navbar.addData.label')">
                    <fa-icon icon="plus-circle" size="lg" :class="canAddData | type" />
                </b-tooltip>
            </a>
            <a href="#" class="navbar-item" @click.prevent="moveDataset">
                <b-tooltip :label="$t('datasetView.navbar.move.label')">
                    <fa-icon icon="arrows-alt" size="lg" :class="canMoveDataset | type" />
                </b-tooltip>
            </a>
            <a href="#" class="navbar-item" @click.prevent="renameDataset">
                <b-tooltip :label="$t('datasetView.navbar.rename.label')">
                    <fa-icon icon="i-cursor" size="lg" :class="canEdit | type" />
                </b-tooltip>
            </a>
            <a href="#" class="navbar-item" @click.prevent="deleteDataset">
                <b-tooltip :label="$t('datasetView.navbar.delete.label')">
                    <fa-icon icon="trash-alt" size="lg" :class="canDelete | type" />
                </b-tooltip>
            </a>
        </nav>
        <b-table
                :selected="value"
                :narrowed="true"
                :current-page.sync="currentPage"
                :loading="loading"
                :data="data"
                :paginated="isPaginated"
                :per-page="perPage"
                @click="onRowClick"
                @dblclick="clickDirectory"
                :row-class="unselectable"
                :hoverable="true"
                @keyup.esc="$emit('input', null)"
        >
            <section slot="empty" class="has-text-centered" v-if="!readOnlyInternal">
                <br>
                <b-field>
                    <b-upload v-model="dropFiles"
                              @input="upload"
                              class="is-fullwidth"
                              multiple
                              drag-drop>
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <fa-icon icon="upload" size="3x" />
                                </p>
                                <p>{{ $t('datasetView.table.empty.label') }}</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>
            </section>
            <section slot="empty" v-else>
                {{ $t('datasetView.directory.empty') }}
            </section>
            <template slot-scope="props">
                <b-table-column :width="1" :centered="true">
                    <dataset-icon :selected="props.row.id === (value||{}).id" :dataset="props.row" :read-only="readOnlyInternal" />
                </b-table-column>
                <b-table-column :label="$t('datasetView.table.fields.name.label')">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column :visible="!compact" :label="$t('datasetView.table.fields.size.label')">
                    {{ props.row.size | humanFileSize }}
                </b-table-column>

                <b-table-column :visible="!compact" :label="$t('datasetView.table.fields.created.label')">
                    {{ props.row.created_at | moment_ll }}
                </b-table-column>

                <b-table-column :visible="!compact" :label="$t('datasetView.table.fields.updated.label')">
                    {{ props.row.updated_at | moment_ll }}
                </b-table-column>

                <b-table-column :centered="true" :label="$t('datasetView.table.fields.protocol.label')">
                    <fa-icon
                            :icon="hasProtocols(props.row) ? 'check-circle' : 'times-circle'"
                            :class="hasProtocols(props.row) || loadedDataset.inherits_protocols ? 'has-text-success' : 'has-text-danger'"
                            size="lg"
                    />
                </b-table-column>

                <b-table-column :centered="true" :label="$t('datasetView.table.fields.metadata.label')">
                    <fa-icon
                            :icon="hasMetadata(props.row) ? 'check-circle' : 'times-circle'"
                            :class="hasMetadata(props.row) ? 'has-text-success' : 'has-text-danger'"
                            size="lg"
                    />
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>

<script>
  import {filters} from '@/plugins/moment'
  import {filters as fileFilters} from '@/plugins/files'
  import swal from 'sweetalert2'
  import DatasetIcon from './DatasetIcon'
  import MoveDatasetModal from '@/components/datasets/MoveDatasetModal'
  import AddDataModal from '@/components/datasets/AddDataModal'

  export default {
    name: 'DatasetView',
    components: {
      DatasetIcon,
      MoveDatasetModal,
      AddDataModal
    },
    props: {
      dataset: Object,
      loading: Boolean,
      readOnly: {
        type: Boolean,
        default: false
      },
      perPage: {
        type: Number,
        default: 15
      },
      value: {
        type: Object
      },
      // Only show a few fields
      compact: {
        type: Boolean
      }
    },
    data () {
      return {
        dropFiles: [],
        breadcrumb: [],
        currentPage: 1,
        moveModal: false,
        addDataModal: false,
        loadedDataset: {
          children: []
        }
      }
    },
    mounted () {
      this.clickDirectory(this.dataset)
    },
    methods: {
      displayAddDataModal () {
        if (!this.canAddData) {
          return false
        }

        this.addDataModal = true
      },
      closeMoveModal () {
        this.moveModal = false
      },
      closeAddDataModal () {
        this.addDataModal = false
      },
      async onMove (sourceDataset, targetDataset) {
        await this.$api.datasetMoveTo(sourceDataset.id, targetDataset.id)

        this.moveModal = false
        this.loadedDataset = await this.loadDataset(this.loadedDataset)
      },
      onRowClick (dataset) {
        this.$emit('input', dataset)
      },
      async renameDataset () {
        if (!this.canEdit) {
          return false
        }

        const type = this.$t(`backend.datasets.types.${this.value.type}`)

        const input = await swal({
          title: this.$t('datasetView.swal.renameDataset.title', {type}),
          input: 'text',
          inputValue: this.value.name,
          confirmButtonText: this.$t('datasetView.swal.renameDataset.confirm'),
          cancelButtonText: this.$t('datasetView.swal.renameDataset.cancel'),
          showCancelButton: true
        })

        const name = input.value
        if (!name || name === this.value.name) {
          return
        }

        const response = await this.$api.datasetUpdate(this.value.id, {name})

        this.value.name = response.data.name
      },
      async deleteDataset () {
        if (!this.canDelete) {
          return
        }

        await this.$api.datasetDelete(this.value.id)

        const index = this.loadedDataset.children.findIndex(d => d.id === this.value.id)

        this.loadedDataset.children.splice(index, 1)

        this.$emit('input', null)
      },
      async createDir () {
        if (!this.canCreateDir) {
          return
        }

        const input = await swal({
          title: this.$t('datasetView.swal.createDirectory.title'),
          input: 'text',
          confirmButtonText: this.$t('datasetView.swal.createDirectory.confirm'),
          cancelButtonText: this.$t('datasetView.swal.createDirectory.cancel'),
          showCancelButton: true
        })

        if (input.dismiss) {
          return
        }

        const response = await this.$api.datasetCreateDirectory(this.loadedDataset.id, {
          name: input.value
        })

        this.loadedDataset.children.push(response.data)
      },
      oneLevelUp () {
        if (!this.canGoParent) {
          return
        }

        this.clickBreadcrumb(this.breadcrumb.length - 2)
      },
      unselectable () {
        return ['is-unselectable']
      },
      upload (filelist = null) {
        const files = Array.from(filelist || this.dropFiles)

        files.forEach(async file => {
          const formData = new FormData()

          formData.append('file', file)

          const response = await this.$api.datasetUpload(this.loadedDataset.id, formData)

          this.loadedDataset.children.push(response.data)
        })

        this.dropFiles = []
      },
      async clickBreadcrumb (index) {
        if (index < 0) {
          index = 0
        }

        this.breadcrumb = this.breadcrumb.slice(0, index + 1)
        this.currentPage = 1

        this.loadedDataset = await this.loadDataset(this.breadcrumbActiveDataset)
      },
      async clickDirectory (dataset, emit = true) {
        if (dataset.type === 'dataset') {
          this.$router.push({name: 'dataset', params: {id: dataset.id}})
        }

        let nextDataset = null

        if (dataset.type === 'symlink') {
          nextDataset = {
            id: dataset.mapped_dataset_id,
            name: dataset.name
          }
        } else {
          nextDataset = dataset
        }

        this.$emit('input', null)
        this.loadedDataset = await this.loadDataset(nextDataset)
        this.currentPage = 1

        if (emit) {
          this.breadcrumb.push({
            id: nextDataset.id,
            name: nextDataset.name
          })

          this.$emit('location-changed', this.breadcrumb)
        }
      },
      async loadDataset (dataset) {
        const response = await this.$api.dataset(dataset.id)

        return response.data
      },
      hasProtocols (dataset) {
        if (!dataset.protocols) {
          return false
        }

        return dataset.protocols.length > 0 || this.loadedDataset.inherits_protocols
      },
      hasMetadata (dataset) {
        if (!dataset.metadata) {
          return false
        }

        return dataset.metadata.length > 0 || this.loadedDataset.inherits_metadata
      },
      moveDataset () {
        if (!this.value) {
          return
        }

        this.moveModal = true
      }
    },
    computed: {
      readOnlyInternal () {
        return this.readOnly || this.isLoadedDatasetReadOnly
      },
      isLoadedDatasetReadOnly () {
        return (this.loadedDataset.root_type === 'remote_directory')
      },
      rootDataset () {
        return this.breadcrumb[0]
      },
      isPaginated () {
        return this.data.length > this.perPage
      },
      // Active dataset in the breadcrumb
      breadcrumbActiveDataset () {
        if (this.breadcrumb.length === 0) {
          return null
        }

        return this.breadcrumb[this.breadcrumb.length - 1]
      },
      data () {
        if (!this.loadedDataset) {
          return []
        }

        return this.loadedDataset.children
      },
      canGoHome () {
        return this.breadcrumb.length > 1
      },
      canGoParent () {
        return this.breadcrumb.length > 1
      },
      canCreateDir () {
        if (this.readOnlyInternal) {
          return false
        }

        return true
      },
      canAddData () {
        if (this.readOnlyInternal) {
          return false
        }

        return true
      },
      canMoveDataset () {
        if (this.readOnlyInternal) {
          return false
        }

        return this.value !== null
      },
      canEdit () {
        if (this.readOnlyInternal) {
          return false
        }

        return this.value !== null
      },
      canDelete () {
        if (this.readOnlyInternal) {
          return false
        }

        return this.value !== null
      }
    },
    filters: {
      moment_ll: filters.moment_ll_short,
      humanFileSize: fileFilters.humanFileSize,
      type (value) {
        return (value) ? 'has-text-dark' : 'has-text-gray'
      }
    }
  }
</script>

<style scoped>
    nav.is-bring-to-back {
        z-index: 0;
    }
</style>