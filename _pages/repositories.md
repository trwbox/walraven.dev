---
layout: page
permalink: /repositories/
title: GitHub Overview
description: A quick overview with my GitHub account, and some pinned repositories.
nav: true
nav_order: 3
---
<!-- If there is only a single user make that the title -->
{% if site.data.repositories.github_users %}
{% assign num_users = site.data.repositories.github_users.size %}
{% if num_users == 1 %}

## {{ site.data.repositories.github_users[0] }}

{% elsif num_users > 1 %}

## GitHub Users

{% endif %}

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.html username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
  {% if site.data.repositories.github_users.size > 1 %}
  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.html username=user %}
  </div>

  ---

{% endfor %}
{% endif %}
{% endif %}

## GitHub Repositories

{% if site.data.repositories.github_repos %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}
