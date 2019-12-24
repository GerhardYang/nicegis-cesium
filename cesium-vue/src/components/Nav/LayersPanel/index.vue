<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-24 14:56:29
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="roam">
    <div class="list-item">
      <span class="list-name">图层管理</span>
      <div class="item-btnbox">
        <div class="item-btn laterbutton" @click="openLayersControler"></div>
        <span class="item-name">图层控制</span>
      </div>
      <div class="item-btnbox">
        <div class="item-btn addbutton"></div>
        <span class="item-name">添加</span>
      </div>
    </div>
  </div>
</template>
<script>
import LayerIframe from "./LayerIframe";
export default {
  data() {
    return {
      layerid: {
        layer: null
      }
    };
  },
  mounted() {
    this.openLayersControler();
  },
  methods: {
    openLayersControler: function() {
      if (this.layerid.layer == null) {
        this.layerid.layer = this.$layer.iframe({
          area: ["300px", "600px"],
          offset: [160, 450],
          title: "图层控制",
          shade: false, //是否显示遮罩
          shadeClose: false, //点击遮罩是否关闭
          maxmin: false, //开启最大化最小化
          scrollbar: false, //是否允许浏览器出现滚动条:默认是允许
          resize: false, //是否允许拉伸，默认是不允许
          content: {
            content: LayerIframe, //传递的组件对象
            parent: this, //当前的vue对象
            data: {} //props
          },
          cancel: () => {
            //关闭弹窗事件
            this.layerid.layer = null;
          }
        });
      }
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

.laterbutton {
  background: url('../../../assets/images/layer.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.laterbutton:hover {
  background: url('../../../assets/images/layer_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.addbutton {
  background: url('../../../assets/images/add.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.addbutton:hover {
  background: url('../../../assets/images/add_on.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>