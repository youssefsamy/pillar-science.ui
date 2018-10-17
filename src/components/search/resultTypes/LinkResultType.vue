<template>
    <div class="media">
        <div class="media-left">
            <fa-icon :icon="result.icon || 'ellipsis-h'" class="icon" size="lg" />
        </div>
        <div class="media-content">
            <h2>More results</h2>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'LinkResultType',
    components: {},
    props: {
      result: Object
    }
  }
</script>

<style scoped>

</style>