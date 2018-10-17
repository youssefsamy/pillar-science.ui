<template>
    <project-menu active="settings" :project="project">
        <div class="tile is-child">
            <section class="box">
                <b-field :label="$t('projectOverview.fields.description.label')">
                    <div class="text-editable content" :class="{'is-pointer': canEditOverview}" v-if="!edit" @click="handleToEditMode" v-html="preview"></div>
                    <vue-quill-editor v-if="edit" v-model="form.description" />
                </b-field>

                <b-field grouped>
                    <p class="control">
                        <button v-if="edit" class="button is-primary" :class="{'is-loading': saving}" @click="handleSave">{{ $t('projectOverview.actions.save') }}</button>
                    </p>
                    <p class="control">
                        <button v-if="edit" class="button" @click="handleCancel">{{ $t('projectOverview.actions.cancel') }}</button>
                    </p>
                </b-field>
            </section>
        </div>
    </project-menu>
</template>

<script>
  import formMixin from '@/mixins/formMixin'
  import {mapActions, mapGetters} from 'vuex'
  import ProjectMenu from '@/components/projects/ProjectMenu'
  import { quillEditor as VueQuillEditor } from 'vue-quill-editor'

  export default {
    name: 'ProjectOverview',
    components: {
      ProjectMenu,
      VueQuillEditor
    },
    data () {
      return {
        edit: false,
        saving: false,
        form: {
          description: null
        }
      }
    },
    mixins: [formMixin],
    methods: {
      ...mapActions({
        setLoading: 'app/setLoading'
      }),
      handleToEditMode () {
        if (!this.canEditOverview) {
          return
        }

        this.form.description = this.project.description
        this.edit = true
      },
      async handleSave () {
        this.saving = true
        const response = await this.$api.projectUpdate(this.project.id, this.form)

        this.$emit('update', response.data)

        this.edit = false
        this.saving = false
      },
      handleCancel () {
        this.edit = false
      }
    },
    computed: {
      ...mapGetters({
        project: 'project/project',
        canEditOverview: 'project/canEditOverview'
      }),
      isLoading () {
        return this.project === null
      },
      preview () {
        if (!this.project.description) {
          if (this.canEditOverview) {
            return `<p class="has-text-grey">${this.$t('projectOverview.fields.description.emptyEditable')}</p>`
          }

          return `<p class="has-text-grey">${this.$t('projectOverview.fields.description.empty')}</p>`
        }

        return this.project.description
      }
    }
  }
</script>

<style scoped>
    .text-editable:hover {
        background-color: rgba(0, 0, 0, 0.025);
        border-radius: 5px;
    }
</style>