<template>
    <section class="box">
        <h2 class="title is-6 is-marginless">{{ $t('metadataTab.messages.metadata') }} <router-link :to="{name: 'help_metadata'}" target="_blank"><fa-icon icon="info-circle" /></router-link></h2>
        <p class="has-text-grey">{{ $t('metadataTab.messages.subtitle') }}</p>
        <br>
        <b-table :data="metadata">
            <section slot="empty">
                {{ $t('metadata.table.empty') }}
            </section>
            <template slot-scope="props">
                <b-table-column label="Key">
                    <strong>{{ props.row.metadatum.key }}</strong>
                    <span v-if="props.row.dataset.id !== dataset.id"> {{ $t('protocolsTab.messages.from') }} <strong>{{ props.row.dataset.name }}</strong></span>
                </b-table-column>

                <b-table-column label="Value">
                    <span v-if="props.row.metadatum.value">
                        {{ props.row.metadatum.value }}
                    </span>
                    <span v-else class="has-text-grey-light">{{ $t('metadata.table.value.empty') }}</span>
                </b-table-column>

                <b-table-column :visible="canEditData">
                    <a href="#" v-if="props.row.dataset.id === dataset.id" @click.prevent="remove(props)">{{ $t('metadata.actions.remove.label') }}</a>
                </b-table-column>
            </template>
        </b-table>
        <template v-if="canEditData">
            <div class="columns">
                <div class="column">
                    <b-field :label="$t('metadata.form.key.label')" :message="bMessage($v.form.key, {field: $t('metadata.form.key.validation.field')})" :type="bType($v.form.key.$error)">
                        <b-input ref="key" v-model="form.key" type="text" @keyup.enter.native="addMetadata" />
                    </b-field>
                </div>
                <div class="column">
                    <b-field :label="$t('metadata.form.value.label')">
                        <b-input v-model="form.value" type="text" @keyup.enter.native="addMetadata" />
                    </b-field>
                </div>
            </div>

            <button class="button is-primary" :class="{'is-loading': saving}" @click="addMetadata">{{ $t('metadata.actions.add.label') }}</button>
        </template>
    </section>
</template>

<script>
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import {required} from 'vuelidate/lib/validators'
  import {mapGetters} from 'vuex'

  export default {
    name: 'metadataTab',
    props: {
      dataset: Object,
      metadata: Array
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        saving: false,
        form: {
          key: null,
          value: null
        }
      }
    },
    methods: {
      async addMetadata () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.saving = true
        const response = await this.$api.datasetMetadataCreate(this.dataset.id, this.form)

        this.$emit('add', response.data)
        this.form = {
          key: null,
          value: null
        }

        this.$refs.key.focus()
        this.$v.$reset()
        this.saving = false
      },
      async remove ({row: {metadatum, dataset}, index}) {
        await this.$api.metadataDelete(metadatum.id)

        this.$emit('remove', {metadatum, index})
      }
    },
    computed: {
      ...mapGetters({
        canEditData: 'project/canEditData'
      })
    },
    validations () {
      return {
        form: {
          key: {
            required
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>