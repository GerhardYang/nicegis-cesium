<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors  : GerhardYang
 * @LastEditTime : 2019-12-20 13:12:30
 -->
<template>
  <div id="footer">
    <div id="copyright">
      <span>{{copyright}}</span>
    </div>
    <div id="states">
      <span>{{stateInfos.lng}}</span>
      <span>{{stateInfos.lat}}</span>
      <span>{{stateInfos.height}}</span>
      <span>{{stateInfos.heading}}</span>
      <span>{{stateInfos.roll}}</span>
      <span>{{stateInfos.pitch}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyright: "",
      stateInfos: {
        lng: null,
        lat: null,
        height: null,
        heading: null,
        roll: null,
        pitch: null
      }
    };
  },
  mounted() {
    let stateInfos = this.stateInfos;
    this.copyright = this.$store.state.config.copyright;
    this.handleMOUSE_MOVE(stateInfos, viewer);
    this.handleWHEEL(stateInfos, viewer);
  },
  methods: {
    handleMOUSE_MOVE: function(stateInfos, viewer) {
      // 定义当前场景的画布元素的事件处理
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
      handler.setInputAction(function(movement) {
        //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
        let cartesian = viewer.camera.pickEllipsoid(
          movement.endPosition,
          viewer.scene.globe.ellipsoid
        );
        if (cartesian == undefined) {
          return;
        }
        //将笛卡尔坐标转换为地理坐标
        let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(
          cartesian
        );
        //将弧度转为度的十进制度表示
        stateInfos.lng = Cesium.Math.toDegrees(cartographic.longitude);
        stateInfos.lng =
          stateInfos.lng > 0
            ? `经度：${stateInfos.lng.toFixed(3)}°E`
            : `经度：${-stateInfos.lng.toFixed(3)}°W`;
        stateInfos.lat = Cesium.Math.toDegrees(cartographic.latitude);
        stateInfos.lat =
          stateInfos.lat > 0
            ? `纬度：${stateInfos.lat.toFixed(3)}°N`
            : `纬度：${-stateInfos.lat.toFixed(3)}°S`;
        //获取相机高度
        stateInfos.height = Math.ceil(
          viewer.camera.positionCartographic.height
        );
        stateInfos.height =
          stateInfos.height > 1000
            ? `相机高度：${stateInfos.height / 1000}Km`
            : `相机高度：${stateInfos.height}m`;

        stateInfos.heading = viewer.camera.heading;
        let headingAngle = (stateInfos.heading / (2 * Math.PI)) * 360;
        stateInfos.heading = `方位角：
        ${(headingAngle == 360 ? 0 : headingAngle).toFixed(2)}°`;

        stateInfos.roll = viewer.camera.roll;
        let rollAngle = (stateInfos.roll / (2 * Math.PI)) * 360;
        stateInfos.roll = `翻滚角：
        ${(rollAngle == 360 ? 0 : rollAngle).toFixed(2)}°`;

        stateInfos.pitch = viewer.camera.pitch;
        stateInfos.pitch = `俯仰角：
        ${((stateInfos.pitch / (2 * Math.PI)) * 360).toFixed(2)}°`;
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    handleWHEEL: function(stateInfos, viewer) {
      //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
      new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(
        function() {
          stateInfos.height = Math.ceil(
            viewer.camera.positionCartographic.height
          );
          stateInfos.height =
            stateInfos.height > 1000
              ? `相机高度：${stateInfos.height / 1000}Km`
              : `相机高度：${stateInfos.height}m`;
        },
        Cesium.ScreenSpaceEventType.WHEEL
      );
    }
  }
};
</script>
<style scoped>
#footer {
  z-index: 999;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 40px;
  width: 100%;
  background: #040404;
  color: #fff;
  opacity: 0.5;
  margin-right: 40px;
  /* border-top: 1px solid #fff; */
}
#footer > #copyright {
  float: left;
  width: 30%;
}
#footer > #copyright > span {
  line-height: 40px;
  font-weight: 800;
  padding-left: 50px;
}
#footer > #states {
  float: right;
  /* width: 70%; */
}
#footer > #states > span {
  line-height: 40px;
  padding-right: 10px;
}
</style>