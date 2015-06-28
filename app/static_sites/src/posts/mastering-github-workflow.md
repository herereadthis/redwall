---
title:      	"Mastering Github - Part 3: Optimizing Your Workflow"
repo_title:     "Mastering Github - Part 3: Optimizing Your Workflow"
template:       page.hbs
created:       	2015-06-27
createdDT:     	2015-06-27
modified:		2015-06-30
modifiedDT:     2015-06-30
permalink:  	mastering-github-workflow/
snippet:        <p>There are many ways to structure your workflow in Git. I recommend the following process, which uses feature branches and 3-way merges.</p>
description:	There are many ways to structure your workflow in Git. I recommend the following process, which uses feature branches and 3-way merges.
tags:       	css, less, sass
---

* It promotes constant monitoring of master branch, in order to limit conflicts.
* It simplifies the merge process by enforcing cleanup before pull requests.
* It keeps master branch clean and stable because everyone is working in branches.

## Working on your own stuff

The steps to the workflow are:

1. Update your master
2. Create your own branch
3. Make your changes
4. Commit your changes
5. Check for updates to master again
6. Merge master into your branch
7. Push your changes

```bash
# 1. Make sure your master branch is up-to-date.
git checkout master
git fetch origin
git reset --hard origin/master
# 2. Create your own branch from master.
git checkout -b BRANCHNAME
# 3a. Make your changes, and see which files have changed.
git status
# 3b. Review your changes if want to.
git diff
# 4. Stage the files you want to commit.
git add PATH/TO/FILE1 PATH/TO/FILE2 ...
git commit -m "JIRA-TICKET-## my changes"
# 5a. Check for updates to master that may have occurred while you were working.
git checkout master
git fetch origin
# 5b. If fetching indicates changes, then reset master.
git reset --hard origin/master
# 6a. Go back to your branch.
git checkout BRANCHNAME
# 6b. Merge master and resolve conficts if needed.
git merge master
# 7a. Push your changes
git push origin BRANCHNAME
# 7b. Go to the repo on github.com and submit a pull request.
```

* **"Why don't we just do ```git pull origin master```?"**
  * Because you are never working in master anyway. 
  * Also, if your local checkout of master is polluted, it will clean it up right away. 
  * Lastly, it is a foolproof way to avoid conflicts when updating your master. 
  
* **"What if I've made changes to 2 dozen files and I don't want to stage them one at a time?"**

  ```bash
  git commit -am "JIRA-TICKET-## my changes"
  ```
  * If you plan on committing all your changes when you commit, just add "-a" for "all."
  * Remember that "-a" will not commit files that you've created. You still have to add those manually.
  
* **"What about rebasing, squashing, and cherry-picking?"**
  * I personally am against messing with history. More talk regarding history changing on the [Versioning page](https://github.com/blinemedical/tech-talks/blob/master/github-demo/versioning.md)
  
 
## Bash Aliases and Batch Files

The above workflow may at first seem like way too much typing and it might lead you to think using a Git GUI is better, faster and less error-prone. One way to speed up your workflow is to edit your ```.bash_profile``` file.

```bash
# WORKS ON MAC ONLY
alias cfr='git checkout master;git fetch --all;git reset --hard origin/master'
alias gb='git branch'
alias gs='git status'
alias gmm='git merge master'

gc () {
	git checkout $1
}
gcb () {
    git checkout -b $1
}
gpo () {
    git push origin $1
}
```

```bash
# WORKS ON PC ONLY
@echo off
echo git checkout master;git fetch --all;git reset --hard origin/master >cfr.bat
echo git branch>gb.bat
echo git status>gs.bat
echo git merge master>gmm.bat
echo git checkout %1>gc.bat
echo git checkout %1>gcb.bat 
```

The above workflow can be reduced to this:

```bash
cfr
gcb BRANCHNAME
gs
git commit -am "JIRA-TICKET-## my changes"
cfr
gc BRANCHAME
gmm
gpo BRANCHNAME
```

## Pull Requests

Unless you are absolutely sure of what you are doing, never merge any changes into master unless you have tested the changes first for yourself.

```bash
# Update your master branch.
git checkout master
git fetch origin
git reset --hard origin/master
# Get your peer's branch
git checkout BRANCHNAME
# Check to see if your application still works.
# If you want to do some cleanup or make changes then use the same workflow as above
# You can merge feature branches into master from github.com (recommended)
# Or you can do it from command line
git checkout master
git merge BRANCHNAME
```

## Tandem Coding

Once in a while (but rarely) you may find yourself working in the same branch as another person, at the same time. You might doing some coding and another developer tells you that a bunch of changes were made and you need to update your local branch.

```bash
# (A) If you are ready to commit, then commit.
git commit -am "JIRA-TICKET-## my changes"
# (B) If your work is still unstable, then stash changes
git stash
# Fetch changes to your branch
git fetch origin
# Pull changes
git pull origin BRANCHNAME
# Apply your changes back if you've stash them.
git stash apply
```










