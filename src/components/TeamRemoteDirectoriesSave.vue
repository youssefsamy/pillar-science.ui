<template>
    <team-menu active="devices" :team="team" v-if="device">
        <b-field :label="$t('teamDevicesSave.fields.name.label')" :message="bMessage($v.device.name, {field: $t('teamDevicesSave.fields.name.validation')})" :type="bType($v.device.name.$error)">
            <b-input v-model="device.name" name="name" @blur="$v.device.name.$touch()" />
        </b-field>

        <button class="button is-primary" @click="save">{{ $t('teamDevicesSave.actions.save.label') }}</button>
    </team-menu>
</template>

<script>
  import TeamMenu from '@/components/teams/TeamMenu'
  import {required} from 'vuelidate/lib/validators'
  import BuefyVuelidateMixin from '@/mixins/buefyVuelidateMixin'

  export default {
    name: 'TeamDevicesSave',
    components: {
      TeamMenu
    },
    props: {
      team: Object
    },
    mixins: [BuefyVuelidateMixin],
    data () {
      return {
        device: null
      }
    },
    async mounted () {
      const response = await this.$api.remoteDirectory(this.$route.params.device_id)

      this.device = response.data
    },
    methods: {
      async save () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        const data = {
          name: this.device.name
        }

        await this.$api.remoteDirectoryUpdate(this.device.id, data)

        await this.$toast.open({
          message: this.$t('teamDevicesSave.toast.success', {device: this.device.name}),
          type: 'is-success',
          position: 'is-bottom'
        })

        this.$router.push({name: 'team_computers'})
      }
    },
    validations () {
      return {
        device: {
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