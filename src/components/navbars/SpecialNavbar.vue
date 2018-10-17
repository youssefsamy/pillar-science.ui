<template>
    <nav class="navbar" :class="navClass" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'index'}">
                    <img src="@/assets/logo-full-white.png" alt="Pillar Science Logo">
                </router-link>

                <div class="navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
    name: 'specialNavbar',
    props: {
      navClass: String
    }
  }
</script>

<style scoped>
    .navbar-item img {
        max-height: 2.75rem;
    }
</style>