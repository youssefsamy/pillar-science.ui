<template>
    <div test-id="project-confirmation-step">
        <b-field test-id="name" :label="$t('projectConfirmationStep.fields.name.label')">
            <p>{{ name }}</p>
        </b-field>
        <br>
        <b-field v-if="team" test-id="team" :label="$t('projectConfirmationStep.fields.team.label')">
            <p>{{ team.name }}</p>
        </b-field>
        <br>
        <b-field v-if="user" test-id="members" :label="$t('projectConfirmationStep.fields.members.label')">
            <p>{{ user.name }}</p>
        </b-field>
    </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields'
  import { mapGetters } from 'vuex'

  const { mapFields } = createHelpers({
    getterType: 'projectWizard/getField',
    mutationType: 'projectWizard/updateField'
  })

  export default {
    name: 'ProjectConfirmationStep',
    computed: {
      ...mapFields({
        name: 'name',
        team: 'team'
      }),
      ...mapGetters({
        user: 'user/user'
      })
    }
  }
</script>

<style scoped>

</style>