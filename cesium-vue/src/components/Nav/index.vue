<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-24 15:29:45
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div>
    <div class="nav">
      <div class="title">{{systitle}}</div>
      <transition name="el-zoom-in-center">
        <ul class="transition-box">
          <li :class="panelVisiable.position ? 'active':''" @click="selectTab" ref="position">
            <span class="fa fa-map-marker"></span>搜索定位
          </li>
          <li :class="panelVisiable.roam ? 'active':''" @click="selectTab" ref="roam">
            <span class="fa fa-eye"></span>场景漫游
          </li>
          <li :class="panelVisiable.layer ? 'active':''" @click="selectTab" ref="layer">
            <span class="fa fa-list-ul"></span>图层管理
          </li>
          <li :class="panelVisiable.measure ? 'active':''" @click="selectTab" ref="measure">
            <span class="fa fa-paper-plane"></span>空间测量
          </li>
          <li :class="panelVisiable.fly ? 'active':''" @click="selectTab" ref="fly">
            <span class="fa fa-paper-plane"></span>飞行控制
          </li>
          <li :class="panelVisiable.set ? 'active':''" @click="selectTab" ref="set">
            <span class="fa fa-cog fa-fw"></span>系统设置
          </li>
          <UserPanel />
        </ul>
      </transition>
    </div>
    <RoamPanel v-show="panelVisiable.roam" />
    <PositionPanel v-show="panelVisiable.position" />
    <LayersPanel v-show="panelVisiable.layer" />
    <FlyPanel v-show="panelVisiable.fly" />
    <SetPanel v-show="panelVisiable.set" />
    <MeasurePanel v-show="panelVisiable.measure" />
    <div class="showOrHide">
      <i class="el-icon-caret-top" @click="selectTab" title="显示或隐藏菜单栏"></i>
    </div>
  </div>
</template>
<script>
import RoamPanel from "./RoamPanel/";
import PositionPanel from "./PositionPanel/";
import LayersPanel from "./LayersPanel/";
import MeasurePanel from "./MeasurePanel/";
import FlyPanel from "./FlyPanel/";
import SetPanel from "./SetPanel/";
import UserPanel from "./UserPanel/";
export default {
  data() {
    return {
      systitle: "",
      panelVisiable: {
        roam: false,
        position: true,
        layer: false,
        fly: false,
        set: false,
        measure: false
      }
    };
  },
  mounted() {
    this.systitle = window.sysconfig.systitle;
  },
  components: {
    RoamPanel,
    PositionPanel,
    LayersPanel,
    MeasurePanel,
    FlyPanel,
    SetPanel,
    UserPanel
  },
  methods: {
    selectTab: function(e) {
      // console.log(e);
      switch (e.target.innerText) {
        case "场景漫游":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          this.panelVisiable.roam = true;
          $("#container").css("top", "135px");
          $(".showOrHide").show();
          break;

        case "搜索定位":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          this.panelVisiable.position = true;
          $("#container").css("top", "135px");
          $(".showOrHide").show();
          break;

        case "图层管理":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          this.panelVisiable.layer = true;
          $("#container").css("top", "135px");
          $(".showOrHide").show();
          break;
        case "空间测量":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          this.panelVisiable.measure = true;
          $("#container").css("top", "135px");
          $(".showOrHide").show();
          break;

        case "飞行控制":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          this.panelVisiable.fly = true;
          $("#container").css("top", "135px");
          $(".showOrHide").show();
          break;

        case "系统设置":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          this.panelVisiable.set = true;
          $("#container").css("top", "135px");
          $(".showOrHide").show();
          break;

        case "":
          for (let item in this.panelVisiable) {
            this.panelVisiable[item] = false;
          }
          $("#container").css("top", "40px");
          $(".showOrHide").hide();
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.nav {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 41px;
  background: #111;
}

.showOrHide {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 110px;
  right: 10px;
  font-size: 25px;
  background: #333;
  color: #fff;
}

.title {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 41px;
  width: 360px;
  font-size: 18px;
  font-weight: 700;
  line-height: 40px;
  margin-left: 20px;
  color: #fff;
  text-shadow: 0.2rem 0rem 0.5rem #c03, -0.2rem 0rem 0.5rem #c03, 0rem 0.2rem 0.5rem #c03, 0rem -0.2rem 0.5rem #c03;
}

.nav >ul {
  margin: 0;
  margin-left: 54%;
  padding: 0;
  height: 41px;
  min-width: 656px;
}

.nav >ul>li {
  float: left;
  padding: 10px 20px;
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #eee;
}

.nav >ul>li>span {
  margin-right: 5px;
}

.nav ul .active {
  background: #333;
}

.nav >ul>li:hover {
  background: #CC0033;
}
</style>