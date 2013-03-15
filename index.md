---
layout: list
---

<!-- 首页即博客列表 -->
{% assign list = site.posts %}
{% assign preview = true %}

{% for post in list %}
<article{% if forloop.index == 1 and preview %} content-loaded="1"{% endif %}>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
	<div class="article-content">
	{% if forloop.index == 1 and preview and post.layout == 'post' %}
		{{ post.content }}
	{% endif %}
	</div>
</article>
{% endfor %}

{% if list == null %}
<article class="empty">
	<p>该分类下还没有文章</p>
</article>
{% endif %}

