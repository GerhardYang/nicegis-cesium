<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-12-12 19:35:50
 -->
<template>
  <div>
    <!-- 气泡HTML -->
    <blockquote id="bubble" class="bubble"></blockquote>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$viewer = new Cesium.Viewer("container", {
    //   fullscreenButton: true,
    //   navigation: true
    // });

    // 隐藏logo
    this.$viewer.scene._creditContainer.style.display = "none";
    // this.$store.commit("changeViewer", viewer);
    this.initViewer();
    /* 三维球转动添加监听事件 */
    let viewer = this.$viewer;
    viewer.scene.camera.moveEnd.addEventListener(function() {
      console.log(viewer.scene.camera);
    });
  },
  methods: {
    initViewer: function() {
      let baselayers = this.$store.state.config.baselayers;
      let terrain = this.$store.state.config.terrain;
      let viewer = this.$viewer;
      let scene = viewer.scene;
      let widget = viewer.cesiumWidget;
      // console.log(this.$store.state.config);

      // 地形
      if (terrain) {
        let name = terrain.name;
        name = new Cesium.CesiumTerrainProvider({
          url: terrain.url,
          requestWaterMask: true,
          requestVertexNormals: true
        });
        if (terrain.isShow) {
          viewer.terrainProvider = name;
        }
      }

      // 影像
      if (baselayers) {
        for (let layer of baselayers) {
          let layername = layer.name;
          let type = layer.type;
          switch (type) {
            case "xyz":
              layername = new Cesium.UrlTemplateImageryProvider(layer.options);
              break;
            case "wmts":
              layername = new Cesium.WebMapTileServiceImageryProvider(
                layer.options
              );
              break;
            case "supermap":
              layername = new Cesium.SuperMapImageryProvider(layer.options);
              break;
            default:
              break;
          }

          if (layer.isShow) {
            console.log(layer.options, layername);
            viewer.imageryLayers.addImageryProvider(layername);
          }
        }
      }

      /* 初始化定位*/
      let initSceneURL = this.$store.state.config.initScene.url;
      let xyzOrlonlat = this.$store.state.config.initScene.xyzOrlonlat;
      let destinationLonlat = this.$store.state.config.initScene
        .destinationLonlat;
      let destinationXYZ = this.$store.state.config.initScene.destinationXYZ;

      let xyzDestination = new Cesium.Cartesian3(
        destinationXYZ.x,
        destinationXYZ.y,
        destinationXYZ.z
      );
      let lonlatDestination = Cesium.Cartesian3.fromDegrees(
        destinationLonlat.lon,
        destinationLonlat.lat,
        destinationLonlat.height
      );

      try {
        let promise = scene.open(initSceneURL);
        Cesium.when(
          promise,
          function() {
            //设置相机位置、视角，便于观察场景
            if (xyzOrlonlat == "xyz") {
              console.log(destinationXYZ);
              scene.camera.setView({
                destination: xyzDestination,
                orientation: orientation
              });
            }
            if (xyzOrlonlat == "lonlat") {
              console.log(destinationLonlat);
              scene.camera.setView({
                destination: lonlatDestination,
                orientation: orientation
              });
            }
          },
          function() {
            let title = "加载SCP失败，请检查网络连接状态或者url地址是否正确？";
            widget.showErrorPanel(title, undefined, e);
          }
        );
      } catch (e) {
        if (widget._showRenderLoopErrors) {
          let title = "渲染时发生错误，已停止渲染。";
          widget.showErrorPanel(title, undefined, e);
        }
      }
    }
  }
};
</script>