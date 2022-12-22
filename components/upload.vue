<template>
    <v-card class="pa-5"> 
        <v-card-title>
          <h2>Upload tweets.js</h2>
        </v-card-title>
        <v-card-text>
          <p>
            Select your tweets.js file to get insights into your tweeting.
            You data doesn't leave your phone.
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
    //         openFileDialog() {
    //   // open the file input dialog
    //   this.$refs.fileInput.click()
    // },
    // async uploadFile() {
    //   // get the file from the input
    //   this.file = this.$refs.fileInput.files[0]
    //   console.log('set archive', this.file.name)
    //   this.$store.commit('stats/setArchive', this.$refs.fileInput.files[0])
    // },
    // saveFile() {
    //   // commit a mutation to save the file to the store
      
    // }
    onFileSelected(event) {
        this.file = event.target.files[0]
        console.log('stats/setArchive', this.file.name)
        this.$store.commit('stats/setArchive', event.target.files[0])
        // push to stats page
        this.$router.push('/stats')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>