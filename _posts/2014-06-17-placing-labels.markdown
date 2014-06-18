---
layout: post
title:  "Mapbox GL中的文本标注方法"
date:   2014-06-17 10:57:30
categories: Mapbox GL
---

好的地图标签应该是在介于一个邋遢的地图和一个美观的地图之间的。标签必须清楚地识别功能，同时不遮挡图。

<iframe src="https://player.vimeo.com/video/97978134?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;loop=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="padding:0;border:0;"></iframe>

The normal requirements for map labelling are to place labels as clearly as possible without any overlap. Regular maps just need to avoid label overlap for a single, fixed zoom level and rotation.

在Mapbox GL中好的标签位置是一个需要解决的困难问题。我们标签需要在任何缩放和旋转时工作。我们需要标签位置是连续的,缩放或旋转时标签不要跳来跳去。我们标签需要能无缝的跨越瓦片。我们需要支持在缩放时改变字体大小。并且一切都要快速。

Placement needs to support both horizontal labels, as well as curved labels which follow a line. Both types of labels need to behave smoothly when zooming and rotating. Labels can never overlap, even when rotating. Horizontal labels stay horizontal and curved labels rotate with the map. Labels are flipped to avoid being drawn upside down and curved labels smoothly slide along roads.

<iframe src="https://player.vimeo.com/video/97978133?title=0&amp;byline=0&amp;portrait=0&amp;loop=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="padding:0;border:0;"></iframe>

There is plenty of academic research on label placement, but most of this applies to maps with fixed rotation and with separate zoom levels. Dynamic maps with continuous zooming, panning, and rotation need a completely different approach. Our implementation expands on a paper by Been and Yap that establishes four ideal requirements for continuous and interactive labelling:

1. 标签不应该在放大时消失，在缩小时出现。
2. 标签不应该在平移时消失或出现，除非滑出视图。
3. 标签不应该跳来跳去，而是应该被锚定。
4. 标签的位置应该是确定的，无论你怎么到当前视图。

The paper provides guidance on implementing this for horizontal labels, but we go further by supporting rotation and curved labels.

我们的实现有两个步骤：

1. 预处理
2. 渲染

The rendering step needs to be fast so that Mapbox GL can rerender the entire map every frame for smooth interaction. Most of the placement work happens in the preprocessing step:

1. 为每个标签生成锚点。
2. 计算相对于锚各个字形的位置。
2. 计算该标签和符号可以没有重叠显示的缩放级别。
4. 计算标签可以显示的旋转范围。

## 生成锚点

Each label has an anchor. An anchor is the point at which a label is positioned when zooming or rotating.

Labels for point features have a single anchor, the point.

For lines, we want to show multiple labels so we interpolate along the line adding an anchor every x pixels. Distance between labels changes when zooming, so we add a minimum zoom level for each anchor to maintain appropriate spacing. Fewer labels are shown at lower zoom levels and more appear as you zoom in.

![](https://i.imgur.com/MjNdAOD.gif)

## 生成每个锚定位字形

For each piece of text we already have a list of glyphs and their positions, but these positions need to be adjusted for curved labels.

During the render step we can only shift glyphs along a straight line. To draw curved text we need to add multiple copies of glyphs — one for each line segment a glyph appears on. Each of these glyphs have minimum and maximum zoom levels that hide the glyph when it slides off the end of a segment so that only one instance of each original glyph is shown at the same time.

Usually these glyphs are completely hidden when out of range, but here they are shown with a reduced opacity:

![](https://i.imgur.com/3yvtbsl.gif)

## 限制缩放范围

To avoid label collisions, we need to restrict the zoom level at which a label is first shown. As you zoom in, labels get spaced further apart, opening room for new labels. Once a label is shown, it will not be hidden as you zoom in.

We use an R-tree that contains already-placed labels to narrow down which labels might collide. We then calculate the zoom level at which the two labels will fit side-by-side. It is safe to show the label for any zoom level higher than this one.

## 限制旋转范围

The next step is calculating how far the label can be rotated before it collides with other labels. There are two types of collisions: a curved label colliding with a horizontal label, and a horizontal label colliding with a horizontal label.

## 水平-横向碰撞

There are eight possible angles at which a pair of horizontal labels could collide. Each of these possible collisions is checked with some trigonometry.

![](https://farm3.staticflickr.com/2906/14214899990_851fbf9e8b_o.jpg)

## 弯曲-水平旋转碰撞

A curved-horizontal collision occurs when a corner of one label’s bounding box intersects an edge of the other label’s bounding box. For each of the eight bounding box corners, we calculate the angles at which a circle (formed by that point being rotated around the label’s anchor) intersects the edges of the other box. These are the angles at which a collision would begin and end.

![](https://farm4.staticflickr.com/3874/14214876558_bcca6b73e5_o.jpg)

## 无缝性

Mapbox GL downloads vector tiles with data for the area and zoom level it is currently displaying. When new tiles are downloaded and their labels have been placed, an old tile’s label may need to be hidden to make way for a more important label. This will be handled in a resolution step that has not yet been implemented.

## Mapbox GL

访问[Mapbox GL](http://mapbox.com/blog/mapbox-gl)博客查看和谈论更多的设计和开发工作。地图文本标注只是设备上实时高品质的地图中的一个小而必要的部分。

原文：<https://www.mapbox.com/blog/placing-labels/>
