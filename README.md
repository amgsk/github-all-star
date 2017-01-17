# github-all-star
 
This is a chrome extension. Counts and displays the number of all stars in the user owned repository.  

[![Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png)](https://chrome.google.com/webstore/detail/github-all-star/gajlfmniiecklohehgdfcdoimnnofdog)

It works on the following page.

* Overview
* Repositories
* Stars
* Followers
* Following

### Usage

There are two ways to display the number of stars counted.
* Overview tab
* Icon badge

##### Overview Tab

The next part of Github's user page shows the total number of stars in the repository you own.

![Star Count](http://i.imgur.com/ZiaabBm.png "Show Star Count")

##### Icon Badge

And Show number of stars on toolbar icon.

![Star Count](http://i.imgur.com/sKz4II8.jpg "Show Star Count ")

### Note

* **Ignore the forked repository.**  
  Only the source is counted as the count.

* **Please set a token.**  
  This extension uses the GitHub API to count the number of stars.  
  You can make more requests by setting tokens.  
  Tokens can be set on the option page.
  
* **The number of stars includes the star you gave yourself.**  
  In order not to count the stars attached by you, we need to process more requests,   
  but it is not supported because of the high cost.

contributing
------------

Please refer to each project's style guidelines and guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!
