---
layout: post
title:  "使用基于WebGL的Cesium玩转地球"
date:   2014-03-21 17:58:26
categories: jekyll update
---

Cesium，一个基于WebGL的 JavaScript 绘图库， 通过其内部机制提供了这个能力。它支持3种不同的视图: 3D globe, 2D map,和 2.5D Columbus View ，从一种到另一种转换只需要一行代码。 画任何类型的形状，突出显示特定的地区以及使用鼠标或触摸与地图交互，都相当简单。Cesium只有一个 JS 文件，可在包括手机在内的所有主流浏览器运行。


主页：<http://cesiumjs.org/> 已被墙，请自行翻墙


代码：<https://github.com/AnalyticalGraphicsInc/cesium>


Cesium的API简洁、文档比较丰富，根据 Getting Started 即可快速实现三维地球。

1. 下载
	
	下载地址：<https://github.com/AnalyticalGraphicsInc/cesium/releases>，当前最新版本为b26。
	
2. 部署

    将下载的压缩包解压，拷贝到你web服务器(IIS、Apache等)中。
	如果你安装了```python```，你可以```cd```到Cesium目录下，```python -m SimpleHTTPServer```运行简易的web服务器。
	
3. 运行

	打开支持WebGL的浏览器(Chrome)，进入<http://localhost:8000/HelloWorld.html>，即可看到有包含bing影像数据的地球。
	
4. 自定义图层

	看看```HelloWorld.html```里面都写了什么，很简单就这么一句代码。
	
	```var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer');```
	
	
	如果显示自定义图层呢，只需要几行代码而已。通过查看文档，可以看到CesiumWidget有个imageryProvider参数，默认使用bing的数据。
	
	换个mapbox的数据，就这么几行
	
	```
    var osm = new Cesium.OpenStreetMapImageryProvider({
        url : 'https://a.tiles.mapbox.com/v3/examples.map-qfyrx5r8/',
  	  credit : 'MapBox, OpenStreetMap and contributors, CC-BY-SA'
    });
  
    var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer', {
        imageryProvider : osm});
	```
	
	可参见 [我的demo](../../../../../earth/index.html)
	
	
	![demo](../../../../../pic/CesiumDemo.png)
    

	  
	  


