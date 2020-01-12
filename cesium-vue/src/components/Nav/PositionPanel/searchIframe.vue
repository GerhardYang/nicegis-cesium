<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-25 13:34:38
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
      let POI = window.sysconfig.POI;

      $.ajax({
        url:
          POI.url +
          `/featureResults.json?returnContent=true&fromIndex=${fromIndex}&toIndex=${toIndex}`,
        type: "POST",
        data: JSON.stringify({
          datasetNames: [`${POI.datasource}:${POI.dataset}`],
          getFeatureMode: "SQL",
          queryParameter: {
            attributeFilter: `${POI.queryfield} like '%${this.input}%'`
          }
        }),
        contentType: false, //禁止设置请求类型
        processData: false, //禁止jquery对DAta数据的处理,默认会处理
        success: function(serviceResult) {
          console.log(serviceResult);
          if (serviceResult.featureCount > 0) {
            _self.total = serviceResult.totalCount;
            let queryIndex = _self.arrSelect(
              serviceResult.features[0].fieldNames,
              POI.queryfield
            );
            for (let feature of serviceResult.features) {
              _self.data.push({
                id: "SUPERMAP" + feature.ID,
                label: feature.fieldValues[queryIndex],
                feature: feature
              });
            }
          }
        },
        error: function(data) {
          console.log(data);
        }
      });
    },
    goPosition: function(feature) {
      let _self = this;
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

      let showfield = window.sysconfig.POI.showfield;
      console.log(feature);

      let content = `<blockquote class="layui-elem-quote">`;
      for (let item of showfield) {
        for (let key in item) {
          // console.log(key);
          // console.log(item[key]);
          let fieldIndex = _self.arrSelect(feature.fieldNames, key);
          content += `${item[key]}:${feature.fieldValues[fieldIndex]}<br>`;
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
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
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
    nodeClick: function(data, node) {
      let feature = data.feature;
      this.position.x = feature.geometry.center.x;
      this.position.y = feature.geometry.center.y;
      this.goPosition(feature);
    },
    arrSelect: function(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) return i;
      }
      return -1;
    }
  }
};
</script>
<style lang="stylus" scoped>
.area {
  margin-top: 5px;
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