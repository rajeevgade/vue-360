<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-4 card p-0">
          <Wrapper 
            :frames=36
            imagePath="https://scaleflex.cloudimg.io/crop/1920x700/n/https://scaleflex.airstore.io/demo/360-car"
            fileName="iris-{index}.jpeg"
            header="36 Images - Autoplay (2 loops) - Reverse Spin"
            spinReverse
            autoplay
            :loop=2
          />
        </div>
        <div class="col-12 mb-4 text-center">
          <h4>More Examples</h4>
          <p>A simple, interactive resource that can be used to provide a virtual tour of your product.</p>
          <p>100% Mobile Responsive</p>
          <p>Features include Zoom, Pan, Autoplay, Loop, Crop, Fullscreen, Reverse Spin, Show/Hide Header, and more. <a href="#">Click here for more information.</a> </p>
        </div>
        <div class="col-12 col-md-6 mb-4 card p-0">
          <h4 class="my-2 text-center">36 Images</h4>
          <Wrapper 
            :frames=36
            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
            fileName="chair_{index}.jpg?v1"
          />
        </div>
        <div class="col-12 col-md-6 mb-4 card p-0">
          <h4 class="my-2 text-center">72 Images - Box Shadow</h4>
          <Wrapper 
            :frames=72
            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-72"
            fileName="chair_{index}.jpg?v1"
            boxShadow
          />
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>

import Wrapper from './components/Wrapper.vue'

export default {
  name: 'app',
  components: {
    Wrapper
  },
  mounted() {
    this.disableZoomin();
  },
  methods: {
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