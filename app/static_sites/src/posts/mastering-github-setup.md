---
title:      	"Mastering Github - Part 1: Computer Setup"
repo_title:     "Mastering Github - Part 1: Computer Setup"
template:       page.hbs
created:       	2015-06-27
createdDT:     	2015-06-27
modified:		2015-06-27
modifiedDT:     2015-06-27
permalink:  	mastering-github-setup/
snippet:        <p>Github is the versioning tool for writing code. It's basically social networking for coders. In this 5-part series, I'll show you how to go from zero Github experience to doing pretty much everything you need to do. Part 1 will be about setting up your computer to use Github from the command line.</p>
description:	How to set up your computer to use Github from the command line
tags:       	css, less, sass
---

1. The first thing you'll have to do is set up a profile on the [Github website](https://github.com/)

2. Install Git on your computer 
  * **For Mac:**

    ```bash
    # git should come pre-installed. But confirm anyway:
    git --version
    # If you don't have git, then:
    # install Homebrew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    # confirm installation
    brew doctor
    # install Git
    brew install git
    # confirm installation
    git --version
    ```
  * **For PC:**
    It's too difficult do from a command line, so just download it from the [Github for Windows Site](https://windows.github.com/)

3. Add your credentials: use your information from your [Github profile](https://github.com/settings/profile). It must match!

  ```bash
  git config --global user.name "John Smith"
  git config --global user.email EMAIL@EXAMPLE.COM
  ```
4. Generate SSH Keys: once Github can authenticate your computer, you can do your entire workflow without ever having to enter passwords again.

  * **For Mac:**

    ```bash
    cd ~/.ssh
    # Check to see if you don't already have stuff there
    # If you do, open the folder in Finder and move them to a backup
    ls -lha
    # Generate key
    ssh-keygen -t rsa -C "EMAIL@EXAMPLE.COM"
    # "Generating public/private rsa key pair.""
    # Press "Enter" here
    # "Enter file in which to save the key (/Users/herereadthis/.ssh/id_rsa):""
    # "Enter passphrase (empty for no passphrase):"
    ```

    You will be prompted to created a password. Some people leave it blank, but I recommend you create one anyway, and make sure it is not the same password as the one to your github account. If the ssh key creating is successful, you'll see funky ASCII art. Then copy the public key

    ```bash
    pbcopy < ~/.ssh/id_rsa.pub
    ```
    
    ```bash
    # Then add Github to known hosts
    ssh -T git@github.com
    # additional (optional) step for Mac Users
    git config --global credential.helper osxkeychain
    ```

  * **For PC:**
  
    If you've installed Github on your machine using [Github for Windows](https://windows.github.com/) program, then a credential helper is provided. Then run:
    
    ```bash
    git config --global credential.helper wincred
    # proceed to the next step. 
    # As soon as you attempt to clone, it will ask for your credentials.
    # Once you enter them, it will be stored into your machine.
    ```

4. Add your public key to your Github Account
  
  * go to your [SSH keys](https://github.com/settings/ssh) page on Github and add the key you just copied.

5. Clone the repo (If you don't know what these commands do, it's okay for now.)

  ```bash
  # If you haven't already, clone the repo.
  cd PATH/TO/YOUR/PROJECTS
  git clone https://github.com/blinemedical/tech-talks.git
  # get latest changes
  # this command should work without prompting you for a password.
  # If it asks for credentials, then you have not properly added your SSH keys.
  git fetch origin
  # reset your local master
  git reset --hard origin/master
  ```

6. Make your first commit
  
  * Inside the ```github-demo``` folder create a new, empty text file that is your name

    ```bash
    # Mac instructions
    cd github-demo
    touch yourname.txt
    ```

    I don't know how to do this for Windows. Just create a file in Notepad.
  * see if file creation worked:

    ```bash
    git status
    # you should see a prompt that says "Untracked files" and 
    # the file is the one you just created
    # Add the file
    git add yourname.txt
    # check status again
    git status
    # you should see a prompt that says "Changes to be committed" 
    # and the new file is the one you just added
    # commit
    git commit -m "adding my file"
    # push
    git push origin master
    ```

    Again, you should not be getting prompts to authenticate yourself.





