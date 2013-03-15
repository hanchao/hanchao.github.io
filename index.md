---
layout: page
title: hanchao blog
---

{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
    	<h1><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h1>
   	 <span>{{ post.date | date_to_string }}</span> 
    	<p>{{ post.date }}</p>
    </li>
  {% endfor %}
</ul>

