<template>
    <div>
        <section class="box button-bar">
            <b-field grouped>
                <b-field>
                    <b-select v-model="selectedVersionId">
                        <option v-for="v in dataset.versions" :value="v.id">{{ v.created_at | moment_llll }}</option>
                    </b-select>
                </b-field>

                <b-field>
                    <button class="button is-primary" @click="uploadVersion">
                        <fa-icon icon="upload" class="icon" />
                        <span>Upload new version</span>
                    </button>
                </b-field>

                <b-field>
                    <a :href="src" download="true" class="button is-primary">
                        <fa-icon icon="download" class="icon" />
                        <span>{{ $t('datasetRenderer.actions.download.label') }}</span>
                    </a>
                </b-field>
            </b-field>
        </section>

        <component v-if="selectedVersionId" :is="component" :dataset="dataset" :version="selectedVersionId" @update="handleUpdateContent" />
    </div>
</template>

<script>
  import mimeTypeResolver from '@/services/mimeTypeResolver'
  import {filters} from '@/plugins/moment'
  import swal from 'sweetalert2'

  export default {
    props: {
      dataset: Object
    },
    data () {
      return {
        selectedVersionId: null
      }
    },
    async mounted () {
      this.selectedVersionId = this.dataset.current_version.id
    },
    methods: {
      async uploadVersion () {
        const {value} = await swal({
          title: 'New dataset version',
          text: 'Select the new version of the dataset to upload',
          input: 'file',
          confirmButtonText: 'Upload',
          cancelButtonText: 'Cancel',
          showCancelButton: true
        })

        if (!value) {
          return
        }

        const response = await this.$api.datasetVersionCreate(this.dataset.id, value)

        this.selectedVersionId = response.data.id

        this.$emit('add-version', response.data)
      },
      handleUpdateContent (version) {
        this.selectedVersionId = version.id

        this.$emit('add-version', version)
      }
    },
    computed: {
      selectedVersion () {
        return this.dataset.versions.find(v => v.id === this.selectedVersionId)
      },
      component () {
        return mimeTypeResolver.getRendererForMimeType(this.selectedVersion.mime_type)
      },
      src () {
        return `${process.env.API_URL}api/datasets/${this.dataset.id}/preview?raw=true`
      }
    },
    filters: {
      moment_llll: filters.moment_llll
    }
  }
</script>

<style>

</style>