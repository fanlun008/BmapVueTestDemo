<template>
  <div id="overviewMap" class="bm-view">
    <el-bmap class="bmap-box"
             :vid="'bmap-vue'"
             :lazy="2000"
             :bmap-manager="bmapManager"
             :center="center"
             :zoom="zoom"
             :mapStyleV2="{ styleJson: bmapCustomStyleConfig }">
      <el-bmap-marker v-for="(bubble, index) in bubbleDataList"
                      :key="index"
                      :vid="'bMarker'+index"
                      :position="bubble.latlng"
                      :enableMassClear="true"
                      :icon="calcBubbleSizeAndLabelOption(bubble).iconOptions"
                      :label="calcBubbleSizeAndLabelOption(bubble).labelOptions"
                      :events="{
                        mouseover: () => bMapMarkerMouseover(bubble),
                        mouseout: () => bMapMarkerMouseout(bubble)
                      }"/>
      <el-bmap-info-window-custom
        v-for="(bubble, index) in bubbleDataList"
        :vid="'bCustomInfoWindow'+index"
        :enableAutoPan="false"
        :key="index+100"
        :is-custom="false"
        :offset="bMapInfoWindowOffset"
        :position="bubble.latlng"
        :visible.sync="bubble.isMouseover"
      >
        <template>
          <BubbleTooltip/>
        </template>
      </el-bmap-info-window-custom>

      <!--<bmapInfoWindowCustom2
        v-for="(bubble, index) in bubbleDataList"
        :vid="'bCustomInfoWindow'+index"
        :enableAutoPan="false"
        :key="index+100"
        :is-custom="false"
        :offset="bMapInfoWindowOffset"
        :position="bubble.latlng"
        :isMouseBubbleOver.sync="bubble.isMouseover"
        :isMouseTooltipOver.sync="bubble.isMouseTooltipOver"
      >
        <template>
          <BubbleTooltip/>
        </template>
      </bmapInfoWindowCustom2>-->
    </el-bmap>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import { bmap_bubble_yellow_png_template, bmap_bubble_red_png_template, bmap_bubble_green_png_template } from '../utils/svgTemplate'
import { bmapCustomStyleConfig } from '../utils/custom_map_config'
import { bubbleDataListMock } from './lib/bubbleDataListMock'
import { util as bmapvglUtil } from 'vue-mapvgl'
import BubbleTooltip from './BubbleTooltip'
// eslint-disable-next-line no-unused-vars
// import bmapInfoWindowCustom2 from './lib/bmapInfoWindowCustom2'
export default {
  name: 'Bmapdemo',
  components: {
    // bmapInfoWindowCustom2,
    BubbleTooltip
  },
  data () {
    return {
      bubbleDataList: [],
      bmapManager: null,
      center: [165, 23.61628],
      zoom: 1,
      bmapCustomStyleConfig,
      bMapInfoWindowOffset: [0, -20],

      currentWindow: {
        position: [121.4113285, 31.21515044],
        content: 'hello world',
        events: {},
        visible: true
      }
    }
  },
  created () {
    this.bubbleDataList = bubbleDataListMock.filter(item => item.latlng !== null && item.latlng[0] !== null).map((item, index) => {
      return Object.assign(item, { isMouseover: false, isMouseTooltipOver: false, index })
    })
  },
  methods: {
    bMapMarkerMouseover (bubble) {
      bubble.isMouseover = true
      this.bmapLineLayerVisible = true

      const curve = new bmapvglUtil.GeodesicCurve()
      const vData = []

      let startPointLng = bubble.latlng[0]
      if (startPointLng < 0) {
        startPointLng = startPointLng + 360
      }
      const startPoint = { lng: startPointLng, lat: bubble.latlng[1] }

      this.bubbleDataList.forEach((otherBubble) => {
        if (otherBubble.index !== bubble.index) {
          const endPoint = { lng: otherBubble.latlng[0], lat: otherBubble.latlng[1] }
          curve.setOptions({
            points: [startPoint, endPoint]
          })
          const curveModelData = curve.getPoints()
          vData.push({
            geometry: {
              type: 'LineString',
              coordinates: curveModelData
            },
            properties: {
              count: Math.random()
            }
          })
        }
      })
      this.lineLayerData = vData
    },
    bMapMarkerMouseout (bubble) {
      this.bmapLineLayerVisible = false
      setTimeout(() => {
        bubble.isMouseover = false
      }, 50)
    },
    calcBubbleSizeAndLabelOption (bubbleItem) {
      const options = {
        iconOptions: null,
        labelOptions: null
      }
      const labelOptionsTemplate = {
        content: bubbleItem.total,
        offset: [-12, -12],
        enableMassClear: true,
        style: {
          'background-color': null,
          border: null,
          color: 'white',
          'font-size': '16px',
          'font-weight': '200'
        },
        tle: null
      }
      if (bubbleItem.total < 100) {
        options.iconOptions = { url: bmap_bubble_yellow_png_template, size: [38, 38], anchor: [19, 19] }
        if (bubbleItem.total < 10) {
          labelOptionsTemplate.offset = [-5, -12]
        } else {
          labelOptionsTemplate.offset = [-9, -13]
        }
        labelOptionsTemplate.style['font-size'] = '14px'
      } else if (bubbleItem.total > 100 && bubbleItem.total <= 1000) {
        options.iconOptions = { url: bmap_bubble_red_png_template, size: [45, 45], anchor: [21, 22] }
        labelOptionsTemplate.offset = [-12, -13]
        labelOptionsTemplate.style['font-size'] = '15px'
      } else if (bubbleItem.total > 1000 && bubbleItem.total <= 10000) {
        options.iconOptions = { url: bmap_bubble_green_png_template, size: [60, 60], anchor: [30, 30] }
        labelOptionsTemplate.offset = [-18, -14]
        labelOptionsTemplate.style['font-size'] = '16px'
      } else {
        options.iconOptions = { url: bmap_bubble_green_png_template, size: [60, 60], anchor: [30, 30] }
        labelOptionsTemplate.style['font-size'] = '16px'
      }
      options.labelOptions = labelOptionsTemplate
      return options
    }
  }
}
</script>

<style scoped lang="scss">
  .bm-view {
    width: 1040px;
    height: 500px;
    border: 1px solid red;
    margin: 0 auto;
    .bmap-box {
      width: 100%;
      height: 100%;
      .bmap-info-window-custom {
        height: 275px;
        background-color: white;
        border-radius: 0px;
      }
    }

  }
</style>
