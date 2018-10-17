<template>
    <admin-layout>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{ $t('admin.home.title') }}</h1>
                    <h2 class="subtitle">{{ $t('admin.home.subtitle') }}</h2>
                </div>
            </div>
        </section>
    </admin-layout>
</template>

<script>
  import AdminLayout from '@/components/layouts/Admin'

  export default {
    name: 'Home',
    components: {
      AdminLayout
    }
  }
</script>

<style scoped>

</style>