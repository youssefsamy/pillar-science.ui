<template>
    <app-layout>
        <section class="section">
            <div class="box">
                <b-table :data="protocols">
                    <template slot-scope="props">
                        <b-table-column label="Name">
                            <router-link :to="{name: 'protocol', params: {protocol_id: props.row.id}}">{{ props.row.name }}</router-link>
                        </b-table-column>

                        <b-table-column label="Excerpt">
                            {{ props.row.excerpt }}...
                        </b-table-column>

                        <b-table-column label="Author">
                            {{ props.row.user.name }}
                        </b-table-column>
                    </template>
                </b-table>
            </div>
        </section>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'

  export default {
    name: 'Protocols',
    components: {
      AppLayout
    },
    data () {
      return {
        protocols: []
      }
    },
    async mounted () {
      const response = await this.$api.protocols()

      this.protocols = response.data
    }
  }
</script>

<style scoped>

</style>