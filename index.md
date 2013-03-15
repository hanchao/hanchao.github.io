---
layout: page
title: hanchao blog
---

{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
    	<h3><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h3>
   	 <span>{{ post.date | date_to_string }}</span> 
    	<p>{{ page.content }}</p>
    </li>
  {% endfor %}
</ul>

