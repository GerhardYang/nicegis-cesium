<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime : 2019-12-24 16:48:55
 * @LastEditors  : GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="user">
    <ul>
      <li @click="info">欢迎您: {{userName}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      loginTime: "",
      layerIndex: {
        user: null
      }
    };
  },
  mounted() {
    let _self = this;
    window.addEventListener("setItem", function(e) {
      let key = e.key;
      // console.log(key);
      if (key == "userName") {
        _self.userName = e.newValue;
      }
      if (key == "loginTime") {
        // console.log(e);
        _self.loginTime = e.newValue;
      }
    });
  },
  methods: {
    info: function() {
      if (this.layerIndex.user != null) {
        this.$layer.close(this.layerIndex.user);
      }
      this.layerIndex.user = this.$layer.confirm(
        `<p>当前登录用户:${this.userName}</p>
        <br/>
        <p>本次登录时间:${this.loginTime}</p>`,
        {
          title: "用户信息",
          btn: ["退出系统", "取消"],
          shade: false, //是否显示遮罩
          shadeClose: false, //点击遮罩是否关闭
          cancel: () => {
            //关闭弹窗事件
            this.layerIndex.user = null;
          }
        },

        layerid => {
          this.$layer.msg("欢迎使用！");
          this.$layer.close(layerid);
          setTimeout(() => {
            this.$addStorageEvent(2, "isLogon", false);
          }, 1000);
        }
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.user >ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 41px;
  min-width: 656px;
}

.user >ul>li {
  float: right;
  padding: 5px 10px;
  margin-right: 20px;
  margin-top: 5px;
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #eee;
  background: #CC0033;
}

.user >ul>li:hover {
  background: #660033;
}</style>