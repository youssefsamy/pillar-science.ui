<template>
    <admin-layout>
        <section class="box">
            <h1 class="title">{{ $t('admin.teamsCreate.title') }}</h1>

            <b-field :label="$t('admin.teamsCreate.form.name.label')" :message="bMessage($v.form.name, {field: $t('admin.teamsCreate.form.name.validation.field')})" :type="bType($v.form.name.$error)">
                <b-input name="name" v-model="form.name" :type="bType($v.form.name.$error)" />
            </b-field>

            <div class="field is-grouped">
                <div class="control">
                    <button id="createTeam" :class="{'is-loading': loading}" class="button is-primary" @click="handleCreate">{{ $t('admin.teamsCreate.form.create') }}</button>
                </div>
                <div class="control">
                    <router-link :to="{name: 'admin_teams'}" class="button is-text">{{ $t('admin.teamsCreate.form.cancel') }}</router-link>
                </div>
            </div>
        </section>
    </admin-layout>
</template>

<script>
  import AdminLayout from '@/components/layouts/Admin'
  import {required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import ErrorHelper from '@/services/errorHelper'

  export default {
    name: 'TeamsCreate',
    components: {
      AdminLayout
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        loading: false,
        form: {
          name: null,
          email: null,
          permissions: []
        }
      }
    },
    methods: {
      async handleCreate () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        this.loading = true

        try {
          await this.$api.teamCreate(this.form)
        } catch (error) {
          const helper = new ErrorHelper(error)

          this.$toast.open({
            message: helper.any(['name'])
          })
        }

        this.loading = false

        this.$toast.open({
          message: `${this.$t('admin.teamsCreate.form.toastr.complete')} ${this.form.name}`
        })

        this.$router.push({name: 'admin_teams'})
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