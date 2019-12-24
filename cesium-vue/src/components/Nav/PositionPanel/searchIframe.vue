<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-24 14:28:24
 * @LastEditors  : GerhardYang
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
    <div class="pagination">
      <el-pagination
        small
        layout="total"
        :page-size="15"
        :total="total"
        :pager-count="5"
        style="margin-left:20px;"
      ></el-pagination>
      <el-pagination
        small
        layout="prev,pager,next"
        :page-size="15"
        :total="total"
        :pager-count="5"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      features: {},
      total: 0,
      fromIndex: 0,
      toIndex: 14,
      position: {
        x: 113.45,
        y: 30.37,
        z: 50
      },
      entity: null
    };
  },
  props: {
    input: {
      type: String,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.searchPOI(this.fromIndex, this.toIndex);
  },
  methods: {
    searchPOI(fromIndex, toIndex) {
      let _self = this;
      _self.data = [];
      console.log(fromIndex, toIndex);
      let POI = this.$store.state.config.POI;
      // console.log(this.input, POI);
      let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          attributeFilter: `${POI.queryfield} like '%${this.input}%'`
        },
        datasetNames: [`${POI.datasource}:${POI.dataset}`],
        fromIndex: fromIndex,
        toIndex: toIndex
      });
      L.supermap
        .featureService(POI.url)
        .getFeaturesBySQL(sqlParam, function(serviceResult) {
          if (serviceResult.result.featureCount > 0) {
            _self.total = serviceResult.result.totalCount;
            _self.features = serviceResult.result.features;
            console.log(_self.features);
            for (let feature of _self.features.features) {
              _self.data.push({
                id: "SUPERMAP" + feature.id,
                label: feature.properties[POI.queryfield],
                feature: feature
              });
            }
          }
        });
    },
    goPosition: function(properties) {
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

      $("#bubble").empty();

      let showfield = this.$store.state.config.POI.showfield;
      console.log(showfield);

      let content = `<blockquote class="layui-elem-quote">`;
      for (let item of showfield) {
        for (let key in item) {
          console.log(key);
          console.log(item[key]);
          content += `${item[key]}:${properties[key]}<br>`;
        }
      }
      content += `</blockquote>`;
      $("#bubble").append(content);
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
    },
    currentChange: function(page) {
      let index = this.toIndex + 1;
      this.searchPOI((page - 1) * index, page * index - 1);
    },
    nodeClick(data, node) {
      let feature = data.feature;
      this.position.x = feature.geometry.coordinates[0];
      this.position.y = feature.geometry.coordinates[1];
      this.goPosition(feature.properties);
    }
  }
};
</script>
<style lang="stylus" scoped>
.area {
  width: 248px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

.pagination {
  position: absolute;
  bottom: 10px;
  color: #eee;
}
</style>