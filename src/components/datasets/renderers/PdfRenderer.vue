<template>
    <section class="box">
        <h1 class="title">{{ dataset.name }}</h1>
        <embed v-if="flickers.pdf" :src="src" width="100%" :height="height" />
    </section>
</template>

<script>
  import FlickerMixin from '@/mixins/flickerMixin'

  export default {
    name: 'PdfRenderer',
    mixins: [FlickerMixin],
    props: {
      dataset: Object,
      version: Number
    },
    mounted () {
      this.addFlicker('pdf')
    },
    computed: {
      height () {
        return window.innerHeight - 50
      },
      src () {
        return `${process.env.API_URL}api/datasets/${this.dataset.id}/dataset-versions/${this.version}/preview`
      }
    },
    watch: {
      version () {
        this.flick('pdf')
      }
    }
  }
</script>

<style scoped>

</style>