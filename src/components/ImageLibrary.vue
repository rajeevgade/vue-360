<template>
    <div id="image-library" ref="imageLibrary">
    
        <b-row>
            <b-col>
                <div class="header">
                    <span class="bookTitle">{{ data.product.title }}</span>
                    <span class="title"></span>
                </div>

                <div id="virtualToolboxInsert">

                    <div class="menu-block" ref="menublock">
                        <abbr title="Menu Toggle">
                            <div class="menu-toggle" @click="toggleMenu">
                                <!-- Close Menu Icon -->
                                <div class="menu-toggle-btn" ref="showMenuIcon">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                        <path d="m271,392c6.143,0 12.285,-2.344 16.971,-7.029l112,-112c9.373,-9.373 9.373,-24.569 0,-33.941l-112,-112c-9.373,-9.372 -24.568,-9.372 -33.941,0c-9.371,9.372 -9.371,24.568 0,33.941l95.029,95.029l-95.029,95.029c-9.371,9.373 -9.371,24.568 0,33.941c4.687,4.686 10.827,7.03 16.97,7.03z"/>
                                        <path d="m129.49876,391.4995c6.143,0 12.285,-2.344 16.971,-7.029l112,-112c9.373,-9.373 9.373,-24.569 0,-33.941l-112,-112c-9.373,-9.372 -24.568,-9.372 -33.941,0c-9.371,9.372 -9.371,24.568 0,33.941l95.029,95.029l-95.029,95.029c-9.371,9.373 -9.371,24.568 0,33.941c4.687,4.686 10.827,7.03 16.97,7.03z"/>
                                    </svg>
                                </div>
                                <!-- Open Menu Icon -->
                                <div class="menu-toggle-btn" ref="hideMenuIcon">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                        <g>
                                            <path d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32
                                                C448,238.3,434.3,224,417.4,224z"/>
                                            <path d="M417.4,96H94.6C77.7,96,64,110.3,64,128c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32
                                                C448,110.3,434.3,96,417.4,96z"/>
                                            <path d="M417.4,352H94.6C77.7,352,64,366.3,64,384c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32
                                                C448,366.3,434.3,352,417.4,352z"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </abbr>
                        <b-form-select
                            v-model="selectMenuOption"
                            class="menu-select-dropdown"
                            size="sm"
                            :options="menuOptions"
                        >
                        </b-form-select>
                        <div id="menu">
                            <ul>
                                <li v-for="menu in getCurrentMenuList" 
                                    :key="menu.figure" 
                                    @click="changeImage(menu)"
                                    :class="{selected:menu.filename == selectedMenuItem.filename}">
                                    <b-row class="p-2">
                                        <b-col align-self="start" class="ml-1">
                                            <h6 class="title font-weight-bold" v-html="menu.figureTitle"></h6>
                                        </b-col>
                                        <b-col align-self="start" class="text-right mr-1">
                                            <small class="figure">{{ menu.figure }}</small>
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>No items Found</li>
                            </ul>
                        </div>
                    </div>
                    <div id="viewport-wrapper" ref="viewportWrapper">
                        <div class="viewport" ref="viewport">
                            <b-spinner style="width: 3rem; height: 3rem;" v-if="showSpinner"></b-spinner>
                            <canvas class="image-container" ref="imageContainer" @mousedown="startDragging" @mousemove="doDragging" @wheel="zoomImage"></canvas>
                            <div class="screen-toggle"></div>
                        </div>
                        <div id='drag-icon'></div>
                    </div>
                    
                    <abbr title="Fullscreen Toggle">
                        <div class="fullscreen-toggle" @click="toggleFullScreen">
                            <div class="fullscreen-toggle-btn" ref="enterFullScreenIcon">
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
                            <div class="fullscreen-toggle-btn" ref="leaveFullScreenIcon">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                    <g>
                                        <path d="M64,371.2h76.795V448H192V320H64V371.2z M140.795,140.8H64V192h128V64h-51.205V140.8z M320,448h51.2v-76.8H448V320H320
                                            V448z M371.2,140.8V64H320v128h128v-51.2H371.2z"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </abbr>

                    <div id="safety" ref="safety"></div>

                </div>

                <div id="menu-btns">
<!--                     <div id="safetyBtn" class="menu-btns disabled">Safety Awareness</div>
                    <div id="videoBtn" class="menu-btns disabled">Video</div> -->
                    <b-row>
                        <b-col>
                            <div id="navigate-btns">
                                <div class="menu-btns" @click="moveUp" v-b-popover.hover.bottom ="'Move Up'">
                                    <i class="fa fa-chevron-up"></i>
                                </div>
                                <div class="menu-btns" @click="moveDown" v-b-popover.hover.bottom ="'Move Down'">
                                    <i class="fa fa-chevron-down"></i>
                                </div>
                                <div class="menu-btns" @click="resetPosition" v-b-popover.hover.bottom ="'Reset Position'">
                                    <i class="fa fa-redo-alt"></i>
                                </div>
                                <div class="menu-btns" @click="moveLeft" v-b-popover.hover.bottom ="'Move Left'">
                                    <i class="fa fa-chevron-left"></i>
                                </div>
                                <div class="menu-btns" @click="moveRight" v-b-popover.hover.bottom ="'Move Right'">
                                    <i class="fa fa-chevron-right"></i>
                                </div>
                            </div>
                        </b-col>
                        <b-col v-if="showMultiImageControls">
                            <div id="zoom-btns">
                                <div class="menu-btns" :class="(currentMultiImageIndex > 1) ? '' : 'disabled'" @click="prevImage" v-b-popover.hover.bottom ="'Next Image'">
                                    <i class="fa fa-angle-left"></i>
                                </div>
                                <span class="text-white font-weight-bold p-2">
                                    {{ currentMultiImageIndex }} / {{ currentMultiImageCount }}
                                </span>
                                <div class="menu-btns" :class="(currentMultiImageIndex < this.currentMultiImageCount) ? '' : 'disabled'" @click="nextImage" v-b-popover.hover.bottom ="'Previous Image'">
                                    <i class="fa fa-angle-right"></i>
                                </div>
                            </div>
                        </b-col>
                        <b-col>
                            <div id="zoom-btns" class="float-right mr-3">
                                <div class="menu-btns" @click="zoomIn" v-b-popover.hover.bottom ="'Zoom In'">
                                    <i class="fa fa-search-plus"></i>
                                </div>
                                <div class="menu-btns" @click="zoomOut" v-b-popover.hover.bottom ="'Zoom Out'">
                                    <i class="fa fa-search-minus"></i>
                                </div>
                                <div class="menu-btns" @click="cropImage" v-b-popover.hover.bottom ="'Download Image'">
                                    <i class="fa fa-download"></i>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    
                    <!-- Controls -->
                    <!-- <div class="controls">

                        <div class="navigate">
                            <button class="s_up" @click="moveUp"></button>
                            <div>
                                <button class="s_left" @click="moveLeft"></button>
                                <button class="reset" @click="resetPosition"></button>
                                <button class="s_right" @click="moveRight"></button>
                            </div>
                            <button class="s_down" @click="moveDown"></button>
                        </div>
                        <div class="zoom">
                            <button class="z_in" @click="zoomIn"></button>
                            <button class="z_out" @click="zoomOut"></button>
                        </div>
                        <button class="crop" @click="cropImage"></button>

                    </div> -->
                    <!-- /Controls -->
                </div>

            </b-col>
        </b-row>

    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            require: true,
            default: false
        },
    },
    data(){
        return {
            minScale: 0.5,
            maxScale: 4,
            scale: 0.2,
            speed: 0.15,
            customOffset: 10,
            currentScale: 1.0,
            currentTopPosition: 0,
            currentLeftPosition: 0,
            selectMenuOption: 1,
            menuOptions: [{ text: 'Select Option', value: ''}],
            menuList: [],
            selectedMenuItem: {},
            chapters: this.data.file_data.chapter,
            acronym: this.data.product.acronym,
            currentChapter: null,
            currentImage: null,
            dragging: false,
            canvas: null,
            ctx: null,
            dragStart: null,
            dragged: false,
            lastX: 0,
            lastY: 0,
            currentCanvasImage: null,
            isFullScreen: false,
            showMultiImageControls: false,
            currentMultiImages: [],
            currentMultiImageIndex: 1,
            currentMultiImageCount: 1,
            currentFileName: "",
            currentChapterNumber: "",
            currentFilePath: "",
            isMenuOpen: true,
            viewPortElementWidth: null,
            showSpinner: false,
        }
    },
    watch: {
        currentImage(value){
            this.setImage()
        },
        currentLeftPosition(value){
            this.redraw()
        },
        currentTopPosition(value){
            this.redraw()
        },
        currentScale(value){
            this.zoom(0)
        },
        currentMultiImageIndex(value){
            this.setCurrentMultiImage(value-1)
        },
        isMenuOpen(value){
            if(value){
                this.showMenu()
                setTimeout(() => {
                    this.viewPortElementWidth = this.$refs.viewport.getBoundingClientRect().width
                    console.log(this.viewPortElementWidth)
                }, 500)
                
            }else{
                this.hideMenu()
                setTimeout(() => {
                    this.viewPortElementWidth = this.$refs.viewport.getBoundingClientRect().width
                    console.log(this.viewPortElementWidth)
                }, 500)
            }
        },
        currentMultiImageCount(value){
            this.showMultiImageControls = (value > 1) ? true : false
        },
        viewPortElementWidth(value){
            this.setImage()
        }
    },
    mounted(){
        this.initData()
        
    },
    computed: {
        getCurrentMenuList(){
            let a = this.menuList.filter(m => m.id == this.selectMenuOption)
            
            if(a.length)
                return a[0].data;
        },
    },
    methods: {
        initData(){
            this.setImageLibraryData().then(ilData => {
                this.currentChapter = Number.parseInt(ilData[0].data[0].chapterNumber, 10)
                this.changeImage(ilData[0].data[0])
            })

            this.canvas = this.$refs.imageContainer
            this.ctx = this.canvas.getContext('2d')
            this.canvas.addEventListener('mouseup', this.stopDragging);
            window.addEventListener('resize', this.resizeWindow);
            this.resizeWindow()
        },
        resizeWindow(){
            this.setImage()
            this.setWindowSize()
        },
        prevImage(){
            if(this.currentMultiImageIndex > 1)
                this.currentMultiImageIndex -= 1
        },
        nextImage() {
            if(this.currentMultiImageIndex < this.currentMultiImageCount)
                this.currentMultiImageIndex += 1
        },
        zoomIn(evt) {
            this.zoom(2)
        },
        zoomOut(evt) {
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
            this.setImage()
        },
        setImage(){
            this.showLoader()
            //this.resetPosition()
            this.currentLeftPosition = this.currentTopPosition = 0
            this.currentCanvasImage = new Image()
            this.currentCanvasImage.crossOrigin='anonymous'
            this.currentCanvasImage.src = this.currentImage
            
            this.currentCanvasImage.onload = () => {
                let viewportElement = this.$refs.viewport.getBoundingClientRect()
                this.canvas.width  = viewportElement.width;
                this.canvas.height = viewportElement.height;
                this.trackTransforms(this.ctx)

                this.redraw()

                this.hideLoader()
            }

            this.currentCanvasImage.onerror = () => {
                this.loadMultiImages()
            }
        },
        showLoader(){
            this.$refs.imageContainer.style.display = 'none'
            this.showSpinner = true
        },
        hideLoader(){
            this.$refs.imageContainer.style.display = 'block'
            this.showSpinner = false
        },
        setWindowSize(){
            this.isMenuOpen = (window.innerWidth <= 700) ? false : true
        },
        loadMultiImages(){

            let fileParams = { 
                filename: this.currentFileName, 
                acronym: this.data.product.acronym, 
                asset: this.data.product.asset, 
                path: this.currentFilePath 
            }

            axios.post('/api/multiImageCheck', fileParams)
                .then(response => {
                    console.log(response.data.message)
                    //this.app_data = response.data.message
                    if(response.data.message.length){
                        this.currentMultiImages = response.data.message
                        this.currentMultiImageCount = this.currentMultiImages.length
                        this.setCurrentMultiImage()
                    }
                        
                })
                .catch(error => console.log(error))
        },
        setCurrentMultiImage(index = 0){
            this.currentImage = `${this.data.base_path}${this.currentFilePath}${this.currentMultiImages[index]}`
        },
        redraw(){
            let p1 = this.ctx.transformedPoint(0,0);
            let p2 = this.ctx.transformedPoint(this.canvas.width,this.canvas.height)
            let hRatio = this.canvas.width / this.currentCanvasImage.width
            let vRatio =  this.canvas.height / this.currentCanvasImage.height
            let ratio  = Math.min(hRatio, vRatio);
            let centerShift_x = (this.canvas.width - this.currentCanvasImage.width*ratio )/2
            let centerShift_y = (this.canvas.height - this.currentCanvasImage.height*ratio )/2
            this.ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
            
            //center image
            this.ctx.drawImage(this.currentCanvasImage, this.currentLeftPosition, this.currentTopPosition, this.currentCanvasImage.width, this.currentCanvasImage.height,
                      centerShift_x,centerShift_y,this.currentCanvasImage.width*ratio, this.currentCanvasImage.height*ratio);  
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
        setImageLibraryData(){
            
            return new Promise((resolve, reject) => {
                this.menuOptions = this.chapters.map(c => {
                    //console.log(c)
                    let chapnumber = (c.type) ? c.prefix : c.chNumber;
                    let chaptext = (c.type) ? c.type : 'Chapter ' + c.chNumber;
                    
                    c.text = chaptext;
                    c.value = chapnumber;
                    
                    return c;
                });
                //place default object at the beginning of the menuoptions array
                this.menuOptions.unshift({ text: 'Select Option', value: ''});
                
                this.chapters.forEach(element => {

                    if(element.type){
                        //for appendix (or special prefix)
                        if(element.figure.length > 1){
                            this.menuList.push({
                                id: element.prefix,
                                data: element.figure.map(f => {
                                        let parsedData = this.parseFigureNumberFromFilename(f.filename, false);
                                        f.figure = element.prefix + '-' + parsedData.figureNumber;
                                        f.figureTitle = this.$replaceSpecial(f.caption);
                                        f.chapterNumber = element.prefix;
                                        f.appendix = true
                                        return f;
                                    })
                                }
                            );
                        }
                    }else{
                        //for regular figure
                        let chFolder = this.lpad(element.chNumber, "0", 2)

                        if(element.figure.length > 1){
                            this.menuList.push({
                                id: element.chNumber,
                                data: element.figure.map(f => {
                                        let parsedData = this.parseFigureNumberFromFilename(f.filename);
                                        f.figure = parsedData.chapterNumber + '-' + parsedData.figureNumber;
                                        f.figureTitle = this.$replaceSpecial(f.caption);
                                        f.chapterNumber = element.chNumber;
                                        f.appendix = false
                                        return f;
                                    })
                                }
                            );

                            //console.log(this.menuList)
                        }
                    }
                    
                });

                resolve(this.menuList)
            })
            
        },
        lpad(str, padString, length){
            str = str.toString();

            while (str.length < length)
                str = padString + str;
            return str;
        },
        parseFigureNumberFromFilename(filename = "", isNumber = true){
            
            let productAcronymEndIndex = this.acronym.length
            let chapterEndIndex = productAcronymEndIndex + 2;
            let n=0
            let chapterNumber, figureNumber;

            // Check to see if the image is an appendix image (the character after the acronym in the filename will be NaN)
            if (isNaN(filename.slice(productAcronymEndIndex, productAcronymEndIndex + 1))) {
                while (isNaN(filename.slice(productAcronymEndIndex + n, productAcronymEndIndex + n + 1))) {
                    n++;
                }
                chapterEndIndex = n + productAcronymEndIndex;
            }

            if(n){
                //if image is an appendix image
                chapterNumber = filename.slice(productAcronymEndIndex, chapterEndIndex).toString() 

                if (isNaN(filename.slice(filename.length - 1))) {
                    figureNumber = Number.parseInt(filename.slice(chapterEndIndex), 10).toString();
                    figureNumber += filename.slice(filename.length - 1);
                } else {
                    figureNumber = Number.parseInt(filename.slice(chapterEndIndex), 10).toString();
                }
            }else{
                chapterNumber = Number.parseInt(filename.slice(productAcronymEndIndex, chapterEndIndex), 10).toString()
                
                figureNumber = Number.parseInt(filename.slice(chapterEndIndex), 10).toString()
            }
            
            let parsedData = {
                chapterNumber: chapterNumber,
                figureNumber: figureNumber
            }

            return parsedData
        },
        changeImage(fig){

            this.multiImageData()

            let filename = `${fig.filename}.jpg`

            this.currentChapterNumber = (fig.appendix) ? fig.chapterNumber : this.lpad(fig.chapterNumber, "0", 2)
            
            let filePath = `${this.data.standalone_path}/resource/${this.data.product.acronym}/il/refimg/${this.currentChapterNumber}`

            this.currentFilePath = `/standalone/resource/${this.data.product.acronym}/il/refimg/${this.currentChapterNumber}`

            this.currentFileName = fig.filename
        
            this.currentImage = filePath + '/' + filename

            this.selectedMenuItem = fig
        },
        multiImageData(){
            // reset multi image controls
            this.showMultiImageControls = false
            this.currentMultiImages =  []
            this.currentMultiImageIndex = 1
            this.currentMultiImageCount = 1
        },
        toggleMenu(evt){
            if(!this.isMenuOpen){
                //close menu
                this.isMenuOpen = true
            }else{
                //show menu
                this.isMenuOpen = false
            }
            //this.setImage()
        },
        showMenu(){
            this.$refs.showMenuIcon.style.display = 'block'
            this.$refs.hideMenuIcon.style.display = 'none'
            this.$refs.menublock.classList.remove('closed');
            this.$refs.viewportWrapper.classList.remove('wide');
            this.$refs.safety.classList.remove('wide');
            //this.isMenuOpen = true
        },
        hideMenu(){
            this.$refs.showMenuIcon.style.display = 'none'
            this.$refs.hideMenuIcon.style.display = 'block'
            this.$refs.menublock.classList.add('closed');
            this.$refs.viewportWrapper.classList.add('wide');
            this.$refs.safety.classList.add('wide');
            //this.isMenuOpen = false
        },
        startDragging(evt){
            console.log('start dragging')
            this.dragging = true
            //this.currentLeftPosition = this.currentTopPosition = 0
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
            this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
			this.dragStart = this.ctx.transformedPoint(this.lastX,this.lastY);
			this.dragged = false;
        },
        doDragging(evt){
            this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            this.dragged = true;

			if (this.dragStart){
				let pt = this.ctx.transformedPoint(this.lastX,this.lastY);
				this.ctx.translate(pt.x-this.dragStart.x,pt.y-this.dragStart.y);
                //redraw();
                this.redraw();
            }
        },
        stopDragging(evt){
            console.log('stop dragging')
            this.dragging = false
            this.dragStart = null
            //zoom on click
            //if (!this.dragged) this.zoom(evt.shiftKey ? -1 : 1 );
        },
        zoom(clicks){
            let pt = this.ctx.transformedPoint(this.lastX,this.lastY);
			this.ctx.translate(pt.x,pt.y);
            let factor = Math.pow(1.01,clicks);
            console.log(factor)
			this.ctx.scale(factor,factor);
			this.ctx.translate(-pt.x,-pt.y);
			this.redraw();
        },
        zoomImage(evt){
            var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.deltaY ? -evt.deltaY : 0;
            
			if (delta) this.zoom(delta);
            return evt.preventDefault() && false;
                
        },
        trackTransforms(ctx){
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
        },
        toggleFullScreen(){
            this.setImage()
            this.isFullScreen = !this.isFullScreen
            
            if(this.isFullScreen){
                //exit full screen
                this.$refs.imageLibrary.classList.add('main')
                this.$refs.imageLibrary.classList.add('fullscreen')
                this.$refs.enterFullScreenIcon.style.display = 'none'
                this.$refs.leaveFullScreenIcon.style.display = 'block'
            }else{
                //enter full screen
                this.$refs.imageLibrary.classList.remove('main')
                this.$refs.imageLibrary.classList.remove('fullscreen')
                this.$refs.enterFullScreenIcon.style.display = 'block'
                this.$refs.leaveFullScreenIcon.style.display = 'none'
            }
        }
    }
}
</script>

<style>
    .menu-toggle-btn, .fullscreen-toggle-btn{
        background-color: #fff;
    }
</style>