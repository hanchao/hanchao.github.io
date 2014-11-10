---
layout: post
title:  "搭建OpenStreetMap切片服务"
date:   2014-11-10 15:17:24
categories: Mapbox GL
---

为了简化配置，

添加仓库，这里面包含
`sudo add-apt-repository ppa:kakrueger/openstreetmap`

更新apt
`sudo apt-get update`

安装`libapache2-mod-tile`，里面包含发布地图服务需要的一切
`sudo apt-get install libapache2-mod-tile`

这里会进行配置并创建数据库，需要注意的是，用户名输入当前使用的用户（我这叫ubuntu）。如果没有配置不对，可以通过`sudo dpkg-reconfigure openstreetmap-postgis-db-setup`重新配置。

下载osm数据，我只下载了中国的
`wget http://download.geofabrik.de/asia/china-latest.osm.pbf`

导入数据库，如果数据大，这一步会非常耗时。调整osm2pgsql参数可加快速度。
这里使用的EC2主机，分配给500M内存和2个处理器，大概用十几分钟。
`osm2pgsql --slim -C 500 --cache-strategy sparse --number-processes 2 china-latest.osm.pbf`

通知mod_tile数据导入完成了
`sudo touch /var/lib/mod_tile/planet-import-complete`

重启渲染服务
`sudo /etc/init.d/renderd restart`

测试
http://localhost/osm/slippymap.html
http://localhost/osm/0/0/0.png

![slippymap](../../../../pic/openstreetmap_tile_server.png)

数据更新(TODO)


参考
<http://switch2osm.org/serving-tiles/building-a-tile-server-from-packages/>
<http://blog.csdn.net/goldenhawking/article/details/7952303>

