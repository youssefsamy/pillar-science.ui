<template>
    <div>
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add data</p>
            </header>
            <section class="modal-card-body">
                <b-tabs v-model="activeTab">
                    <b-tab-item label="Your Computer">
                        <dropzone :uploading="uploading" :files="files" @change="onChangeDropzone" />
                    </b-tab-item>
                    <b-tab-item label="Synchronised Computer">
                        <b-field label="Computer">
                            <b-select v-model="selectedComputer" placeholder="Choose a computer">
                                <option :value="c.computer_id" v-for="c in computers">{{ c.computer_id }}</option>
                            </b-select>
                        </b-field>

                        <b-field label="Remote Directory" v-if="selectedComputer">
                            <b-select v-model="selectedDirectory" placeholder="Choose a remote directory">
                                <option :value="rm" v-for="rm in directories">{{ rm.name }}</option>
                            </b-select>
                        </b-field>

                        <b-field v-if="tree.length" label="Dataset">
                            <liquor-tree ref="tree" v-if="tree.length && displayTree" :data="tree" v-model="selected" :options="treeOptions">
                                <span class="tree-text" slot-scope="{ node }">
                                    <fa-icon icon="folder" size="lg" />
                                    <span>{{ node.text }}</span>
                                </span>
                            </liquor-tree>
                        </b-field>

                        <b-message type="is-danger" v-if="errors.parent_id && selected">
                            The remote directory <i>{{ selected.data.name }}</i> has already been added to the current directory
                        </b-message>
                    </b-tab-item>
                </b-tabs>
            </section>
            <footer class="modal-card-foot">
                <button @click="onUploadFiles" class="button is-primary" :class="{'is-loading': uploading}" :disabled="files.length === 0" v-if="activeTab === 0">
                    <fa-icon icon="upload" class="icon" />
                    <span>Upload</span>
                </button>
                <button @click="onMapfiles" class="button is-primary" :class="{'is-loading': loading}" :disabled="!selected" v-if="activeTab === 1">Add</button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
  import Dropzone from '@/components/utils/Dropzone'
  import {mapGetters} from 'vuex'
  import LiquorTree from 'liquor-tree'
  import {buildTreeFromFlatArray} from '@/services/datasetManager'

  export default {
    name: 'AddDataModal',
    components: {
      Dropzone,
      LiquorTree
    },
    props: {
      loadedDataset: Object
    },
    data () {
      return {
        uploading: false,
        loading: false,
        files: [],
        activeTab: 0,
        computers: [],
        selectedComputer: null,
        directories: [],
        selectedDirectory: null,
        tree: [],
        selected: null,
        displayTree: true,
        errors: {}
      }
    },
    async mounted () {
      const response = await this.$api.teamComputers(this.project.team.id)

      this.computers = response.data
    },
    methods: {
      onChangeDropzone (files) {
        this.files = files
      },
      async onMapfiles () {
        this.loading = true
        try {
          const response = await this.$api.datasetMapTo(this.selected.id, this.loadedDataset.id)

          this.loadedDataset.children.push(response.data)

          this.$emit('close')
        } catch ({response: {data: {error: {errors}}}}) {
          this.errors = errors
        }
        this.loading = false
      },
      async onUploadFiles () {
        this.uploading = true
        const promises = []

        this.files.forEach(async file => {
          const formData = new FormData()

          formData.append('file', file.file)

          file.status = 'uploading'

          const promise = this.$api.datasetUpload(this.loadedDataset.id, formData, {
            onUploadProgress: function (progressEvent) {
              file.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

              if (file.progress === 100) {
                file.status = 'done'
              }
            }
          })

          promises.push(promise)

          const response = await promise

          if (response.status === 200) {
            const index = this.loadedDataset.children.findIndex(d => d.id === response.data.id)

            this.loadedDataset.children.splice(index, 1)
          }

          this.loadedDataset.children.push(response.data)
        })

        await Promise.all(promises)

        this.uploading = false
        this.$emit('close')
      }
    },
    computed: {
      ...mapGetters({
        project: 'project/project'
      }),
      treeOptions () {
        return {
          multiple: false
        }
      }
    },
    watch: {
      async selectedComputer (value, old) {
        const response = await this.$api.teamRemoteDirectories(this.project.team.id, value)

        this.directories = response.data

        this.selectedDirectory = null
        this.errors = {}
      },
      async selectedDirectory (remoteDirectory, old) {
        this.displayTree = false
        this.selected = null
        const descendantsPromise = this.$api.datasetDescendants(remoteDirectory.directory.id)

        this.tree = buildTreeFromFlatArray((await descendantsPromise).data, remoteDirectory.directory)
        this.errors = {}

        this.$nextTick(function () {
          this.displayTree = true
        })
      },
      selected (directory, old) {
        this.errors = {}
      }
    }
  }
</script>

<style scoped>

</style>