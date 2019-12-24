<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-24 16:38:37
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="position">
    <div class="list-item">
      <span class="list-name">搜索</span>
      <input type="text" id="searchInput" class="search-box" v-model="input" placeholder="请输入" />
      <el-button type="danger" class="search" icon="el-icon-search" plain @click="gotoSearch"></el-button>
    </div>
    <div class="list-item">
      <span class="list-name">定位</span>
      <div class="item-btnbox">
        <div class="item-btn areabutton" @click="gotoArea"></div>
        <span class="item-name">区划</span>
      </div>
      <div class="item-btnbox">
        <div class="item-btn pointbutton" @click="gotoXYZ"></div>
        <span class="item-name">坐标</span>
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
import searchIframe from "./searchIframe.vue";
import xyzIframe from "./xyzIframe";
import areaIframe from "./areaIframe";
export default {
  data() {
    return {
      input: "",
      layerIndex: {
        search: null,
        area: null,
        xyz: null
      }
    };
  },
  mounted() {
    let _selt = this;
    // 搜索框监听回车
    $("#searchInput").keypress(function(e) {
      // console.log(e);
      if (e.keyCode == 13) {
        _selt.gotoSearch();
      }
    });
  },
  methods: {
    gotoSearch: function() {
      if (this.layerIndex.search == null) {
        this.layerIndex.search = this.$layer.iframe({
          content: {
            content: searchIframe, //传递的组件对象
            parent: this, //当前的vue对象
            data: { input: this.input } //props
          },
          cancel: () => {
            //关闭弹窗事件
            this.layerIndex.search = null;
            viewer.dataSources.removeAll();
          },
          shade: false, //是否显示遮罩
          shadeClose: false, //点击遮罩是否关闭
          maxmin: false, //开启最大化最小化
          scrollbar: false, //是否允许浏览器出现滚动条:默认是允许
          resize: false, //是否允许拉伸，默认是不允许
          area: ["200px", "500px"],
          offset: [145, 400],
          title: "搜索结果"
        });
      }
    },
    gotoArea: function() {
      if (this.layerIndex.area == null) {
        this.layerIndex.area = this.$layer.iframe({
          content: {
            content: areaIframe, //传递的组件对象
            parent: this, //当前的vue对象
            data: {} //props
          },
          cancel: () => {
            //关闭弹窗事件
            this.layerIndex.area = null;
            viewer.dataSources.removeAll();
          },
          shade: false, //是否显示遮罩
          shadeClose: false, //点击遮罩是否关闭
          maxmin: false, //开启最大化最小化
          scrollbar: false, //是否允许浏览器出现滚动条:默认是允许
          resize: false, //是否允许拉伸，默认是不允许
          area: ["300px", "600px"],
          offset: [165, 460],
          title: "区划定位"
        });
      }
    },
    gotoXYZ: function() {
      if (this.layerIndex.xyz == null) {
        this.layerIndex.xyz = this.$layer.iframe({
          content: {
            content: xyzIframe, //传递的组件对象
            parent: this, //当前的vue对象
            data: {} //props
          },
          cancel: () => {
            //关闭弹窗事件
            this.layerIndex.xyz = null;
            $("#bubble").hide();
          },
          shade: false, //是否显示遮罩
          shadeClose: false, //点击遮罩是否关闭
          maxmin: false, //开启最大化最小化
          scrollbar: false, //是否允许浏览器出现滚动条:默认是允许
          resize: false, //是否允许拉伸，默认是不允许
          area: ["300px", "300px"],
          offset: [170, 300],
          title: "坐标定位"
        });
      }
    },
    clear: function() {
      $("#bubble").empty();
      $("#bubble").hide();
      viewer.dataSources.removeAll();
    }
  }
};
</script>
<style lang="stylus" scoped>
.position {
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

.areabutton {
  background: url('../../../assets/images/od.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.areabutton:hover {
  background: url('../../../assets/images/od_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.pointbutton {
  background: url('../../../assets/images/location_earth.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.pointbutton:hover {
  background: url('../../../assets/images/location_earth_on.png') no-repeat;
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

.search-box {
  width: 220px !important;
  height: 30px;
  background: #474747;
  border: 2px solid #8a8a8a;
  padding-left: 20px !important;
  margin: 30px 10px;
  margin-left: 18px;
  color: #fff;
}

.search {
  width: 50px;
  height: 34px;
  margin-top: 30px;
  margin-left: -12px;
}

.inputstyle {
  height: 22px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: none;
  color: #dddddd;
  padding-left: 10px;
}

.search-box:focus {
  outline: 1px solid #CC0033;
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
</style>