---
layout: post
title:  "使用OpenGL绘制抗锯齿线"
date:   2014-06-13 16:07:26
categories: Mapbox GL
---

地图大多是由线条以及少量多边形构成。不幸的是，画线是[OpenGL](https://en.wikipedia.org/wiki/OpenGL)的一个薄弱点。GL_LINES绘图模式是有限的:它不支持线连接、线帽、非整数线宽、宽度大于10像素或在一条线上使用不同宽度。鉴于这些局限性，它是不适合于用于高品质地图上使用。下面是GL_LINES的一个例子：

![GL_LINES demo](https://farm6.staticflickr.com/5191/14407050523_1818933850_o.png)

此外，OpenGL的抗锯齿（多重采样抗锯齿）在不同的设备支持程度不同，或者是质量较差。

作为替代原生线,我们可以通过镶嵌把线转化成多边形绘制。几个月前,我[调查](http://http.developer.nvidia.com/GPUGems2/gpugems2_chapter22.html)了[各种](https://github.com/opensciencemap/vtm/blob/037c25153ba199769b0dd214c90b65e3817516c9/vtm/src/org/oscim/renderer/elements/LineLayer.java)线[渲染方法](http://artgrammer.blogspot.de/2011/05/drawing-nearly-perfect-2d-line-segments.html),尝试用六个三角形绘制一条线:

![tessellate](https://farm3.staticflickr.com/2904/14407050753_468309807d_o.png)

两对三角形的构成两边渐变的边缘，中间一对三角形拼成实线。渐变提供抗锯齿，以使该线有淡入淡出的边缘。当按比例缩小，这将产生高品质的线：

![six-triangles-antialiasing](https://farm6.staticflickr.com/5564/14363789356_feb33e0794_o.png)

不幸的是,每线段生成六个三角形意味着需要生成8个顶点,这就需要大量的内存。我的试验是每一条线段只有两个顶点，但这样绘制一条线就需要调用3次绘制。为了保持良好的帧率我们需要尽量减少每帧绘制次数。

## 属性插值的帮助

OpenGL的绘图分为两个阶段。首先，顶点的列表被传递到顶点着色器。顶点着色器基本上是一个小函数,将每一个顶点(在模型坐标系)到一个新的位置(屏幕坐标系),以便您每一帧使用相同的顶点数组,但仍然可以进行诸如旋转、平移,或缩放等操作。

连续的三个顶点形成一个三角形。在这个区域内的所有像素都由片段着色器处理,它也叫像素着色器。顶点着色器的为顶点数组中的每个顶点运行一次，片段着色器为每个像素运行一次，来决定三角形中的像素使用什么颜色。在最简单的情况下，它可能会分配一个固定的颜色，就像这样：


```
void main() {
    gl_FragColor = vec4(0, 0, 0, 1);
}
```

颜色顺序是RGBA,所以这个例子所有的片段都使用不透明的黑色。如果我们使用这些多边形绘制线，并且多边形的所有像素渲染流水线使用一致的颜色，那我们还是得到了可怕锯齿线。我们需要一种方法来把多边形的边界像素的alpha值从1渐变到0。在顶点着色器转化顶点坐标时,OpenGL允许我们对每个顶点指定其属性,例如:

![attributes](https://farm6.staticflickr.com/5557/14200241369_543c13480e_o.jpg)

这些属性再交由像素着色器。有趣的部分是这样的：由于一个象素不能直接与单个顶点相关联，该属性根据三角形的三个顶点构成按距离来插值出来：

![attributes-interpolated](https://farm6.staticflickr.com/5587/14200434067_9df1cc34ab_o.jpg)

这个插值生成顶点之间的渐变效果。这是我要描述渲染方法的基础。

## 需求

画线时,我们有几个要求:
* 可变线宽：我们要在每一帧改变线宽，当用户放大/缩小，我们不必将线一遍又一遍镶嵌为三角形。这意味着顶点的位置必须在顶点着色器计算出,而不是预先在场景中设置。
* 端点帽（对接，圆形，方形）：这说明线路两端的绘制方式。
* 线连接（尖角，圆角，斜角）：这说明两线之间接缝的绘制方式。
* 多条线：出于性能原因，我们希望与不同的宽度和颜色在一个绘制调用中完成。

## 线镶嵌

由于我们要动态地改变线宽，我们不能在加载时进行完整的镶嵌。相反，我们重复同一个顶点两次，所以，对于一个线段，在我们的数组有四个顶点（标记为1-4）：

![extrusion-source](https://farm4.staticflickr.com/3909/14200317290_38cdfbb2f8_o.jpg)

此外,我们计算线段的法线单位向量,并将它分配给每一个顶点,与第一个顶点得到正单位矢量,第二个负单位矢量。单位向量是你在这张图片中看到的小箭头：

![extrusion-target](https://farm3.staticflickr.com/2910/14387779612_666ca4340a_o_d.png)

在顶点着色器中,我们在渲染过程中把线宽和顶点的单位向量相乘,并最终有两个三角形,效果如这张照片红色虚线。

顶点着色器看起来像这样：

```
attribute vec2 a_pos;
attribute vec2 a_normal;

uniform float u_linewidth;
uniform mat4 u_mv_matrix;
uniform mat4 u_p_matrix;

void main() {
    vec4 delta = vec4(a_normal * u_linewidth, 0, 0);
    vec4 pos = u_mv_matrix * vec4(a_pos, 0, 1);
    gl_Position = u_p_matrix * (pos + delta);
}
```

在主函数中,我们把法线单位向量与线宽相乘的到实际的线宽。正确的顶点位置(在屏幕空间)是由模型/视图矩阵相乘得到的。之后,我们添加挤压向量线宽，它是独立于任何模型/视图缩放的。最后,我们乘以投影矩阵得到投影空间中的顶点位置(在我们的例子中，我们使用平行投影，它只是将坐标缩放屏幕空间内，坐标范围为0..1)。

## 抗锯齿
