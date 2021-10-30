<template>
  <div class="bubble-tooltip-wrapper">
    <div class="total-level-info">
      <div class="main">
        <!--<svg-icon icon-class="bubble_tooltip-location"/>-->
        <span style="margin-right: 10px;margin-left: 5px;font-weight: 700;">中国</span>
        <span>共 </span> <span style="font-weight: 700;">1160</span> <span> cntrs</span>
      </div>
      <div class="order-label-list">
        <div class="label-wrapper">
<!--          <svg-icon class="label-content-icon" icon-class="bmap-label-order"/>-->
        </div>
        <div class="label-wrapper">
<!--          <svg-icon class="label-content-icon" icon-class="bmap-label-rail"/>-->
        </div>
        <div class="label-wrapper">
<!--          <svg-icon class="label-content-icon" icon-class="bmap-label-truck"/>-->
        </div>
      </div>
    </div>
    <div class="city-level-container">
      <el-carousel indicator-position="none" arrow="always" :loop=true :autoplay=false>
        <el-carousel-item v-for="(carouselItem, carouselItemIndex) in cityCntrList" :key="carouselItemIndex">
          <div class="city-carousel-content">
            <div class="city-item" v-for="(cityItem, index) in carouselItem" :key="index">
              <div class="cntr-num">{{ cityItem.total }}</div>
              <div class="cntr-city">{{ cityItem.name }}</div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="alert-level-container">
      <div class="alert-category">
        <div class="alert-cntr-count">{{ '10' }} <span>箱待做</span> </div>
        <div class="alert-sort-content">
          <div class="content-sort-item">
            <div class="day-count">9天</div>
            <div class="cntr-count">3 <span>cntrs</span></div>
          </div>
          <div class="content-sort-item">
            <div class="day-count">8天</div>
            <div class="cntr-count">2 <span>cntrs</span></div>
          </div>
          <div class="content-sort-item">
            <div class="day-count">7天</div>
            <div class="cntr-count">5 <span>cntrs</span></div>
          </div>
        </div>
      </div>
      <div class="alert-category">
        <div class="alert-cntr-count">{{ '5' }} <span>箱待提</span> </div>
        <div class="alert-sort-content">
          <div class="content-sort-item">
            <div class="day-count">9天</div>
            <div class="cntr-count">1 <span>cntrs</span></div>
          </div>
          <div class="content-sort-item">
            <div class="day-count">8天</div>
            <div class="cntr-count">4 <span>cntrs</span></div>
          </div>
        </div>
      </div>
      <div class="alert-category">
        <div class="alert-cntr-count">{{ '28' }} <span>箱ETA变更</span> </div>
        <div class="alert-sort-content">
          <div class="content-sort-item">
            <div class="day-count">+10天</div>
            <div class="cntr-count">12 <span>cntrs</span></div>
          </div>
          <div class="content-sort-item">
            <div class="day-count">4-7天</div>
            <div class="cntr-count">11 <span>cntrs</span></div>
          </div>
          <div class="content-sort-item">
            <div class="day-count">1-3天</div>
            <div class="cntr-count">5 <span>cntrs</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BubbleTooltip',
  data () {
    return {
      cityCntrList: [[{
        name: '青岛',
        total: 210
      }, {
        name: '上海',
        total: 202
      }, {
        name: '福州',
        total: 195
      }, {
        name: '江门',
        total: 66
      }, {
        name: '蛇口',
        total: 88
      }, {
        name: '扬州',
        total: 100
      }], [
        {
          name: '泉州',
          total: 100
        },
        {
          name: '珠海',
          total: 90
        },
        {
          name: '深圳',
          total: 130
        }
      ]]
    }
  },
  methods: {
    log () {
      console.log('333333')
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .bubble-tooltip-wrapper {
    width: 510px;
    height: 275px;
    padding: 0 25px;

    .total-level-info {
      height: 65px;
      border-bottom: 2px solid #f1f1f1;

      .main {
        font-size: 15px;
        position: absolute;
        top: 12px;
        left: 56px;
      }

      .order-label-list {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        position: absolute;
        width: 140px;
        height: 52px;
        top: 0px;
        right: 26px;

        .label-wrapper {
          width: 32px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          .label-content-icon {
            width: 18px;
            height: 18px;
            margin-bottom: 10px;
          }

          &:after {
            border-left: 16px solid transparent;
            border-right: 16px solid transparent;
            border-bottom: 13px solid #ffffff;
            content: "";
            width: 0;
            bottom: 0px;
            position: absolute;
          }

          &:nth-child(1) {
            background-color: #e5f1ff;
          }

          &:nth-child(2) {
            background-color: #ffefe0;
          }

          &:nth-child(3) {
            background-color: #e0f9e5;
          }
        }
      }
    }

    .city-level-container {
      height: 73px;
      border-bottom: 2px solid #f1f1f1;
      .city-carousel-content {
        height: 100%;
        width: 100%;
        padding: 0 20px;
        display: flex;
        .city-item {
          margin: 0 10px;
          flex: 0 0 50px;
          text-align: center;
          font-size: 14px;
          .cntr-city {
            margin-top: 4px;
            background: #e5eef9;
            color: black;
            padding: 3px 0;
          }
          .cntr-num {
            margin-top: 10px;
            color: #297fe9;
            font-weight: 700;
          }
        }
      }
      /deep/ .el-carousel {
        .el-carousel__container {
          height: 70px;
          .el-carousel__arrow.el-carousel__arrow--left {
            left: -6px;
          }
          .el-carousel__arrow.el-carousel__arrow--right {
            right: -6px;
          }
          .el-carousel__arrow {
            background: none;
            .el-icon-arrow-right {
              color: #a1a3a5;
              font-size: 15px;
            }
            .el-icon-arrow-left {
              color: #a1a3a5;
              font-size: 15px;
            }
          }
        }

      }
    }

    .alert-level-container {
      height: 116px;
      display: flex;
      .alert-category {
        flex: 1 1 50px;
        padding: 0 25px;

        .alert-cntr-count {
          margin-top: 17px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          color: #297fe9;
          span {
            color: black;
            font-size: 14px;
            font-weight: 100;
          }
        }
        .alert-sort-content {
          margin-top: 12px;
          height: 72px;
          font-size: 13px;
          .content-sort-item {
            padding: 0 1px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            .day-count {
              background: #f2994a;
              flex: 0 0 41px;
              text-align: center;
            }
            .cntr-count {
              color: #297fe9;
              font-weight: 700;
              font-size: 13px;
              span {
                font-weight: 100;
                color: black;
                font-size: 12px;
              }
            }
            &:nth-child(1) {
              .day-count {
                background: #f2994a;
              }
            }
            &:nth-child(2) {
              .day-count {
                background: #f2c94c;
              }
            }
            &:nth-child(3) {
              .day-count {
                background: #f2e14a;
              }
            }
          }
        }
      }
    }
  }
</style>
