<template>
    <div class="card" test-component="project-card" :test-name="project.name">
        <div class="card-image">
            <figure class="image is-16by9">
                <img src="@/assets/project-image-default.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img src="@/assets/default-user.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4 no-space-after">{{ project.name }}</p>
                    <p>{{ project.team.name }}</p>
                    <p>{{ project.author.name }}</p>
                </div>
            </div>

            <div class="content">
                <p>{{ $t('projectCard.updated', { time: momentFrom(project.updated_at) }) }}</p>
            </div>
        </div>
        <footer class="card-footer">
            <router-link :to="{name: 'project_overview', params: { id: project.id} }" class="card-footer-item">{{ $t('projectCard.actions.open.label') }}</router-link>
        </footer>
    </div>
</template>

<script>
  import {filters} from '@/plugins/moment'

  export default {
    name: 'ProjectCard',
    props: {
      project: Object
    },
    methods: {
      momentFrom: filters.moment_from
    }
  }
</script>

<style scoped>
    .no-space-after {
        margin-bottom: 0;
    }

    .media-content {
        overflow: hidden;
    }
</style>