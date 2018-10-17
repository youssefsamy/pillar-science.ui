<template>
    <div>
        <special-navbar nav-class="is-danger" />
        <section class="hero is-danger is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ $t('p403.title') }}
                    </h1>
                    <h2 class="subtitle">
                        {{ $t('p403.subtitle') }}
                    </h2>
                    <button class="button" @click="$router.back()">
                        <b-icon icon="arrow-left"></b-icon>
                        <span>{{ $t('p403.actions.back') }}</span>
                    </button>
                    <router-link :to="{name: 'home'}" class="button">
                        <b-icon icon="home"></b-icon>
                        <span>{{ $t('p403.actions.home') }}</span>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import SpecialNavbar from '@/components/navbars/SpecialNavbar'

  export default {
    name: 'Forbidden403',
    components: {
      SpecialNavbar
    }
  }
</script>

<style scoped>

</style>