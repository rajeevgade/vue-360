# vue-360-viewer
- A Simple and Beautiful 360&deg; Product Viewer built on Vue.js

## Demo

![Preview](http://rajeevgade.github.io/images/portfolio/vue-360-viewer.gif)

[Click Here for Demo](http://rajeevgade.github.io/portfolio/vue-360-viewer)


## Installation
```
npm install --save vue-360-viewer
```

## Config

```
import VueThreeSixty from 'vue-360-viewer'

Vue.use(VueThreeSixty)

```

## Example
```
<vue-three-sixty 
  :amount=36
  imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
  fileName="chair_{index}.jpg?v1"
/>
```

## Props

| Name | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| amount | Number | Number of images | Yes |
| imagePath | String | Path to your image | Yes |
| fileName | String | File name format | Yes |
| spinReverse | Boolean | Reverse Spin | Optional | false |
| header | Boolean | Show/Hide Header | Optional | false |
| autoplay | Number | Autoplay your images | Optional | 24 |
| loop | Number | Number of loops you want to autoplay | Optional | 1 |
| boxShadow | Boolean | Apply Box Shadow Background | Optional | false |

## Roadmap

- Fullscreen
- Custom CSS Classes
- Buttons Control
- And a few more ...

## Dependencies

- vue
- vue2-hammer
- core-js

### Contributions are welcome anytime

### You can reach out to me at rajeevgade@gmail.com





