<template>
    <team-menu active="devices" :team="team">
        <section class="box">
            <dataset-view v-if="device" :dataset="device.directory" :read-only="true" />
        </section>
    </team-menu>
</template>

<script>
  import DatasetView from '@/components/datasets/DatasetView'
  import TeamMenu from '@/components/teams/TeamMenu'

  export default {
    components: {
      TeamMenu,
      DatasetView
    },
    props: {
      team: {
        Type: Object
      }
    },
    data () {
      return {
        device: null
      }
    },
    async mounted () {
      let response = await this.$api.remoteDirectory(this.$route.params.device_id)

      this.device = response.data
    },
    computed: {
      isLoading () {
        return this.device === null
      }
    }
  }
</script>

<style>

</style>