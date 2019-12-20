<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-11-15 03:39:43
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="layers">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      check-on-click-node
      :expand-on-click-node="false"
      ref="layers"
      @node-click="nodeClick"
    ></el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      defaultCheckKeys: []
    };
  },
  mounted() {
    this.data = this.$store.state.config.scene;
    for (let item of this.data) {
      if (item.checked) {
        this.defaultCheckKeys.push(item.id);
        this.addLayer(item.sceneurl);
      }
    }
  },
  methods: {
    nodeClick(data, node) {
      console.log(data);
      this.addLayer(data.sceneurl);
    },
    addLayer(url) {
      try {
        let viewer = this.$viewer;
        let scene = viewer.scene;
        let widget = viewer.cesiumWidget;
        let promise = scene.open(url);
        Cesium.when(
          promise,
          function(layers) {
            var layer = scene.layers.find("Config");
            console.log(layer);
            //设置相机位置，定位至模型
          },
          function() {
            var title = "加载SCP失败，请检查网络连接状态或者url地址是否正确？";
            widget.showErrorPanel(title, undefined, e);
          }
        );
      } catch (e) {
        if (widget._showRenderLoopErrors) {
          var title = "渲染时发生错误，已停止渲染。";
          widget.showErrorPanel(title, undefined, e);
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.layers {
  margin-top: 10px;
  margin-left: 10px;
  width: 280px;
}</style>