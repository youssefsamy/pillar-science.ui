<template>
    <div>
        <b-field :label="$t('protocolFormInline.fields.name.label')" :message="bMessage($v.form.name, {field: $t('protocolFormInline.fields.name.validation.required.field')})" :type="bType($v.form.name.$error)">
            <b-input v-model="form.name" :placeholder="$t('protocolFormInline.fields.name.placeholder')" :type="bType($v.form.name.$error)"></b-input>
        </b-field>

        <b-field label="Content">
            <vue-quill-editor
                    v-model="form.content"
                    @change="onEditorChange($event)"
            ></vue-quill-editor>
        </b-field>

        <button class="button is-primary" :class="{'is-loading': saving}" @click="onSave">{{ $t('protocolFormInline.actions.save') }}</button>
    </div>
</template>

<script>
  import { quillEditor as VueQuillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'

  export default {
    name: 'ProtocolFormInline',
    components: {
      VueQuillEditor
    },
    props: {
      saving: Boolean
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        hasContentChanged: false,
        originalContent: null,
        form: {
          name: null,
          content: null
        }
      }
    },
    mounted () {
    },
    methods: {
      onEditorChange ({quill, html, text}) {
        this.hasContentChanged = html !== this.originalContent
      },
      async onSave () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.$emit('create', this.form)

        this.form = {
          name: null,
          content: null
        }

        this.$v.$reset()
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