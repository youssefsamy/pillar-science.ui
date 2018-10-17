<template>
    <section class="has-background-primary-light">
        <div class="container">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <slot>
                        <li>Default</li>
                    </slot>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'Breadcrumb'
  }
</script>

<style scoped lang="scss">
    @import "../../assets/theme";

    section {
        padding: 5px 0;
        margin-bottom: 20px;
    }

    .breadcrumb li:not(.is-active) a {
        text-decoration: underline;
        color: $grey-darker;
    }

    .breadcrumb li.is-active a {
        color: $grey-darker;
    }

    .breadcrumb li + li::before {
        color: $grey-darker;
    }
</style>