---
title:      	"Mastering Github - Part 2: Creating and Managing Repositories"
repo_title:     "Mastering Github - Part 2: Creating and Managing Repositories"
template:       page.hbs
created:       	2015-06-27
createdDT:     	2015-06-27
modified:		2015-06-29
modifiedDT:     2015-06-29
permalink:  	mastering-github-repos/
snippet:        <p>In Part 2 of this series, you'll learn how to create a Github Respository, make a code commit, and push your changes.</p>
description:	In Part 2 of this series, you'll learn how to create a Github Respository, make a code commit, and push your changes.
tags:       	css, less, sass
---


* [Creating a Repository](#creating-a-repository)
* [Working with Branches](#working-with-branches)
* [Conflict Resolution](#conflict-resolution)

## Creating a Repository

The first thing you have to is create a repository at github.com. Go to [github.com/new](https://github.com/new) to make one. Name your repo "github-demo." For now, leave all other options blank.

Go to your command line, cd to where you keep your repos and create a directory named "github-demo."

```bash
mkdir github-demo
cd github-demo
# Initialize your directory to make it a git repo
git init
# create a .gitignore file either in Notepad or with command line
# .gitignore is a file that tells github to ignore changes to directories or files
touch .gitignore
# now check status
git status
# you will see ".gitignore" in a list of untracked files. You have to stage it.
git add .gitignore
# commit your changes. -m is the flag for message, -a is the flag for all
git commit -m "initial commit"
```

Now you have to link the repository on your machine to the one you created online. By default, always name the remote copy as "origin."

```bash
# See if you have any remotes. The answer is nothing.
git remote -v
# Set your remote
git remote add origin https://github.com/YOUR_GIT_USERNAME/github-demo.git
# check remotes again, and it will say origin is the source from where you fetch/push
git remote -v
# check which branch you are on. By default, you start on master.
git branch
# Push your changes. You are saying "Push to origin my changes in master branch"
git push origin master
```

Now that your changes are committed, you can get your remote changes to any other machine by cloning

```bash
# delete your repo
cd ../
rm -rf github-demo
# clone your repo
git clone https://github.com/YOUR_GIT_USERNAME/github-demo.git
cd github-demo
```

## Working with Branches

If your repository will have more than one collaborator, then you should create branches.

```bash
# What branches are available, and what branch are you on?
git branch
# create a branch
git checkout -b new-branch
# now check what branches you have
git branch
```

Let's make a README.md - It is the file which appears first when you navigate to a repo.

```bash
# Mac users
touch README.md
# PC users... use Notepad
```

Edit your README.md to be exactly the following:

```markdown
# Github Demo

> anyone lived in a pretty how town<br>
> (with up so floating many bells down)<br>
> Spring, Summer, Autumn, Winter<br>
> he sang his didn't he danced his did.
```

```bash
# always check what has changed before committing
git status
# README.md is an untracked file so add it
git add README.md
# Commit your changes
git commit -m "Added README file"
# git push origin new-branch
```

Now navigate to https://github.com/YOUR_GIT_USERNAME/github-demo and you will see a new option to submit a pull request.

When you are at https://github.com/YOUR_GIT_USERNAME/github-demo/compare/new-branch?expand=1 you will see an option to create a pull request. Go ahead.

Go back to https://github.com/YOUR_GIT_USERNAME/github-demo

Now you will see 3 new changes

* 2 branches are listed
* 1 pull request opened
* an option to see different branches via dropdown

Navigate to the pull request. If the option to merge is green, then it's okay to merge. Go ahead and merge. Navigate back to your repo's homepage and now README.md is added.

This is known as a 3-way merge. Go to Graphs/network to see the merge. Now delete the ```new-branch`` from github either from the web application or in terminal. Also delete your local branch if you no longer need it.

```bash
# you can delete a branch if you are in that branch.
git checkout master
git branch -D new-branch
git push origin --delete new-branch
```

## Conflict Resolution

If two collaborators are working on the same file, and both happen to edit the same part of a file, you will have merge conflicts. To prevent this from happening, merge master into your branch as often as new changes occur.

```bash
git checkout master
# Fetch means you are looking for anything new
git fetch origin
# reset your master. 
# A hard reset means "wipe out any local changes, accept all changes from master in origin remote
git reset --hard origin/master
```

Let's force come conflicts. Create a new branch named ```conflict``` and change line 5 to be
 
```> Spring Summer Autumn Winter<br>```

Then commit and push that change. Then checkout master and change line 5 to be

```> spring, summer, autumn, Winter<br>```

Then commit and push changes to master. Go to your network to see that paths have diverged.

```bash
# To make merges back to master easy you must resolve conflicts before submitting pull requests.
# Reset your local copy of master
git checkout master
git fetch origin
git reset --hard origin/master
# checkout your branch
git checkout conflict
# merge changes in master into your brnach
git merge master
# you will get a message:
# CONFLICT (content): Merge conflict in README.md
# Automatic merge failed; fix conflicts and then commit the result.
```

Open README.md and you should see this:

```markdown
# Github Demo

> anyone lived in a pretty how town<br>
> (with up so floating many bells down)<br>
<<<<<<< HEAD
> Spring Summer Autumn Winter<br>
=======
> spring, summer, autumn, winter<br>
>>>>>>> master
> he sang his didn't he danced his did.
```

```HEAD``` describes where you are, and ```master``` describes the changes from the branch to be merged that caused conflicts. Edit README.md to be:

```markdown
# Github Demo

> anyone lived in a pretty how town<br>
> (with up so floating many bells down)<br>
> spring summer autumn winter<br>
> he sang his didn't he danced his did.
```

```bash
# now check to see if your conflict resolution was successful
git status
# it will say README.md has been modified. Commit that file.
git commit -am "merge master and resolve conflicts"
# push changes
git push origin conflict
# now merge branch conflict to master. You can do this on the website or terminal.
git checkout master
git merge conflict
git push origin master
```

If you go back to your network, you will see how the 3-way merge occurred. Alternatively, you can do this:

```bash
git log --pretty=format:"%h | %an | %s" --graph
```












