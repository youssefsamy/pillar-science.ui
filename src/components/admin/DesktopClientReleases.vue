<template>
    <admin-layout>
        <section class="box">
            <h1 class="title">Create New Desktop Client Release</h1>

            <b-field grouped>
                <b-field class="file">
                    <b-upload v-model="files">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Select file</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="files && files.length">
                        {{ files[0].name }}
                    </span>
                </b-field>

                <b-field>
                    <button class="button" :class="{'is-loading': loading}" @click="uploadRelease" :disabled="uploadDisabled">Create release</button>
                </b-field>
            </b-field>
        </section>

        <section class="box">
            <h1 class="title">Desktop Client Releases</h1>

            <b-table :data="releases">
                <template slot-scope="props">
                    <b-table-column label="ID">
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column label="Release date">
                        {{ props.row.created_at }}
                    </b-table-column>

                    <b-table-column label="Size">
                        {{ props.row.size | humanFileSize }}
                    </b-table-column>
                </template>
            </b-table>
        </section>
    </admin-layout>
</template>

<script>
  import AdminLayout from '@/components/layouts/Admin'
  import {filters} from '@/plugins/files'

  export default {
    name: 'DesktopClientReleases',
    components: {
      AdminLayout
    },
    data () {
      return {
        files: [],
        loading: false,
        releases: []
      }
    },
    async mounted () {
      const response = await this.$api.desktopClients()

      this.releases = response.data
    },
    methods: {
      async uploadRelease () {
        this.loading = true

        const response = await this.$api.desktopClientUploadRelease(this.files[0])

        this.releases.unshift(response.data)

        this.files = []

        this.loading = false
      }
    },
    computed: {
      uploadDisabled () {
        return !(this.files && this.files.length > 0)
      }
    },
    filters: {
      humanFileSize: filters.humanFileSize
    }
  }
</script>

<style scoped>

</style>