<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-12-12 11:08:33
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="roam">
    <div class="list-item">
      <span class="list-name">路线选择</span>
      <el-select v-model="value" placeholder="请选择飞行路线" @change="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="list-item">
      <span class="list-name">飞行管理</span>
      <div class="item-btnbox">
        <div class="item-btn playbutton" @click="play"></div>
        <span class="item-name">开始</span>
      </div>
      <div class="item-btnbox">
        <div class="item-btn pausebutton" @click="pause"></div>
        <span class="item-name">暂停</span>
      </div>
      <div class="item-btnbox">
        <div class="item-btn stopbutton" @click="stop"></div>
        <span class="item-name">停止</span>
      </div>
    </div>
    <div class="list-item">
      <span class="list-name">线路站点</span>
      <div class="item-btnbox">
        <el-switch v-model="showline" active-color="#CC0033" inactive-color="#444" @change="line"></el-switch>
        <span class="item-name">路线</span>
      </div>
      <div class="item-btnbox">
        <el-switch
          v-model="showstation"
          active-color="#CC0033"
          inactive-color="#444"
          @change="station"
        ></el-switch>
        <span class="item-name">站点</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showline: true,
      showstation: true,
      options: [],
      value: "",
      routes: null,
      flyManager: null,
      currentRoute: null
    };
  },
  mounted() {
    let fpf = this.$store.state.config.fpf;
    // console.log("fly", fpf);
    for (let index = 0; index < fpf.length; index++) {
      let option = {};
      option.label = fpf[index].name;
      option.value = index;
      option.path = fpf[index].path;
      this.options.push(option);
    }

    if (this.currentRoute !== null) {
      this.currentRoute.isLineVisible = false;
      this.currentRoute.isStopVisible = false;
    }

    let viewer = this.$viewer;
    this.routes = new Cesium.RouteCollection(viewer.entities);
    //初始化飞行管理
    this.flyManager = new Cesium.FlyManager({
      scene: viewer.scene,
      routes: this.routes
    });
  },
  methods: {
    select: function(value) {
      console.log(value);
      let _self = this;
      let viewer = this.$viewer;

      let fpf = this.$store.state.config.fpf;
      let fpfpath = fpf[value].path;

      //添加fpf飞行文件，fpf由SuperMap iDesktop生成
      let routes = this.routes;
      routes.fromFile(fpfpath);
      let flyManager = this.flyManager;

      flyManager.routes = routes;

      //注册站点到达事件
      flyManager.stopArrived.addEventListener(function(routeStop) {
        routeStop.waitTime = 0; // 在每个站点处停留1s
      });

      flyManager.readyPromise.then(function() {
        // 飞行路线就绪
        let currentRoute = flyManager.currentRoute;
        currentRoute.isLineVisible = true;
        currentRoute.isStopVisible = true;
        _self.currentRoute = currentRoute;
      });

      this.flyManager = flyManager;
    },
    play: function() {
      if (this.flyManager !== null) {
        this.flyManager && this.flyManager.play();
      } else {
        this.$layer.alert("请先选择飞行路线！");
      }
    },
    pause: function() {
      if (this.flyManager !== null) {
        this.flyManager && this.flyManager.pause();
      } else {
        this.$layer.alert("请先选择飞行路线！");
      }
    },
    stop: function() {
      if (this.flyManager !== null) {
        this.flyManager && this.flyManager.stop();
      } else {
        this.$layer.alert("请先选择飞行路线！");
      }
    },
    line: function(value) {
      if (this.flyManager !== null) {
        this.currentRoute.isLineVisible = value;
      } else {
        this.$layer.alert("请先选择飞行路线！");
      }
    },
    station: function(value) {
      if (this.flyManager !== null) {
        this.currentRoute.isStopVisible = value;
      } else {
        this.$layer.alert("请先选择飞行路线！");
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

.el-select {
  margin-top: 28px;
}

.el-switch {
  margin: 5px auto;
  margin-top: 28px;
  margin-left: 5px;
  width: 50px;
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

.playbutton {
  background: url('../../../assets/images/play.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.playbutton:hover {
  outline: 2px solid rgb(31, 255, 255);
}

.pausebutton {
  background: url('../../../assets/images/pause.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.pausebutton:hover {
  outline: 2px solid rgb(31, 255, 255);
}

.stopbutton {
  background: url('../../../assets/images/stop.png') no-repeat;
  background-size: contain;
  cursor: pointer;
}

.stopbutton:hover {
  outline: 2px solid rgb(31, 255, 255);
}
</style>