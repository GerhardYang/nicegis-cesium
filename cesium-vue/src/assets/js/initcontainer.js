/*
 * @Author: GerhardYang
 * @Date: 2019-12-23 09:14:26
 * @LastEditTime : 2019-12-24 17:15:24
 * @LastEditors  : GerhardYang
 * @Description: your file description
 */


window.viewer = new Cesium.Viewer("container", {
  fullscreenButton: true,
  navigation: true
});
window.scene = window.viewer.scene;
$("#container").hide();
// 隐藏logo
window.viewer.scene._creditContainer.style.display = "none";

// 监听地图移动事件
viewer.scene.camera.moveEnd.addEventListener(function () {
  console.log(viewer);
});