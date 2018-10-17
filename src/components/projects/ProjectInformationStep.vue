<template>
    <section test-id="project-information-step">
        <template v-if="teams.length > 0">
        <b-field :label="$t('projectInformationStep.fields.name.label')" :message="bMessage($v.name, {field: $t('projectInformationStep.fields.name.validation.field')})" :type="bType($v.name.$error)">
            <b-input test-id="project-name" v-model="name" @blur="$v.name.$touch()"></b-input>
        </b-field>

        <b-field :label="$t('projectInformationStep.fields.team.label')" :message="bMessage($v.team, {field: $t('projectInformationStep.fields.team.validation.field')})" :type="bType($v.team.$error)">
            <b-select test-id="project-team" v-model="team" :placeholder="$t('projectInformationStep.fields.team.placeholder')" @blur="$v.name.$touch()" expanded>
                <option
                        v-for="team in teams"
                        :test-name="team.name"
                        :value="team"
                        :key="team.id">
                    {{ team.name }}
                </option>
            </b-select>
        </b-field>
        </template>
        <template v-else>
            <div class="columns">
                <div class="column"></div>
                <div class="column">
                    <b-message type="is-warning" has-icon>
                        {{ $t('projectInformationStep.messages.noteam') }}
                    </b-message>
                </div>
                <div class="column"></div>
            </div>
        </template>
    </section>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'
  import { createHelpers } from 'vuex-map-fields'
  import Team from '@/entities/team'

  const { mapFields } = createHelpers({
    getterType: 'projectWizard/getField',
    mutationType: 'projectWizard/updateField'
  })

  export default {
    name: 'ProjectInformationStep',
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        teams: []
      }
    },
    async mounted () {
      const response = await this.$api.teams()

      this.teams = Team.collection(response.data)

      if (this.teams.length === 1) {
        this.team = this.teams[0]
      }
    },
    computed: {
      ...mapFields({
        name: 'name',
        team: 'team'
      })
    },
    validations () {
      return {
        name: {
          required
        },
        team: {
          required
        }
      }
    }
  }
</script>

<style scoped>

</style>