---
layout: page
title: hanchao blog
---

{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
    	<title><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></title>
   	 <span>{{ post.date | date_to_string }}</span> 
    	<p>{{ post.date }}</p>
    </li>
  {% endfor %}
</ul>

