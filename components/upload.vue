<template>
    <v-card class="pa-5"> 
        <v-card-title>
          <h2>Upload tweets.js</h2>
        </v-card-title>
        <v-card-text>
          <p>
            Select your tweets.js file (data/tweets.js) to get insights into your tweeting.
            You data doesn't leave your device.
          </p>
        </v-card-text>
        <v-card-actions>
            <!-- <form ref="form">
      <input type="file" ref="fileInput" @change="uploadFile" />
    </form>
    <v-btn @click="openFileDialog">Select File</v-btn>
    <v-btn @click="saveFile" v-if="file">Save File</v-btn> -->
    <v-btn color="blue" @click.prevent="$refs.file.click()">Upload tweets.js</v-btn>
    <input
    type="file"
    ref="file"
    style="display:none"
    name="vue-file-input"
    id="fileInput"
    @change="onFileSelected"
  />
        </v-card-actions>
        {{ file }}
        {{ $store.state.stats.archive }}
      </v-card>
</template>

<script>
    export default {
        name: 'Upload',
        data() {
            return {
                file: null
            }
        },
        methods: {
    onFileSelected(event) {
        this.file = event.target.files[0]
        this.$store.commit('stats/setArchive', event.target.files[0])
        this.$router.push('/stats')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>