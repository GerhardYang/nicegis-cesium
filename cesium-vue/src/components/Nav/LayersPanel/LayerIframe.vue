<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-24 15:55:17
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="layers">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      check-on-click-node
      :default-checked-keys="defaultCheckKeys"
      expand-on-click-node
      ref="layers"
      show-checkbox
      @check-change="handleCheckChange"
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
    for (let scene of this.$store.state.config.scenes) {
      if (scene.isInitScene) {
        this.defaultCheckKeys.push(scene.id);
      }
    }
    this.data = this.$store.state.config.scenes;
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
    },
    handleCheckChange: function() {}
  }
};
</script>
<style lang="stylus" scoped>
.layers {
  margin-top: 10px;
  margin-left: 10px;
  width: 280px;
}</style>