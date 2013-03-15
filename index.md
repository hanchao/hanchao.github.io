---
layout: page
title: hanchao blog
---

{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
    	<h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>
    	<p>{{ post.content }}</p>
      <p align="right">{{ post.date | date_to_string }}</p> 
    </li>
  {% endfor %}
</ul>

