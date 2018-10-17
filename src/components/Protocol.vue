<template>
    <app-layout>
        <template slot="breadcrumb">
            <breadcrumb>
                <template v-if="dataset">
                    <li class="is-active"><a href="#" aria-current="page">Datasets</a></li>
                    <li><router-link :to="{name: 'dataset', params: {id: dataset.id }}">{{ dataset.name }}</router-link></li>
                </template>
                <template v-if="protocol">
                    <li class="is-active"><a href="#" aria-current="page">Protocols</a></li>
                    <li><router-link :to="{name: 'protocol', params: {protocol_id: protocol.id}}">{{ protocol.name }}</router-link></li>
                </template>
            </breadcrumb>
        </template>

        <section class="box">
            <b-field grouped>
                <router-link class="button" :to="editRoute">
                    <fa-icon icon="edit" size="lg" />
                    <span>{{ $t('protocol.actions.edit.label') }}</span>
                </router-link>
            </b-field>
        </section>

        <section class="box">
            <b-field :label="$t('protocol.fields.name.label')">
                <p>{{ protocol.name }}</p>
            </b-field>

            <b-field v-if="dataset && dataset.author" :label="$t('protocol.fields.author.label')">
                <p>{{ dataset.author.name }}</p>
            </b-field>

            <b-field v-if="dataset" :label="$t('protocol.fields.dataset.label')">
                <router-link :to="{name: 'dataset', params: {id: dataset.id}}">{{ dataset.name }}</router-link>
            </b-field>

            <b-field :label="$t('protocol.fields.content.label')">
                <div v-html="protocol.content"></div>
            </b-field>
        </section>

        <div slot="dial-left">
            <back-button />
        </div>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import Helper from '@/services/errorHelper'
  import Breadcrumb from '@/components/utils/Breadcrumb'
  import BackButton from '@/components/utils/BackButton'

  export default {
    name: 'Protocol',
    components: {
      AppLayout,
      Breadcrumb,
      BackButton
    },
    data () {
      return {
        dataset: null,
        protocol: {
          name: null,
          content: null
        }
      }
    },
    async mounted () {
      const datasetId = this.$route.params.dataset_id
      const protocolId = this.$route.params.protocol_id

      try {
        if (datasetId) {
          this.dataset = (await this.$api.dataset(datasetId)).data
        }

        if (protocolId) {
          let protocol
          if (datasetId) {
            protocol = (await this.$api.datasetProtocol(datasetId, protocolId)).data
          } else {
            protocol = (await this.$api.protocol(protocolId)).data
          }

          this.protocol = protocol
        }
      } catch (e) {
        const helper = new Helper(e)

        helper.updatePageStatusCode()
      }
    },
    computed: {
      editRoute () {
        if (this.$route.params.protocol_id) {
          return {
            name: 'dataset_protocol_edit',
            params: {
              dataset_id: this.$route.params.dataset_id,
              protocol_id: this.$route.params.protocol_id
            }
          }
        }

        return {
          name: 'protocol_edit',
          params: {
            protocol_id: this.$route.params.protocol_id
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>