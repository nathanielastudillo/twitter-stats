export const state = () => ({
    archive: null,
    archiveJSON: null
  })
  
  export const getters = {
    getArchive(state) {
        return state.archive
        }
  }
  
  export const mutations = {
    setArchive(state, archive) {
      state.archive = archive
    },
    setArchiveJSON(state, text) {
        state.archiveJSON = JSON.parse(text)
        }
  }
  
  export const actions = {

  }