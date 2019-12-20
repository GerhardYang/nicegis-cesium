<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-12-12 17:46:34
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="set">
    <div class="list-item">
      <span class="list-name">控件显隐</span>
      <div class="item-btnbox">
        <div class="item-btn navbutton" @click="toggleNav"></div>
        <span class="item-name">罗盘</span>
      </div>
      <div class="item-btnbox">
        <div class="item-btn fpsbutton" @click="toggleFPS"></div>
        <span class="item-name">帧率</span>
      </div>
      <div class="item-btnbox">
        <div class="item-btn mousebutton" @click="toggleFooter"></div>
        <span class="item-name">状态栏</span>
      </div>
    </div>
    <div class="list-item">
      <span class="list-name">图层颜色校正</span>
      <div class="slide-group">
        <div class="slide-top">
          <el-slider
            v-model="sliderValue.brightness"
            :step="setp"
            :max="1"
            @input="changeBrightness"
          ></el-slider>
          <label class="slide-label">亮度</label>
        </div>
      </div>
      <div class="slide-group">
        <div class="slide-top">
          <el-slider v-model="sliderValue.hue" :step="setp" :max="1" @input="changeHue"></el-slider>
          <label class="slide-label">色调</label>
        </div>
      </div>
      <div class="slide-group">
        <div class="slide-top">
          <el-slider v-model="sliderValue.contrast" :step="setp" :max="1" @input="changeContrast"></el-slider>
          <label class="slide-label">对比度</label>
        </div>
      </div>
      <div class="slide-group">
        <div class="slide-top">
          <el-slider
            v-model="sliderValue.saturation"
            :step="setp"
            :max="1"
            @input="changeSaturation"
          ></el-slider>
          <label class="slide-label">饱和度</label>
        </div>
      </div>
      <div class="item-btnbox">
        <div class="item-btn resetlbutton" @click="reSet"></div>
        <span class="item-name">重置</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sliderValue: {
        brightness: 1,
        contrast: 1,
        hue: 0,
        saturation: 1
      },
      setp: 0.01
    };
  },
  methods: {
    reSet: function() {
      this.sliderValue.brightness = 1;
      this.sliderValue.contrast = 1;
      this.sliderValue.hue = 0;
      this.sliderValue.saturation = 1;
    },
    toggleNav: function() {
      let viewer = this.$viewer;
      // console.log(viewer);
      let nav = document.getElementsByClassName(
        "cesium-viewer-navigationContainer"
      );
      let display = window.getComputedStyle(nav[0]).display;
      if (display == "block") {
        nav[0].style.display = "none";
      } else {
        nav[0].style.display = "block";
      }
    },
    toggleFPS: function() {
      let viewer = this.$viewer;
      viewer.scene.debugShowFramesPerSecond = !viewer.scene
        .debugShowFramesPerSecond;
    },
    toggleFooter: function() {
      $("#footer").toggle();
    },
    changeBrightness: function(value) {
      let scene = this.$viewer.scene;
      var correction = scene.colorCorrection; //创建颜色校正对象
      correction.show = true; //开启颜色校正
      correction.brightness = parseFloat(value);
      // console.log(value);
    },
    changeHue: function(value) {
      let scene = this.$viewer.scene;
      var correction = scene.colorCorrection; //创建颜色校正对象
      correction.show = true; //开启颜色校正
      correction.hue = parseFloat(value);
    },
    changeContrast: function(value) {
      let scene = this.$viewer.scene;
      var correction = scene.colorCorrection; //创建颜色校正对象
      correction.show = true; //开启颜色校正
      correction.contrast = parseFloat(value);
    },
    changeSaturation: function(value) {
      let scene = this.$viewer.scene;
      var correction = scene.colorCorrection; //创建颜色校正对象
      correction.show = true; //开启颜色校正
      correction.saturation = parseFloat(value);
    }
  }
};
</script>
<style lang="stylus" scoped>
.set {
  position: absolute;
  top: 39px;
  right: 0;
  left: 0;
  height: 96px;
  width: 100%;
  display: flex;
  overflow-x: visible;
  overflow-y: hidden;
  background: #333;
}

.list-item {
  width: auto;
  height: 72px;
  position: relative;
  margin: 12px 5px;
  border-right: 2px solid #474747;
  padding-right: 25px;
  padding-left: 12px;
  display: flex;
}

.list-name {
  display: inline-block;
  min-width: 57px;
  height: 18px;
  background: #474747;
  border-radius: 3px;
  font-size: 12px;
  color: #ddd;
  text-align: center;
  position: absolute;
  left: 16px;
  top: -2px;
}

.item-btnbox {
  height: 72px;
  width: 50px;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
  position: relative;
}

.item-btn {
  width: 34px;
  height: 34px;
  margin: 5px auto;
  margin-top: 20px;
  background-position: 50% !important;
  cursor: pointer;
}

.item-name {
  position: absolute;
  bottom: 0;
  display: inline-block;
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: #fff;
}

.resetlbutton {
  background: url('../../../assets/images/rotate.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.resetlbutton:hover {
  background: url('../../../assets/images/rotate_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.navbutton {
  background: url('../../../assets/images/nav.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.navbutton:hover {
  background: url('../../../assets/images/nav_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.fpsbutton {
  background: url('../../../assets/images/state.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.fpsbutton:hover {
  background: url('../../../assets/images/state_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.mousebutton {
  background: url('../../../assets/images/mouse.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.mousebutton:hover {
  background: url('../../../assets/images/mouse_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.slide-label {
  display: inline-block;
  width: 48px;
  font-size: 12px;
  color: #ddd;
  text-align: right;
  float: left;
  line-height: 21px;
  height: 21px;
  cursor: pointer;
}

.slide-top {
  width: 100px;
  border-right: 0;
  margin-right: 20px;
  margin-top: 20px;
}
</style>