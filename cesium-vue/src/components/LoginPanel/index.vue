<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-23 10:14:50
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div v-if="isShow">
    <div class="title">{{systitle}}</div>
    <div class="loginpanel">
      <div class="login">
        <br />
        <el-input placeholder="  登录用户名" v-model="username"></el-input>
        <br />
        <br />
        <br />
        <el-input show-password placeholder="  登录密码" v-model="pwd"></el-input>
        <br />
        <br />
        <br />
        <el-row class="row">
          <el-button type="danger" @click="login">登录</el-button>
          <el-button type="info" @click="reSet">重置</el-button>
        </el-row>
      </div>
    </div>
    <div class="container"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      systitle: "",
      isShow: true,
      username: "",
      pwd: ""
    };
  },
  mounted() {
    this.systitle = this.$store.state.config.systitle;  
    document.title = "欢迎使用:"+this.systitle;
  },
  methods: {
    login: function() {
      if (this.username == "admin" && this.pwd == "admin") {
        this.$store.commit("setUsername", this.username);
        this.$store.commit("setLogintime", new Date().toLocaleString());
        this.$store.commit("setLogin", true);
        this.isShow = false;
        $("#container").show();
      }
    },
    reSet: function() {
      this.username = "";
      this.pwd = "";
    }
  },
  watch: {
    "$store.state.isLogin": function() {
      console.log(this.$store.state.isLogin);
      if (this.$store.state.isLogin !== true) {
        console.log("aaa");
        this.isShow = true;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.title {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -400px;
  height: 60px;
  width: 800px;
  font-size: 40px;
  font-weight: 500;
  line-height: 60px;
  text-align: center;
  color: #fff;
  text-shadow: 0.2rem 0rem 0.5rem #c03, -0.2rem 0rem 0.5rem #c03, 0rem 0.2rem 0.5rem #c03, 0rem -0.2rem 0.5rem #c03;
  z-index: 99999;
}

.loginpanel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 600px;
  margin: -300px 0 0 -400px;
  background: url('../../assets/images/loginbg.png');
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 99999;
}

.login {
  position: relative;
  width: 440px;
  height: 240px;
  margin-left: 120px;
  margin-top: 150px;
  background: #ffffff44;
  opacity: 0.9;
  z-index: 9999999;
  padding: 30px 60px;
}

.row {
  margin-left: 150px;
}

.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('../../assets/images/bg2.jpeg') no-repeat;
  background-size: 100% 100%;
  // opacity: 0.9;
  z-index: 9999;
}</style>