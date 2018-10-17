export default {
  data () {
    return {
      formKey: 'resourceId',
      prefix: '/api',
      resource: 'resource'
    }
  },
  computed: {
    resourceId () {
      return (this.$route.params.id) ? parseInt(this.$route.params.id) : null
    },
    isCreate () {
      return this[this.formKey] === null
    },
    isUpdate () {
      return !this.isCreate
    },
    getUrl () {
      return `${this.prefix}/${this.resource}/${this[this.formKey]}`
    },
    getMethod () {
      return 'get'
    },
    createUrl () {
      return `${this.prefix}/${this.resource}`
    },
    createMethod () {
      return 'post'
    },
    updateUrl () {
      return `${this.prefix}/${this.resource}/${this[this.formKey]}`
    },
    updateMethod () {
      return 'put'
    },
    deleteMethod () {
      return 'delete'
    },
    deleteUrl () {
      return `${this.prefix}/${this.resource}/${this[this.formKey]}`
    },
    getRequest () {
      return {
        method: this.getMethod,
        url: this.getUrl
      }
    },
    saveRequest () {
      return (this.isCreate) ? this.createRequest : this.updateRequest
    },
    createRequest () {
      return {
        method: this.createMethod,
        url: this.createUrl
      }
    },
    updateRequest () {
      return {
        method: this.updateMethod,
        url: this.updateUrl
      }
    },
    deleteRequest () {
      return {
        method: this.deleteMethod,
        url: this.deleteUrl
      }
    },
    submitText () {
      return (this.isCreate) ? 'form.submit.create' : 'form.submit.update'
    }
  }
}
