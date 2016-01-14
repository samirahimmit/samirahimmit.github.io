---
layout: default
title: Home
---
{% capture intro %}
  {% include_relative content/00-intro.md %}
{% endcapture %}
{% capture about %}
  {% include_relative content/01-about.md %}
{% endcapture %}

<section class="intro" data-start="transform:translate(0,30%);" data-top-bottom="transform:translate(0,30%);">
  {{ intro | markdownify }}
</section>
<section class="about" data-start="transform:translate(0,30%);" data-top-bottom="transform:translate(0,-100%);">
  {{ about | markdownify }}
</section>
<section class="contact" data-start="transform:translate(0,80%);" data-bottom="transform:translate(0,20%);">
  <p>Neem gerust contact met me op sam@samirahimmit.com</p>
</section>
