<template>
    <section class="box">
        <h2 class="title is-6 is-marginless">{{ $t('protocolsTab.messages.methods') }}</h2>
        <p class="has-text-grey">{{ $t('protocolsTab.messages.subtitle') }}</p>
        <br>
        <b-table :data="protocols">
            <section slot="empty">
                {{ $t('datasetSidePanel.messages.datasetNotAssociated') }}
            </section>
            <template slot-scope="props">
                <b-table-column :label="$t('protocolsTab.fields.name.label')">
                    <router-link target="_blank" :to="{name: 'dataset_protocol', params: {dataset_id: dataset.id, protocol_id: props.row.protocol.id}}">{{ props.row.protocol.name }}</router-link>
                    <span v-if="props.row.dataset.id !== dataset.id"> {{ $t('protocolsTab.messages.from') }} <strong>{{ props.row.dataset.name }}</strong></span>
                </b-table-column>

                <b-table-column :label="$t('protocolsTab.fields.detach.label')" :visible="canEditData">
                    <button class="button is-danger" :disabled="props.row.dataset.id !== dataset.id" :class="{'is-loading': detaching && detaching.index === props.index}" @click.prevent="remove(props)">
                        <fa-icon icon="minus-circle" class="icon" />
                        <span>{{ $t('protocolsTab.fields.detach.label') }}</span>
                    </button>
                </b-table-column>
            </template>
        </b-table>

        <template v-if="canEditData">
            <hr>

            <b-tabs v-model="activeTab">
                <b-tab-item :label="$t('protocolsTab.tabs.attach.label')">
                    <protocol-lookup :attaching="attaching" :dataset="dataset" :protocols="protocols" @attach="handleAttachProtocol" />
                </b-tab-item>

                <b-tab-item :label="$t('protocolsTab.tabs.new.label')">
                    <protocol-form-inline :saving="saving" @create="handleCreateProtocol" />
                </b-tab-item>
            </b-tabs>
        </template>
    </section>
</template>

<script>
  import ProtocolLookup from '@/components/protocols/ProtocolLookup'
  import ProtocolFormInline from '@/components/protocols/ProtocolFormInline'
  import {mapGetters} from 'vuex'

  export default {
    name: 'protocolsTab',
    components: {
      ProtocolLookup,
      ProtocolFormInline
    },
    props: {
      protocols: {
        type: Array,
        default: () => []
      },
      dataset: Object
    },
    data () {
      return {
        activeTab: null,
        attaching: null,
        detaching: null,
        saving: false
      }
    },
    methods: {
      async remove ({row, index}) {
        this.detaching = {row, index}
        await this.$api.datasetProtocolRemove(row.dataset.id, row.protocol.id)

        this.$emit('remove', {row, index})
        this.detaching = null
      },
      async handleAttachProtocol (protocol) {
        this.attaching = protocol
        await this.$api.datasetProtocolAttach(this.dataset.id, protocol.id)

        this.$emit('attach', protocol)
        this.attaching = null
      },
      async handleCreateProtocol (protocol) {
        this.saving = true
        const response = await this.$api.datasetProtocolCreate(this.dataset.id, protocol)

        this.$emit('created', response.data)
        this.saving = false
      }
    },
    computed: {
      ...mapGetters({
        canEditData: 'project/canEditData'
      })
    }
  }
</script>

<style scoped>

</style>