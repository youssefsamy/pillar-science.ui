<template>
    <section class="box">
        <h1 class="title">{{ dataset.name }}</h1>
        <vue-quill-editor
                v-if="content"
                v-model="content"
                :options="editorOptions"
                @change="onEditorChange($event)"
        ></vue-quill-editor>
        <br />
        <div class="buttons">
            <button class="button is-primary" :class="{'is-loading': savingContent}" :disabled="!hasContentChanged" @click="onSave">{{ $t('richTextRenderer.actions.save.label') }}</button>
        </div>
    </section>
</template>

<script>
  import { quillEditor as VueQuillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import swal from 'sweetalert2'

  export default {
    name: 'RichTextRenderer',
    components: {
      VueQuillEditor
    },
    props: {
      dataset: Object,
      version: Number
    },
    data () {
      return {
        hasContentChanged: false,
        originalContent: null,
        content: null,
        savingContent: false,
        editorOptions: {
          theme: 'snow'
        }
      }
    },
    async mounted () {
      this.loadContent()
    },
    methods: {
      async loadContent () {
        const response = await this.$api.datasetVersionPreview(this.dataset.id, this.version)

        this.content = response.data
        this.originalContent = response.data
      },
      onEditorChange ({quill, html, text}) {
        this.hasContentChanged = (text.trim() !== this.originalContent)
      },
      async onSave () {
        this.savingContent = true
        const response = await this.$api.datasetUpdate(this.dataset.id, {
          content: this.content
        })
        this.savingContent = false

        this.originalContent = this.content
        this.hasContentChanged = false

        this.$emit('update', response.data.current_version)
      },
      async onConfirm () {
        if (!this.hasContentChanged) {
          return true
        }

        const input = await swal({
          title: this.$t('richTextRenderer.swal.leaveWithoutSaving.title'),
          text: this.$t('richTextRenderer.swal.leaveWithoutSaving.text'),
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: this.$t('richTextRenderer.swal.leaveWithoutSaving.confirm'),
          cancelButtonText: this.$t('richTextRenderer.swal.leaveWithoutSaving.cancel')
        })

        if (input.dismiss) {
          return false
        }

        return true
      }
    },
    watch: {
      version: function () {
        this.loadContent()
      }
    }
  }
</script>

<style scoped>

</style>