<template>
    <section class="hot-container">
        <hot-table :settings="hotSettings"></hot-table>
    </section>
</template>

<script>
  import HotTable from '@handsontable/vue'
  import 'handsontable/dist/handsontable.full.css'

  export default {
    name: 'CsvRenderer',
    components: {
      HotTable
    },
    props: {
      dataset: Object,
      version: Number
    },
    data () {
      return {
        hotSettings: {
          data: [[]],
          columnSorting: true,
          manualColumnMove: true,
          manualRowMove: true,
          sortIndicator: true,
          minCols: 5,
          rowHeaders: true,
          colHeaders: true,
          startRows: 15,
          startCols: 10,
          manualColumnResize: true,
          manualRowResize: true,
          readOnly: true,
          contextMenu: true
        }
      }
    },
    mounted () {
      this.loadContent()
    },
    methods: {
      async loadContent () {
        const response = await this.$api.datasetVersionPreview(this.dataset.id, this.version)

        this.hotSettings.data = response.data.content
      }
    },
    watch: {
      dataset: function (value) {
        this.loadContent()
      },
      version: function (value) {
        this.loadContent()
      }
    }
  }
</script>

<style scoped>
    .hot-container {
        width: 100%;
        height: 550px;
        overflow: hidden;
    }
</style>