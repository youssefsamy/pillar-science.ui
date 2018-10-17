<template>
    <div>
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Move dataset</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Dataset to move">
                    <p>{{ sourceDataset.name }}</p>
                </b-field>

                <b-field label="Choose destination directory">
                    <liquor-tree ref="tree" v-if="tree.length" :data="tree" v-model="selected" :options="treeOptions">
                        <span class="tree-text" slot-scope="{ node }">
                            <fa-icon icon="folder" size="lg" />
                            <span>{{ node.text }}</span>
                        </span>
                    </liquor-tree>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" :class="{'is-loading': loading}" :disabled="!this.selected" @click="move">Move</button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
  import LiquorTree from 'liquor-tree'
  import {buildTreeFromFlatArray} from '@/services/datasetManager'

  export default {
    name: 'MoveDatasetModal',
    components: {
      LiquorTree
    },
    props: {
      sourceDataset: Object,
      rootDataset: Object
    },
    data () {
      return {
        tree: [],
        ancestors: [],
        selected: null,
        loading: false
      }
    },
    async mounted () {
      const descendantsPromise = this.$api.datasetDescendants(this.rootDataset.id)
      const breadcrumbPromise = this.$api.datasetAncestors(this.sourceDataset.id)

      this.ancestors = (await breadcrumbPromise).data
      this.tree = buildTreeFromFlatArray((await descendantsPromise).data, this.rootDataset, this.sortedAncestors.map(d => d.id))
    },
    methods: {
      move () {
        this.loading = true
        this.$emit('move', this.sourceDataset, this.selected)
      }
    },
    computed: {
      sortedAncestors () {
        return this.ancestors.sort((a, b) => Math.sign(a.order - b.order))
      },
      treeOptions () {
        return {
          multiple: false
        }
      }
    }
  }
</script>

<style scoped>

</style>