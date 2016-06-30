---
layout: post
title:  "nginx初体验"
date:   2012-10-18 10:57:30
categories: nginx
---

nginx

检出最新代码

`svn checkout svn://svn.nginx.org/nginx/trunk`

进入代码目录

`cd trunk`

运行configure 最新代码要在auto目录外面运行，prefix参数看你自己需要设置

`./auto/configure --prefix=/opt/hanchao/nginx/`

编译

`make`

安装

`make install`

进入安装好的目录

`cd /opt/hanchao/nginx/sbin`

启动web服务

`./nginx`

提示80端口被使用修改conf/nginx.conf找到listen 80，改为listen 8010后重新启动
测试

`http://10.15.5.51:8010/`

![nginx](/pic/nginx.png)

关闭web服务

`./nginx -s stop`
