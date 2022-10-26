<template>
  <div id="app">
    <div class="container">
      <div class="row">
        
        <!-- Example 1 - Car -->
        <div class="col-12 mb-4 card p-0">
          <vue-three-sixty 
            :amount=36
            imagePath="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360"
            fileName="orange-{index}.jpg"
            spinReverse
            autoplay
            buttonClass="dark"
            scrollImage
          >
            <template v-slot:header>
              <div class="v360-header text-light bg-dark">
                  <span class="v360-header-title">36 Images - Autoplay (1 loop) - Reverse Spin</span>
                  <span class="v360-header-description"></span>
              </div>
            </template>

          </vue-three-sixty>
        </div>
        <!--/ Example 1 - Car -->

        <div class="col-12 mb-4 text-center card">
          <h4>More Examples</h4>
          <p>A simple, interactive resource that can be used to provide a virtual tour of your product.</p>
          <p>100% Mobile Responsive with Touch Actions</p>
          <p>Features include Zoom, Pan, Autoplay, Loop, Crop, Reverse Spin, Show/Hide Header, and more. <a href="https://github.com/rajeevgade/vue-360">Click here for more information.</a> </p>
        </div>

        <!-- Example 2 - Chair - 36 images -->
        <div class="col-12 col-md-6 mb-4 card p-0">
          <!-- <h4 class="my-2 text-center">36 Images</h4> -->
          <vue-three-sixty 
            :amount=36
            imagePath="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile"
            fileName="product-{index}.jpg"
            buttonClass="dark"
          >
            <template v-slot:header>
              <div class="v360-header text-light bg-dark">
                  <span class="v360-header-title">36 Images</span>
                  <span class="v360-header-description"></span>
              </div>
            </template>
          </vue-three-sixty>
        </div>
        <!--/ Example 2 - Chair - 36 images -->

        <!-- Example 3 - Chair - 36 images -->
        <div class="col-12 col-md-6 mb-4 card p-0">
          <!-- <h4 class="my-2 text-center">72 Images - Box Shadow</h4> -->
          <vue-three-sixty
            :amount=72
            imagePath="https://scaleflex.cloudimg.io/v7/demo/vivo-mobile"
            fileName="product-{index}.jpg"
            boxShadow
          >
            <template v-slot:header>
              <div class="v360-header text-dark bg-light">
                  <span class="v360-header-title">72 Images - Box Shadow</span>
                  <span class="v360-header-description"></span>
              </div>
            </template>
          </vue-three-sixty>
        </div>
        <!--/ Example 3 - Chair - 72 images -->

      </div>
    </div>
  </div>
</template>

<script>

//import I360Viewer from './components/I360Viewer.vue'

export default {
  name: 'app',
  mounted() {
    //safari zoom bug fix
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
