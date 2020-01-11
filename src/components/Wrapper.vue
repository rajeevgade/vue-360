<template>
  <div>
    <div class="viewport" v-if="!imagesLoaded">
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <p ref="viewPercentage" class="ml-2"></p>
    </div>
    <div v-else>
        <I360Viewer 
            :images="images" 
            :imageData="imageData" 
            :amount="amount"
            :header="header"
          />
    </div>
  </div>
</template>

<script>

import I360Viewer from './I360Viewer.vue'
import AppConfig from '../config'

export default {
  name: 'Wrapper',
  props: {
      frames: {
          type: Number,
          require: true,
          default: 24
      },
      imagePath: {
          type: String,
          require: true,
          default: ''
      },
      fileName: {
          type: String,
          require: true,
          default: ''
      },
      header: {
          type: String,
          require: true,
          default: ''
      }
  },
  components: {
    I360Viewer
  },
  data() {
    return {
      images: [],
      imageData: [],
      amount: this.frames,
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
        const fileName = this.fileName.replace('{index}', i);
        const filePath = `${this.imagePath}/${fileName}`
        this.imageData.push(filePath)
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
        //console.log(percentage + '%')
    },
    onAllImagesLoaded(e){
        this.imagesLoaded = true
    },
  }
}
</script>

<style>
  #spinner{
    text-align: center;
    margin-top: 50px;
  }
</style>