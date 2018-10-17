<template>
    <team-menu active="devices" :team="team">
        <div class="tile is-ancestor" v-for="row in computersChunked">
            <div class="tile is-parent is-4" v-for="c in row">
                <div class="tile is-child">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <fa-icon icon="desktop" size="3x" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">{{ c.computer_id }}</p>
                                    <p class="subtitle is-6">{{ $t('teamComputers.card.content.lastActivity') }} {{ c.updated_at | moment_from }}</p>
                                </div>
                            </div>

                            <div class="content">
                                <p>{{ c.rd_count }} {{ $t('teamComputers.card.content.remoteDirectories') }}</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <router-link :to="{name: 'team_computer', params: {computer_id: c.computer_id}}" class="card-footer-item">
                                {{ $t('teamComputers.card.actions.view') }}
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
  import {filters} from '@/plugins/moment'

  export default {
    name: 'TeamComputers',
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
        computers: []
      }
    },
    async mounted () {
      const response = await this.$api.teamComputers(this.team.id)

      this.computers = response.data
    },
    computed: {
      computersChunked () {
        return _.chunk(this.computers, 3)
      }
    },
    filters: {
      moment_from: filters.moment_from
    }
  }
</script>

<style scoped>

</style>