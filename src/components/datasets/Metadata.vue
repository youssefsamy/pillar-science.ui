<template>
    <app-layout>
        <section class="box">
            <b-table :data="metadata">
                <p slot="empty">
                    {{ $t('metadata.table.empty') }}
                </p>
                <template slot-scope="props">
                    <b-table-column label="Key">
                        {{ props.row.key }}
                    </b-table-column>

                    <b-table-column label="Value">
                        <span v-if="props.row.value">{{ props.row.value }}</span>
                        <span v-else class="has-text-grey-light">{{ $t('metadata.table.value.empty') }}</span>
                    </b-table-column>

                    <b-table-column>
                        <a href="#" @click.prevent="remove(props)">{{ $t('metadata.actions.remove.label') }}</a>
                    </b-table-column>
                </template>
            </b-table>
        </section>

        <section class="box">
            <div class="columns">
                <div class="column">
                    <b-field :label="$t('metadata.form.key.label')" :message="bMessage($v.form.key, {field: $t('metadata.form.key.validation.field')})" :type="bType($v.form.key.$error)">
                        <b-input ref="key" v-model="form.key" type="text" @keyup.enter.native="addMetadata" @blur="$v.form.key.$touch()" />
                    </b-field>
                </div>
                <div class="column">
                    <b-field :label="$t('metadata.form.value.label')">
                        <b-input v-model="form.value" type="text" @keyup.enter.native="addMetadata" />
                    </b-field>
                </div>
            </div>

            <button class="button is-primary" :class="{'is-loading': saving}" @click="addMetadata">{{ $t('metadata.actions.add.label') }}</button>
        </section>

        <div slot="dial-left">
            <back-button />
        </div>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import {required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import BackButton from '@/components/utils/BackButton'

  export default {
    name: 'Metadata',
    components: {
      AppLayout,
      BackButton
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        form: {
          key: null,
          value: null
        },
        metadata: [],
        saving: false
      }
    },
    methods: {
      async addMetadata () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.saving = true
        const response = await this.$api.datasetMetadataCreate(this.$route.params.dataset_id, this.form)

        this.metadata.push(response.data)
        this.form = {
          key: null,
          value: null
        }

        this.$refs.key.focus()
        this.$v.$reset()
        this.saving = false
      },
      async remove ({row, index}) {
        await this.$api.metadataDelete(row.id)

        this.metadata.splice(index, 1)
      }
    },
    async mounted () {
      const response = await this.$api.datasetMetadata(this.$route.params.dataset_id)

      this.metadata = response.data
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