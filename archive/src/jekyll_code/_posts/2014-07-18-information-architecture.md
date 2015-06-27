---
layout:         post
title:          "Create information architecture (IA) for your web application (Part 1)"
created:        2014-07-18
createdDT:      2014-07-18
modified:       2014-07-20
modifiedDT:     2014-07-20
permalink:      information-architecture-part-1/
description:    "Information Architecture (IA) as the high-level, structured organization of a site, intended to organize content, facilitate design, and improve user interaction"
tags:           information, architecture
---

***We shall define Information Architecture (IA) as the high-level, structured organization of the site.*** On a deeper level, IA will concern itself with:

* what content is on the site, along with the scope of content
* how users get to the content
* the needs of the different kinds of users visiting the site
* how the content is organized
* the intent, purpose and tone of the site
<!--more-->

By creating the IA for a project, we hope to:

* Improve usability for the site
* Provide documentation for coding implementation
* Allow for faster iterative design
* Build solid requirements needed for the site

IA, if done correctly, will address the following concerns:

1. ***Organize the content of the site the way customers want to find it,*** vs how we internally organize the data (e.g. managerial structure, database structure, or just arbitrary preference)
2. Allow design to be determined by content and intent; we will let ***form follow function***
3. ***Determine major points of user errors*** and frustrations, and find optimal solutions.

#### Since there are lot of topics to cover, IA will be split into 3 articles:

* *Part 1* (this article) will define scope, strategy and determining user needs.
* *Part 2* will illustrate building products and applications, and modelling site interaction.
* *Part 3* concerns surface-level site hierarchy, user experience, and graphic design.

----------------

### Our example

For the purposes of demonstration, let's suppose we want to build a web application that helps people pick the right bicycle helmet to buy. There are lots of factors to consider, including the user's age, level of competition, cost, and particular sport. An Olympic track cyclist has many different needs than city bike messenger, and so on.

----------------

### 1. Identify short-term and long-term business goals

It may seem a strange to start with business intentions first, but for most serious web applications and sites, you will need money to keep things going. Never forget that the cash needs to keep flowing!

Typically for project development cycles, there's an initial phase of just trying to get a product out the door, followed by a latter, mature phase more concerned with monetization and expansion. For each phase identify what is and what isn't out of scope.

#### Overall Objectives & Expectations (short-term goals)

* ***Production Release by [DEADLINE], in-scope:***
  * Surface skinning
  * On a philosophic level, present the information such that it cannotes an application rather than a site for articles
  * Identify user flow and interaction to address potetianal weak points  (user bounces, usability errors, etc)
  * Create navigation which will emphasize product offering and personal choice selections
  * Rudimentary style guide
  * Display discoverability with the intent to provide solutions for users
  * Responsive design, which will cater both to the viewport size and/or device constraints
* ***Out-of-scope:***
  * Users will not be able to create user profiles or account pages
  * Search results will be a simplistic algorithm instead of smart-search or user-catered results
  * No built-in ability for social media sharing
  * No system for user commenting

#### Phase 2 Goals

Long-term goals will not be part of the initial launch, but must be considered as part of IA and design so that when these features are implemented, they won't simply appear as "bolted on," but are consistent with the baseline user interaction.

* ***In-scope:***
  * User profile pages with saved user preferences
  * Product review pages
  * Articles related to cycling or cycling safety
  * Social media will become baked-in
  * Users will be able to leave feedback or comments
  * Promote site to build user base
  * Monetization through advertisements
  * Do analytics on users and their cycling and helmet needs
* ***Out-of-scope:***
  * No E-commerce portal to sell bicycle helmets (perhaps move to a phase 3?)
  * Don't make a native mobile application, stick with mobile web

----------------

### 2. Clarify user intent

The goal of building user profiles is not necessarily to determine "who" the users are. Building IA for for targeted demographics is an approach that comes form traditional marketing and marketing research.

#### Why would anyone want to come to this site?


#### User Dimensions

{% raw %}
<style>
.arrow_swing td:first-child {
  text-align: right;
}
.arrow_swing td:nth-child(2) {
  font-size: 2rem;
  text-align: center;
}
.arrow_swing td:last-child {
}
</style>
<!--&#8592;&#8594;-->
<table class="arrow_swing">
    <tbody>
        <tr>
            <td>Leisurely</td>
            <td class="arrow_swing">&#8644;</td>
            <td>Competitive athlete</td>
        </tr>
        <tr>
            <td>Child/ youth</td>
            <td class="arrow_swing">&#8644;</td>
            <td>Adult</td>
        </tr>
        <tr>
            <td>Budget-concerned</td>
            <td class="arrow_swing">&#8644;</td>
            <td>Professional usage</td>
        </tr>
        <tr>
            <td>Style &amp; comfort</td>
            <td class="arrow_swing">&#8644;</td>
            <td>Safety-oriented</td>
        </tr>
    </tbody>
</table>
{% endraw %}


----------------

### More to come...

*Who puts articles online before finishing them? I do. Check back in a few days.*




