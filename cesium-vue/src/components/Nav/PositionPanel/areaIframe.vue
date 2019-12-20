<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-11-15 04:27:44
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="area">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      check-on-click-node
      check-strictly
      :expand-on-click-node="false"
      ref="tree"
      @node-click="nodeClick"
    ></el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      i: 0
    };
  },
  mounted() {
    this.data.push(this.$store.state.areatree);
  },
  watch: {
    "$store.state.config": function() {
      this.data.push(this.$store.state.areatree);
    }
  },
  methods: {
    nodeClick(data, node) {
      console.log(data);

      let viewer = this.$viewer;
      viewer.dataSources.removeAll();
      let options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true //开启贴地
      };

      let promise = Cesium.GeoJsonDataSource.load(data.geojson);
      promise.then(function(dataSource, options) {
        viewer.dataSources.add(dataSource);
        let entities = dataSource.entities.values;
        let colorHash = {};
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          entity.polygon.fill = false;
          entity.polygon.hight = 100;
          entity.polygon.extrudedHeight = 10;
          entity.polygon.outline = true;
          entity.polygon.outlineColor = Cesium.Color.RED;
          entity.polygon.outlineWidth = 10;
        }
      });
      // this.$store.commit("changeViewer", viewer);
      viewer.flyTo(promise);
    }
  }
};
</script>
<style lang="stylus" scoped>
.area {
  margin-top: 10px;
  margin-left: 10px;
  width: 280px;
}</style>