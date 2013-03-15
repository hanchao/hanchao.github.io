---
layout: page
title: hanchao blog
tagline: Supporting tagline
---

<ul class="posts">
  {% for post in site.posts %}
    <li>
    	<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a> &raquo; 
   	 <span>{{ post.date | date_to_string }}</span> &raquo; 
    	<p>{{ post.description }}</p>
    </li>
  {% endfor %}
</ul>

