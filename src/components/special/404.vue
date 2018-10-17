<template>
    <div>
        <special-navbar nav-class="is-warning" />
        <section class="hero is-warning is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ $t('p404.title') }}
                    </h1>
                    <h2 class="subtitle">
                        {{ $t('p404.subtitle') }}
                    </h2>
                    <button class="button" @click="$router.back()">
                        <fa-icon icon="arrow-left" class="icon" />
                        <span>{{ $t('p404.actions.back') }}</span>
                    </button>
                    <router-link :to="{name: 'projects'}" class="button">
                        <fa-icon icon="home" class="icon" />
                        <span>{{ $t('p404.actions.home') }}</span>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import SpecialNavbar from '@/components/navbars/SpecialNavbar'

  export default {
    name: 'NotFound404',
    components: {
      SpecialNavbar
    }
  }
</script>

<style scoped>

</style>