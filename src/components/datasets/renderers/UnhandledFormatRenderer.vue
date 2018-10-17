<template>
    <section class="box">
        <h1 class="title">{{ dataset.name }}</h1>
        {{ $t('unhandledFormatRenderer.unknownFormat') }}
    </section>
</template>

<script>
  export default {
    name: 'UnhandledFormatRenderer',
    props: {
      dataset: Object
    }
  }
</script>

<style scoped>

</style>