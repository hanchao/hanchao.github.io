---
layout: post
title:  "使用Android toolchain编译GDAL"
date:   2014-07-08 17:57:30
categories: Android NDK toolchain GDAL
---

通常在Android上使用ndk-build编译C++代码。但大多开源库中并没有提供Android.mk文件。

这里只能使用单独的toolchain来编译。关于toolchain可参考
<http://blog.csdn.net/smfwuxiao/article/details/6587709>

### 准备工作

创建一套工具链

```
/Users/chaohan/Documents/android-ndk-r9d/build/tools/make-standalone-toolchain.sh --platform=android-8 --stl=stlport --install-dir=/Users/chaohan/Documents/android-8-toolchain
```
由于我的代码使用了stlport，这里增加`--stl=stlport`参数。生成的工具链的位置通过`--install-dir`设置。

设置环境变量

```
export PATH=$PATH:/Users/chaohan/Documents/android-8-toolchain/bin/
```

### 下载代码

```
git clone https://github.com/OSGeo/gdal.git
```

代码中的config.sub config.guess不认识android环境，这里需要更新
```
cd gdal
rm config.sub config.guess
wget http://git.savannah.gnu.org/cgit/config.git/plain/config.sub
wget http://git.savannah.gnu.org/cgit/config.git/plain/config.guess
```
### 编译
```
CFLAGS="-mthumb" CXXFLAGS="-mthumb" LIBS="-lstdc++"  ./configure --host=arm-linux-androideabi --prefix=/Users/chaohan/Documents/Git/gdal/out --without-gif --without-jpeg --with-threads --with-ogr  --with-geos --with-libz=internal

make

make install
```
我这里make时遇到isinf不认识。通过修改`cpl_port.h`文件去掉，不影响大局。

### 使用
在`Android.mk`中增加

定义预编译静态库
```
include $(CLEAR_VARS)
LOCAL_MODULE := gdal
LOCAL_SRC_FILES := libgdal.a
include $(PREBUILT_STATIC_LIBRARY)
```
设置依赖
```
LOCAL_STATIC_LIBRARIES := gdal
```

### 参考

<https://github.com/nutiteq/gdal/wiki/AndroidHowto>
<http://trac.osgeo.org/gdal/wiki/BuildingForAndroid>


### 问题和感想

在编译过程中遇到很多问题。主要的问题是
* 运行`configure`出错，不认识arm-linux-androideabi。通过更新`config.sub config.guess`解决。
* stl版本冲突。默认toolchain使用`gnustl`，而我的库使用`stlport`。通过在make-standalone-toolchain指定`--stl=stlport`解决。
* 第三方库重定义。gdal包含gif、jpeg等库，我的库也包含它。通过在configure时`--without-gif --without-jpeg`去除。

真心觉得C++的编译环境复杂，不同平台有不同的编译工具。从make、autoconf、cmake、ndk-build、gyp等脚本到vs、xcode等IDE，用起来真是有各种坑。
希望C++也能有个Maven、cocoaPods、npm之类的工具解决软件包之间的依赖问题。
