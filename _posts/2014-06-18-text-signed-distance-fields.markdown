---
layout: post
title:  "Drawing Text with Signed Distance Fields in Mapbox GL"
date:   2014-06-18 10:57:30
categories: Mapbox GL
---

上周，Ansis解释了在[Mapbox GL](http://github.com/mapbox/mapbox-gl-native)标签被[放置的方法](https://www.mapbox.com/blog/placing-labels/)，但一旦我们知道在何处放置标签，我们还是要弄清楚如何绘制他们。

甚至在2014年，OpenGL诞生后超过二十年，渲染文本是不容易的，因为OpenGL的只能画出三角形和线条。地图渲染文本是更加困难的,因为我们需要在许多不同大小的字符,当用户旋转地图时文本位置的每帧都会变化。此外，我们需要画文本光晕已得到更好的对比度。

![properties](https://farm6.staticflickr.com/5535/14436445982_8d28ec8401_b.jpg)

## 使用字形图集

对于栅格化文字一般是使用开源库[FreeType](http://www.freetype.org/)。绘制文本通常的工作方式是通过FreeType在临时缓冲区生成字形的单色位图，然后将缓冲区中的像素逐个混合目标位图正确的位置上去。这意味着，我们可以预先将需要的所有字形的染到一个共享的纹理中，称为纹理图集，然后为每个字形创建两个三角形映射到纹理上。Nicolas Rougier的[freetype-gl](https://github.com/rougier/freetype-gl)也是通过这种方法实现的。

![glyph-drawing](https://farm6.staticflickr.com/5544/14434426341_324a45c827_b.jpg)

这很好的工作，直到你开始旋转文字。虽然OpenGL的线性插值是相当好的，但它仍然看起来相当模糊的，所以只是旋转字形并不能满足我们。

## Signed Distance Fields

Distance fields (or distance transforms) have been around for ages and have lots of useful properties. In a distance field, every pixel indicates the distance to the closest “element”. Valve introduced the approach of using distance fields for rendering sharp decals in computer games a couple of years ago. And we decided to do just that when rendering glyphs as well.

To render text with signed distance fields, we create a glyph texture at font size 24 that stores the distance to the next outline in every pixel, rather than the actual value itself:

![opensans-regular](https://farm3.staticflickr.com/2899/14414646376_03162c9141_o.png)

Inside of a glyph, the distance is negative; outside it’s positive. As an additional optimization, to fit into a one-byte unsigned integer, we’re shifting everything so that values between 192 and 255 indicate “inside” a glyph and values from 0 to 191 indicate outside, plus we clamp the overflowing values. This gives the appearance above of a range of values from black (0) to white (255). In essence, we are using the pixel color values in the texture as a measure of distance from glyph edges.

Like in the previous technique, we create two triangles to form a quad and assign the corresponding texture coordinates so that the distance map of that glyph gets mapped onto that rectangle.

We enable OpenGL’s linear interpolation so that we get a smoothly scaled image. Then, the important part is the alpha test. Depending on how far we want to buffer the glyph, we choose a cutoff value and assign 1 as the alpha value to all pixels that are within the glyph outline and 0 to the ones outside. To get an antialiased look, we’re creating a small alpha gradient around the cutoff value with the smoothstep function. The entire pixel shader looks like this:

```
precision mediump float;

uniform sampler2D u_texture;
uniform vec4 u_color;
uniform float u_buffer;
uniform float u_gamma;

varying vec2 v_texcoord;

void main() {
    float dist = texture2D(u_texture, v_texcoord).r;
    float alpha = smoothstep(u_buffer - u_gamma, u_buffer + u_gamma, dist);
    gl_FragColor = vec4(u_color.rgb, alpha * u_color.a);
}
```

你可以在这个[演示](http://mapbox-kkaefer.s3.amazonaws.com/sdf/index.html)试试文本渲染。

Using signed distance fields for font rendering has a few advantages:

* Free accurate halos by simply changing the alpha testing threshold.
* Arbitrary text rotation.
* Arbitrary text size, though it starts looking a bit off at very large text sizes.
* A bitmap of a 24px glyph is about 20% smaller than the vector representation of that glyph.

There are a few minor drawbacks too:

* Text appears a little more rounded.
* No support for font hinting.

Font hinting changes the glyph outlines so that they fit better in a pixel grid, which is especially useful when rendering small text. However, FreeType disables hinting anyway as soon as you rotate a glyph with a transformation matrix. Additionally, many of our maps are being displayed on very high density (high-DPI or “retina”) screens built into smartphones or tablets, so hinting is much less important on these screens.

原文：<https://www.mapbox.com/blog/text-signed-distance-fields/>
