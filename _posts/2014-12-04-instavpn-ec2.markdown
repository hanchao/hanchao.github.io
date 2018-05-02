---
layout: post
title:  "在ec2上使用instavpn搭建vpn服务"
date:   2014-12-04 11:01:23
categories: instavpn ec2
---

今天发现一个非常易用的vpn软件[instavpn](https://github.com/sockeye44/instavpn)。使用非常简单，用过的都说好。

`the most user-friendly L2TP/IPsec VPN server`

通过ssh连接上的我的ec2主机。

安装instavpn

`curl -sS https://sockeye.cc/instavpn.sh | sudo bash`

然后没有然后了，这已经安装完成了。

现在可以通过`http://IP-ADDRESS:8080`访问web的管理界面。这里可以监控流量使用情况、配置用户。

由于ec2有Security Groups的权限控制。在连接之前，需要把L2TP和web管理工具使用的相关端口打开，分别是UDP 500 1701 4500和TCP 8080。

现在就可以连接我们的VPN了。

![vpn](/pic/vpn1.png)

![vpn](/pic/vpn2.png)

