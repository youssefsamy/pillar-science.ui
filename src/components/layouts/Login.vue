<template>
    <div>
        <login-navbar />
        <main class="container">
            <slot />
        </main>
    </div>
</template>

<script>
  import LoginNavbar from '@/components/navbars/LoginNavbar'

  export default {
    name: 'Login',
    components: {
      LoginNavbar
    }
  }
</script>

<style scoped>
    main {
        /*text-align: center;*/
        margin-top: 40px;
    }

    header {
        margin: 0;
        height: 56px;
        padding: 0 16px 0 24px;
        background-color: #8b0000;
        color: #ffffff;
    }

    header span {
        display: block;
        position: relative;
        font-size: 22px;
        line-height: 1;
        letter-spacing: .02em;
        font-weight: 400;
        box-sizing: border-box;
        padding-top: 16px;
    }

    main.container {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>