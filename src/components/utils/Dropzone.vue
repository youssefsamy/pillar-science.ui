<template>
    <div>
        <div id="drop-area"
             :class="{highlight: highlight}"
             @dragenter.prevent.stop="onDragenter"
             @dragover.prevent.stop="onDragover"
             @dragleave.prevent.stop="onDragLeave"
             @drop.prevent.stop="onDrop"
        >
            <form class="my-form has-text-centered">
                <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
                <input ref="uploadInput" type="file" id="fileElem" multiple accept="*" @change="onSelectFiles">
                <br>
                <label class="button" for="fileElem">Select some files</label>
            </form>
        </div>

        <b-field v-if="uploading" :label="uploadProgressLabel">
            <progress class="progress is-primary" :value="progress" max="100">{{ progress }}%</progress>
        </b-field>

        <div class="filelist">
            <file-preview :file="f" :index="index" v-for="(f, index) in files" :key="index" @remove="onRemoveFile" />
        </div>
    </div>
</template>

<script>
  import FilePreview from '@/components/utils/FilePreview'
  import {uniqueId} from '@/services/crypto'

  export default {
    name: 'Dropzone',
    components: {
      FilePreview
    },
    props: {
      files: Array,
      uploading: Boolean
    },
    data () {
      return {
        highlight: false
      }
    },
    methods: {
      onDragenter () {
        this.highlight = true
      },
      onDragover () {
        this.highlight = true
      },
      onDragLeave () {
        this.highlight = false
      },
      onDrop (event) {
        this.highlight = false

        const eventFiles = event.dataTransfer.files
        const files = []

        for (let i = 0; i < eventFiles.length; i++) {
          files.push(this.createFromFile(eventFiles[i]))
        }

        this.$emit('change', files)
      },
      onSelectFiles () {
        const eventFiles = this.$refs.uploadInput.files
        const files = []

        for (let i = 0; i < eventFiles.length; i++) {
          files.push(this.createFromFile(eventFiles[i]))
        }

        this.$emit('change', files)
      },
      createFromFile (file) {
        return {
          id: uniqueId(),
          status: 'pending',
          file,
          progress: 0
        }
      },
      onRemoveFile (file, index) {
        this.files.splice(index, 1)
      }
    },
    computed: {
      uploadProgressLabel () {
        return `Upload progress (${this.completeCount} / ${this.total})`
      },
      completeUploads () {
        return this.files.filter(f => f.progress === 100)
      },
      progress () {
        return (this.completeCount * 100) / this.total
      },
      completeCount () {
        return this.completeUploads.length
      },
      total () {
        return this.files.length
      }
    }
  }
</script>

<style scoped>
    #drop-area {
        border: 2px dashed #ccc;
        border-radius: 10px;
        width: 100%;
        font-family: sans-serif;
        margin: 20px auto;
        padding: 40px;
    }
    #drop-area.highlight {
        border-color: purple;
    }
    p {
        margin-top: 0;
    }
    .my-form {
        margin-bottom: 10px;
    }
    #gallery {
        margin-top: 10px;
    }
    #gallery img {
        width: 150px;
        margin-bottom: 10px;
        margin-right: 10px;
        vertical-align: middle;
    }
    /*.button {*/
        /*display: inline-block;*/
        /*padding: 10px;*/
        /*background: #ccc;*/
        /*cursor: pointer;*/
        /*border-radius: 5px;*/
        /*border: 1px solid #ccc;*/
    /*}*/
    /*.button:hover {*/
        /*background: #ddd;*/
    /*}*/
    #fileElem {
        display: none;
    }

    .filelist {
        max-height: 300px;
        overflow-y: scroll;
    }

</style>