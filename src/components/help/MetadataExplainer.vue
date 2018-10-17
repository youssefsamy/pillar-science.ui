<template>
    <div class="content">
        <p>
            When you look and discuss data, the <b>context</b> is as important as the data itself. The <b>context</b> of your data is called <b>metadata</b>. When you provide metadata along with your research, it helps you and others to easily retrieve and understand it. Metadata could be seen as your methodology summarizes in key bullet points.
        </p>

        <p>Example:</p>

        <p>
            <i>methods</i><br>
            We collected 6 apples from trees in Montreal, Canada. The apples were cut into 1 mm thick slices and staining using indigo-blue dye.
        </p>

        <p>
            <i>Metadata</i>
        </p>

        <table class="table is-bordered">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>fruit</td>
                    <td>apple</td>
                </tr>
                <tr>
                    <td>location</td>
                    <td>Montreal, Canada</td>
                </tr>
                <tr>
                    <td>slice.thickness</td>
                    <td>1 mm</td>
                </tr>
                <tr>
                    <td>dye</td>
                    <td>indigo blue</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'MetadataExplainer',
    components: {
    }
  }
</script>

<style scoped>

</style>