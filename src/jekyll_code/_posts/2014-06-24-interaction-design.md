---
layout:         post
title:          "Interaction design and user experience: essential concepts"
date:           2014-06-24 20:30:10
permalink:      interaction-design/
description:    "Using research from UX studies and known principles of user interface design, and maintaining best practices for device-agnostic development, here's some tips and clarification for working on appearance and behavior for sites."
tags:           interaction, design, user, experience, UI, UX
---

Using research from UX studies and known principles of user interface design, and maintaining best practices for device-agnostic development, ***here's some tips and clarification for working on appearance and behavior for sites.***

* **Learnability** - and nobody wants to read the manual. Oh look, an adorable cat video.
* **Efficiency** - how fast can you perform the task? 
* **Memorability** - If you come back to it later, will you remember how to use it? And if you don't, will it be okay?
<!--more-->
* **Errors** - how often do users mess up and how catastrophic are they? Does the interface handle errors well enough to help users recover?
* **Satisfaction** - was using it a nice experience or did you want to rip out your hair?
* **Utility** - does it actually do what you want it to do, with the features you need?

One of the cardinal rules of web design is remembering that people spend 99% of their time doing something other than being on your website.

--------------

### Checklist to improve Usability

#### Good Feedback Loops

There should be some status change or visual cue to inform users that their actions actually did something, e.g., clicking on buttons. Status changes and visual cues should be consistent and appropriately timed.

#### Language for Users

We often make the mistake of taking our database structure and turning that into a form. Additionally, we sometimes organize our websites like the way we organize the internal structure of the company or its hierarchy, instead of the users think and navigate.

#### Preserve Browser Navigation

Users should be able to go backwards and forwards, as these actions typically serve as a proxy for "undo" and "redo."

#### Consistency

If we have a menus and and navigation on the page, they should all work the same way. If we decide links are blue, then all links should be blue.

#### Error Prevention

Focus on design and layouts that aren't error-prone by not being ambiguous or confusing, so users will be less likely to make mistakes

#### Error Recovery

When the user does mess up e.g., an typing letters into a input field for phone numbers, inform and provide a way for the use to handle the problem.

#### Minimize Memory Load

Keep the user's memory load at a low level by not forcing him/her to recall instructions or having to remember information from previous states or pages.

#### Flexible for different user competencies

Novice users should be able to move at a slower pace while experienced users should have access to shortcuts.

#### Avoid Information Overload

Every addition of information onto a page becomes another piece to compete for the user's attention. Fewer points of information means the user will have an easier time to make decisions

#### Application Documentation

Usually nobody wants to read the manual, but it's good to have one as a reference anyway. Some sort of "Help" section whose content is focused towards completing tasks instead of describing features.

--------------------

### The Language of Interaction & Design

You know all those intuitive things you feel about user interfaces and just assume everyone should do? Most of those "things" have names and have been thoroughly studied. Here are some....

* **Call to Action - the thing that we want the user to do when arriving on a page,** *which, hopefully, is the same thing the user wants to do when he/she arrives at that page.*

Everything else is secondary and maybe even unnecessary. Things having nothing to do with the call to action should not be competing for attention. For example, having big giant "Follow Us!" social media graphics will make the call to action about visiting Twitter.

* **Barrier to Entry - the steps and complexities that user must take (or endure) before completing the call to action.** The more complex, the less likely the call to action will be completed.

A great example of minimizing barrier to entry came in E-Commerce a few years ago. Before the shift, users had to register for membership and create an account before shopping. Additionally, registration process would probably involve opening up your email app and clicking on a validation link. Nowadays, you can go to most e-commerce sites, put the thing you want into your shopping cart, and checkout as a guest without even having to register if you don't feel like it.

How many clicks, how many TOS to check, how much legalese to read, how much personal information must delivered before starting the call to action? However, we can't remove all barriers to entry; they are often necessary, such a mechanism to check for age restrictions.

* **Fitt's Law** - (more accurately, the "Accot-Zhai Steering Law" for 2D interfaces) **the time it takes to acquire a target is a function of the distance and size of the target.**

For example,  Apple recommends that buttons on iOS apps or webpages made for Mobile Safari should be no less than 44X44 pixels to prevent "fat fingering." The other thing to consider is proximity - if the button or menu item or link is too close to another button, etc., the likelihood of clicking on the wrong thing increases.

* **Hick's Law - The time it takes to make a decision is a result of the number of choices available to the user.**

You can choose between the white Apple earbuds that rest in your ear, or the white ones that go inside your ear canal. If you go to the Sony Store, you have a [choice of 25 earbud models](http://store.sony.com/earbuds/cat-27-catid-All-Earbuds), and each option is available in multiple colors. Good luck.

The consequence of too many choices is that the user will feel overwhelmed and give up. Hick's Law does not apply to complicated tasks or problem solving, however.

* **Horror Vacui - The tendency to favor filling up blank spaces with stuff versus leaving them empty** - which is the essence that drives minimalist design.

There is an inverse relationship between empty spaces and perceived value. For example, window displays of high-end department stores typically have one or two dresses on simple racks, while discount stores crowd their displays with lots of bargains and SALE! SALE! SALE!

In terms of page design, one of the most effective ways to promote or feature an element of significance or importance is not to use lots of arresting visual cues to capture the user's attention, but just to leave it alone and keep it simple.

* **Iconic Representation - Using pictorial images improves recognition and recall of signs and controls.** Icons are a good way for relaying information or instructions.
  * ***Similar Icons*** - images that are visually analogous to an action, object, or concept, like those "Falling Rocks" street signs.
  * ***Example Icons*** - images of things commonly associated with the subject, such as a picture of a plane to symbolize an airport
  * ***Symbolic Icons*** - images of things that are abstractions of the subject, e.g., a picture of lightning to represent high-voltage power lines
  * ***Arbitrary Icons*** - images that have no relationship to the subject, but are learned over time, such as bio-hazard signs.

* **Operant Conditioning** -  (i.e. positive vs. negative reinforcement) **ways to modify behavior by rewarding desired actions and discouraging undesired actions**

It's something to consider when designing complex applications, in the context of delivering positive outcomes for users when they do what we want them to do. Also, they won't be doing the things they find annoying.

* **Pareto Principle** - (also known as "80/20 Rule") Basically, **80% of the effects come from 20% of the causes.** Sometimes it's more like 75/25 or 85/15, but the idea is to remember that a lot of what you perceive to the result will typically come from a minority of the factors. The rule is useful for focusing your resources and possibly for cutting scope on tasks with diminishing returns. Some examples:
  * 80% of your users will only use 20% of the features.
    * Do the other 80% of the features have to be there all the time then? If you hide that 80%, can your power users get to them easily?
  * 80% of your site activity comes from 20% of your users.
    * How do you cater to your core customers without alienating the lurkers? How can you pull in light users without angering your base? Are your analytics truly representative of your users are or are they skewed in favor towards a minority?
  * 80% of your requirements will be met with 20% of your development time.
    * The other 80% of development time will likely go towards refinement, bugfixes, code cleanup, accounting for fringe cases, browser compatibility, etc.
  * 80% of the errors come from 20% of the components.
    * Some things just tend to fail all the time.

* **Performance Load - the more effort it is to accomplish a task, the less likely the task will be accomplished successfully.** How much cognitive load (perception, memory, problem solving) do we want to put on the user?

We can minimize performance load by eliminating unnecessary information from displays, chunking information (group related bits together), and reduce the number of task steps by combining or automating them.

* **Progressive Disclosure - Manage information complexity by displaying only the necessary or requested information at any given time.**
  * Infrequently used controls are often hidden by a "More" button (See 80/20 Rule)
  * Are we giving info to someone who isn't ready for, or interested in it?

We have to consider how much information to deliver at any moment to prevent overwhelming our users. Think clean and uncluttered versus disorienting and frustration.

* **Proximity** - (one of the keys to the rules of Gestalt) **Things are are close together are perceived to more related than things that aren't.**

In our designs and applications, remember that one the strongest things to help users associate one element to another, or understand that two things aren't related, is just distance. Where is the submit button located in relation to the form? How are sliders and check boxes and radio buttons aligned to the options?

* **Serial Positioning**  - If we ask the user to remember a bunch of things, **it's easier to remember the first and last things in a list.**


