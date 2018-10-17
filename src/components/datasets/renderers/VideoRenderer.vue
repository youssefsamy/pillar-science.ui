<template>
    <div class="box">
        <h1 class="title">{{ dataset.name }}</h1>
        <div class="has-text-centered">
            <video v-if="flickers.video" controls>
                <source :src="src">
            </video>
        </div>
    </div>
</template>

<script>
  import FlickerMixin from '@/mixins/flickerMixin'

  export default {
    name: 'VideoRenderer',
    mixins: [FlickerMixin],
    props: {
      dataset: Object,
      version: Number
    },
    mounted () {
      this.addFlicker('video')
    },
    computed: {
      src () {
        return `${process.env.API_URL}api/datasets/${this.dataset.id}/dataset-versions/${this.version}/preview`
      }
    },
    watch: {
      version () {
        this.flick('video')
      }
    }
  }
</script>

<style scoped>
    video {
        max-height: 80vh;
    }

    h1.title, .back-button {
        padding: 0 12px;
    }

    .box {
        margin-bottom: 75px;
    }

    @media (max-height: 768px) {
        video {
            max-height: 60vh;
        }
    }
</style>