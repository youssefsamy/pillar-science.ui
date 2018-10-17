<template>
    <div class="content">
        <h2 class="title is-2">Getting Started</h2>

        <h4 class="title is-4">1. Get started by downloading Pillar Science on your computer.</h4>

        <p>Get files from your PCs into Pillar Science using the desktop app. Use it to back up and organize data from your lab and personnal computers. Click on the link to download the application. To install it, simply unzip all the files to the select directory and double click on PillarScience.exe
        </p>

        <p>
            <a href="https://api.v2.pillar.science/api/desktop-clients/download">Click here to download Pillar Science desktop app</a>
        </p>

        <h4 class="title is-4">2. Create your first project</h4>

        <p>
            Keep all data from a given projects togheter by creating a project with the <span class="button is-primary is-inline is-not-interactive">Create project</span> button. Add a short project <span class="button is-primary is-inline is-not-interactive">Overview</span> to indicate what the project is about.
        </p>

        <h4 class="title is-4">3. Secure you data</h4>

        <p>
            Add any file you want to keep safe with the <fa-icon icon="plus-circle" /> button : images, spreadsheets, results, documents, and everything else. Every file in Pillar Science becomes available anywhere you are – automatically.
        </p>

        <h4 class="title is-4">4. Organize your data</h4>

        <p>Keeping your data with their context is crucial to understand them. You can attached information about the data (i.e. metadata) with result files with the
            <span class="button is-primary is-inline is-not-interactive">Add metadata</span> button. Metadata tags help you keep track of your data.
            <span class="button is-success is-inline is-not-interactive">
                <fa-icon icon="plus-circle" />
                <span>Attach</span>
            </span> your data to the method used to generate them such as protocols or questionnaire.
        </p>
        <p><router-link :to="{name: 'help_metadata'}">Learn more about metadata here</router-link></p>

        <h4 class="title is-4">5. Share easily</h4>
        <p>Give others access to your project using the <span class="button is-primary is-inline is-not-interactive">Sharing</span> tab.  Projects are kept private by default.</p>
    </div>
</template>

<script>
  export default {
    name: 'GettingStarted',
    components: {}
  }
</script>

<style scoped>

</style>