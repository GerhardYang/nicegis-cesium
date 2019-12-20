<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-11-09 21:49:19
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="roam">
    <div class="list-item">
      <span class="list-name">视角</span>
      <div class="item-btnbox">
        <div class="item-btn globalbutton" @click="goGlobal"></div>
        <span class="item-name">全球</span>
      </div>

      <div class="item-btnbox">
        <div class="item-btn chinabutton" @click="goChina"></div>
        <span class="item-name">中国</span>
      </div>

      <div class="item-btnbox">
        <div class="item-btn custombutton" @click="goXiantao"></div>
        <span class="item-name">仙桃</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goGlobal: function() {
      let viewer = this.$viewer;
      viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          -3562029.914602287,
          32488282.518908378,
          17550465.601298578
        ),
        orientation: {
          heading: 6.238247043526242,
          pitch: -1.5541732351377768,
          roll: 0
        }
      });
    },
    goChina: function() {
      let viewer = this.$viewer;
      viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          -3652560.2263748404,
          10736334.378014784,
          6853762.231412497
        ),
        orientation: {
          heading: 6.238247043526242,
          pitch: -1.5541732351377768,
          roll: 0
        }
      });
    },
    goXiantao: function() {
      let viewer = this.$viewer;
      viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          -2217097.4818491847,
          5098193.223853788,
          3256387.0467994795
        ),
        orientation: {
          heading: 6.238247043526242,
          pitch: -1.5541732351377768,
          roll: 0
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.roam {
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

.globalbutton {
  background: url('../../../assets/images/global.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.globalbutton:hover {
  background: url('../../../assets/images/global_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.chinabutton {
  background: url('../../../assets/images/china.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.chinabutton:hover {
  background: url('../../../assets/images/china_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.custombutton {
  background: url('../../../assets/images/view.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.custombutton:hover {
  background: url('../../../assets/images/view_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>