<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-20 13:34:50
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="xyz">
    <div>
      <el-input placeholder="请输入内容" v-model="position.x">
        <template slot="prepend">经度:</template>
      </el-input>
    </div>
    <br />
    <div>
      <el-input placeholder="请输入内容" v-model="position.y">
        <template slot="prepend">纬度:</template>
      </el-input>
    </div>
    <br />
    <div>
      <el-input placeholder="请输入内容" v-model="position.z">
        <template slot="prepend">高度:</template>
      </el-input>
    </div>
    <br />
    <el-row class="row">
      <el-button type="info" @click="goPosition">定位</el-button>
      <el-button type="danger" @click="reSet">重置</el-button>
    </el-row>
  </div>
</template>
<script>
import { Z_BLOCK } from "zlib";
export default {
  data() {
    return {
      position: {
        x: 113.45,
        y: 30.37,
        z: 50
      },
      entity: null
    };
  },
  methods: {
    reSet: function() {
      this.position.x = 113.45;
      this.position.y = 30.37;
      this.position.z = 50;
      $("#bubble").hide();
    },
    goPosition: function() {
     
      var scenePosition = null; // 记录在场景中点击的笛卡尔坐标点
      var infoboxContainer = document.getElementById("bubble");

      scene.postRender.addEventListener(function() {
        // 每一帧都去计算气泡的正确位置
        if (scenePosition) {
          var canvasHeight = scene.canvas.height;
          var windowPosition = new Cesium.Cartesian2();
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            scenePosition,
            windowPosition
          );
          infoboxContainer.style.bottom =
            canvasHeight - windowPosition.y + 45 + "px";
          infoboxContainer.style.left = windowPosition.x - 70 + "px";
          infoboxContainer.style.visibility = "visible";
        }
      });

      var position = Cesium.Cartesian3.fromDegrees(
        parseFloat(this.position.x),
        parseFloat(this.position.y),
        parseFloat(this.position.z)
      );
      scenePosition = position;

      $("#bubble").show();

      if (this.entity != null) {
        viewer.entities.remove(this.entity);
      }
      this.entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          parseFloat(this.position.x),
          parseFloat(this.position.y),
          parseFloat(this.position.z)
        ),
        point: {
          color: Cesium.Color.RED, //点位颜色
          pixelSize: 0 //像素点大小
        }
      });
      viewer.flyTo(this.entity, {
        offset: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-45),
          range: 3000
        }
      }); //居中到该点
    }
  }
};
</script>
<style lang="stylus" scoped>
.xyz {
  margin-top: 10px;
  margin-left: 10px;
}

.row {
  margin-left: 60px;
}
</style>