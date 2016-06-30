---
layout: post
title:  "在ubuntu 12.04 LTS上搭建OpenStreetMap切片服务"
date:   2014-11-10 15:17:24
categories: Mapbox GL
---

为了简化配置，直接添加别人发布的软件仓库，里面包含发布地图服务需要的一切软件。

`sudo add-apt-repository ppa:kakrueger/openstreetmap`

更新apt

`sudo apt-get update`

安装`libapache2-mod-tile`

`sudo apt-get install libapache2-mod-tile`

这里会进行配置并创建数据库，需要注意的是，导入数据是需要使用这个用户操作。如果没有配置不对，可以通过`sudo dpkg-reconfigure openstreetmap-postgis-db-setup`重新配置。我这里加上了当前用户，如www-data,ubuntu。

下载osm数据，全球数据可以到<http://planet.openstreetmap.org>下载，同时<http://download.geofabrik.de>为我们提供了不同国家的小数据。我只下载了中国的

`wget http://download.geofabrik.de/asia/china-latest.osm.pbf`

导入数据库，如果数据大，这一步会非常耗时。调整osm2pgsql参数可加快速度。
这里使用的EC2主机，分配给100M内存和1个处理器，大概用十几分钟。由于EC2性能太低，不得已加上`--cache-strategy sparse`参数。

`osm2pgsql --slim -C 100 --cache-strategy sparse --number-processes 1 china-latest.osm.pbf`

设置数据导入时间

`sudo touch /var/lib/mod_tile/planet-import-complete`

重启渲染服务

`sudo /etc/init.d/renderd restart`

测试

<http://localhost/osm/slippymap.html>

<http://localhost/osm/0/0/0.png>

![slippymap](/pic/openstreetmap_tile_server.png)

PS: 如果地图显示不出来，查看渲染的日志

tail -f /var/log/syslog |grep renderd

数据更新

* 自动实时更新

mod-tile中提供了增量数据更新工具openstreetmap-tiles-update-expire。试用出现不少问题，并没能成功。

* 增量更新

下载增量数据，`http://planet.openstreetmap.org/replication/`可以找到每天、没小时和每分钟的增量更新包。部分区域每天更新的更新包可以从`http://download.geofabrik.de/asia/china-updates/`下载。

导入增量数据

`osm2pgsql --append --slim -C 100 --cache-strategy sparse --number-processes 1 788.osc.gz`

设置数据导入时间

`sudo touch /var/lib/mod_tile/planet-import-complete`

* 完全更新

重新下载osm数据并导入数据。

设置数据导入时间

`sudo touch /var/lib/mod_tile/planet-import-complete`

PS:如果地图没有更新，可调用render_old重新渲染旧切片。同时把浏览器的缓存清除掉。

参考

<http://switch2osm.org/serving-tiles/building-a-tile-server-from-packages/>

<http://blog.csdn.net/goldenhawking/article/details/7952303>

