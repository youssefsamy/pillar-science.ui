<template>
    <app-layout>
        <template slot="breadcrumb">
            <breadcrumb>
                <li class="is-active"><a href="#" aria-current="page">{{ $t('breadcrumb.help.label') }}</a></li>
                <li class="is-active"><a href="#" aria-current="page">{{ $t($route.meta.title) }}</a></li>
            </breadcrumb>
        </template>

        <div class="columns">
            <div class="column is-one-quarter">
                <section class="box">
                    <help-menu />
                </section>
            </div>

            <div class="column">
                <section class="box">
                    <router-view />
                </section>
            </div>
        </div>
    </app-layout>
</template>

<script>
  import Breadcrumb from '@/components/utils/Breadcrumb'
  import AppLayout from '@/components/layouts/App'
  import HelpMenu from '@/components/help/HelpMenu'

  export default {
    name: 'Help',
    components: {
      AppLayout,
      Breadcrumb,
      HelpMenu
    }
  }
</script>

<style scoped>

</style>