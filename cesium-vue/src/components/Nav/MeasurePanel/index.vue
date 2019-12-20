<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-11-14 00:35:44
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="roam">
    <div class="list-item">
      <span class="list-name">测量</span>
      <div class="item-btnbox">
        <div class="item-btn distancebutton" @click="distance"></div>
        <span class="item-name">距离</span>
      </div>

      <div class="item-btnbox">
        <div class="item-btn areabutton" @click=" area"></div>
        <span class="item-name">面积</span>
      </div>

      <div class="item-btnbox">
        <div class="item-btn heightbutton" @click="height"></div>
        <span class="item-name">高度</span>
      </div>
    </div>

    <div class="list-item">
      <div class="item-btnbox">
        <div class="item-btn clearbutton" @click="clear"></div>
        <span class="item-name">清除</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      handlerDis: null,
      handlerArea: null,
      handlerHeight: null
    };
  },
  methods: {
    distance: function() {
      let clampMode = 0; // 空间模式
      let viewer = this.$viewer;
      let scene = viewer.scene;
      let widget = viewer.cesiumWidget;
      //初始化测量距离
      let handlerDis = new Cesium.MeasureHandler(
        viewer,
        Cesium.MeasureMode.Distance,
        clampMode
      );
      this.handlerDis = handlerDis;
      //注册测距功能事件
      handlerDis.measureEvt.addEventListener(function(result) {
        var dis = Number(result.distance);
        var distance =
          dis > 1000 ? (dis / 1000).toFixed(2) + "km" : dis.toFixed(2) + "m";
        handlerDis.disLabel.text = "距离:" + distance;
      });
      handlerDis.activeEvt.addEventListener(function(isActive) {
        if (isActive == true) {
          viewer.enableCursorStyle = false;
          viewer._element.style.cursor = "";
          $("body")
            .removeClass("measureCur")
            .addClass("measureCur");
        } else {
          viewer.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });

      this.deactiveAll(handlerDis);
      handlerDis && handlerDis.activate();
    },
    area: function() {
      let clampMode = 0; // 空间模式
      let viewer = this.$viewer;
      let scene = viewer.scene;
      let widget = viewer.cesiumWidget;

      //初始化测量面积
      let handlerArea = new Cesium.MeasureHandler(
        viewer,
        Cesium.MeasureMode.Area,
        clampMode
      );

      this.handlerArea = handlerArea;
      handlerArea.measureEvt.addEventListener(function(result) {
        var mj = Number(result.area);
        var area =
          mj > 1000000
            ? (mj / 1000000).toFixed(2) + "km²"
            : mj.toFixed(2) + "㎡";
        handlerArea.areaLabel.text = "面积:" + area;
      });
      handlerArea.activeEvt.addEventListener(function(isActive) {
        if (isActive == true) {
          viewer.enableCursorStyle = false;
          viewer._element.style.cursor = "";
          $("body")
            .removeClass("measureCur")
            .addClass("measureCur");
        } else {
          viewer.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });

      this.deactiveAll(handlerArea);
      handlerArea && handlerArea.activate();
    },
    height: function() {
      let clampMode = 0; // 空间模式
      let viewer = this.$viewer;
      let scene = viewer.scene;
      let widget = viewer.cesiumWidget;

      //初始化测量高度
      let handlerHeight = new Cesium.MeasureHandler(
        viewer,
        Cesium.MeasureMode.DVH
      );
      this.handlerHeight = handlerHeight;
      handlerHeight.measureEvt.addEventListener(function(result) {
        var distance =
          result.distance > 1000
            ? (result.distance / 1000).toFixed(2) + "km"
            : result.distance + "m";
        var vHeight =
          result.verticalHeight > 1000
            ? (result.verticalHeight / 1000).toFixed(2) + "km"
            : result.verticalHeight + "m";
        var hDistance =
          result.horizontalDistance > 1000
            ? (result.horizontalDistance / 1000).toFixed(2) + "km"
            : result.horizontalDistance + "m";
        handlerHeight.disLabel.text = "空间距离:" + distance;
        handlerHeight.vLabel.text = "垂直高度:" + vHeight;
        handlerHeight.hLabel.text = "水平距离:" + hDistance;
      });
      handlerHeight.activeEvt.addEventListener(function(isActive) {
        if (isActive == true) {
          viewer.enableCursorStyle = false;
          viewer._element.style.cursor = "";
          $("body")
            .removeClass("measureCur")
            .addClass("measureCur");
        } else {
          viewer.enableCursorStyle = true;
          $("body").removeClass("measureCur");
        }
      });

      this.deactiveAll(handlerHeight);
      handlerHeight && handlerHeight.activate();
    },
    clear: function() {
      this.handlerDis && this.handlerDis.clear();
      this.handlerArea && this.handlerArea.clear();
      this.handlerHeight && this.handlerHeight.clear();
    },

    deactiveAll: function(handler) {
      handler && handler.deactivate();
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

.distancebutton {
  background: url('../../../assets/images/distance.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.distancebutton:hover {
  background: url('../../../assets/images/distance_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.areabutton {
  background: url('../../../assets/images/area.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.areabutton:hover {
  background: url('../../../assets/images/area_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.heightbutton {
  background: url('../../../assets/images/height.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.heightbutton:hover {
  background: url('../../../assets/images/height_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.clearbutton {
  background: url('../../../assets/images/delete.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.clearbutton:hover {
  background: url('../../../assets/images/delete_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>