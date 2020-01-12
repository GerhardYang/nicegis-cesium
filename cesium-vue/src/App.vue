<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors  : GerhardYang
 * @LastEditTime : 2019-12-23 10:05:21
 -->
<template>
  <div class="menuDiv">
    <LoginPanel />
    <Nav />
    <Footer />
  </div>
</template>


<script>
import Nav from "./components/Nav/";
import Footer from "./components/Footer/";
import LoginPanel from "./components/LoginPanel/";

export default {
  components: {
    Nav,
    Footer,
    LoginPanel
  }
};
</script>
<style lang="stylus">
body, html {
  margin: 0;
  padding: 0;
}
</style>>

