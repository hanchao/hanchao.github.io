---
layout: post
title:  "Rails初体验"
date:   2012-10-19 10:57:30
categories: rails
---

系统环境`Ubuntu`

安装`ruby`(irb ri可选)

`sudo apt-get install ruby ruby-dev`

测试`ruby`

`ruby -v`

到这ruby就安装好了，不熟悉ruby的可以体验下

安装`rails`依赖的程序 `sqlite3` `nodejs`

`sudo apt-get install sqlite3 libsqlite3-dev nodejs`

安装`rails`
`sudo gem install rails`

测试`rails`
`rails -v`


创建一个`rails`工程

`rails new mytest`

进入工程
`cd mytest`

启动服务（可以按Ctrl+C停止服务）

`rails server`

测试服务

http://localhost:3000

![rails](../../../../pic/rails1.png)


停止服务

`Ctrl+C`

利用脚手架（scaffolded）建立一个叫Photo资源（scaffolded 非常方便）

`rails generate scaffold Photo url:string source_id:integer votes:integer`

整合数据库

`rake db:migrate`

启动服务

`rails server`

测试Photo资源

http://localhost:3000/photos

在这里你可以对photos表进行操作，我已经添加了两条记录。

![rails](../../../../pic/rails2.png)

另外还可以通过 http://localhost:3000/photos.json 得到json格式的数据

我们好像什么代码页没写，就做出一个web程序。下面我们看看其实现原理

`rails`是`MVC`结构的

`model` 一般就是数据结构

`controller` 是负责整个应用的逻辑

`view` 用于数据展示。


mytest目录下有下面几个重要的文件



`app/models` 里面  photo.rb ，里面是个对应photo表的类

![rails](../../../../pic/rails3.png)

`app/views` 里面包含一个photos的文件夹，在里面就是显示、添加、修改、删除等html界面

![rails](../../../../pic/rails4.png)

`app/controllers` 里面有个叫 photos_controller.rb，里面包含对 photo表的显示、添加、修改、删除等操作。

![rails](../../../../pic/rails5.png)

这些就是完成上面功能的核心。
