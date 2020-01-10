<template>
  <div id="app">
    <div id="spinner" v-if="!imagesLoaded">
      <p ref="viewPercentage"></p>
    </div>
    <I360Viewer 
      :images="images" 
      :imageData="imageData" 
      v-else
      show_header
      :amount="amount"
    />
  </div>
</template>

<script>

import I360Viewer from './components/I360Viewer.vue'
import AppConfig from './config'

export default {
  name: 'app',
  components: {
    I360Viewer
  },
  data() {
    return {
      images: [],
      imageData: [],
      amount: 36,
      loadedImages: 0,
      imagesLoaded: false,
    }
  },
  mounted() {
    this.disableZoomin();
    this.fetchData()
  },
  methods: {
    
    fetchData(){

      for(let i=1; i <= this.amount; i++){
          let a = this.lpad(i, "0", 2)
          this.imageData.push(`https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36/chair_${i}.jpg?v1`)
          //this.imageData.push(`https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-72/chair_${i}.jpg?v1`)
      }

      this.preloadImages()
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
    },
    disableZoomin(){
      document.addEventListener("gesturestart", function (e) {
        e.preventDefault();
          document.body.style.zoom = 0.99;
      });
      document.addEventListener("gesturechange", function (e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
      });
      
      document.addEventListener("gestureend", function (e) {
          e.preventDefault();
          document.body.style.zoom = 1;
      });
    }
  }
}
</script>

<style>
  #spinner{
    text-align: center;
    margin-top: 50px;
  }
</style>