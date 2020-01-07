<template>
  <div id="app">
    <div class="text-center pt-4" v-if="!imagesLoaded">
      <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
      <p ref="viewPercentage"></p>
    </div>
    <I360Viewer :data="app_data" :images="images" :imageData="imageData" v-else/>
  </div>
</template>

<script>
import I360Viewer from './components/I360Viewer.vue'

export default {
  name: 'app',
  components: {
    I360Viewer
  },
  data() {
    return {
      app_data: null,
      filename: (document.getElementById('asset-container')) ? `${document.getElementById('asset-container').getAttribute('data-acronym')}.xml` : "PLU.xml",
      acronym: (document.getElementById('asset-container')) ? document.getElementById('asset-container').getAttribute('data-acronym') : "PLU",
      asset: (document.getElementById('asset-container')) ? document.getElementById('asset-container').getAttribute('data-asset') : "il",
      images: [],
      imageData: [],
      amount: 24,
      loadedImages: 0,
      imagesLoaded: false,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    
    fetchData(){

      for(let i=1; i <= this.amount; i++){
          let a = this.lpad(i, "0", 2)
          this.imageData.push(`http://54.149.8.67/atp360/360_product_images/MilwaukeeTool/MilwaukeeTool_M18FUEL12HammerDrillDriver/img/MilwaukeeTools_M18FUEL12HammerDrillDriver-2704-20_${a}.jpg`)
           /* this.imageData.push(`https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36/chair_${i}.jpg?v1`) */
      }

      this.preloadImages()

      /* const params = { filename: this.filename, acronym: this.acronym, asset: this.asset }

      axios.post('/api/appData', params)
            .then(response => {
              console.log(response.data.message)
              this.app_data = response.data.message
            })
            .catch(error => console.log(error)) */

    },
    lpad(str, padString, length){
        str = str.toString();
        while (str.length < length)
            str = padString + str;
        return str;
    },
    preloadImages(){
        if (this.imageData.length) {
            try {
                this.amount = this.imageData.length;
                this.imageData.forEach(src => {
                    this.addImage(src);
                });
            } catch (error) {
                console.error(`Something went wrong while loading images: ${error.message}`);
            }
        } else {
            console.log('No Images Found')
        }
    },
    addImage(resultSrc){
        const image = new Image();

        image.src = resultSrc;
        //image.crossOrigin='anonymous'
        image.onload = this.onImageLoad.bind(this);
        image.onerror = this.onImageLoad.bind(this);

        this.images.push(image);
    },
    onImageLoad(event) {
        const percentage = Math.round(this.loadedImages / this.amount * 100);

        this.loadedImages += 1;
        this.updatePercentageInLoader(percentage);

        if (this.loadedImages === this.amount) {
            this.onAllImagesLoaded(event);
        } else if (this.loadedImages === 1) {
            //this.onFirstImageLoaded(event);
            console.log('load first image')
        }
    },
    updatePercentageInLoader(percentage) {
        /* if (this.loader) {
            this.loader.style.width = percentage + '%';
        }

        if (this.view360Icon) {
            this.view360Icon.innerText = percentage + '%';
        } */

        this.$refs.viewPercentage.innerHTML = percentage + '%';
        console.log(percentage + '%')
    },
    onAllImagesLoaded(e){
        this.imagesLoaded = true
        //this.hideLoader()
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
