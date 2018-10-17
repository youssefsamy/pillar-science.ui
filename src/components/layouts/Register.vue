<template>
    <div>
        <register-navbar />
        <main class="container">
            <slot />
        </main>
    </div>
</template>

<script>
import RegisterNavbar from '@/components/navbars/RegisterNavbar'

export default {
  name: 'Register',
  components: {
    RegisterNavbar
  }
}
</script>

<style scoped>
    main {
        /*text-align: center;*/
        margin-top: 40px;
    }

    @media screen and (min-width: 1472px) {
      .container {
        max-width: 1200px;
        width: 1200px;
      }
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