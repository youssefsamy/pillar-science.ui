<template>
    <app-layout>
        <section class="box">
            <b-field :label="$t('protocolForm.fields.name.label')" :message="bMessage($v.form.name, {field: $t('protocolForm.fields.name.validation.required.field')})" :type="bType($v.form.name.$error)">
                <b-input v-model="form.name" :type="bType($v.form.name.$error)" @blur="$v.form.name.$touch()"></b-input>
            </b-field>

            <b-field v-if="dataset && dataset.author" :label="$t('protocolForm.fields.author.label')">
                <p>{{ dataset.author.name }}</p>
            </b-field>

            <b-field v-if="dataset" :label="$t('protocolForm.fields.dataset.label')">
                <router-link :to="{name: 'dataset', params: {id: dataset.id}}">{{ dataset.name }}</router-link>
            </b-field>

            <b-field :label="$t('protocolForm.fields.content.label')">
                <vue-quill-editor
                        v-model="form.content"
                        @change="onEditorChange($event)"
                ></vue-quill-editor>
            </b-field>

            <div class="notification is-info" v-if="isInheritedProtocol">
                <i18n path="protocolForm.messages.inheritedProtocol" tag="p">
                    <router-link place="boundDataset" :to="{name : 'dataset_protocol_edit', params: {dataset_id: form.dataset.id, protocol_id: form.id}}">{{ form.dataset.name }}</router-link>
                    <strong place="parentDataset">{{ form.dataset.name }}</strong>
                </i18n>
            </div>

            <div class="buttons">
                <button class="button is-primary" :class="{'is-loading': saving}" @click="onSave">{{ saveCaption }}</button>
                <button v-if="canRemove" class="button is-danger" @click="onRemove">{{ $t('protocolForm.actions.detach.label') }}</button>
                <button class="button is-text" @click.prevent="$router.go(-1)">{{ $t('protocolForm.actions.back.label') }}</button>
            </div>
        </section>
    </app-layout>
</template>

<script>
  import AppLayout from '@/components/layouts/App'
  import { quillEditor as VueQuillEditor } from 'vue-quill-editor'
  import {required} from 'vuelidate/lib/validators'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import swal from 'sweetalert2'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import Helper from '@/services/errorHelper'

  export default {
    name: 'DatasetProtocol',
    components: {
      AppLayout,
      VueQuillEditor
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        hasContentChanged: false,
        originalContent: null,
        saving: false,
        dataset: null,
        form: {
          name: null,
          content: null,
          id: null,
          dataset: {
            id: null
          }
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(async vm => vm.setData(to, from))
    },
    beforeRouteUpdate (to, from, next) {
      next(async vm => vm.setData(to, from))
    },
    methods: {
      async setData (to, from) {
        try {
          if (to.params.dataset_id) {
            this.dataset = (await this.$api.dataset(to.params.dataset_id)).data
          }

          if (to.params.protocol_id) {
            let protocol
            if (to.params.dataset_id) {
              protocol = (await this.$api.datasetProtocol(to.params.dataset_id, to.params.protocol_id)).data
            } else {
              protocol = (await this.$api.protocol(to.params.protocol_id)).data
            }

            this.form = protocol
            this.originalContent = protocol.content
          }
        } catch (e) {
          const helper = new Helper(e)

          helper.updatePageStatusCode()
        }
      },
      onEditorChange ({quill, html, text}) {
        this.hasContentChanged = html !== this.originalContent
      },
      async onSave () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.saving = true

        if (this.editing) {
          await this.$api.protocolUpdate(this.$route.params.protocol_id, this.form)

          this.originalContent = this.form.content
          this.hasContentChanged = false
        } else {
          await this.$api.datasetProtocolCreate(this.$route.params.dataset_id, this.form)
        }

        this.saving = false
        this.$router.go(-1)
      },
      async onRemove () {
        if (this.isInheritedProtocol) {
          const input = await swal({
            title: this.$t('protocolForm.swal.removeInherited.title'),
            text: this.$t('protocolForm.swal.removeInherited.text', {
              protocolDataset: this.form.dataset.name,
              dataset: this.dataset.name
            }),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: this.$t('protocolForm.swal.removeInherited.confirm'),
            cancelButtonText: this.$t('protocolForm.swal.removeInherited.cancel')
          })

          if (!input.value) {
            return
          }
        }

        const datasetId = (this.editing) ? this.form.dataset.id : this.$route.params.dataset_id

        await this.$api.datasetProtocolRemove(datasetId, this.$route.params.protocol_id)

        this.$router.go(-1)
      }
    },
    computed: {
      canRemove () {
        return this.hasProtocol && this.hasDataset
      },
      saveCaption () {
        return (this.editing) ? this.$t('protocolForm.actions.update.label') : this.$t('protocolForm.actions.create.label')
      },
      editing () {
        return this.hasDataset
      },
      hasProtocol () {
        return Boolean(this.$route.params.protocol_id)
      },
      hasDataset () {
        return Boolean(this.$route.params.dataset_id)
      },
      isInheritedProtocol () {
        if (!this.form.dataset || !this.$route.params.protocol_id) {
          return false
        }

        return parseInt(this.$route.params.dataset_id) !== this.form.dataset.id
      }
    },
    validations () {
      return {
        form: {
          name: {
            required
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>