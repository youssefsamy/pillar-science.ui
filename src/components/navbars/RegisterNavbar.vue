<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'index'}">
                    <img src="@/assets/logo-full-white.png" alt="Pillar Science Logo">
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
    name: 'RegisterNavbar'
  }
</script>

<style scoped>
    .navbar-item img {
        max-height: 2.75rem;
    }
</style>