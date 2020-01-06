<template>
  <div id="app">
    <ImageLibrary :data="app_data" v-if="app_data"/>
  </div>
</template>

<script>
import ImageLibrary from './components/ImageLibrary.vue'

export default {
  name: 'app',
  components: {
    ImageLibrary
  },
  data() {
    return {
      app_data: null,
      filename: (document.getElementById('asset-container')) ? `${document.getElementById('asset-container').getAttribute('data-acronym')}.xml` : "PLU.xml",
      acronym: (document.getElementById('asset-container')) ? document.getElementById('asset-container').getAttribute('data-acronym') : "PLU",
      asset: (document.getElementById('asset-container')) ? document.getElementById('asset-container').getAttribute('data-asset') : "il",
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    
    fetchData(){

      const params = { filename: this.filename, acronym: this.acronym, asset: this.asset }

      axios.post('/api/appData', params)
            .then(response => {
              console.log(response.data.message)
              this.app_data = response.data.message
            })
            .catch(error => console.log(error))

    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
