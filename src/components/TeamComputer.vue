<template>
    <team-menu active="devices" :team="team">

        <div class="tile is-ancestor" v-for="row in devicesChunked">
            <div class="tile is-parent is-3" v-for="device in row">
                <div class="tile is-child">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">{{ device.name }}</p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                {{ $t('teamComputers.card.content.lastActivity') }} {{ device.last_action_at | moment_from }}
                            </div>
                        </div>
                        <footer class="card-footer">
                            <router-link :to="{name: 'team_device', params: {device_id: device.id}}" class="card-footer-item">
                                {{ $t('teamComputers.card.actions.view') }}
                            </router-link>
                            <router-link :to="{name: 'team_device_edit', params: {device_id: device.id}}" class="card-footer-item">
                                {{ $t('teamComputers.card.actions.edit') }}
                            </router-link>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </team-menu>
</template>

<script>
  import TeamMenu from '@/components/teams/TeamMenu'
  import _ from 'lodash'

  export default {
    name: 'TeamDevices',
    components: {
      TeamMenu
    },
    props: {
      team: {
        Type: Object
      }
    },
    data () {
      return {
        devices: []
      }
    },
    async mounted () {
      const response = await this.$api.teamRemoteDirectories(this.team.id, this.$route.params.computer_id)

      this.devices = response.data
    },
    computed: {
      devicesChunked () {
        return _.chunk(this.devices, 4)
      }
    }
  }
</script>

<style scoped>

</style>