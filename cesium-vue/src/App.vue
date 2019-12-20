<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-12-12 09:50:24
 -->
<template>
  <div class="menuDiv">
    <LoginPanel />
    <Nav />
    <Cesiumcontainer />
    <Footer />
  </div>
</template>


<script>
import Nav from "./components/Nav/";
import Cesiumcontainer from "./components/CesiumContainer";
import Footer from "./components/Footer/";
import LoginPanel from "./components/LoginPanel/";

export default {
  components: {
    Nav,
    Cesiumcontainer,
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

