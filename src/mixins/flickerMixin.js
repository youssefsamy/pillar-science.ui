export default {
  data () {
    return {
      flickers: {}
    }
  },
  methods: {
    addFlicker (flickerId) {
      this.$set(this.flickers, flickerId, true)
    },
    flick (flickerId) {
      this.$set(this.flickers, flickerId, false)

      this.$nextTick(function () {
        this.$set(this.flickers, flickerId, true)
      })
    }
  }
}
