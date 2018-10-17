<template>
    <section class="box">
        <h1 class="title">{{ dataset.name }}</h1>
        <div class="has-text-centered">
            <img :src="src">
        </div>
    </section>
</template>

<script>
  export default {
    name: 'ImageRenderer',
    props: {
      dataset: Object,
      version: Number
    },
    computed: {
      src () {
        return `${process.env.API_URL}api/datasets/${this.dataset.id}/dataset-versions/${this.version}/preview`
      }
    }
  }
</script>

<style scoped>
    img {
        max-height: 80vh;
    }

    section.box {
        margin-bottom: 75px;
    }

    @media (max-height: 768px) {
        img {
            max-height: 60vh;
        }
    }
</style>