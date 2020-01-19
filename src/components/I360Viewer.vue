<template>
    <div>
        <div class="v360-viewer-container" ref="imageLibrary">
            
            <div class="v360-header" v-if="header">
                <span class="v360-header-title">{{ header }}</span>
                <span class="v360-header-description"></span>
            </div>

            <div class="v360-viewport" v-if="!imagesLoaded">
                <div class="v360-spinner-grow"></div>
                <p ref="viewPercentage" class="v360-percentage-text"></p>
            </div>

            <div class="v360-viewport" ref="viewport">
                <canvas 
                    class="v360-image-container" 
                    ref="imageContainer" 
                    @wheel="zoomImage"
                    v-hammer:pinch="onPinch"
                    v-hammer:pinchend="onPinch"
                    v-hammer:pinchout="onPinchOut"
                    v-hammer:pinchin="onPinchIn"
                ></canvas>
                <div class="v360-product-box-shadow" 
                    v-if="boxShadow" @wheel="zoomImage"
                    v-hammer:pinch="onPinch"
                    v-hammer:pinchend="onPinch"
                    v-hammer:pinchout="onPinchOut"
                    v-hammer:pinchin="onPinchIn"
                ></div>
            </div>

            <!-- <abbr title="Fullscreen Toggle">
                <div class="v360-fullscreen-toggle" @click="toggleFullScreen">
                    <div class="v360-fullscreen-toggle-btn" ref="enterFullScreenIcon">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="100%" height="100%" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                            <g>
                                <polygon points="396.795,396.8 320,396.8 320,448 448,448 448,320 396.795,320 	"/>
                                <polygon points="396.8,115.205 396.8,192 448,192 448,64 320,64 320,115.205 	"/>
                                <polygon points="115.205,115.2 192,115.2 192,64 64,64 64,192 115.205,192 	"/>
                                <polygon points="115.2,396.795 115.2,320 64,320 64,448 192,448 192,396.795 	"/>
                            </g>
                        </svg>
                    </div>
                    <div class="v360-fullscreen-toggle-btn" ref="leaveFullScreenIcon">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                            <g>
                                <path d="M64,371.2h76.795V448H192V320H64V371.2z M140.795,140.8H64V192h128V64h-51.205V140.8z M320,448h51.2v-76.8H448V320H320
                                    V448z M371.2,140.8V64H320v128h128v-51.2H371.2z"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </abbr> -->

            <div id="v360-menu-btns">
                <div class="v360-navigate-btns">
                    <div class="v360-menu-btns" @click="zoomIn">
                        <i class="fa fa-search-plus"></i>
                    </div>
                    <div class="v360-menu-btns" @click="zoomOut">
                        <i class="fa fa-search-minus"></i>
                    </div>
                    <div class="v360-menu-btns" @click="togglePanMode" :class="(panmode) ? 'v360-btn-active' : ''">
                        <i class="fa fa-arrows-alt" v-if="!panmode"></i>
                        <span v-else>360&deg;</span>
                    </div>
                    <div class="v360-menu-btns" @click="prev">
                        <i class="fa fa-chevron-left"></i>
                    </div>
                    <div class="v360-menu-btns" @click="next">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                    <div class="v360-menu-btns" @click="resetPosition">
                        <i class="fa fa-redo-alt"></i>
                    </div>
                    <!-- <div class="v360-menu-btns" @click="toggleFullScreen">
                        <i class="fa fa-expand" v-if="!isFullScreen"></i>
                        <i class="fa fa-compress" v-else></i>
                    </div> -->
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'I360Viewer',
    props: {
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
            require: false,
        },
        spinReverse: {
            type: Boolean,
            require: true,
            default: false,
        },
        amount: {
            type: Number,
            require: true,
            default: 24,
        },
        autoplay: {
            type: Boolean,
            require: false,
            default: false
        },
        loop: {
            type: Number,
            require: false,
            default: 1
        },
        boxShadow: {
            type: Boolean,
            require: false,
            default: false
        }
    },
    data(){
        return {
            minScale: 0.5,
            maxScale: 4,
            scale: 0.2,
            customOffset: 10,
            currentScale: 1.0,
            currentTopPosition: 0,
            currentLeftPosition: 0,
            selectMenuOption: 1,
            currentImage: null,
            dragging: false,
            canvas: null,
            ctx: null,
            dragStart: null,
            lastX: 0,
            lastY: 0,
            currentCanvasImage: null,
            isFullScreen: false,
            viewPortElementWidth: null,
            movementStart: 0,
            movement: false,
            dragSpeed: 150,
            speedFactor: 13,
            activeImage: 1,
            stopAtEdges: false,
            imagesLoaded: false,
            loadedImages: 0,
            centerX: 0,
            centerY: 0,
            panmode: false,
            isMobile: false,
            currentLoop: 0,
            loopTimeoutId: 0,
            images: [],
            imageData: [],
        }
    },
    watch: {
        currentLeftPosition(value){
            this.redraw()
        },
        currentTopPosition(value){
            this.redraw()
        },
        viewPortElementWidth(value){
            this.update()
        },
        panmode(value){
            this.attachEvents()
        },
    },
    mounted(){
        //this.toggleFullScreen()
        this.fetchData()
    },
    methods: {
        initData(){
            this.checkMobile()
            this.loadInitialImage()
            
            this.canvas = this.$refs.imageContainer
            this.ctx = this.canvas.getContext('2d')
            this.attachEvents();
            window.addEventListener('resize', this.resizeWindow);
            this.resizeWindow()

            if(this.autoplay){
                this.play()
            }
        },
        fetchData(){

            for(let i=1; i <= this.amount; i++){
                const fileName = this.fileName.replace('{index}', i);
                const filePath = `${this.imagePath}/${fileName}`
                this.imageData.push(filePath)
            }

            this.preloadImages()
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
            this.initData()
        },
        play(){
            this.loopTimeoutId = window.setInterval(() => this.loopImages(), 100);
        },
        onSpin() {
            if (this.autoplay || this.loopTimeoutId) {
                this.stop();
                this.autoplay = false;
            }
        },
        stop() {
            if (this.bottomCircle) this.show360ViewCircleIcon();
            window.clearTimeout(this.loopTimeoutId);
        },
        loopImages() {
            if(this.activeImage == 1){
                if(this.currentLoop == this.loop){
                    this.stop()
                }
                else{
                    this.currentLoop++
                    
                    this.next()
                }
            }
            else{
                this.next()
            }
        },
        next() {
            (this.spinReverse) ? this.turnLeft() : this.turnRight()
        },
        prev() {
            (this.spinReverse) ? this.turnRight() : this.turnLeft()
        },
        turnLeft(){
            this.moveActiveIndexDown(1);
            this.update(); 
        },
        turnRight(){
            this.moveActiveIndexUp(1);
            this.update(); 
        },
        loadImages(){
            console.log('load image')
        },
        checkMobile(){
            this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
        },
        loadInitialImage(){
            this.currentImage = this.imageData[0] 
            this.setImage()
        },
        resizeWindow(){
            this.setImage()
        },
        onPinch(evt){
            console.log('on tap')
        },
        onPinchEnd(evt){
            this.tempScale = 0
        },
        onPinchIn(evt){
            //alert('pinchin:' + evt.scale)
            this.zoomOut()
        },
        onPinchOut(evt){
            this.zoomIn()
        },
        attachEvents(){
            if(this.panmode){
                this.bindPanModeEvents()
            }else{
                this.bind360ModeEvents()
            }
        },
        bindPanModeEvents(){
            this.$refs.viewport.removeEventListener('touchend', this.touchEnd);
            this.$refs.viewport.removeEventListener('touchstart', this.touchStart);
            this.$refs.viewport.removeEventListener('touchmove', this.touchMove); 

            this.$refs.viewport.addEventListener('touchend', this.stopDragging);
            this.$refs.viewport.addEventListener('touchstart', this.startDragging);
            this.$refs.viewport.addEventListener('touchmove', this.doDragging); 

            this.$refs.viewport.removeEventListener('mouseup', this.stopMoving);
            this.$refs.viewport.removeEventListener('mousedown', this.startMoving);
            this.$refs.viewport.removeEventListener('mousemove', this.doMoving); 

            this.$refs.viewport.addEventListener('mouseup', this.stopDragging);
            this.$refs.viewport.addEventListener('mousedown', this.startDragging);
            this.$refs.viewport.addEventListener('mousemove', this.doDragging);
        },
        bind360ModeEvents(){
            this.$refs.viewport.removeEventListener('touchend', this.stopDragging);
            this.$refs.viewport.removeEventListener('touchstart', this.startDragging);
            this.$refs.viewport.removeEventListener('touchmove', this.doDragging); 

            this.$refs.viewport.addEventListener('touchend', this.touchEnd);
            this.$refs.viewport.addEventListener('touchstart', this.touchStart);
            this.$refs.viewport.addEventListener('touchmove', this.touchMove); 

            this.$refs.viewport.removeEventListener('mouseup', this.stopDragging);
            this.$refs.viewport.removeEventListener('mousedown', this.startDragging);
            this.$refs.viewport.removeEventListener('mousemove', this.doDragging); 
            
            this.$refs.viewport.addEventListener('mouseup', this.stopMoving);
            this.$refs.viewport.addEventListener('mousedown', this.startMoving);
            this.$refs.viewport.addEventListener('mousemove', this.doMoving);
        },
        togglePanMode(){
            this.panmode = !this.panmode
        },
        zoomIn(evt) {
            this.lastX = this.centerX;
            this.lastY = this.centerY
            this.zoom(2)
        },
        zoomOut(evt) {
            this.lastX = this.centerX;
            this.lastY = this.centerY
            this.zoom(-2)
        },
        moveLeft() {
            this.currentLeftPosition += this.customOffset;
        },
        moveRight() {
            this.currentLeftPosition -= this.customOffset;
        },
        moveUp() {
            this.currentTopPosition += this.customOffset;
        },
        moveDown() {
            this.currentTopPosition -= this.customOffset;
        },
        resetPosition(){
            this.setImage(true)
        },
        setImage(cached = false){
            this.currentLeftPosition = this.currentTopPosition = 0
            
            if(!cached){
                this.currentCanvasImage = new Image()
                this.currentCanvasImage.crossOrigin='anonymous'
                this.currentCanvasImage.src = this.currentImage

                this.currentCanvasImage.onload = () => {
                    let viewportElement = this.$refs.viewport.getBoundingClientRect()
                    this.canvas.width  = (this.isFullScreen) ? viewportElement.width : this.currentCanvasImage.width
                    this.canvas.height = (this.isFullScreen) ? viewportElement.height : this.currentCanvasImage.height
                    this.trackTransforms(this.ctx)

                    this.redraw()
                }

                this.currentCanvasImage.onerror = () => {
                    console.log('cannot load this image')
                }
            }else{
                this.currentCanvasImage = this.images[0]
                let viewportElement = this.$refs.viewport.getBoundingClientRect()
                this.canvas.width  = (this.isFullScreen) ? viewportElement.width : this.currentCanvasImage.width
                this.canvas.height = (this.isFullScreen) ? viewportElement.height : this.currentCanvasImage.height
                this.trackTransforms(this.ctx)

                this.redraw()
            }
            
        },
        redraw(){

            try{
                let p1 = this.ctx.transformedPoint(0,0);
                let p2 = this.ctx.transformedPoint(this.canvas.width,this.canvas.height)

                let hRatio = this.canvas.width / this.currentCanvasImage.width
                let vRatio =  this.canvas.height / this.currentCanvasImage.height
                let ratio  = Math.min(hRatio, vRatio);
                let centerShift_x = (this.canvas.width - this.currentCanvasImage.width*ratio )/2
                let centerShift_y = (this.canvas.height - this.currentCanvasImage.height*ratio )/2
                this.ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

                this.centerX = this.currentCanvasImage.width*ratio/2
                this.centerY = this.currentCanvasImage.height*ratio/2
                
                //center image
                this.ctx.drawImage(this.currentCanvasImage, this.currentLeftPosition, this.currentTopPosition, this.currentCanvasImage.width, this.currentCanvasImage.height,
                            centerShift_x,centerShift_y,this.currentCanvasImage.width*ratio, this.currentCanvasImage.height*ratio);  
            }
            catch(e){
                //console.log(e)
                this.trackTransforms(this.ctx)
            }

        },
        cropImage(){
            let croppedCanvas = this.canvas
            let newCanvas = document.createElement('canvas')
            let croppedCtx = newCanvas.getContext('2d')
            newCanvas.width = croppedCanvas.width
            newCanvas.height = croppedCanvas.height
            let newImage = new Image()
            newImage.src = croppedCanvas.toDataURL();
            newImage.onload = () => {
                croppedCtx.drawImage(newImage, 0, 0, newCanvas.width, newCanvas.height);
                let canvasImage = newCanvas.toDataURL();
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    let a = document.createElement('a');
                    a.href = window.URL.createObjectURL(xhr.response);
                    a.download = 'croppedImage.jpg';
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    a.remove()
                };
                xhr.open('GET', canvasImage);
                xhr.send();
            }
        },
        lpad(str, padString, length){
            str = str.toString();

            while (str.length < length)
                str = padString + str;
            return str;
        },
        onMove(pageX){
            if (pageX - this.movementStart >= this.speedFactor) {
                let itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;
                
                this.movementStart = pageX;

                if (this.spinReverse) {
                    this.moveActiveIndexDown(itemsSkippedRight);
                } else {
                    this.moveActiveIndexUp(itemsSkippedRight);
                }

                this.redraw();

            } else if (this.movementStart - pageX >= this.speedFactor) {

                let itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;
                
                this.movementStart = pageX;

                if (this.spinReverse) {
                    this.moveActiveIndexUp(itemsSkippedLeft);
                } else {
                    this.moveActiveIndexDown(itemsSkippedLeft);
                }

                this.redraw();
            }
        },
        startMoving(evt){
            this.movement = true
            this.movementStart = event.pageX;
            this.$refs.viewport.style.cursor = 'grabbing';
        },
        doMoving(evt){
            if(this.movement){
                this.onMove(evt.clientX)
            }
        },
        moveActiveIndexUp(itemsSkipped) {

            if (this.stopAtEdges) {
                if (this.activeImage + itemsSkipped >= this.amount) {
                    this.activeImage = this.amount;
                } else {
                    this.activeImage += itemsSkipped;
                }
            } else {
                this.activeImage = (this.activeImage + itemsSkipped) % this.amount || this.amount;
            }
            
            this.update()
        },
        moveActiveIndexDown(itemsSkipped) {

            if (this.stopAtEdges) {
                if (this.activeImage - itemsSkipped <= 1) {
                    this.activeImage = 1;
                } else {
                    this.activeImage -= itemsSkipped;
                }
            } else {
                if (this.activeImage - itemsSkipped < 1) {
                    this.activeImage = this.amount + (this.activeImage - itemsSkipped);
                } else {
                    this.activeImage -= itemsSkipped;
                }
            }
            
            this.update()
        },
        update() {
            const image = this.images[this.activeImage - 1];

            this.currentCanvasImage = image

            this.redraw()
        },
        stopMoving(evt){
            this.movement = false
            this.movementStart = 0
            this.$refs.viewport.style.cursor = 'grab'
        },
        touchStart(evt){
            this.movementStart = evt.touches[0].clientX
        },
        touchMove(evt){
            this.onMove(evt.touches[0].clientX)
        },
        touchEnd(){
            this.movementStart = 0
        },
        startDragging(evt){
            this.dragging = true
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';

            if(this.isMobile){
                this.lastX = evt.touches[0].offsetX || (evt.touches[0].pageX - this.canvas.offsetLeft);
			    this.lastY = evt.touches[0].offsetY || (evt.touches[0].pageY - this.canvas.offsetTop);
            }else{
                this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			    this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            }
            
			this.dragStart = this.ctx.transformedPoint(this.lastX,this.lastY);
        },
        doDragging(evt){
            
            if(this.isMobile){
                this.lastX = evt.touches[0].offsetX || (evt.touches[0].pageX - this.canvas.offsetLeft);
			    this.lastY = evt.touches[0].offsetY || (evt.touches[0].pageY - this.canvas.offsetTop);
            }else{
                this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			    this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            }
            
            if (this.dragStart){
				let pt = this.ctx.transformedPoint(this.lastX,this.lastY);
				this.ctx.translate(pt.x-this.dragStart.x,pt.y-this.dragStart.y);
                //redraw();
                this.redraw();
            }
        },
        stopDragging(evt){
            this.dragging = false
            this.dragStart = null
        },
        restrictScale(){
            let scale = this.currentScale
            if (scale < this.minScale) {
                scale = this.minScale;
            } else if (scale > this.maxScale) {
                scale = this.maxScale;
            }
            return scale;
        },
        zoom(clicks){
            //console.log(this.lastX + ' - ' + this.lastY)
            let factor = Math.pow(1.01,clicks);
            //console.log(factor)

            if(factor > 1){
                this.currentScale += factor
            }else{
                if(this.currentScale-factor > 1)
                    this.currentScale -= factor
                else
                    this.currentScale = 1
            }
            
            if(this.currentScale > 1){
                let pt = this.ctx.transformedPoint(this.lastX,this.lastY);
                this.ctx.translate(pt.x,pt.y);
                
                //console.log(this.currentScale)
                this.ctx.scale(factor,factor);
                this.ctx.translate(-pt.x,-pt.y);
                this.redraw();
            }
        },
        zoomImage(evt){
            this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
            this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            
            var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.deltaY ? -evt.deltaY : 0;
            
			if (delta) this.zoom(delta);
            return evt.preventDefault() && false;
                
        },
        trackTransforms(ctx){

            return new Promise(resolve => {
                var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
                var xform = svg.createSVGMatrix();
                this.ctx.getTransform = function(){ return xform; };
                
                var savedTransforms = [];
                var save = ctx.save;
                this.ctx.save = () => {
                    savedTransforms.push(xform.translate(0,0));
                    return save.call(this.ctx);
                };
                var restore = ctx.restore;
                this.ctx.restore = () => {
                    xform = savedTransforms.pop();
                    return restore.call(this.ctx);
                };

                var scale = this.ctx.scale;
                this.ctx.scale = (sx,sy) => {
                    xform = xform.scaleNonUniform(sx,sy);
                    return scale.call(this.ctx,sx,sy);
                };
                var rotate = this.ctx.rotate;
                this.ctx.rotate = (radians) => {
                    xform = xform.rotate(radians*180/Math.PI);
                    return rotate.call(this.ctx,radians);
                };
                var translate = this.ctx.translate;
                this.ctx.translate = (dx,dy) => {
                    xform = xform.translate(dx,dy);
                    return translate.call(this.ctx,dx,dy);
                };
                var transform = this.ctx.transform;
                this.ctx.transform = (a,b,c,d,e,f) => {
                    var m2 = svg.createSVGMatrix();
                    m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
                    xform = xform.multiply(m2);
                    return transform.call(this.ctx,a,b,c,d,e,f);
                };
                var setTransform = this.ctx.setTransform;
                this.ctx.setTransform = (a,b,c,d,e,f) => {
                    xform.a = a;
                    xform.b = b;
                    xform.c = c;
                    xform.d = d;
                    xform.e = e;
                    xform.f = f;
                    return setTransform.call(this.ctx,a,b,c,d,e,f);
                };
                var pt  = svg.createSVGPoint();
                this.ctx.transformedPoint = (x,y) => {
                    pt.x=x; pt.y=y;
                    return pt.matrixTransform(xform.inverse());
                }

                resolve(this.ctx)
            })
            
        },
        toggleFullScreen(){
            
            if(!this.isFullScreen){
                //exit full screen
                this.$refs.imageLibrary.classList.add('v360-main')
                this.$refs.imageLibrary.classList.add('v360-fullscreen')
                this.$refs.enterFullScreenIcon.style.display = 'none'
                this.$refs.leaveFullScreenIcon.style.display = 'block'
            }else{
                //enter full screen
                this.$refs.imageLibrary.classList.remove('v360-main')
                this.$refs.imageLibrary.classList.remove('v360-fullscreen')
                this.$refs.enterFullScreenIcon.style.display = 'block'
                this.$refs.leaveFullScreenIcon.style.display = 'none'
            }

            this.isFullScreen = !this.isFullScreen

            this.setImage(true)
        }
    }
}
</script>

<style scoped src="../../public/css/style.css"></style>