<template>
    <project-menu active="settings" :project="project">
        <div class="tile is-child">
            <div class="box">
                <b-field :label="$t('projectSettings.fields.name.label')" :message="bMessage($v.form.name, {field: $t('projectSettings.fields.name.validation.field')})" :type="bType($v.form.name.$error)">
                    <b-input type="text" v-model="form.name" @blur="$v.form.name.$touch()" @keyup.native.enter="handleUpdate"></b-input>
                </b-field>

                <button class="button is-primary" @click="handleUpdate" :disabled="!canRename">{{ $t('projectSettings.actions.rename.label')}}</button>
            </div>

            <div class="box">
                <button class="button is-danger" @click="handleDelete">{{ $t('projectSettings.actions.delete.label') }}</button>
            </div>
        </div>
    </project-menu>
</template>

<script>
  import formMixin from '@/mixins/formMixin'
  import {mapActions, mapGetters} from 'vuex'
  import ProjectMenu from '@/components/projects/ProjectMenu'
  import swal from 'sweetalert2'
  import theme from '../assets/theme.scss'
  import {required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'

  export default {
    name: 'ProjectSettings',
    components: {
      ProjectMenu
    },
    mixins: [formMixin, BuefyVuelidateMixin],
    data () {
      return {
        resource: 'projects',
        form: {
          name: null
        }
      }
    },
    mounted () {
      this.form.name = this.project.name
    },
    methods: {
      ...mapActions({
        setLoading: 'app/setLoading'
      }),
      async handleDelete () {
        let response = await swal({
          title: this.$t('projectSettings.swal.delete.title'),
          text: this.$t('projectSettings.swal.delete.text'),
          type: 'warning',
          confirmButtonText: this.$t('projectSettings.swal.delete.confirm'),
          cancelButtonText: this.$t('projectSettings.swal.delete.cancel'),
          showCancelButton: true,
          confirmButtonColor: theme.danger
        })

        if (!response.value) {
          return
        }

        try {
          response = this.$http(this.deleteRequest)
        } catch (e) {
          await swal({
            title: this.$t('projectSettings.swal.error.title'),
            text: this.$t('projectSettings.swal.error.text', {project: this.project.name}),
            type: 'error'
          })

          return
        }

        this.$toast.open({
          message: this.$t('projectSettings.toast.success', {project: this.project.name}),
          type: 'is-success',
          position: 'is-bottom'
        })

        this.$router.push({name: 'projects'})
      },
      async handleUpdate () {
        if (!this.canRename) {
          return
        }

        const form = {
          data: {
            ...this.form
          }
        }

        try {
          await this.$http({...this.updateRequest, ...form})
        } catch (e) {
          this.form.name = this.project.name

          this.$toast.open({
            message: this.$t('projectSettings.toast.renameFailed'),
            type: 'is-danger',
            position: 'is-bottom'
          })

          return
        }

        this.$emit('update', form.data)
      }
    },
    computed: {
      ...mapGetters({
        project: 'project/project'
      }),
      isLoading () {
        return this.project === null
      },
      canRename () {
        return this.project.name !== this.form.name && this.form.name
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