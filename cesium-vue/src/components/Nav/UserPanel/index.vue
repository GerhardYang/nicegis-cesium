<!--
 * @Author: GerhardYang
 * @Date: 2019-11-08 23:15:43
 * @LastEditTime: 2019-11-15 01:26:38
 * @LastEditors: GerhardYang
 * @Description: your file description
 -->
<template>
  <div class="user">
    <ul>
      <li @click="info">欢迎您: {{username}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    info: function() {
      this.$layer.confirm(
        `<p>当前登录用户:${this.username}</p>
        <br/>
        <p>本次登录时间:${this.$store.state.loginTime}</p>`,
        {
          title: "用户信息",
          btn: ["退出系统", "取消"],
          shade: false, //是否显示遮罩
          shadeClose: false //点击遮罩是否关闭
        },

        layerid => {
          this.$layer.msg("欢迎使用！");
          this.$layer.close(layerid);

          setTimeout(() => {
            this.$store.commit("setLogin", false);
          }, 1500);
        }
      );
    }
  },
  watch: {
    "$store.state.username": function() {
      this.username = this.$store.state.username;
      console.log(this.$store.state.username);
      // this.$forceUpdate();
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