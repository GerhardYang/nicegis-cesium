

window.viewer = new Cesium.Viewer("container", {
    fullscreenButton: true,
    navigation: true
});
window.scene = window.viewer.scene;
window.scene.scene3DOnly = true;
$("#container").hide();
// 隐藏logo
window.viewer.scene._creditContainer.style.display = "none";

// 监听地图移动事件
// viewer.scene.camera.moveEnd.addEventListener(function () {
//     console.log(viewer);
// });

$.ajax({
    type: "get",
    url: "./js/config/config.json",
    dataType: "json",
    async: false,
    success: function (response) {
        window.sysconfig = response;
        // layui.data('sysconfig', {
        //     key: 'supermapcs'
        //     , value: response
        // });
    }
});

let baselayers = window.sysconfig.baselayers;
let terrain = window.sysconfig.terrain;
let widget = viewer.cesiumWidget;

// 地形
if (terrain) {
    let name = terrain.name;
    name = new Cesium.CesiumTerrainProvider({
        url: terrain.url,
        requestWaterMask: true,
        requestVertexNormals: true
    });
    if (terrain.isShow) {
        viewer.terrainProvider = name;
    }
}

// 影像
if (baselayers) {
    for (let layer of baselayers) {
        let layername = layer.name;
        let type = layer.type;
        switch (type) {
            case "xyz":
                layername = new Cesium.UrlTemplateImageryProvider(layer.options);
                break;
            case "wmts":
                layername = new Cesium.WebMapTileServiceImageryProvider(
                    layer.options
                );
                break;
            case "supermap":
                layername = new Cesium.SuperMapImageryProvider(layer.options);
                break;
            default:
                break;
        }

        if (layer.isShow) {
            // console.log(layer.options, layername);
            viewer.imageryLayers.addImageryProvider(layername);
        }
    }
}

/* 初始化定位*/
let initSceneURL = null;
for (let scene of window.sysconfig.scenes) {
    if (scene.isInitScene) {
        initSceneURL = scene.sceneurl;
        break;
    }
}

let xyzOrlonlat = window.sysconfig.initCarame.xyzOrlonlat;
let destinationLonlat = window.sysconfig.initCarame
    .destinationLonlat;
let destinationXYZ = window.sysconfig.initCarame.destinationXYZ;

let xyzDestination = new Cesium.Cartesian3(
    destinationXYZ.x,
    destinationXYZ.y,
    destinationXYZ.z
);
let lonlatDestination = Cesium.Cartesian3.fromDegrees(
    destinationLonlat.lon,
    destinationLonlat.lat,
    destinationLonlat.height
);

// console.log(initSceneURL);
try {
    let promise = scene.open(initSceneURL);
    Cesium.when(
        promise,
        function () {
            //设置相机位置、视角，便于观察场景
            if (xyzOrlonlat == "xyz") {
                // console.log(destinationXYZ);
                scene.camera.setView({
                    destination: xyzDestination,
                    orientation: orientation
                });
            }
            if (xyzOrlonlat == "lonlat") {
                // console.log(destinationLonlat);
                scene.camera.setView({
                    destination: lonlatDestination,
                    orientation: orientation
                });
            }
        },
        function () {
            let title = "加载SCP失败，请检查网络连接状态或者url地址是否正确？";
            widget.showErrorPanel(title, undefined, e);
        }
    );
} catch (e) {
    if (widget._showRenderLoopErrors) {
        let title = "渲染时发生错误，已停止渲染。";
        widget.showErrorPanel(title, undefined, e);
    }
}